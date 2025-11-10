export interface Recipe {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  subtitle: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  image: string;
  category: "dish" | "cocktail";
  gradient: string;
}

export const recipes: Recipe[] = [
  {
    id: "dapanji",
    title: {
      en: "Dapanji",
      zh: "大盘鸡",
    },
    subtitle: {
      en: "Big Plate Chicken",
      zh: "新疆大盘鸡",
    },
    description: {
      en: "A classic Xinjiang dish with tender chicken, potatoes, and bold spices",
      zh: "新疆经典菜肴，鲜嫩鸡肉配土豆和浓郁香料",
    },
    image: "/big_plate_chicken.jpg",
    category: "dish",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "mooncake",
    title: {
      en: "Egg Yolk Lotus Mooncake",
      zh: "蛋黄莲蓉月饼",
    },
    subtitle: {
      en: "Traditional Mid-Autumn Festival Treat",
      zh: "传统中秋佳品",
    },
    description: {
      en: "Classic mooncake with salted egg yolk and lotus seed paste filling",
      zh: "经典月饼，咸蛋黄配莲蓉馅料，中秋节必备",
    },
    image: "/mooncake.jpg",
    category: "dish",
    gradient: "from-yellow-500 to-amber-600",
  },
  {
    id: "cobalt-velvet",
    title: {
      en: "Cobalt Velvet",
      zh: "钴蓝天鹅绒",
    },
    subtitle: {
      en: "Bubbly • Classy • Burning",
      zh: "发泡 • 时尚 • 火辣",
    },
    description: {
      en: "It's like champagne served in a cup that had a bit of cola left",
      zh: "就如同把香槟倒在还剩一点可乐的杯子里。",
    },
    image: "/cobalt_velvet.jpg",
    category: "cocktail",
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    id: "blue-fairy",
    title: {
      en: "Blue Fairy",
      zh: "蓝精灵",
    },
    subtitle: {
      en: "Sweet • Girly • Soft",
      zh: "甜味 • 女性化 • 温和",
    },
    description: {
      en: "One of these will make all your teeth turn blue. Hope you brushed them well.",
      zh: "只喝一口就能让你的牙齿变蓝。希望你喝完之后能好好刷牙。",
    },
    image: "/blue_fairy.jpg",
    category: "cocktail",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    id: "piano-woman",
    title: {
      en: "Piano Woman",
      zh: "女钢琴家",
    },
    subtitle: {
      en: "Sweet • Happy • Promo",
      zh: "甜味 • 惬意 • 宣传",
    },
    description: {
      en: "It was originally called Pretty Woman, but too many people complained there should be a Piano Woman if there was a Piano Man.",
      zh: "它的本名是Pretty Woman，但有很多人投诉如果有种酒叫Piano Man（男钢琴师），就该有另一种被命名为Piano Woman（女钢琴师）。",
    },
    image: "/piano_woman.jpg",
    category: "cocktail",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    id: "moonblast",
    title: {
      en: "Moonblast",
      zh: "月球爆破",
    },
    subtitle: {
      en: "Sweet • Girly • Happy",
      zh: "甜蜜 • 女性化 • 惬意",
    },
    description: {
      en: "No relation to the Hadron cannon you can see on the moon for one week every month.",
      zh: "与你每个月都有一周时间能看到的那座月球强子大炮没有任何关系。",
    },
    image: "/moon_blast.jpg",
    category: "cocktail",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    id: "zen-star",
    title: {
      en: "Zen Star",
      zh: "禅星",
    },
    subtitle: {
      en: "Sour • Promo • Bland",
      zh: "酸味 • 宣传 • 清淡",
    },
    description: {
      en: "You'd think something so balanced would actually taste nice... you'd be dead wrong.",
      zh: "你可能会认为如此均衡的配方能够令这杯酒变得美味......那你就大错特错了。",
    },
    image: "/zen_star.jpg",
    category: "cocktail",
    gradient: "from-teal-400 to-cyan-600",
  },
  {
    id: "pile-driver",
    title: {
      en: "Pile Driver",
      zh: "打桩机",
    },
    subtitle: {
      en: "Bitter • Burning • Manly",
      zh: "苦味 • 火辣 • 男性化",
    },
    description: {
      en: "It doesn't burn as hard on the tongue but you better not have a sore throat when drinking it...",
      zh: "你的舌头可能察觉不到它的火辣程度，但喝的时候请小心不要烧到嗓子。",
    },
    image: "/pile_driver.jpg",
    category: "cocktail",
    gradient: "from-amber-600 to-orange-700",
  },
  {
    id: "piano-man",
    title: {
      en: "Piano Man",
      zh: "男钢琴家",
    },
    subtitle: {
      en: "Sour • Promo • Strong",
      zh: "酸味 • 宣传 • 强烈",
    },
    description: {
      en: "This drink does not represent the opinions of the Bar Pianists Union or its associates.",
      zh: "该饮品不代表酒吧钢琴师协会及其相关组织的意见。",
    },
    image: "/piano_man.jpg",
    category: "cocktail",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    id: "fluffy-dream",
    title: {
      en: "Fluffy Dream",
      zh: "蓬松梦",
    },
    subtitle: {
      en: "Sweet • Girly • Soft",
      zh: "甜蜜 • 女性化 • 温和",
    },
    description: {
      en: "A couple of these will make your tongue feel velvet-y. More of them and you'll be sleeping soundly.",
      zh: "一两口就足以取悦你的舌头，再喝多就可能会导致睡过头。",
    },
    image: "/fluffy_dream.jpg",
    category: "cocktail",
    gradient: "from-green-400 to-emerald-500",
  },
];
