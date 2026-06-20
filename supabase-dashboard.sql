-- 试玩数据看板：聚合 RPC（security definer = 以函数所有者权限跑，绕过 RLS 只回汇总）。
-- 在 Supabase SQL Editor 跑一次。匿名只能 execute 这些函数、拿到聚合数字；
-- 拿不到原始 events 行。
-- 注：网页问卷已下线、playtest_feedback 表已废弃，反馈改走 Discord，本看板只看遥测。

-- 概览
create or replace function biav_overview()
returns json language sql security definer set search_path = public as $$
  select json_build_object(
    'players',  (select count(distinct device_id) from events),
    'sessions', (select count(distinct session_id) from events),
    'runs',     (select count(*) from events where event = 'run_start'),
    'events',   (select count(*) from events)
  );
$$;

-- 按章战斗胜负
create or replace function biav_battles()
returns table(chapter int, result text, n bigint)
language sql security definer set search_path = public as $$
  -- 用 ::numeric::int 兼容历史脏数据里 "1.0" 这种浮点字符串（JSON 队列回灌导致）
  select (props->>'chapter')::numeric::int, props->>'result', count(*)
  from events where event = 'battle_end' and props ? 'chapter'
  group by 1, 2 order by 1, 2;
$$;

-- 死因分布
create or replace function biav_deaths()
returns table(cause text, n bigint)
language sql security definer set search_path = public as $$
  select coalesce(props->>'cause', '?'), count(*)
  from events where event = 'run_end' and props->>'survived' = 'false'
  group by 1 order by 2 desc;
$$;

-- 热门选牌（前 20）
create or replace function biav_cards()
returns table(card text, n bigint)
language sql security definer set search_path = public as $$
  select props->>'card', count(*)
  from events where event = 'card_pick' and props ? 'card'
  group by 1 order by 2 desc limit 20;
$$;

-- 漏斗：开局 → 出发 → 赢过战斗 → 通章 → 通关 demo
create or replace function biav_funnel()
returns table(step text, n bigint)
language sql security definer set search_path = public as $$
  select * from (values
    ('app_open',      (select count(distinct session_id) from events where event = 'app_open')),
    ('run_start',     (select count(distinct session_id) from events where event = 'run_start')),
    ('battle_win',    (select count(*) from events where event = 'battle_end' and props->>'result' = 'win')),
    ('chapter_clear', (select count(*) from events where event = 'chapter_clear')),
    ('demo_clear',    (select count(*) from events where event = 'run_end' and props->>'cause' = 'demo_clear'))
  ) as t(step, n);
$$;

-- 玩家凑出的流派：run_end 构筑快照里各公司牌数累加（看大家真往哪家走）
create or replace function biav_companies()
returns table(company text, cards bigint)
language sql security definer set search_path = public as $$
  select x.k, sum((x.v)::numeric::bigint)
  from events, lateral jsonb_each_text(props->'comp') as x(k, v)
  where event = 'run_end' and props ? 'comp'
  group by x.k order by 2 desc;
$$;

-- 热门圣物（前 20）
create or replace function biav_relics()
returns table(relic text, n bigint)
language sql security definer set search_path = public as $$
  select props->>'relic', count(*)
  from events where event = 'relic_pick' and props ? 'relic'
  group by 1 order by 2 desc limit 20;
$$;

-- 热力峰值分布：玩家到底有没有在用增益区 / 过热（按 battle_end 的 heat_peak 分桶）
create or replace function biav_heat()
returns table(bucket text, n bigint)
language sql security definer set search_path = public as $$
  select case
    when (props->>'heat_peak')::numeric < 30 then '0-29 安全'
    when (props->>'heat_peak')::numeric < 60 then '30-59'
    when (props->>'heat_peak')::numeric < 100 then '60-99 增益/红线'
    else '100+ 过热' end as bucket,
    count(*)
  from events where event = 'battle_end' and props ? 'heat_peak'
  group by 1 order by 1;
$$;

-- 跳过奖励次数（验证"做减法给钱"被不被用）
create or replace function biav_skips()
returns table(kind text, n bigint)
language sql security definer set search_path = public as $$
  select coalesce(props->>'kind', '?'), count(*)
  from events where event = 'reward_skip'
  group by 1 order by 2 desc;
$$;

grant execute on function
  biav_overview(), biav_battles(), biav_deaths(), biav_cards(), biav_funnel(),
  biav_companies(), biav_relics(), biav_heat(), biav_skips()
  to anon;
