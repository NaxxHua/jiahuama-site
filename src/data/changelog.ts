// 《缸中之脑：重启》网页 Demo 的玩家向更新日志（双语，完整版）。
// 取自游戏仓库的 CHANGELOG.md，精简成"玩家看得懂的要点"，按小版本(0.1/0.2/0.3/0.4)分组。
// 网页上做成左侧数轴：小版本为节点，点开看里面每个 patch 的改动。
// 加新版本：放进对应小版本 patches 数组最前面；开新小版本就在数组最前面加一组。

export interface BiText {
  en: string;
  zh: string;
}

export interface Patch {
  version: string;
  date: string;
  title: BiText;
  items: BiText[];
}

export interface MinorVersion {
  /** 小版本号，如 "0.4"。 */
  minor: string;
  title: BiText;
  /** 该小版本的时间跨度（展示用）。 */
  span: string;
  patches: Patch[];
}

export const changelog: MinorVersion[] = [
  {
    minor: "0.4",
    title: { en: "Data, feel & balance", zh: "数据收集 · 手感 · 平衡" },
    span: "2026-06-17 → 06-19",
    patches: [
      {
        version: "0.4.20",
        date: "2026-06-19",
        title: { en: "Card modification system (Balatro-style)", zh: "卡牌改造系统（塔罗式）" },
        items: [
          {
            en: "New card-modification reward (every 3rd fight): pick any card from your deck, then choose one of three mods to permanently apply — Reinforce (+3 main stat), Multistrike (+1 hit), Coolant (cool when discarded), Lighten (cheaper), Overcharge (+5 dmg, +4 heat). Mods stick to the card for the rest of the run.",
            zh: "新增「卡牌改造」奖励（每第 3 场）：从牌组里点一张牌，再三选一改造永久生效——强化(主数值+3)、多段改装(+1段)、冷却回路(弃牌散热)、轻量化(更便宜)、过载芯片(伤+5但热+4)。改造跟着这张牌整局生效。",
          },
        ],
      },
      {
        version: "0.4.19",
        date: "2026-06-19",
        title: { en: "Sweet-zone target band + longer burn popup", zh: "甜区目标带 + 灼烧 pop 加时" },
        items: [
          {
            en: "The heat bar now draws a gold band over the bonus (\"sweet\") zone, giving you a clear target to aim for instead of only watching the burn line. The zone bonus was bumped (+4 dmg / +3 block) so riding it actually matters.",
            zh: "热力条现在用金框画出「增益区(甜区)」那一段，给你一个明确的瞄准目标，而不只是盯着灼烧线；甜区增益上调（伤+4/盾+3），贴着跑真的有影响。",
          },
          {
            en: "The \"burn shard implanted\" popup now lingers ~1.7s instead of flashing by.",
            zh: "「植入：灼烧残片」提示停留时间加长（约 1.7 秒），不再一闪而过。",
          },
        ],
      },
      {
        version: "0.4.18",
        date: "2026-06-19",
        title: { en: "Fixes: codex unlocks, Furnace Heart, heat upside", zh: "复查修：图鉴解锁 / 熔炉之心 / 热力正向" },
        items: [
          {
            en: "Fixed: relics you own now actually unlock in the codex (broke after the cognition-odds change). The burn-debuff wording is consistent now.",
            zh: "修复：拿到的圣物现在会正确解锁进图鉴（认知掉率改版后漏了）；灼烧残片文案统一。",
          },
          {
            en: "Furnace Heart reworked: it used to trigger per-overdrive (now a module, so it did nothing) — now it grants +5 permanent attack each time you overheat, turning the burned HP into lasting damage.",
            zh: "熔炉之心重做：原「每进无双 +攻击」因无双下放成模块而失效 → 改成「每次过热硬出 +5 永久攻击」，把灼伤的血变成永久输出。",
          },
          {
            en: "Heat now reads as a resource, not pure downside: while in the sweet zone the bar shows a green \"Bonus! +dmg +block\", and start-heat relics explain they get you into that zone faster.",
            zh: "热力不再像纯负面：在增益区(甜区)时热力条显示绿字「增益! 伤+盾」，「开局热力」圣物也说明它能更快进甜区。",
          },
        ],
      },
      {
        version: "0.4.17",
        date: "2026-06-19",
        title: { en: "Overdrive is now a module + cleaner heat + draw/discard anim", zh: "无双下放成模块 + 过热区常驻 + 抽弃牌动画" },
        items: [
          {
            en: "Untangled heat: by default the redline (heat cap) just has an Overheat zone above it (always visible, fixed width) — playing past it burns you (push-your-luck), no auto-overdrive. Overdrive is now a Module (a relic for now): equip it and the redline turns into an Overdrive gate instead. So \"overheat (burn)\" and \"overdrive (burst)\" no longer fight in the same bar.",
            zh: "理顺热力：默认红线(热力上限)以上就是「过热区」(任何上限都看得到、宽度固定)，越线硬出会灼伤你(push-your-luck)、不再自动开无双。无双下放成「模块」(暂为一件圣物)：装上后红线改成「无双之门」。这样「过热(灼伤)」和「无双(爆发)」不再在同一条热力条里打架。",
          },
          {
            en: "Fixed the hand-card tag: cards crossing the redline show red \"Overheat\" (will burn) or orange \"Overdrive\" (will trigger overdrive, if you have the module) — no more mislabel.",
            zh: "修正手牌角标：会越红线的牌——没模块标红「过热」(会灼伤)、有模块标橙「无双」(会进无双)，不再对不上。",
          },
          {
            en: "Draw/discard animations: drawn cards fade in along their own axis, played/discarded cards fade out along it.",
            zh: "抽牌/弃牌动画：抽到的牌沿自身中轴淡入，打出/弃掉的牌沿中轴淡出。",
          },
        ],
      },
      {
        version: "0.4.16",
        date: "2026-06-19",
        title: { en: "Relic odds, card fixes & out-of-battle viewers", zh: "圣物认知掉率 + 卡牌修 + 局外查看" },
        items: [
          {
            en: "Boss relics are now a pick-1-of-3 (no longer all 3). Relic rarity odds climb the deeper you get — transparent on the map (common/rare/epic/legendary %, color-coded), framed as your machine-mind growing clearer and getting closer to the cool treasures.",
            zh: "Boss 圣物改成三选一（不再全给 3 个）。圣物稀有度随战斗推进水涨船高——地图上透明显示（普通/稀有/史诗/传说掉率，按稀有度配色），作为机器的你对世界认知越清晰、离酷炫宝藏越近。",
          },
          {
            en: "Out of battle you can now see your current relics (hover for details) and HP in both the hub and the map; the hub got a deck viewer.",
            zh: "局外（hub 与地图）现在能看到当前圣物（hover 详情）和生命条；hub 加了查看牌组。",
          },
          {
            en: "Card/event fixes from feedback: only a few strong brain cards add heat now (not all); the cooling card costs memory; 黑墙过载 buffed; the burn-clog debuff is one-shot now; removed duplicate event \"leave\" options.",
            zh: "卡牌/事件反馈修：只有个别强力大脑卡才积热（不再全部）；散热牌改成耗内存；黑墙过载加强；灼烧残片改成一次性；去掉事件里重复的「离开」选项。",
          },
        ],
      },
      {
        version: "0.4.15",
        date: "2026-06-18",
        title: { en: "Overheat can kill — push your luck", zh: "过热致死 · 搏命散热" },
        items: [
          {
            en: "Heat is finally dangerous: the cap is now a redline, not a lock. You may keep playing shell cards past it, but each one sears you — the deeper in the red, the more it hurts, and overheating a few times will kill you. The bonus zone is reachable earlier so even the starter shell has a sweet spot.",
            zh: "热力终于有牙：上限不再锁牌，而是一条红线。越线仍可硬出躯壳卡，但每张都会灼伤你——越深越疼，过热几次就会烧死。增益区也更早能进，初始躯壳也有甜区。",
          },
          {
            en: "Fewer trait picks per run (less decision fatigue); brain cards now build a little heat too.",
            zh: "每局词条三选一减半（缓解选择疲劳）；大脑卡现在也积少量热。",
          },
          {
            en: "Gentle dynamic enemy HP keeps strong builds from one-shotting fights, without rubber-banding.",
            zh: "温和的动态敌人血量让强 build 不再一回合碾过，但绝不橡皮筋。",
          },
          {
            en: "UI: memory bar moved next to the heat bar; the top bar now groups relics / traits / items.",
            zh: "界面：内存条挪到热力条旁；顶栏把圣物 / 词条 / 道具分组了。",
          },
          {
            en: "Nerfs: paralyze (Signal Jam), Fuse Synapse, and the Combo Engine trait; the memory-swap event is limited to chapter 1.",
            zh: "削弱：信号干扰、熔断突触、连段引擎；记忆置换台事件只在第 1 章出现。",
          },
        ],
      },
      {
        version: "0.4.14",
        date: "2026-06-18",
        title: { en: "Specialization payoff curve", zh: "公司投资几何曲线" },
        items: [
          {
            en: "Stacking traits of one company grants an escalating damage bonus to that company's cards — specializing pays off, while rainbow spreads don't benefit.",
            zh: "叠同一公司的词条会给该公司卡牌递增的伤害加成——走深一条流派有回报，铺开/彩虹不吃这条曲线。",
          },
        ],
      },
      {
        version: "0.4.13",
        date: "2026-06-18",
        title: { en: "Faction balance pass", zh: "流派平衡：街头加强 / 辉格回调" },
        items: [
          {
            en: "Street buffed (it used to be a defenseless glass cannon, gaining attack, draw and opening block) and Pflege dialed back, so every faction clears at a comparable rate.",
            zh: "街头加强（原本是没防御的玻璃大炮，现在还给攻击/抽牌/开局护盾）、辉格回调，各流派通关率拉到同一档。",
          },
        ],
      },
      {
        version: "0.4.12",
        date: "2026-06-18",
        title: { en: "Built-in multi-hit cards", zh: "卡牌内置多段" },
        items: [
          {
            en: "Cards can hit multiple times by design — e.g. Combo Slash is now \"deal 4 damage twice\"; the card face shows \"N × X damage\".",
            zh: "卡牌支持内置多段：「连斩」改成「造成 2 次 4 点伤害」，卡面显示「N 次 X 点伤害」。",
          },
        ],
      },
      {
        version: "0.4.11",
        date: "2026-06-18",
        title: { en: "Drag-to-use items + fixes", zh: "道具拖拽 + 自伤/商店/战后修复" },
        items: [
          {
            en: "Consumables reworked: damage items scale with enemy max HP and are used by dragging — throw damage at enemies, drag buffs onto yourself.",
            zh: "一次性道具大改：伤害按敌人最大生命缩放，改成拖拽使用——伤害丢敌人、增益拖到自己身上。",
          },
          {
            en: "After every win you heal 30% of the damage you took; self-damage (hacker cost) now ignores block; shop purchases count toward the codex.",
            zh: "每场胜利回复受伤部分的 30%；自伤（黑客代价）无视护盾；商店买的卡也算图鉴解锁。",
          },
        ],
      },
      {
        version: "0.4.10",
        date: "2026-06-18",
        title: { en: "Combo / rainbow balance + icons", zh: "平衡：连击 / 彩虹 + 大保险图标" },
        items: [
          {
            en: "Multistrike extra hits do 60% damage; the rainbow trait got a big nerf so 4-color spread builds are no longer the auto-best.",
            zh: "连击附加段只打 60%；彩虹词条大砍，四色铺开不再是无脑最优解。",
          },
          {
            en: "The boss reward chest now shows icons for non-legendary relics too (falls back to a company-tinted placeholder).",
            zh: "大保险开箱：非传说圣物也显示图标了（退化到公司 logo 占位、按稀有度上色）。",
          },
        ],
      },
      {
        version: "0.4.9",
        date: "2026-06-17",
        title: { en: "Pile previews + segmented enemy bars", zh: "敌人分段条 + 牌堆预览" },
        items: [
          {
            en: "Hover the draw/discard pile to preview the cards inside (draw pile sorted by name, no order leak); enemy health bars now show HP + shields in segments, matching the player; all shield/buff badges are one size.",
            zh: "悬停抽牌/弃牌堆预览里面的牌（抽牌堆按名字排序、不泄露顺序）；敌人血条也改成「生命+护盾」分段条，与玩家一致；护盾/增益徽标统一大小。",
          },
        ],
      },
      {
        version: "0.4.8",
        date: "2026-06-17",
        title: { en: "Segmented health bar", zh: "分段生命条" },
        items: [
          {
            en: "Player health bar reworked into HP + shields: rounded frame with a gloss highlight, HP color-shifts (green/orange/red), white/blue/yellow shields stack to the right.",
            zh: "玩家生命条改成「生命+护盾」分段条：圆角底框+顶部高光，生命按比例变色（绿/橙/红），白/蓝/黄护盾依次接在右侧。",
          },
        ],
      },
      {
        version: "0.4.7",
        date: "2026-06-17",
        title: { en: "Rules text fix", zh: "规则文案修正" },
        items: [
          {
            en: "Updated the rules blurb: the old \"red/blue arrow\" wording is gone (arrows were removed) — now \"drag a card onto its target and release; the bottom banner marks shell / brain\".",
            zh: "规则速览里过时的「红箭头/蓝箭头」说明改掉了（箭头早已移除）→ 改为「拖卡到目标松手 + 卡面底部躯壳/大脑横幅区分类型」。",
          },
        ],
      },
      {
        version: "0.4.6",
        date: "2026-06-17",
        title: { en: "Combo offset & overdrive warning", zh: "连击错位与无双警告" },
        items: [
          {
            en: "Ending your turn while in Overdrive now flashes \"SELF-DESTRUCT IN N TURNS\" in red across the screen; combo damage numbers are offset and staggered so you can read each hit.",
            zh: "无双状态下结束回合 → 红字闪烁「N 回合后自毁！！」+ 红屏；连击伤害数字横向错开、稍晚出现，看清每一下。",
          },
        ],
      },
      {
        version: "0.4.5",
        date: "2026-06-17",
        title: { en: "Damage popups & card-face fix", zh: "伤害跳字与卡面修复" },
        items: [
          {
            en: "Damage numbers reworked (Dead Cells / Skul style): bold outlined font over the head of the target, bigger, slower to rise and fade so you can read every hit. Fixed the type banner covering long card descriptions.",
            zh: "伤害跳字大改（死亡细胞/小骨式）：粗体厚描边、落在头顶、更大更慢更醒目；修复类型横幅压住长描述。",
          },
        ],
      },
      {
        version: "0.4.4",
        date: "2026-06-17",
        title: { en: "Staging & UI fixes", zh: "演出与界面修复" },
        items: [
          {
            en: "Player multi-hit attacks now play out hit-by-hit (number + impact + hitstop + gap). Fixed: hand no longer covers boss phase-change dialogue; in-battle settings buttons no longer run off-screen.",
            zh: "玩家连击改为逐下拉开演（跳字+特效+顿帧+间隙）；修复 Boss 转阶段对话时手牌盖住对话框、局内设置按钮出屏。",
          },
        ],
      },
      {
        version: "0.4.3",
        date: "2026-06-17",
        title: { en: "Enemy turn replayed hit-by-hit", zh: "敌人回合逐下回放" },
        items: [
          {
            en: "The enemy turn now plays action-by-action, symmetric with your attacks: the acting enemy lunges, the impact lands on you, the damage number pops and the bar drops smoothly — and implanted debuff cards are called out individually.",
            zh: "敌人回合改为逐个动作回放，和你打敌人对称：出手的敌人先扑一下→特效砸到你身上→跳伤害数字、血条逐下平滑下降→植入的负面牌单独飘名。",
          },
        ],
      },
      {
        version: "0.4.2",
        date: "2026-06-17",
        title: { en: "Telemetry local opt-out", zh: "遥测本机开关" },
        items: [
          {
            en: "Added a \"don't track this machine (developer)\" setting so the author's own playtesting doesn't pollute the dashboard.",
            zh: "设置里加「不统计本机数据（开发者）」开关，开发者自己试玩不污染数据看板。",
          },
        ],
      },
      {
        version: "0.4.1",
        date: "2026-06-17",
        title: { en: "Telemetry data fix", zh: "遥测数据修复" },
        items: [
          {
            en: "Fixed the offline telemetry queue corrupting integers into floats (which broke the dashboard's per-chapter aggregation).",
            zh: "修复遥测离线队列把整数读成浮点（导致数据看板「按章胜负」聚合报错、整页加载失败）。",
          },
        ],
      },
      {
        version: "0.4.0",
        date: "2026-06-17",
        title: { en: "Data collection & battle fixes", zh: "数据收集与战斗修复" },
        items: [
          {
            en: "Added the data pipeline for online playtesting: a feedback survey, anonymous telemetry, and a code-gated dashboard (players / funnel / per-chapter win rate / death causes / popular picks).",
            zh: "为线上试玩铺数据管线：试玩问卷、匿名遥测、码门数据看板（玩家/漏斗/按章胜率/死因/热门选牌）。",
          },
          {
            en: "Title renamed to BRAIN IN A VAT: REBOOT; card type banner (shell=heat / brain=memory); card faces show true total damage; web font fallback fixes tofu glyphs.",
            zh: "标题改为「缸中之脑：重启 / BRAIN IN A VAT:REBOOT」；卡面加躯壳/大脑类型横幅、显示真实总伤；网页字体兜底修复豆腐块。",
          },
          {
            en: "Fixes from real playtesting: max-HP penalty no longer applied every fight, dead enemies no longer highlight, pure-debuff cards correctly target enemies, player HP ticks down hit-by-hit on enemy multi-hits.",
            zh: "真人玩测修复：生命上限不再每场重复扣、死亡敌人不再被点亮、纯减益牌正确指向敌人、敌人多段攻击玩家血条逐下平滑掉。",
          },
        ],
      },
    ],
  },
  {
    minor: "0.3",
    title: { en: "Title screen & save system", zh: "标题页与存档系统" },
    span: "2026-06-17",
    patches: [
      {
        version: "0.3.0",
        date: "2026-06-17",
        title: { en: "Title screen & saves", zh: "标题页与存档系统" },
        items: [
          {
            en: "New title screen (neon-glow title + start / settings / quit, version shown bottom-right).",
            zh: "新标题页：霓虹辉光大标题 + 开始游戏 / 设置 / 退出，右下角显示版本号。",
          },
          {
            en: "Three independent save slots, each with its own meta + mid-run progress; pick screen shows chapter / HP / gold / deck size, with continue / restart / clear.",
            zh: "三个独立存档槽，各自一份升级 meta + 局内进度；选择界面显示章节/生命/金币/卡组规模，可继续/重开/清除。",
          },
          {
            en: "Full mid-run saving (Slay-the-Spire style): deck, relics, traits, items, HP, heat, gold, fragments, chapter and map position all serialized; autosaves after every node, so you can close the browser and resume.",
            zh: "完整局内存档（杀戮尖塔式）：牌组/圣物/词条/道具/生命/热力/金币/碎片/章节/地图位置全序列化；每过一个节点自动存档，关掉浏览器再回来续上。",
          },
          {
            en: "In-game settings / pause menu (ESC): master volume, fullscreen, replay the tutorial, clear save, return to title. Volume + fullscreen are shared across slots.",
            zh: "局内设置/暂停菜单（ESC）：主音量、全屏、重看新手指导、清除存档、返回标题；音量+全屏跨槽共享。",
          },
        ],
      },
    ],
  },
  {
    minor: "0.2",
    title: { en: "Onboarding & polish", zh: "上手与手感打磨" },
    span: "2026-06-17",
    patches: [
      {
        version: "0.2.0",
        date: "2026-06-17",
        title: { en: "Onboarding & feel polish", zh: "上手与手感打磨" },
        items: [
          {
            en: "In-battle tutorial: first fight dims the screen and spotlights each HUD piece (resources / heat / memory / playing cards / enemy intent / end turn) with text bubbles; replayable with F2.",
            zh: "战斗内新手指导：首次进战斗逐个聚光高亮 HUD（资源/热力/内存/出牌/敌人意图/结束回合）+ 文字气泡，F2 可重看。",
          },
          {
            en: "Card codex (3 reveal tiers: unseen / seen / owned) with relic and item sections and company / type filters.",
            zh: "卡牌图鉴（三档揭示：没见过/见过/拥有），加圣物、道具分区与公司/类型筛选。",
          },
          {
            en: "Card play reworked: arrows removed — the dragged card itself follows the cursor, shrinks and glows as the pointer. Clickable dice for the Street luck-dice playstyle.",
            zh: "出牌拖拽：去掉箭头，拖动时卡牌本体跟随光标、缩小、发光当指针；街头骰子流改成可点的掷骰图标。",
          },
          {
            en: "Readability + size: heavier portrait shadows, hand hover zoom + glow; art compressed (Windows build 426MB → 212MB).",
            zh: "可读性与体积：立绘阴影加重、手牌 hover 放大发光；美术压缩（Windows 包 426MB → 212MB）。",
          },
        ],
      },
    ],
  },
  {
    minor: "0.1",
    title: { en: "Chapter 1 playable demo", zh: "第一章试玩 Demo" },
    span: "2026-06-17",
    patches: [
      {
        version: "0.1.0",
        date: "2026-06-17",
        title: { en: "First playable build", zh: "首个可试玩版本" },
        items: [
          {
            en: "Full chapter 1: prologue \"Awakening\" + three acts, three named bosses with unique mechanics and art (Osullivan's half-HP \"Face-Swap / Regen\" phase change).",
            zh: "完整第一章：序章「觉醒」+ 三幕剧情，三个具名章节 Boss（各有专属机制与立绘，奥沙利文半血「换脸·再生」转阶段）。",
          },
          {
            en: "Narrative system: tavern hub between runs, NPC chats, the boss \"big insurance\" reward chest, portrait fade dialogue, and the original \"in-brain process\" voice narration (avoids IP risk).",
            zh: "叙事系统：局间酒馆 hub、与 NPC 闲聊、Boss「大保险」开箱、半身像对话；原创「脑内进程」嗓音叙事（规避 IP 风险）。",
          },
          {
            en: "Combat core: dual resources — shell cards (build heat) / brain cards (spend memory); heat / bonus zone / overdrive; company synergy (Pioneer / Pflege / Morishita / Street) + same-company resonance.",
            zh: "战斗核心：双资源——躯壳卡（积热力）/ 大脑卡（耗内存）；热力/增益区/过载·无双；公司协同（先锋/辉格/森下/街头）+ 同公司词条共鸣。",
          },
          {
            en: "Three growth types in a run (relics / traits / consumables); shields (white/blue/yellow), poison/vulnerable/weak, enemy intent telegraphs, mechanical-enemy overheat.",
            zh: "局内三类成长（圣物/词条/道具）；护盾（白/蓝/黄）、中毒/易伤/虚弱、敌人意图预告、敌人机械过热瘫痪。",
          },
          {
            en: "Slay-the-Spire branching map; one continuous life across chapters (build carries over, enemies scale up per chapter, only death resets).",
            zh: "杀戮尖塔式分支地图；一命连续章节（构筑跨章保留、敌人按章升压，仅死亡重置）。",
          },
          {
            en: "Varied events (data node / glitch shrine / memory swap / black market) plus risk-gambles that can drop into a fight on failure.",
            zh: "多样事件（数据节点/故障神龛/记忆置换台/黑市）+ 模拟宇宙式吉凶赌博（失败触发遭遇战）。",
          },
          {
            en: "Game feel: drag-to-target play, hit-by-hit feedback (white flash / knockback / numbers), kill & overdrive bullet-time, death freeze with cause, hitstop / screen shake / sequence-frame VFX.",
            zh: "手感：拖动指向出牌、逐下挨打反馈（闪白/击退/跳字）、击杀与过载引爆子弹时间、死亡定格写明死因、顿帧/屏震/序列帧特效。",
          },
          {
            en: "Meta progression: persistent shell-fragment / brain-upload storage spent on upgrades between runs, relic-collection unlocks, black-box log archives, boss grudge lines across runs.",
            zh: "局外成长：躯壳碎片/大脑上传体跨轮持久、开局升级花费、圣物收集解锁、黑箱日志档案、Boss 跨周目记仇台词。",
          },
          {
            en: "AI static-art pipeline (cards / portraits / enemies / backgrounds / relic icons), a randomized SFX pool, and an emoji-free UI (glow fonts / icons instead).",
            zh: "AI 静态美术管线（卡面/立绘/敌人/背景/圣物图标）、随机微调的音效池、全 UI 无 emoji（改用字体发光/图标）。",
          },
        ],
      },
    ],
  },
];
