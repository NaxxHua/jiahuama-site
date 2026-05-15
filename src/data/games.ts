export interface BiText {
  en: string;
  zh: string;
}

export interface LolChampion {
  name: BiText;
  /** Featured skin shown on the card. */
  skin: string;
  /** Skin splash-art image URL. */
  image: string;
}

/** World of Warcraft — static profile built around a best WarcraftLogs parse. */
export const wowProfile = {
  game: "World of Warcraft",
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
  game: "League of Legends",
  tier: { en: "Master", zh: "大师" } as BiText,
  lp: 200,
  /** Master-tier colour. */
  tierColor: "#a35bd6",
  champions: [
    {
      name: { en: "Rakan", zh: "洛" },
      skin: "Star Guardian Rakan",
      image:
        "https://wiki.leagueoflegends.com/en-us/images/Rakan_StarGuardianSkin.jpg?3e37b",
    },
    {
      name: { en: "Rell", zh: "芮尔" },
      skin: "High Noon Rell",
      image:
        "https://wiki.leagueoflegends.com/en-us/images/Rell_HighNoonSkin.jpg?f5200",
    },
    {
      name: { en: "Viego", zh: "佛耶戈" },
      skin: "Worlds 2024 Viego",
      image:
        "https://wiki.leagueoflegends.com/en-us/images/Viego_Worlds2024Skin.jpg?40c88",
    },
  ] as LolChampion[],
  roles: [
    { en: "Support", zh: "辅助" },
    { en: "Jungle", zh: "打野" },
  ] as BiText[],
};
