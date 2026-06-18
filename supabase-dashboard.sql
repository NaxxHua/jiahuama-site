-- 试玩数据看板：聚合 RPC（security definer = 以函数所有者权限跑，绕过 RLS 只回汇总）。
-- 在 Supabase SQL Editor 跑一次。匿名只能 execute 这些函数、拿到聚合数字；
-- 拿不到原始 events / playtest_feedback 行（反馈内容仍只你在后台能看）。

-- 概览
create or replace function biav_overview()
returns json language sql security definer set search_path = public as $$
  select json_build_object(
    'players',  (select count(distinct device_id) from events),
    'sessions', (select count(distinct session_id) from events),
    'runs',     (select count(*) from events where event = 'run_start'),
    'feedback', (select count(*) from playtest_feedback),
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

grant execute on function
  biav_overview(), biav_battles(), biav_deaths(), biav_cards(), biav_funnel()
  to anon;
