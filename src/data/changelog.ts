// 《缸中之脑：重启》网页 Demo 的玩家向更新日志（双语）。
// 取自游戏仓库的 CHANGELOG.md，精简成"玩家看得懂的要点"，不是完整开发日志。
// 新版本加在数组最前面即可。

export interface BiText {
  en: string;
  zh: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  title: BiText;
  items: BiText[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "0.4.15",
    date: "2026-06-18",
    title: { en: "Overheat can kill — push your luck", zh: "过热会致死 · 搏命散热" },
    items: [
      {
        en: "Heat is finally dangerous: the cap is now a redline, not a lock. You may keep playing shell cards past it, but each one sears you — the deeper in the red, the more it hurts, and overheating a few times will kill you.",
        zh: "热力终于有牙：上限不再锁牌，而是一条红线。越线仍可硬出躯壳卡，但每张都会灼伤你——越深越疼，过热几次就会烧死。",
      },
      {
        en: "The bonus zone is reachable earlier now, so even the starter shell has a sweet spot to ride.",
        zh: "增益区现在更早就能进，连初始躯壳也有甜区可吃。",
      },
      {
        en: "Fewer trait picks per run (less decision fatigue) — traits now come from elites/bosses and every other normal fight.",
        zh: "每局词条三选一减半（缓解选择疲劳）——改成精英/Boss 必给 + 普通场隔场给。",
      },
      {
        en: "UI: memory bar moved next to the heat bar; the top bar now groups relics / traits / items.",
        zh: "界面：内存条挪到热力条旁边；顶栏把圣物 / 词条 / 道具分组了。",
      },
      {
        en: "Balance: paralyze (Signal Jam) and the Combo Engine trait toned down; brain cards now build a little heat too; gentle dynamic enemy HP keeps strong builds from one-shotting fights without rubber-banding.",
        zh: "平衡：信号干扰与「连段引擎」削弱；大脑卡现在也积少量热；温和的动态敌人血量让强 build 不再一回合碾过，但绝不橡皮筋。",
      },
    ],
  },
  {
    version: "0.4.14",
    date: "2026-06-18",
    title: { en: "Specialization payoff curve", zh: "专精投资曲线" },
    items: [
      {
        en: "Stacking traits of one company now grants an escalating damage bonus to that company's cards — specializing pays off, while rainbow spreads don't benefit.",
        zh: "叠同一公司的词条会给该公司卡牌递增的伤害加成——走深一条流派有回报，铺开/彩虹不吃这条曲线。",
      },
    ],
  },
  {
    version: "0.4.13",
    date: "2026-06-18",
    title: { en: "Faction balance pass", zh: "流派平衡" },
    items: [
      {
        en: "Street buffed (it used to be a defenseless glass cannon) and Pflege dialed back, so every faction clears at a comparable rate.",
        zh: "街头加强（原本是没防御的玻璃大炮）、辉格回调，各流派通关率拉到同一档。",
      },
    ],
  },
  {
    version: "0.4.11",
    date: "2026-06-18",
    title: { en: "Drag-to-use items + fixes", zh: "道具拖拽 + 修复" },
    items: [
      {
        en: "Consumables reworked: damage items scale with enemy max HP and are used by dragging — throw damage at enemies, drag buffs onto yourself.",
        zh: "一次性道具大改：伤害按敌人最大生命缩放，改成拖拽使用——伤害丢敌人、增益拖到自己身上。",
      },
      {
        en: "After every win you heal 30% of the damage you took; self-damage now ignores block; shop purchases count toward the codex.",
        zh: "每场胜利回复受伤部分的 30%；自伤无视护盾；商店买的卡也算图鉴解锁。",
      },
    ],
  },
  {
    version: "0.4.10",
    date: "2026-06-18",
    title: { en: "Combo / rainbow balance", zh: "连击 / 彩虹平衡" },
    items: [
      {
        en: "Multistrike extra hits do 60% damage; the rainbow trait got a big nerf so 4-color spread builds are no longer the auto-best.",
        zh: "连击附加段只打 60%；彩虹词条大砍，四色铺开不再是无脑最优解。",
      },
    ],
  },
  {
    version: "0.4.9",
    date: "2026-06-17",
    title: { en: "Pile previews + segmented bars", zh: "牌堆预览 + 分段血条" },
    items: [
      {
        en: "Hover the draw/discard pile to preview the cards inside; enemy health bars now show HP + shields in segments, matching the player.",
        zh: "悬停抽牌/弃牌堆预览里面的牌；敌人血条也改成「生命 + 护盾」分段条，和玩家一致。",
      },
    ],
  },
];
