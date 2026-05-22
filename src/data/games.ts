export interface BiText {
  en: string;
  zh: string;
}

export interface LolChampion {
  name: BiText;
  /** Featured skin shown on the card. */
  skin: BiText;
  /** Skin splash-art image URL. */
  image: string;
}

/** World of Warcraft — static profile built around a best WarcraftLogs parse. */
export const wowProfile = {
  game: { en: "World of Warcraft", zh: "魔兽世界" } as BiText,
  character: "Huasuiyue",
  race: { en: "Mag'har Orc", zh: "玛格汉兽人" } as BiText,
  class: { en: "Warrior", zh: "战士" } as BiText,
  spec: { en: "Arms", zh: "武器" } as BiText,
  realm: { en: "Illidan", zh: "伊利丹" } as BiText,
  region: { en: "US", zh: "美服" } as BiText,
  guild: "Happy Dogs",
  encounter: { en: "Aggramar", zh: "阿格拉玛" } as BiText,
  difficulty: { en: "Heroic", zh: "英雄难度" } as BiText,
  raid: {
    en: "Antorus, the Burning Throne",
    zh: "安托鲁斯，燃烧王座",
  } as BiText,
  expansion: { en: "Legion", zh: "军团再临" } as BiText,
  peakDps: "1.79M",
  itemLevel: 962,
  /**
   * Faded character render shown on the card. Refreshed from the Blizzard API
   * at build time by scripts/fetch-wow-render.mjs — the DPS parse above stays
   * hand-written as a frozen historical record.
   */
  image: "/wow-character.png",
  /** Warrior class colour. */
  classColor: "#c69b6d",
};

/** League of Legends — static peak-rank profile. */
export const lolProfile = {
  game: { en: "League of Legends", zh: "英雄联盟" } as BiText,
  tier: { en: "Master", zh: "大师" } as BiText,
  lp: 198,
  /** Master-tier colour. */
  tierColor: "#a35bd6",
  champions: [
    {
      name: { en: "Rakan", zh: "洛" },
      skin: { en: "Star Guardian Rakan", zh: "星之守护者 洛" },
      image:
        "https://wiki.leagueoflegends.com/en-us/images/Rakan_StarGuardianSkin.jpg?3e37b",
    },
    {
      name: { en: "Rell", zh: "芮尔" },
      skin: { en: "High Noon Rell", zh: "西部魔影 芮尔" },
      image:
        "https://wiki.leagueoflegends.com/en-us/images/Rell_HighNoonSkin.jpg?f5200",
    },
    {
      name: { en: "Viego", zh: "佛耶戈" },
      skin: { en: "Worlds 2024 Viego", zh: "2024全球总决赛 佛耶戈" },
      image:
        "https://wiki.leagueoflegends.com/en-us/images/Viego_Worlds2024Skin.jpg?40c88",
    },
  ] as LolChampion[],
  roles: [
    { en: "Support", zh: "辅助" },
    { en: "Jungle", zh: "打野" },
  ] as BiText[],
};
