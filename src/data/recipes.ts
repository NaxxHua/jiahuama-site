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
      en: "Like champagne served in a cup that had a bit of cola left",
      zh: "像是在装过可乐的杯子里倒入的香槟",
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
      en: "One of these will make all your teeth turn blue",
      zh: "只喝一口就能让你的牙齿变蓝",
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
      en: "Originally called Pretty Woman, but renamed for equality",
      zh: "原名Pretty Woman，后为平等而改名",
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
      en: "No relation to the Hadron cannon on the moon",
      zh: "与月球上的强子炮无关",
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
      en: "So balanced, you'd think it would taste nice... you'd be wrong",
      zh: "如此平衡，你会觉得它很好喝……但你错了",
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
      en: "Doesn't burn the tongue, but don't drink with a sore throat",
      zh: "不会灼伤舌头，但喉咙痛时千万别喝",
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
      en: "Does not represent the opinions of the Bar Pianists Union",
      zh: "不代表酒吧钢琴师工会的意见",
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
      en: "Makes your tongue feel velvety, then you'll sleep soundly",
      zh: "让你的舌头感觉像天鹅绒，然后安然入睡",
    },
    image: "/fluffy_dream.jpg",
    category: "cocktail",
    gradient: "from-green-400 to-emerald-500",
  },
];
