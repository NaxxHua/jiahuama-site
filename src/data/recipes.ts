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
];
