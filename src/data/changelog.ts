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
    minor: "0.12",
    title: { en: "Meta-progression rework (fragments vs uploads)", zh: "局外成长重构（碎片 / 上传体 分轴）" },
    span: "2026-06-22",
    patches: [
      {
        version: "0.12.0",
        date: "2026-06-22",
        title: { en: "Two meta currencies, split by role", zh: "两条局外货币分轴" },
        items: [
          {
            en: "\"Prismatic modules\" are now just called \"temp modules\" everywhere.",
            zh: "「棱彩模块」统一改叫「临时模块」。",
          },
          {
            en: "Memory cap moved from uploads to fragments: it's now a third upgrade row in the shell-loadout screen (5->10, +1/level, 80 fragments each), beside capacity and heat-cap.",
            zh: "内存上限从上传体改成花躯壳碎片升——在躯壳改装屏新增「内存上限」升级行（5→10，每级 +1，每级 80 碎片），和容量 / 热力上限并排。",
          },
          {
            en: "The brain screen is now \"Cognition Unlock\": spend brain uploads to permanently unlock cybernetic modules into your pool (6 uploads each). Modules are no longer free at start — unlock them first, then equip in the loadout. (New saves start with 6 uploads = enough for one.)",
            zh: "「升级大脑」改成「认知解锁」：花大脑上传体永久解锁义体模块进池（6 上传体 / 个）。模块不再开局白给，需先解锁再装。（首存档给 6 上传体 = 够先解 1 个。）",
          },
          {
            en: "Heads-up: this is a meta reset — old memory-cap upgrades convert to fragment levels, and modules now need unlocking.",
            zh: "提醒：这是一次 meta 调整——旧的内存上限折算成碎片升级等级，模块改为需解锁。",
          },
        ],
      },
    ],
  },
  {
    minor: "0.11",
    title: { en: "Prismatic temp-module loop", zh: "临时模块（棱彩）系统" },
    span: "2026-06-22",
    patches: [
      {
        version: "0.11.10",
        date: "2026-06-22",
        title: { en: "No empty rest at chapter start + finer heat-cap upgrades", zh: "休整开章不空转 + 热力上限拆成小步" },
        items: [
          {
            en: "Rest (休整) costs 1 trace, but trace starts at 0 each chapter, so resting on the first node was a free heal. Rest is no longer offered while trace is 0.",
            zh: "休整的代价是追踪 -1，但每章开局追踪本就是 0，开章第一格休整等于白送回血。现在追踪为 0 时不再出现休整。",
          },
          {
            en: "Heat-cap upgrade was +30 per level (100+ fragments) — too big a jump. Now it's 15 small +10 steps (still 50→200) at a flat 50 fragments each: smoother, and not too cheap.",
            zh: "热力上限升级原来每级 +30、100 碎片起，跳得太大。现在改成 15 小级、每级 +10（仍 50→200），每级固定 50 碎片，升级更平滑。",
          },
        ],
      },
      {
        version: "0.11.9",
        date: "2026-06-22",
        title: { en: "Full backpack + new module: keep which one?", zh: "背包满了再得模块：二选一保留" },
        items: [
          {
            en: "The backpack holds 1 module; a new drop/reward used to silently overwrite it. Now when it's full, a side-by-side \"keep which one?\" popup shows the one in your pack vs the new one — pick one, discard the other. A temp module already equipped (with its battle timer running) isn't touched.",
            zh: "背包只有 1 格，之前再得一枚模块会直接顶掉原来的（白丢）。现在会弹「背包已满 · 保留哪一个？」，并排给出「背包里的」和「新得到的」，选一个留、另一个丢。临时槽里正在使用（有场数计时）的模块不参与、不受影响。",
          },
        ],
      },
      {
        version: "0.11.8",
        date: "2026-06-22",
        title: { en: "Module gamble event + display tweaks", zh: "模块赌博事件 + 显示微调" },
        items: [
          {
            en: "New event \"Smuggler's Cyberware Locker\" — the module counterpart to the relic gamble events: pick the lock (a module, or guards wake → elite fight) or force it (guaranteed module, but always an elite fight). The module goes to your pack and follows the same use-this-run / carry-to-research loop as elite drops.",
            zh: "新事件「走私义体柜」——对应圣物赌博事件的模块版：撬锁（得模块，或惊动守卫进精英战），或强行破拆（必得模块但必进精英战）。模块进背包，走和精英掉落一样的「本局临时用 / 完整本章带回研究所解锁」流程。",
          },
          {
            en: "Enemy multi-hit intent no longer prints the total — just \"5-7×2\"; do the math yourself.",
            zh: "敌人连击意图不再写「共多少」，只显示「5-7×2」，合计自己算。",
          },
          {
            en: "Lightning Whip (and other random-hit cards) now show per-hit damage as \"total (base+bonus)\" like normal attacks, so you can see how much your build added.",
            zh: "闪电五连鞭这类随机多段牌的每段伤害也拆「基础+加成」，和普通攻击牌一致显示「4（2+2）」。",
          },
        ],
      },
      {
        version: "0.11.7",
        date: "2026-06-22",
        title: { en: "Rewards wait for the hit chain to finish", zh: "连击打完、血条见底再弹奖励" },
        items: [
          {
            en: "Multi-hit kills (e.g. Lightning Whip's ~10 hits) used to pop the reward screen the instant the enemy's HP hit zero in logic — before the hits finished animating or the enemy visibly died. Now the victory transition waits for the full chain to play out and the HP bars to empty.",
            zh: "像闪电五连鞭这种多段连击，之前敌人血量一归零就立刻弹奖励——动画还没演完、还没看到敌人死。现在会等连击逐下演完、血条见底、播完击毁特写，再弹奖励。",
          },
          {
            en: "Random multi-target chains now drain each hit enemy's HP bar per hit (previously only same-target chains animated the bar).",
            zh: "随机打多个敌人的连击，现在每个被打到的敌人血条都跟着每一下掉（之前只有同一目标的连击才逐下扣）。",
          },
        ],
      },
      {
        version: "0.11.6",
        date: "2026-06-22",
        title: { en: "Card font fixed: stable type line, no ballooning", zh: "卡面字号回归：类型行固定 + 描述不膨胀" },
        items: [
          {
            en: "The \"type · company\" subtitle (e.g. Skill · Neutral) is back to a fixed small size — the previous version let it scale up with the description.",
            zh: "「类型·公司」那一行（如 技能·中立）恢复固定小字号——上一版它会跟着描述字号一起放大。",
          },
          {
            en: "Description font is now capped (~16) so short cards stay a consistent, readable size instead of blowing up huge; long cards still shrink to fit.",
            zh: "描述字号设了上限（约 16），短牌保持一致、可读的大小，不再被放大成超大字；长牌仍自动缩到放得下。",
          },
        ],
      },
      {
        version: "0.11.5",
        date: "2026-06-22",
        title: { en: "Card text pushed to the largest non-clipping size", zh: "卡面文字顶到最大不裁" },
        items: [
          {
            en: "Card rules text is now sized to the largest font that still fits — long cards no longer sit small with empty space below; it grows to fill the box and only shrinks when it would clip (measured from the actual rendered height, so the web build matches).",
            zh: "卡面规则文现在顶到「刚好不裁」的最大字号——长牌不再又小又空，能放大就填满、会裁才缩（按真实渲染高度算，网页版一致）。",
          },
        ],
      },
      {
        version: "0.11.4",
        date: "2026-06-22",
        title: { en: "Multi-hit enemy intents read clearly", zh: "敌人连击预告写清楚" },
        items: [
          {
            en: "Enemy multi-hit attacks now telegraph as \"per-hit × count (total)\" — e.g. \"Burst 3-5×2 (6-10 total)\" — instead of a single number that looked like one hit.",
            zh: "敌人多段攻击的意图现在显示「每段 ×段数（共合计）」，例如「连射 3-5×2（共6-10）」，不再只给一个数字让人以为是单发。",
          },
          {
            en: "\"Burst\" (连射) was secretly a single hit despite the name — it's now a real 2-hit (each ~half, similar total).",
            zh: "「连射」之前其实是单发，现在改成真正的 2 段连击（每段约半伤，合计与原来相近）。",
          },
        ],
      },
      {
        version: "0.11.3",
        date: "2026-06-22",
        title: { en: "Card text auto-fills the description box", zh: "卡面文字自适应填满" },
        items: [
          {
            en: "Card description text now scales to fill the box: short cards (Strike, Block, etc.) use a big font instead of sitting tiny with empty space, while long cards still shrink to fit (with the actual-rendered-height pass keeping the web build consistent).",
            zh: "卡面描述文字现在自适应填满：短牌（打击、格挡等）用大字、不再又小又空，长牌仍自动缩到放得下（配合按真实渲染高度的二次收字，网页版一致）。",
          },
        ],
      },
      {
        version: "0.11.2",
        date: "2026-06-22",
        title: { en: "Fix: core cards now in the card gallery", zh: "修复：核心牌组进图鉴" },
        items: [
          {
            en: "The two cores' 5-card decks (Sprint / Berserk) never showed up in the card gallery — it only listed starter + draft-pool cards. They're in the codex now (total 64→74).",
            zh: "疾走 / 狂暴两个核心各 5 张牌之前一直不在卡牌图鉴里（图鉴只收起手牌 + 抽卡池）。现在补进去了（总数 64→74）。",
          },
        ],
      },
      {
        version: "0.11.1",
        date: "2026-06-22",
        title: { en: "Fix: web card-text clipping + drop popup centering", zh: "修复：网页版卡面截字 + 掉落弹窗居中" },
        items: [
          {
            en: "Card rules text was clipping only in the web build (its font metrics differ from local, so the auto font-size came out too big). Cards now re-fit one frame after appearing using the actual rendered height, so the full text always shows — renderer-independent.",
            zh: "卡面文字只在网页版被截断（网页字体度量和本地不同，自适应字号偏大）。现在卡牌出现一帧后按真实渲染高度再收一档字号，完整显示、渲染器无关。",
          },
          {
            en: "The elite temp-module drop popup is now properly centered (was off-center, overlapping the hand).",
            zh: "精英掉落临时模块的弹窗现在正中显示（之前没居中、压在手牌上）。",
          },
        ],
      },
      {
        version: "0.11.0",
        date: "2026-06-22",
        title: { en: "Temp modules: elite drop → backpack → research", zh: "临时模块：精英掉落 → 背包 → 研究解锁" },
        items: [
          {
            en: "Beating an elite has a 25% chance to drop a temporary (prismatic) module, with a popup; it goes into your 1-slot backpack.",
            zh: "打败精英有 25% 概率掉一枚临时（棱彩）模块，弹窗提示，收进背包（1 格）。",
          },
          {
            en: "New 'Shell' button on the map (next to 'Deck'): view your current shell / core / modules / temp module / backpack.",
            zh: "地图底部「查看牌组」旁新增「查看躯壳」：看当前躯壳 / 核心 / 模块 / 临时模块 / 背包。",
          },
          {
            en: "Temp modules can be equipped from the backpack to use in battle — they last 3 battles then self-destruct, and cost no capacity. Or leave one in the backpack and clear the chapter to carry it back and permanently research/unlock it (equippable in future runs). Hover the ? on each slot for details.",
            zh: "临时模块可从背包装上使用——本局内 3 场战斗后自动摧毁、不占容量；或留在背包、完整通关本章带回研究所永久解锁（之后可正常装备）。每个槽的问号 hover 有说明。",
          },
          {
            en: "Fixed a bug where two damage-reduction modules only worked against weakened enemies.",
            zh: "修复：两个减伤模块之前只在打「虚弱」敌人时才生效，现在始终生效。",
          },
        ],
      },
    ],
  },
  {
    minor: "0.10",
    title: { en: "Condition glow, card upgrades & economy cleanup", zh: "条件高亮 · 卡牌升级 · 经济清理" },
    span: "2026-06-22",
    patches: [
      {
        version: "0.10.4",
        date: "2026-06-22",
        title: { en: "Lightning combo nerf + card text no longer covered", zh: "闪电五连鞭削弱 + 卡面文字不再被牌型条挡" },
        items: [
          {
            en: "Lightning 5-Combo base damage 5→2 (5 random hits = 10; combo to 10 hits = 20). Base 5 was too strong — up to 50.",
            zh: "闪电五连鞭基础伤害 5→2（5 次随机 = 10，凑满 10 次 = 20）。原来 base 5 太强，最高能打 50。",
          },
          {
            en: "The 躯壳/大脑 type tag at the bottom of a card no longer covers the last line of long rules text — moved it down and tucked the text box above it.",
            zh: "卡牌底部的「躯壳 / 大脑」牌型条不再压住长文字的最后一行——把它下移、描述框收在它上方。",
          },
        ],
      },
      {
        version: "0.10.3",
        date: "2026-06-22",
        title: { en: "Long-card text fix + Chapter 1 re-tune", zh: "长牌文字修复 + 第一章回调" },
        items: [
          {
            en: "Text-heavy cards (Precog Dash, Blackwall Overload, Hard Reset, paralyze cards, etc.) no longer clip their rules text — the auto font-sizing is more conservative now and shows the full text (still zoomable on hover).",
            zh: "字多的卡牌（预判突进 / 黑墙过载 / 强制重启 / 瘫痪牌 等）不再截断规则文：自适应字号更保守，完整显示（仍可 hover 放大）。",
          },
          {
            en: "Chapter 1 difficulty nudged back up (enemy HP 0.65→0.9, damage 0.72→0.95). The earlier big ease came from an AI simulation that can't pilot the combo deck; real feedback said it was too easy.",
            zh: "第一章难度回调（敌人血量 0.65→0.9、伤害 0.72→0.95）。之前那次大幅降难是基于「不会玩连段的 AI 模拟」，真人反馈太简单。",
          },
          {
            en: "Removed the now-defunct \"Charge\" step from the tutorial.",
            zh: "去掉教程里已不存在的「蓄力」一步。",
          },
        ],
      },
      {
        version: "0.10.2",
        date: "2026-06-22",
        title: { en: "Berserk core reworks + feel details", zh: "狂暴核心重做 + 手感细节" },
        items: [
          {
            en: "Berserk core reworks — Vengeance: deal 6, and if you took damage last turn, your NEXT instance of damage gains 100% lifesteal (not Vengeance's own 6). Frenzy Vent: 3 random hits of 4; if over the heat cap, +3 more hits. Undying Rage: deal 10, and for each point over the heat cap, +1 damage AND +2 healing.",
            zh: "狂暴核心重做——复仇：造成 6 点伤害，若上回合受过伤，你的下一次伤害获得 100% 吸血（不含复仇自身那 6 点）。狂热宣泄：对随机敌人造成 3 次 4 点伤害，热力越上限再 +3 次。不死狂暴：造成 10 点伤害，每点超出上限的热力额外 +1 伤害、+2 回血。",
          },
          {
            en: "Declining an event reward no longer punishes you — event nodes now cost +1 Trace (slip past) instead of +2.",
            zh: "事件放弃奖励不再被罚：事件节点改为追踪 +1（低调通过），不再 +2。",
          },
          {
            en: "Strengthening a card at a rest stop now pops a Hearthstone-style before/after comparison with the changed number highlighted, so you can see which card was upgraded.",
            zh: "休整强化随机一张牌后，弹出炉石式「强化前 → 强化后」对比，绿字标出变化的数值，看得清升了哪张。",
          },
          {
            en: "Picking up a card to play now flashes a preview on the heat bar (shell cards) / memory bar (brain cards) showing the change to come.",
            zh: "把牌拿起来准备打时，热力条（躯壳卡）/ 内存条（大脑卡）闪烁高亮预览即将变化的量。",
          },
        ],
      },
      {
        version: "0.10.1",
        date: "2026-06-22",
        title: { en: "Card upgrades add damage; Chapter 1 eased", zh: "升级卡片加伤 + 第一章降难" },
        items: [
          {
            en: "Upgrading a card now also raises its base damage (and block): +1/+2/+3/+4 at Common/Rare/Epic/Legendary, so a common core card taken all the way to Legendary gains +10 base.",
            zh: "升级卡片现在还加基础伤害（和格挡）：普通 / 稀有 / 史诗 / 传说 各 +1/+2/+3/+4——普通核心牌升满到传说累计 +10。",
          },
          {
            en: "Chapter 1 difficulty eased: the new (leaner, combo-centric) starter cards struggle in Chapter 1 before you've built anything, so Chapter 1 enemies now have 0.65× HP and 0.72× damage. Chapters 2 and 3 are unchanged.",
            zh: "第一章降难度：新的（更精简、连段向）起手核心牌在还没成型的第一章太吃力，所以第一章敌人血量 ×0.65、伤害 ×0.72。第二、三章不变。",
          },
        ],
      },
      {
        version: "0.10.0",
        date: "2026-06-22",
        title: { en: "Edge-glow conditions, card upgrades, economy cleanup", zh: "条件边缘发光 + 卡牌升级 + 经济清理" },
        items: [
          {
            en: "Condition-triggered cards now glow on their edge (gold border) the moment you meet the trigger — e.g. Rhythm Chain after you've played a card, Precog Dash when it'd be your first attack, the 5-hit combo card once you've played 5+ cards, Vengeance after you've taken a hit, overheat cards while over the heat cap. It updates live as you play.",
            zh: "条件触发牌现在「边缘发金光」——满足条件的瞬间卡框亮起：节奏链（出过牌后）、预判突进（本回合首张攻击）、闪电五连鞭（已打 ≥5 张）、复仇（受过击）、过热牌（热力越上限）。打牌后实时更新。",
          },
          {
            en: "Rhythm Chain's damage number now ticks up live on the card face as you play more cards this turn.",
            zh: "节奏链的伤害数字现在随本回合出牌数在卡面上实时增长。",
          },
          {
            en: "New \"Upgrade Card\" button in Shell Loadout (bottom-left): pick a card from your deck and raise its rarity one tier, paying shards by target tier (Rare 500 / Epic 2000 / Legendary 5000). A new Legendary rarity was added.",
            zh: "「躯壳改装」屏左下角新增「升级卡片」：选牌组里一张牌升一档稀有度，花碎片（稀有 500 / 史诗 2000 / 传说 5000）。新增「传说」稀有度。",
          },
          {
            en: "Effects that cost current HP now spell out the actual amount, e.g. \"lose 25% of current HP (10)\".",
            zh: "需要扣当前生命的效果现在写明具体数值，例如「失去当前生命的 25%（10）」。",
          },
          {
            en: "Core cards are now all Common (the build baseline you upgrade from). Tuning: Left Jab 6→4, Precog Dash 4→2, Rhythm Chain 5→3, Overcharge memory 1→2. The 5-hit combo card was reworked to \"5 random hits of 5; if you've played 5+ cards this turn, +5 more hits\".",
            zh: "核心牌全部改为普通品质（升级的基线）。数值：左刺拳 6→4、预判突进 4→2、节奏链 5→3、超频充能内存 1→2。闪电五连鞭重做为「对随机敌人造成 5 次 5 点伤害；若本回合已打 ≥5 张牌，再造成 5 次」。",
          },
          {
            en: "In-run shards are now uncapped (accumulate freely); death still keeps up to 50, a clear keeps all. The old forge station was removed — card upgrades all live in Shell Loadout now.",
            zh: "局内躯壳碎片不再有上限（随便攒）；死亡仍最多带 50、通关全带。旧的改装台已删除——卡牌升级统一在「躯壳改装」里。",
          },
        ],
      },
    ],
  },
  {
    minor: "0.9",
    title: { en: "Shell loadout system & card redesign", zh: "躯壳改装系统与卡面重做" },
    span: "2026-06-22",
    patches: [
      {
        version: "0.9.1",
        date: "2026-06-22",
        title: { en: "Fix: run start skipped the tavern", zh: "修复：开局跳过了酒馆" },
        items: [
          {
            en: "0.9.0 dropped you straight into the Shell Loadout screen at run start, skipping the tavern — so NPC dialogue, the card codex and the brain-upgrade screen were unreachable. Run start now returns to the tavern; the loadout (gear up) runs when you hit \"Depart\", and its \"Enter Map ▶\" button takes you into the chapter.",
            zh: "0.9.0 把开局直接丢进「躯壳改装」备战屏，跳过了酒馆——对话 / 卡牌图鉴 / 升大脑 这些页面进不去了。现在开局回酒馆，点「出发」才进备战（配置躯壳）→「进入地图 ▶」才正式进本章。",
          },
        ],
      },
      {
        version: "0.9.0",
        date: "2026-06-22",
        title: { en: "Shell loadout goes live + Hearthstone card frames", zh: "躯壳改装系统上线 + 炉石式卡面" },
        items: [
          {
            en: "New shell loadout system. Every run now opens a \"Shell Loadout\" screen first — pick a core OS, slot in cyberware modules, spend fragments on permanent upgrades, then hit \"Enter Map ▶\" to play. You can also re-open it from the hub between chapters.",
            zh: "全新「躯壳改装」系统。每局开始先进改装屏——选核心操作系统、装义体模块、花碎片做永久升级，点「进入地图 ▶」才开打。章节之间在 hub 也能再进来改。",
          },
          {
            en: "Two street cores, each with its own 5-card deck: Sprint Chip (the first attack card each turn deals +25% and draws a card) and Berserk Core (all damage +30% while over the heat cap; each hit you take vents 5 heat). Switching cores swaps those 5 cards in your deck. Starter deck trimmed to 2 Strike + 2 Defend + 1 Insight + 1 Recall, plus the core's 5.",
            zh: "两个街头核心，各带 5 张专属牌组：疾走芯片（每回合首张攻击牌 +25% 伤害并抽 1 张）/ 狂暴核心（热力越上限时全伤 +30%、每次受击散 5 热）。换核心就换牌组里那 5 张。起手牌精简为 2 击 + 2 挡 + 1 洞察 + 1 数据回流 + 核心 5 张。",
          },
          {
            en: "Cyberware modules (a slimmed-down take on Cyberpunk 2077): neural / circulatory / skeleton / hands slots, each with a neutral and an exclusive option — heat venting, lifesteal, +attack damage, splash, damage reduction, end-of-turn heal, +max HP, and more — all active in battle.",
            zh: "义体模块（精简自《赛博朋克 2077》）：神经 / 循环 / 骨架 / 手部四个部位，每部位 1 中立 + 1 独有——散热、吸血、攻击 +伤、溅射、减伤、回合末回血、生命上限 + 等——战斗里全部生效。",
          },
          {
            en: "Fragment economy: fragments are a persistent stash. Spend them on permanent shell upgrades — Capacity (6→11) and Heat Cap (50→200) — which carry across runs. You keep up to 50 fragments on death, all of them on a clear.",
            zh: "碎片经济：碎片是持久库存。花在躯壳永久升级——容量（6→11）和热力上限（50→200）——跨局保留。中途死最多带 50，通关全带。",
          },
          {
            en: "Upgrade split: the Brain upgrade screen now only raises memory (paid with uploads); all shell upgrades (capacity / heat) live in the Shell Loadout screen (paid with fragments).",
            zh: "升级拆分：「升大脑」屏现在只升内存（花上传体）；躯壳的容量 / 热力升级全在「躯壳改装」屏（花碎片）。",
          },
          {
            en: "Every card in the game was re-laid-out to a Hearthstone-style frame: art fills the top half, a gold name banner overlaps its lower edge, and the rules text sits big and readable below — the old frame crammed the text too small to read.",
            zh: "全游戏卡面换成炉石式排版：立绘占上半、金色名牌压在立绘下沿、规则文在下半又大又清楚——旧卡面把字挤得太小看不清。",
          },
        ],
      },
    ],
  },
  {
    minor: "0.8",
    title: { en: "Map rebuild & dynamic difficulty", zh: "地图重构与动态难度" },
    span: "2026-06-21",
    patches: [
      {
        version: "0.8.3",
        date: "2026-06-21",
        title: { en: "Company buff → next card + shop delete animation", zh: "阵营增伤改「下一张」+ 删牌动画" },
        items: [
          {
            en: "Company damage buffs (协议同步 / 血清激发 / 火力协调 / 江湖号令) no longer expire at end of turn. You often never drew a matching card that turn, so it now grants \"+30% to the NEXT card of that company\" and persists (across turns, stackable) until you play one — there's an icon under your health bar showing the pending buff.",
            zh: "阵营增伤（协议同步 / 血清激发 / 火力协调 / 江湖号令）不再回合结束就消失。以前常常那回合抽不到对应的牌就浪费了，现在改成「下一张该公司卡伤害 +30%」，持续到你打出为止（跨回合保留、可叠）——血条下方有 icon 提示当前挂着的加成。",
          },
          {
            en: "Deleting a card in the shop now plays a shrink / fade / float-up animation before returning to the shop, instead of snapping.",
            zh: "商店删牌时，被删的卡会缩小淡出、上飘，然后再回到买卖界面，不再瞬间跳变。",
          },
        ],
      },
      {
        version: "0.8.2",
        date: "2026-06-21",
        title: { en: "Web performance + trace tuning + rest rework", zh: "Web 性能 + 追踪调参 + 休整重做" },
        items: [
          {
            en: "Web performance fix: the game now uses the Compatibility (WebGL2) renderer. It was defaulting to Forward+, which on the web runs the experimental WebGPU path and was laggy on every machine regardless of GPU. This 2D game uses no Forward+ features, so the switch is visually identical but much lighter in the browser.",
            zh: "Web 性能修复：游戏现在用 Compatibility（WebGL2）渲染器。之前默认 Forward+，在网页上走的是实验性 WebGPU 路径，不管显卡多强都卡。本游戏没用任何 Forward+ 专属特性，所以切过去画面完全一样、但网页端轻很多。",
          },
          {
            en: "Trace thresholds now grow per chapter (boss-available / forced): I.1 18/24, I.2 24/32, I.3 32/40 — later chapters run longer and tenser. Danger level is now measured by how far you are through the chapter, so the pressure curve feels consistent regardless of the thresholds.",
            zh: "追踪阈值逐章变长（可进 Boss / 强制 Boss）：I.1 18/24、I.2 24/32、I.3 32/40——后面的章更长更紧。危险等级改成按「本章进度」来算，所以不管阈值多少，压力曲线手感一致。",
          },
          {
            en: "Rest reworked: resting now lowers Trace by 1 (lie low and heal), and rest can't appear in back-to-back choices (at least one round apart) so you can't farm heal-plus-trace-suppression.",
            zh: "休整重做：休整现在让追踪 -1（蛰伏疗伤），而且不会连续出现（至少隔一回合），堵掉「回血 + 压追踪」的刷子。",
          },
          {
            en: "Choice weighting: the two non-normal options are now weighted — elite 40, shop / event / rest 20 each — so elites show up a bit more often.",
            zh: "三选一加权：两个非小怪选项按权重出现——精英 40，商店 / 事件 / 休整 各 20——精英会更常见一点。",
          },
        ],
      },
      {
        version: "0.8.1",
        date: "2026-06-21",
        title: { en: "No duplicate trace bar on the choose screen", zh: "选择屏去重追踪条" },
        items: [
          {
            en: "The choose-your-next-stop screen no longer shows two trace bars. The slim always-on bar at the very top is now hidden there (the screen already has its own detailed bar with the sweet-zone band and \"can fight boss\" marker); the slim top bar still appears on screens without a detailed one (battle, reward, event).",
            zh: "「选择下一步」界面不再叠两条追踪条。屏幕最顶那条常驻细条在这个界面收起了（这屏自带详细条，有甜区金框和「可进 Boss」标线）；细条仍会在没有详细条的界面出现（战斗、奖励、事件）。",
          },
        ],
      },
      {
        version: "0.8.0",
        date: "2026-06-21",
        title: { en: "Trace-gated map + revived dynamic difficulty", zh: "追踪定位地图 + 动态难度重做" },
        items: [
          {
            en: "The full Slay-the-Spire branch map is gone (we heard you — \"too much like StS\"). Instead, after each node you pick 1 of 3 next stops: a normal fight (almost always offered) plus 2 of {elite, event, shop, rest}. Where you go is your call, every node.",
            zh: "整张杀戮尖塔式分支地图没了（听到了——「太像 StS」）。改成每打完一个节点就三选一决定下一步：小怪（基本必出）+ 精英 / 事件 / 商店 / 休整「四选二」。每一步去哪都你说了算。",
          },
          {
            en: "When you fight the boss is now driven by a Trace bar (just like the heat sweet-zone): scavenging raises it faster, lying low slower. Once Trace hits the sweet zone you can choose to dive the boss; keep scavenging for loot and danger keeps climbing, until Trace maxes out and the boss tracks you down and forces the fight. Greed for power vs. play it safe.",
            zh: "什么时候打 Boss 现在由「追踪值」进度条决定（和热力甜区一个套路）：搜刮涨得快、低调通过涨得慢。追踪到甜区就能主动「定位 Boss」决战；继续搜刮变强、危险也持续上升，直到追踪爆表，Boss 顺着信号找上门、强制开打。贪强 vs 求稳。",
          },
          {
            en: "A slim Trace bar now sits pinned to the very top of every screen (blue -> amber -> red, with a gold mark at the sweet-zone start) so you always know how close the boss is.",
            zh: "屏幕最顶现在常驻一条细追踪条（蓝→橙→红，金标=甜区起点），任何界面都能一眼看到「离 Boss 还有多远」。",
          },
          {
            en: "Enemy scaling reworked. The old \"enemies scale to your deck power\" system was effectively dead (its baseline grew far faster than real decks ever do, so it never kicked in, and damage never scaled at all). Now both enemy HP and damage scale to your per-turn output, so a runaway build no longer steamrolls the later chapters. And weak/early decks get genuine relief based on how built-up you are (not on raw damage, so poison/sustain builds aren't punished) — easing the brutal first-chapter wall.",
            zh: "敌人缩放重做。旧的「敌人随你牌组强度变强」其实形同虚设（基准涨得远比真实牌组快，永远触发不了，伤害更是从不缩放）。现在敌人血量和伤害都跟你的每回合输出走，后期失控强 build 不再一路碾压；同时弱 / 早期牌组按你的「构筑成熟度」获得真正减压（看构筑而非纯伤害，所以中毒 / 续航流不被误伤）——缓解第一章那道硬墙。",
          },
        ],
      },
    ],
  },
  {
    minor: "0.7",
    title: { en: "New cards & variety", zh: "新卡与流派多样化" },
    span: "2026-06-20",
    patches: [
      {
        version: "0.7.4",
        date: "2026-06-20",
        title: { en: "Unified shield naming", zh: "护盾术语统一" },
        items: [
          {
            en: "Renamed every leftover \"white shield\" to \"temporary shield\" and \"yellow shield\" to \"persistent shield\" — the consume-shield cards, the rules screen (which still listed three shields including the retired regen-blue one), and the glossary. The whole game now uses just the two shield names.",
            zh: "把所有残留的「白盾」改成「临时护盾」、「黄盾」改成「持久护盾」——消耗护盾的卡、规则速览（之前还写着三种盾、含已废弃的再生蓝盾）、术语表都统一了。现在全游戏只有「临时护盾 / 持久护盾」两种叫法。",
          },
        ],
      },
      {
        version: "0.7.3",
        date: "2026-06-20",
        title: { en: "Global resource/relic top bar", zh: "全局资源/圣物顶栏" },
        items: [
          {
            en: "Your resources and relics are now shown in one global top bar (gold / HP / heat cap / memory / fragments / uploads + relic icons + a \"view deck\" button) that appears on the screens covering the battle HUD (reward, event, modify). Before, each of those screens had its own patched-in resource line; now it's one unified bar, so you never have to wonder whether a given screen shows your stuff.",
            zh: "你的资源和圣物现在统一显示在一条全局顶栏里（金币 / 生命 / 热力上限 / 内存 / 碎片 / 上传 + 圣物图标 + 「查看牌组」按钮），在盖住战斗 HUD 的界面（奖励、事件、改造）都会出现。之前是每个界面各自打补丁加资源行；现在一条统一顶栏，不用再一个个界面去确认能不能看到自己的东西。",
          },
        ],
      },
      {
        version: "0.7.2",
        date: "2026-06-20",
        title: { en: "Deck/relics on the modify screen", zh: "改造界面信息 + 措辞" },
        items: [
          {
            en: "The card-modify screens now show your deck, relics and resources like the relic and event screens do (a relic icon row, a resource line, and a \"view deck\" button) — you couldn't see them before while modifying. Also, the Reinforce upgrade on a block card now reads \"护盾 +3\" to match the card-face term.",
            zh: "卡牌改造界面现在和选圣物 / 事件界面一样能看到你的牌组、圣物和资源（圣物图标行、资源行、「查看牌组」按钮）——之前改造时看不到。另外格挡牌的「强化」改造说明改成「护盾 +3」，和卡面用词统一。",
          },
        ],
      },
      {
        version: "0.7.1",
        date: "2026-06-20",
        title: { en: "New-card art + visible company buff", zh: "新卡美术 + 阵营增伤可见" },
        items: [
          {
            en: "The 10 new cards now have their illustrations, and all card-art keys were unified to English. Company damage-buff cards now show a visible buff badge (in your buff row, colored by company, with a hover explaining \"this turn X cards +N% damage\") — it worked before but had no indicator. The 双重加载 card description was shortened so it no longer clips.",
            zh: "10 张新卡都接上了插画，所有卡面美术命名统一成英文。阵营增伤卡现在有可见的 buff 图标（在增益栏，按公司上色，hover 写明「本回合 X 卡伤害 +N%」）——之前是生效的、只是没提示。双重加载的描述也精简了，不再被裁。",
          },
        ],
      },
      {
        version: "0.7.0",
        date: "2026-06-20",
        title: { en: "10 new cards + balance + animation", zh: "10 张新卡 + 平衡 + 动画" },
        items: [
          {
            en: "10 new mechanic cards so the deck isn't just damage numbers. Company damage buffs (brain, +30% to that company's cards this turn — one per company), random multi-hit attacks (shell, X hits of Y on random enemies — one per company with different numbers), plus 记忆复写 (copy your whole hand) and 双重加载 (your next shell card resolves twice). Art is placeholder color blocks until the illustrations land.",
            zh: "加了 10 张有机制的新卡，让牌组不再只是堆伤害数字。阵营增伤（大脑，本回合该公司卡 +30%，四阵营各一张）、随机多段攻击（躯壳，对随机敌人 X 次 Y 伤害，四阵营数值不同），外加记忆复写（复制整手牌）和双重加载（你的下一张躯壳卡释放两次）。美术暂用色块占位，等插画补上。",
          },
          {
            en: "Balance: the 连段引擎 (Momentum) trait that enabled an invincible build now triggers every TWO cards (was every card) and rewards an actual Pioneer deck; the paralyze cards now cost 25% of current HP; in-run shell upgrades were roughly halved; two Pioneer traits with duplicate tiers were trimmed to 3 tiers.",
            zh: "平衡：之前能叠出无敌 build 的「连段引擎」改为每打出两张牌才触发（原来每张），并奖励真正的先锋牌组；瘫痪牌现在打出要付 25% 当前生命的代价；局内躯壳升级数值大致砍半；两个有重复阶的先锋词条精简到 3 阶。",
          },
          {
            en: "Naming/UI: \"blue shield\" renamed to \"temporary shield\" everywhere (same mechanic). Relic and event screens now show a \"view deck\" button, your relic icons, and a resource line (HP/heat/memory/gold). Characters and enemies now have a subtle breathing idle, and screens fade in on transitions.",
            zh: "命名/界面：「蓝色护盾」全部改名「临时护盾」（机制不变）。选圣物和事件界面现在有「查看牌组」按钮、当前圣物图标和资源行（生命/热力/内存/金币）。角色和敌人加了轻微的呼吸 idle 动画，界面切换也有淡入。",
          },
        ],
      },
    ],
  },
  {
    minor: "0.6",
    title: { en: "Charge, Echo & battle polish", zh: "蓄力、回响与战斗打磨" },
    span: "2026-06-19 – 2026-06-20",
    patches: [
      {
        version: "0.6.9",
        date: "2026-06-20",
        title: { en: "Rarity label + auto dice + faster codex", zh: "稀有度标牌 + 幸运骰自动掷 + 图鉴再提速" },
        items: [
          {
            en: "Each card now shows its rarity name (basic/common/rare/epic, colored) at the top-right next to the cost — the small center diamond alone was too subtle. The street \"lucky dice\" now auto-rolls at the start of your turn (the roll animation plays and resolves before you can act). And the card codex builds in chunks so it opens instantly instead of freezing for a couple seconds.",
            zh: "每张卡现在在右上角费用旁直接写出稀有度（基础/普通/稀有/史诗，按品质上色）——之前只有中间小菱形太不明显。街头「幸运骰」改成回合开局自动掷（动画放完、结果落定才能行动）。卡牌图鉴改成分帧加载，打开瞬间出来，不再卡两三秒。",
          },
        ],
      },
      {
        version: "0.6.8",
        date: "2026-06-20",
        title: { en: "Faster card codex", zh: "卡牌图鉴加载提速" },
        items: [
          {
            en: "Opening the card codex and switching its filters no longer stalls for a couple seconds. It used to rebuild every owned card from scratch each time; now the description-fit regex is compiled once, pure-display cards skip the hover-grow and glossary scan, and the codex caches both the card data and the built card cells — so reopening and filtering are basically instant after the first open.",
            zh: "打开卡牌图鉴、切换筛选不再卡顿两三秒。之前每次都从头重建所有已拥有的卡；现在描述排版的正则只编译一次、纯展示的卡跳过悬停放大与术语扫描、图鉴还缓存了卡数据和建好的卡格——首次打开后，重开和切筛选基本秒开。",
          },
        ],
      },
      {
        version: "0.6.7",
        date: "2026-06-20",
        title: { en: "One modify per card + long-text fit", zh: "每张牌限改造一次 + 长描述放得下" },
        items: [
          {
            en: "A card can now be modified at most once. You used to be able to keep modifying the same card (Echo + endless attack-ups + endless heat-cost cuts), stacking an unkillable card — every-turn AoE lifesteal that ignores overheat and loops forever. Already-modified cards now show \"已改造\" in the modify picker and can't be picked again.",
            zh: "每张牌最多改造一次。之前可以对同一张牌反复改造（回响 + 不断加攻击 + 不断减热力消耗），叠出「每回合 AoE 吸血、无视过热、无限循环」的无敌牌。现在改造选牌界面里已改造的牌会标「已改造」、不能再选。",
          },
          {
            en: "Long card descriptions (like Sweep-Fire with Echo and a build-bonus damage annotation) no longer get clipped when you hover to enlarge them — the auto-fit shrinks one step further and the Echo text was shortened, so even the longest cards show in full.",
            zh: "长描述卡牌（如清场扫射 + 回响、带 build 加成的伤害注解）放大悬停时不再被裁——描述自适应字号再降一档、回响说明也精简了，最长的卡也能完整显示。",
          },
        ],
      },
      {
        version: "0.6.6",
        date: "2026-06-20",
        title: { en: "Relic hover no longer overflows", zh: "地图圣物悬停不再溢出" },
        items: [
          {
            en: "On the map, a relic's hover tooltip used to inline a block of glossary term definitions, making it very tall — near the bottom of the screen the bottom got cut off. The tooltip now shows just name + rarity + effect (consistent with the trait-bar hover), so it stays short and fully visible.",
            zh: "地图上圣物的悬停说明之前会把术语释义内联进去、变得很长，屏幕底部的圣物说明底部会被裁掉。现在只显示名称 + 稀有度 + 效果（和词条栏悬停一致），短了、也看得全了。",
          },
        ],
      },
      {
        version: "0.6.5",
        date: "2026-06-20",
        title: { en: "Charge readability + modify fixes", zh: "蓄力可读性 + 改造修复" },
        items: [
          {
            en: "The Charge card's description no longer gets cut off — the text box is taller and the wording was trimmed, so all of its effects (vent %, next-turn attack %, end turn, first-card-only) fit on the card.",
            zh: "蓄力卡面的描述不再被裁切——描述窗加高、文字精简，它的全部效果（散热% / 下回合攻击% / 结束回合 / 只能首张打出）都放得进卡面了。",
          },
          {
            en: "Charge no longer offers the Echo modify (returning a card to hand is pointless on a card that ends your turn). Reinforce now works on percent-stat cards too, so Charge can be reinforced to \"next-turn attack +15%\". Its modify options are now Reinforce(%) + Coolant.",
            zh: "蓄力不再出现「回响」改造（会结束回合的牌挂回响没意义）。「强化」改造现在也对百分比牌生效，蓄力可以强化成「下回合攻击力 +15%」。所以它的改造选项现在是「强化（加百分比）+ 冷却回路」。",
          },
          {
            en: "Fixed modify-screen residue: the picked card and the three option cards used to linger on top of the next reward / event screen. They're now cleared when a modify finishes. Also removed the loud sound effect that played when applying a modify.",
            zh: "修复改造界面残留：之前选中的牌和三张改造选项卡会残留盖在下一个奖励 / 事件界面上，现在改造结束即清理。另外去掉了应用改造时那个很响的音效。",
          },
        ],
      },
      {
        version: "0.6.4",
        date: "2026-06-20",
        title: { en: "Card rarity at a glance", zh: "卡面稀有度一眼可见" },
        items: [
          {
            en: "The diamond separator in the middle of a card (above the \"type · company\" line) now changes color by rarity: grey (basic), white (common), blue (rare), purple (epic). Rarity used to be only hinted by the frame tint and hard to read mid-fight; the flanking divider lines stay gold.",
            zh: "卡面中央那个菱形分隔符（「类型 · 公司」上方的 ◆）现在会按稀有度变色：灰（基础）、白（普通）、蓝（稀有）、紫（史诗）。以前稀有度只靠边框配色暗示、打牌时很难看清，现在一眼能认；两侧的分隔线保持金色不变。",
          },
        ],
      },
      {
        version: "0.6.3",
        date: "2026-06-20",
        title: { en: "Readable lifesteal / cost / burn numbers", zh: "吸血 / 代价 / 过热跳字" },
        items: [
          {
            en: "Lifesteal now pops an exact green \"吸 N\" on your character. It used to be inferred from a before/after HP diff, so on a card that both lifesteals and self-damages (like 神经反噬) the two cancelled out and you saw nothing or a wrong number. It now reports the real amount healed.",
            zh: "吸血现在会在角色身上精确跳出绿色「吸 N」。之前是用出牌前后的生命差推算的，所以一张牌既吸血又自伤（比如神经反噬）时两者会抵消，你要么看不到、要么看到错的数字。现在直接显示真实回血量。",
          },
          {
            en: "Hacker self-damage now pops a red \"代价 -N\". Previously your HP just dropped with no number, so the cost was invisible. Overheat burn keeps its \"过热 -N\" pop — all three land on your character at offset spots so they don't overlap.",
            zh: "黑客牌的自伤代价现在会跳红色「代价 -N」。以前只是默默掉血、没有数字，玩家不知道为什么掉血。过热灼伤的「过热 -N」也保留——三种反馈都落在角色身上、位置错开、互不遮挡。",
          },
        ],
      },
      {
        version: "0.6.2",
        date: "2026-06-20",
        title: { en: "Enemy status readability + economy tweak", zh: "敌人状态可读性 + 经济微调" },
        items: [
          {
            en: "The enemy \"about to overheat\" warning moved into the same row as its status icons, right-aligned, so it no longer takes its own line or risks overlapping the intent.",
            zh: "敌人「即将过热」预警移到了异常状态图标的同一排、靠右对齐，不再单独占一行，也不会和意图重叠。",
          },
          {
            en: "Enemy debuff icons now have hover explanations: poison (loses HP each turn by stacks, ignoring shields), vulnerable (+40% damage taken), weak (-30% damage dealt). The trait bar's long trailing glossary block was removed — it kept only chosen traits and active resonances.",
            zh: "敌人减益图标加了悬停说明：中毒（每回合按层数减少生命、无视护盾）、易伤（受到伤害 +40%）、虚弱（造成的伤害 -30%）。词条栏悬停去掉了末尾那段很长的「名词」释义，只保留已选词条和已激活共鸣。",
          },
          {
            en: "Forge \"emergency heal\" (restore 50% HP) now costs 30 fragments instead of 6 — the old price was badly underpriced next to full-heal (50 fragments).",
            zh: "改装台「应急维生」（回 50% 生命）的消耗从 6 碎片提到 30——原价相对「修复纳米」回满血（50 碎片）太便宜了。",
          },
        ],
      },
      {
        version: "0.6.1",
        date: "2026-06-20",
        title: { en: "Card cost badges + modify-screen fix", zh: "卡面费用角标 + 改造界面修复" },
        items: [
          {
            en: "Card cost badges redone: the heat cost always sits in the top-left brass coin (shell and brain alike), and a brain card's memory cost is a blue badge stacked right below it. Heat-bearing hacker cards (黑墙过载 / 神经反噬) used to hide their heat — now both costs show at a glance.",
            zh: "卡面费用角标重做：热力消耗统一放在左上角的黄铜币（躯壳、大脑一样），大脑卡的内存消耗改成蓝色底牌、叠在热力币正下方。会积热的黑客牌（黑墙过载 / 神经反噬）以前会把热力藏起来——现在两笔代价一眼看全。",
          },
          {
            en: "Fixed the modify screen: after picking a card reward, the three modify options used to stretch into tall blank cards and the skip button overlapped them. They now use a dedicated fixed-size layout, and the skip button correctly reads \"skip (+15 gold)\" below the options.",
            zh: "修复改造界面：之前选过卡牌奖励后，三选一改造的选项卡会被撑成大长条、跳过按钮压住卡面。现在用独立的固定布局，跳过按钮也正确显示「跳过（获得 15 金币）」并放在选项下方。",
          },
        ],
      },
      {
        version: "0.6.0",
        date: "2026-06-19",
        title: { en: "Charge becomes a card; Echo arrives", zh: "蓄力改成牌，回响登场" },
        items: [
          {
            en: "Charge is now a card instead of a button. You can only play it as the first card of your turn — it ends the turn, vents 30% of your current heat, and gives +30% attack next turn. Building up momentum now costs a card slot and a real decision.",
            zh: "蓄力从按钮改成了一张牌。它只能作为本回合的第一张打出——立即结束回合、散掉当前 30% 的热力、并让下回合攻击 +30%。攒势头现在要占一张手牌、要做取舍。",
          },
          {
            en: "New card-modify keyword: Echo. An Echoed card returns to your hand after you play it, so you can play it again this turn (you still pay its cost). It replaces the old Multistrike modify, which felt invisible next to Reinforce and doubling effects.",
            zh: "卡牌改造新增「回响」关键词：被改造的牌打出后会返回手牌，本回合内可以再打一次（仍要付出消耗）。它替换了原来的「多段改装」改造——后者在「强化 / 翻倍」面前几乎没存在感。",
          },
          {
            en: "The Reinforce modify now reads to the card: an attack shows only “Damage +3”, a block card “Block +3”, a draw card “Draw +1”. No more dumping all three possibilities on you.",
            zh: "「强化」改造的说明会随卡自适应：攻击牌只显示「伤害 +3」、格挡牌「格挡 +3」、抽牌牌「抽牌 +1」，不再把三种可能性一起堆给你。",
          },
          {
            en: "Battle screen polish: cards are 20% larger, and the characters / enemies / background divider were raised so the lower scene shows more. Shield icons now have hover tooltips (blue shield clears at end of turn, gold shield persists) and the shield on your HP bar is drawn blue to match.",
            zh: "战斗界面打磨：卡牌整体放大 20%，角色 / 敌人 / 背景分界线上移，下方场景露出更多。护盾图标现在可以悬停看说明（蓝色护盾回合结束消失，金色持久护盾保留），血条上的护盾也改成蓝色以保持一致。",
          },
          {
            en: "The modify screen was redesigned: the card you picked now sits at the top (so you remember what you're modifying), the option cards are smaller, and the skip button no longer overlaps them — skipping a modify also gives you some consolation gold now. The enemy “about to overheat” warning was moved so it stops overlapping the intent icon.",
            zh: "改造界面重做：选中的牌现在显示在最上方（终于知道自己在改哪张），选项卡缩小、跳过按钮不再压牌——跳过改造现在也给一点安慰金币。敌人「即将过热」的提示也挪开了，不再和意图图标叠在一起。",
          },
        ],
      },
    ],
  },
  {
    minor: "0.5",
    title: { en: "Shields & systems", zh: "护盾与系统" },
    span: "2026-06-19",
    patches: [
      {
        version: "0.5.0",
        date: "2026-06-19",
        title: { en: "Shields simplified", zh: "护盾系统简化" },
        items: [
          {
            en: "Dropped the awkward regenerating (blue) shield — it refreshed every turn so stacking it did nothing. All regen-shield cards are removed. The basic turn-clearing shield is now shown as a blue shield everywhere (blocks for one round, gone next turn); the persistent gold shield stays. Two shields total, much clearer.",
            zh: "删掉了尴尬的「再生（蓝）护盾」——它每回合刷新，多打几张也不叠加。相关卡牌全部移除。基础的「挡一轮就消失」护盾现在统一以蓝色护盾显示（挡住这一轮、下回合清空）；金黄的持久护盾保留。现在只剩两种盾，清楚多了。",
          },
        ],
      },
    ],
  },
  {
    minor: "0.4",
    title: { en: "Data, feel & balance", zh: "数据收集 · 手感 · 平衡" },
    span: "2026-06-17 → 06-19",
    patches: [
      {
        version: "0.4.28",
        date: "2026-06-19",
        title: { en: "Native-Chinese text + lots of readability", zh: "文案母语化 + 大量可读性" },
        items: [
          {
            en: "All card / relic / trait / item / glossary text rewritten in natural native Chinese (de-machine-translated), with a consistent 'verb + amount + resource' phrasing. Shields renamed to Temporary / Regenerating / Persistent shield, each with a one-line explanation on hover.",
            zh: "卡牌/圣物/词条/道具/术语全文用地道中文重写（去机翻味），统一「动词+数值+资源」句式。护盾改名为临时/再生/持久护盾，各带一句悬停解释。",
          },
          {
            en: "Poison damage now pops a number and the kill animates (no more enemies silently dying). Enemy heat bar removed; instead a fire 'about to overheat' warning shows under the name with a tooltip. Relic tooltips pop instantly.",
            zh: "中毒掉血会跳数字、毒死有动画（敌人不再凭空消失）。删掉敌人热力条，改成姓名下方的「即将过热」火焰预警 + 悬停说明。圣物悬停即时弹出。",
          },
          {
            en: "Deck / card-modify / card-removal screens now show full card art like the codex. Sweet (bonus) zone now gives +20% damage and block instead of flat values. Three new low-cost 'execute' cards reward kills (heal / draw / restore memory).",
            zh: "查看牌组/卡牌改造/删牌界面都改成图鉴式油画卡面。增益区改为伤害 +20%、护盾 +20%（不再固定数值）。新增 3 张低费斩杀牌，击杀目标给回报（回血/抽牌/回内存）。",
          },
          {
            en: "Many smaller tweaks: rules screen scrolls, first-time upgrade-room guide, skipping a card draft now gives gold, heal-to-full costs more, and assorted wording fixes.",
            zh: "若干小改：规则速览可滚动、升级区首次引导、跳过选卡给金币、回满血涨价、以及一堆文案修正。",
          },
        ],
      },
      {
        version: "0.4.27",
        date: "2026-06-19",
        title: { en: "Crisp text + unified card faces", zh: "清晰文字 + 卡面统一" },
        items: [
          {
            en: "Text is now crisp at any window size / fullscreen — fonts switched to a resolution-independent (MSDF) renderer, so they no longer blur when the game is scaled up.",
            zh: "文字在任意窗口大小 / 全屏下都清晰了——字体改用与分辨率无关的 MSDF 渲染，放大不再发虚。",
          },
          {
            en: "The card-modification screen now shows the same full card art as the codex and deck viewer (no more bare text tiles), in a scrollable grid.",
            zh: "卡牌改造页改用和图鉴/查看牌组一样的完整卡面（不再是简陋文字格），滚动网格。",
          },
          {
            en: "Relic, trait and modification text cleaned up to a consistent, objective phrasing; removed redundant overlap between two near-identical Pflege regen traits.",
            zh: "圣物 / 词条 / 改造文案统一成客观中立的写法；两个几乎重复的辉格回血词条做了区分。",
          },
        ],
      },
      {
        version: "0.4.26",
        date: "2026-06-19",
        title: { en: "UX polish + help text aligned", zh: "UX 打磨 + 帮助文案校正" },
        items: [
          {
            en: "Hover the heat bar to see a full explanation of the safe / bonus (sweet) / overheat zones. Removed the harsh card-purchase sound. Relic codex entries now show details on hover.",
            zh: "悬停热力条会弹出安全区 / 增益区(甜区) / 过热区的完整说明。移除了刺耳的购买卡牌音效。圣物图鉴现在悬停可看详情。",
          },
          {
            en: "Tutorial, rules and the Ch.1 intro updated to match the current design (overdrive is now a future equippable module, not always-on); tutorial adds a Charge step and points to the memory bar's real spot.",
            zh: "新手指引、规则速览、第一章开场对话都对齐了当前设计（「无双」改为未来可装的模块、不再常驻）；新手指引补了「蓄力」一步、并指向内存条的真实位置。",
          },
        ],
      },
      {
        version: "0.4.25",
        date: "2026-06-19",
        title: { en: "Card art + richer playtest data", zh: "卡牌美术 + 更多试玩数据" },
        items: [
          {
            en: "The expanded card pool finally has real illustrations — 18 new card arts are in (the new defense/sustain cards, Morishita's depth cards, the memory cards, and each company's draft targets).",
            zh: "扩充后的卡池终于补上了真美术——18 张新卡面（各公司防御/续航卡、森下深度牌、内存卡、各公司 draft 目标）。",
          },
          {
            en: "Feedback moved to Discord: the in-page survey is gone — there's a Discord link on the game page instead. Come tell me what's great or terrible.",
            zh: "反馈改到 Discord：页内问卷下线了，游戏页改成一个 Discord 链接。来和我聊聊哪里爽、哪里烦。",
          },
          {
            en: "More anonymous playtest signals (no personal data) to tune balance — what builds people actually assemble, how fights pace out, and where heat / overheat gets used.",
            zh: "扩了匿名试玩数据维度（不收隐私）来调平衡——大家真实凑出的流派、战斗节奏、热力/过热用在哪。",
          },
        ],
      },
      {
        version: "0.4.24",
        date: "2026-06-19",
        title: { en: "Per-company defense & sustain cards", zh: "各公司防御/续航卡" },
        items: [
          {
            en: "Each company got a survival outlet, so you're not funneled into one sustain build: Pioneer attacks that also grant an equal temporary shield; Morishita consumes its shields to heal 50% of their value; Street steals a percentage of the enemy's shield.",
            zh: "每家都补了生存出口，不再被逼着走同一套续航：先锋攻击同时生成等量临时护盾；森下消耗护盾、回复其值 50% 生命；街头窃取敌人一定比例的护盾。",
          },
          {
            en: "Mixed-build simulation had flagged Pioneer as a glass cannon and Huige sustain as near-mandatory; after these, Pioneer builds climb and Huige is no longer a must-pick.",
            zh: "混合构筑模拟此前显示先锋是玻璃大炮、辉格续航近乎必带；补完后先锋系通关率上升，辉格不再必带。",
          },
        ],
      },
      {
        version: "0.4.23",
        date: "2026-06-19",
        title: { en: "Charge action + 10 new cards", zh: "蓄力动作 + 扩充卡池" },
        items: [
          {
            en: "New Charge action (next to End Turn): if you played fewer than 2 cards this turn, charge instead — vent a lot of heat and gain +8 attack next turn. A patient counterplay to the heat push-your-luck.",
            zh: "新增「蓄力」动作（结束回合旁边）：本回合出牌 <2 张时可改蓄力——大量散热 + 下回合攻击 +8。按兵不动、攒一波，是热力 push-your-luck 的对策。",
          },
          {
            en: "+10 cards: filled out Morishita (it was thinnest) with two-hit/armor cards, added neutral utility (block, memory cantrip, a heavy hit that pairs with Charge), and a high-rarity draft target per company.",
            zh: "新增 10 张卡：补森下深度（多段/攻防一体）、加中立通用牌（格挡、回内存 cantrip、配合蓄力的重拳），各公司补一张高稀有 draft 目标。",
          },
        ],
      },
      {
        version: "0.4.22",
        date: "2026-06-19",
        title: { en: "Card rarity x build scaling (fixes basics scaling forever)", zh: "卡牌改造 × 稀有度合流" },
        items: [
          {
            en: "Cards now have a rarity (Basic / Common / Rare / Epic), and your build's attack bonus scales by it: basic cards (Strike/Defend) only take 50% of it, so a basic card no longer hits for dozens late game; rare/epic take full or more. New mod \"Upgrade\" raises a card's rarity — so card modification is how you pick which cards scale with your build. Cards are color-coded by rarity in the deck/modify views.",
            zh: "卡牌现在有稀有度（基础/普通/稀有/史诗），你 build 的攻击加成按它打折：基础牌（打击/格挡）只吃 50%，后期不会再一张打几十；稀有/史诗吃满或超额。新改造「升格」抬升稀有度——所以卡牌改造就是你来选哪些牌跟着 build 变强。牌库/改造界面按稀有度配色。",
          },
        ],
      },
      {
        version: "0.4.21",
        date: "2026-06-19",
        title: { en: "Memory now recovered via cards", zh: "内存改“靠卡回复”" },
        items: [
          {
            en: "Memory no longer auto-refills each turn — you recover it by playing memory cards (e.g. Data Recall: spend heat, regain memory + draw). Makes the brain axis a managed resource like heat. You start with 2 Data Recall cards so hacker decks never lock up; trait/relic memory passives still apply.",
            zh: "内存不再每回合自动回，改成靠「回内存卡」回复（如数据回流：花热力→回内存+抽牌）。让大脑轴像热力一样是要管理的资源。起手送 2 张数据回流，黑客流不会卡死；词条/圣物的内存被动仍生效。",
          },
        ],
      },
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
