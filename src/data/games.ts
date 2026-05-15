export interface BiText {
  en: string;
  zh: string;
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
  /** Warrior class colour. */
  classColor: "#c69b6d",
};

/** League of Legends — static peak-rank profile. */
export const lolProfile = {
  game: "League of Legends",
  tier: "Master",
  lp: 200,
  /** Master-tier colour. */
  tierColor: "#a35bd6",
  champions: [
    { en: "Rakan", zh: "洛" },
    { en: "Rell", zh: "芮尔" },
    { en: "Viego", zh: "佛耶戈" },
  ] as BiText[],
  roles: [
    { en: "Support", zh: "辅助" },
    { en: "Jungle", zh: "打野" },
  ] as BiText[],
};
