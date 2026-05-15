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
  race: "Mag'har Orc",
  class: "Warrior",
  spec: "Arms",
  realm: "Illidan",
  region: "US",
  guild: "Happy Dogs",
  encounter: "The Defense of Eonar",
  difficulty: "Heroic",
  raid: "Antorus, the Burning Throne",
  expansion: "Legion",
  peakDps: "1.77M",
  itemLevel: 958,
  /** Faded character render shown on the card — save to public/. */
  image: "/wow-character.png",
  /** Warrior class colour. */
  classColor: "#c69b6d",
};

/** League of Legends — static peak-rank profile. */
export const lolProfile = {
  game: { en: "League of Legends", zh: "英雄联盟" } as BiText,
  tier: { en: "Master", zh: "大师" } as BiText,
  lp: 200,
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
