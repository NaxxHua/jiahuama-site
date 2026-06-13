export interface BiText {
  en: string;
  zh: string;
}

export interface RecipeIngredient {
  name: BiText;
  /** Measurement, e.g. "30 ml", "2 tbsp", "1 pc". Keep language-neutral. */
  amount: string;
}

export interface RecipeStep {
  title: BiText;
  desc: BiText;
}

export interface Recipe {
  id: string;
  category: "cocktail" | "dish";
  title: BiText;
  subtitle: BiText;
  description: BiText;
  image: string;
  accent: string;
  glass?: BiText;
  equivalent?: BiText;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  story: BiText;
  tips?: BiText[];
}

export const recipes: Recipe[] = [
  {
    id: "dapanji",
    category: "dish",
    title: {
      en: "Dapanji (Big Plate Chicken)",
      zh: "大盘鸡",
    },
    subtitle: {
      en: "A classic Xinjiang dish",
      zh: "新疆经典菜肴",
    },
    description: {
      en: "A classic Xinjiang dish with tender chicken, potatoes, and bold spices.",
      zh: "新疆经典菜肴，鲜嫩鸡肉配土豆和浓郁香料。",
    },
    image: "/big_plate_chicken.webp",
    accent: "#e0561f",
    ingredients: [
      {
        name: {
          en: "Whole chicken or several chicken thighs, cut into pieces",
          zh: "鸡肉（整只或若干鸡大腿），切块",
        },
        amount: "",
      },
      {
        name: { en: "Onion, cut into chunks", zh: "洋葱，切块" },
        amount: "1 pc",
      },
      {
        name: { en: "Scallions, ginger, garlic", zh: "葱，姜，蒜" },
        amount: "",
      },
      {
        name: { en: "Dried chili peppers", zh: "干辣椒" },
        amount: "",
      },
      {
        name: {
          en: "Bay leaves, star anise, Sichuan peppercorns",
          zh: "香叶，八角，花椒",
        },
        amount: "",
      },
      {
        name: { en: "Green pepper, cut into chunks", zh: "青椒，切块" },
        amount: "1 pc",
      },
      {
        name: {
          en: "Potatoes, peeled and cut into large chunks",
          zh: "土豆，削皮切大块",
        },
        amount: "2-3 pcs",
      },
      {
        name: { en: "Yellow soybean paste", zh: "黄豆酱" },
        amount: "1 tbsp",
      },
      {
        name: { en: "Doubanjiang (broad bean paste)", zh: "豆瓣酱" },
        amount: "1 tbsp",
      },
      {
        name: { en: "Light soy sauce", zh: "生抽" },
        amount: "2 tbsp",
      },
      {
        name: { en: "Dark soy sauce", zh: "老抽" },
        amount: "1/2 tbsp",
      },
      {
        name: { en: "Vinegar", zh: "醋" },
        amount: "1/2 tbsp",
      },
      {
        name: { en: "Rock sugar", zh: "冰糖" },
        amount: "",
      },
      {
        name: { en: "Beer", zh: "啤酒" },
        amount: "1 bottle",
      },
      {
        name: { en: "Belt noodles (optional)", zh: "皮带面（可选）" },
        amount: "",
      },
    ],
    steps: [
      {
        title: { en: "Prepare the Sauce Mix", zh: "调制酱料" },
        desc: {
          en: "Combine in a bowl: 1 tbsp yellow soybean paste + 1 tbsp doubanjiang + 2 tbsp light soy sauce + 1/2 tbsp dark soy sauce + 1/2 tbsp vinegar. Mix well and set aside.",
          zh: "在碗中混合：1勺黄豆酱 + 1勺豆瓣酱 + 2勺生抽 + 半勺老抽 + 半勺醋。搅拌均匀备用。",
        },
      },
      {
        title: { en: "Caramelize the Sugar", zh: "炒糖色" },
        desc: {
          en: "Add rock sugar to cold oil in a wok. Cook over medium-low heat, stirring constantly, until the sugar turns dark brown and starts to bubble. This creates the signature caramel color and flavor.",
          zh: "冷油加入冰糖，中小火不停搅拌，直到冰糖变成深棕色并开始起大泡。这会创造出标志性的焦糖色和风味。",
        },
      },
      {
        title: { en: "Sear the Chicken", zh: "煎鸡肉" },
        desc: {
          en: "Immediately add the chicken pieces to the caramelized sugar. Turn heat to high and stir-fry vigorously until all the water evaporates from the chicken. Be patient, as some chicken releases a lot of moisture. Continue until the skin turns a beautiful caramel brown color.",
          zh: "立即倒入鸡肉块到焦糖中。转大火大力翻炒，直到鸡肉的水分完全蒸发。要有耐心，因为有些鸡肉会释放很多水分。继续炒到表皮变成漂亮的焦糖棕色。",
        },
      },
      {
        title: { en: "Add Aromatics", zh: "加入香料" },
        desc: {
          en: "Add scallions, ginger, garlic, dried chili peppers, bay leaves, star anise, and Sichuan peppercorns. Stir-fry until fragrant and the spices release their aroma, about 1-2 minutes.",
          zh: "加入葱、姜、蒜、干辣椒、香叶、八角和花椒。翻炒至香料释放香味，约1-2分钟。",
        },
      },
      {
        title: { en: "Add Sauce and Onions", zh: "加入酱料和洋葱" },
        desc: {
          en: "Pour in the prepared sauce mixture and stir-fry until the sauce coats the chicken and becomes aromatic. Add the onion chunks and stir to combine everything evenly.",
          zh: "倒入准备好的酱料混合物，翻炒至酱料包裹鸡肉并变得香气四溢。加入洋葱块，翻炒均匀。",
        },
      },
      {
        title: { en: "Braise with Beer", zh: "啤酒焖煮" },
        desc: {
          en: "Add the entire bottle of beer and the potato chunks. Bring to a boil, then reduce heat to low. Cover and simmer for 12 minutes. The beer adds depth of flavor and helps tenderize the chicken.",
          zh: "加入整瓶啤酒和土豆块。煮沸后转小火。盖上盖子焖12分钟。啤酒增添风味深度并帮助鸡肉变嫩。",
        },
      },
      {
        title: { en: "Finish and Serve", zh: "完成并上桌" },
        desc: {
          en: "Add the green pepper chunks. If serving with belt noodles, start cooking them now in a separate pot. Increase heat and reduce the sauce to your desired consistency. Once the noodles are cooked, rinse them under cold water, place on a large plate, pour the chicken mixture over the top, toss together, and serve immediately.",
          zh: "加入青椒块。如果要配皮带面，现在可以在另一个锅中开始煮面。加大火力收汁至满意的浓稠度。面煮好后用冷水冲洗，放在大盘子上，将鸡肉混合物倒在上面，拌匀后立即上桌。",
        },
      },
    ],
    story: {
      en: "Dapanji, or Big Plate Chicken, is a beloved Xinjiang classic where tender braised chicken meets potatoes, peppers, and a chorus of bold spices. Beer adds depth and tenderness, and the dish is traditionally served over wide belt noodles that soak up every drop of the rich, caramel-colored sauce.",
      zh: "大盘鸡是深受喜爱的新疆经典菜肴，鲜嫩焖煮的鸡肉搭配土豆、辣椒和浓郁香料的合奏。啤酒带来风味的深度与软嫩，传统做法是浇在宽宽的皮带面上，让面条吸饱每一滴焦糖色的浓郁汤汁。",
    },
    tips: [
      {
        en: "Don't rush the sugar caramelization, it's key to the dish's color and flavor.",
        zh: "不要急于炒糖色，这是菜肴颜色和风味的关键。",
      },
      {
        en: "Make sure to completely dry out the chicken before adding spices.",
        zh: "确保在加入香料前完全炒干鸡肉。",
      },
      {
        en: "Cut potatoes into large chunks so they don't fall apart during braising.",
        zh: "土豆切大块，这样焖煮时不会散开。",
      },
      {
        en: "Belt noodles are the authentic Xinjiang pairing, absolutely delicious! If unavailable, any wider noodles work well too.",
        zh: "皮带面是新疆大盘鸡标配，攒劲的狠！如果没有换宽一点的面条也可以。",
      },
    ],
  },
  {
    id: "mooncake",
    category: "dish",
    title: {
      en: "Egg Yolk Lotus Mooncake",
      zh: "蛋黄莲蓉月饼",
    },
    subtitle: {
      en: "Traditional Mid-Autumn Festival treat",
      zh: "传统中秋佳品",
    },
    description: {
      en: "Classic mooncake with salted egg yolk and lotus seed paste filling.",
      zh: "经典月饼，咸蛋黄配莲蓉馅料，中秋节必备。",
    },
    image: "/mooncake.webp",
    accent: "#d99a2b",
    ingredients: [
      {
        name: { en: "Cake flour (low gluten)", zh: "低筋面粉" },
        amount: "150 g",
      },
      {
        name: { en: "Bread flour (high gluten)", zh: "高筋面粉" },
        amount: "50 g",
      },
      {
        name: { en: "Invert syrup", zh: "转换糖浆" },
        amount: "130 g",
      },
      {
        name: { en: "Peanut oil", zh: "花生油" },
        amount: "50 g",
      },
      {
        name: {
          en: "Lye water (1g edible alkali + 3g water)",
          zh: "枧水（1克食用碱与3克水混合）",
        },
        amount: "4 g",
      },
      {
        name: { en: "Salted egg yolks", zh: "咸蛋黄" },
        amount: "12 pcs",
      },
      {
        name: { en: "Lotus seed paste", zh: "莲蓉馅料" },
        amount: "at least 700 g",
      },
      {
        name: { en: "Egg yolk (for egg wash)", zh: "蛋黄（光亮液）" },
        amount: "1 pc",
      },
      {
        name: { en: "Syrup (for egg wash)", zh: "糖浆（光亮液）" },
        amount: "1 drop",
      },
      {
        name: { en: "Water (for egg wash)", zh: "水（光亮液）" },
        amount: "3 drops",
      },
    ],
    steps: [
      {
        title: { en: "Prepare the Dough", zh: "准备面团" },
        desc: {
          en: "In a bowl, combine invert syrup and peanut oil. Mix well with a hand mixer. Add lye water and mix until fully incorporated.",
          zh: "将转换糖浆和花生油倒入碗中，使用手持打蛋器搅拌均匀；均匀后加入枧水搅拌均匀。",
        },
      },
      {
        title: { en: "Mix Flours", zh: "混合面粉" },
        desc: {
          en: "In a large container, combine cake flour and bread flour. Mix well with a hand mixer.",
          zh: "将低筋面粉和高筋面粉加入大容器中，使用手持打蛋器搅拌均匀。",
        },
      },
      {
        title: { en: "Combine and Rest", zh: "混合并醒面" },
        desc: {
          en: "Pour the wet mixture into the flour container. Use a silicone spatula to mix until no dry flour remains. Wrap the dough in plastic wrap and let rest at room temperature for at least 3 hours.",
          zh: "将完成步骤1后的混合物加入步骤2的容器内，使用硅胶刮刀搅拌均匀直至没有干粉。用食品保鲜膜包裹面团，室温醒≥3小时。",
        },
      },
      {
        title: { en: "Portion the Components", zh: "分割材料" },
        desc: {
          en: "Weigh lotus seed paste and salted egg yolk together to 70g per portion. Weigh dough to 30g per portion. Repeat 12 times for 12 mooncakes.",
          zh: "将莲蓉馅料与咸蛋黄同时称重至70克；面团（饼皮）称重30克。（重复12次）",
        },
      },
      {
        title: { en: "Wrap the Filling", zh: "包馅" },
        desc: {
          en: "Wrap each salted egg yolk tightly with lotus seed paste, ensuring no air pockets.",
          zh: "将咸蛋黄严密包裹入莲蓉馅料中，不得进入空气。",
        },
      },
      {
        title: { en: "Shape with Mold", zh: "压模" },
        desc: {
          en: "Wrap the filled lotus paste in the dough wrapper (requires some technique). Roll in flour to prevent sticking, press with mold, and place on a lined baking sheet.",
          zh: "将包好的蛋黄莲蓉馅料裹入饼皮内（需要一定手法），在面粉里滚一圈防粘，压模并放在垫有锡纸的烤盘上。",
        },
      },
      {
        title: { en: "Prepare Egg Wash", zh: "准备光亮液" },
        desc: {
          en: "Strain egg yolk through a fine sieve. Add 1 drop of syrup and 3 drops of water. Mix well.",
          zh: "将蛋黄过细筛，加入一滴糖浆，三滴水，搅拌均匀。",
        },
      },
      {
        title: { en: "First Bake", zh: "第一次烘烤" },
        desc: {
          en: "Preheat oven to 430°F (220°C). Spray mooncakes lightly with water. Place in oven and reduce to 390°F (200°C). Bake for 5 minutes, then remove.",
          zh: "烤箱预热430℉，小喷壶在月饼表面喷水雾，烤盘进烤箱后下调至390℉，烤5分钟，取出。",
        },
      },
      {
        title: {
          en: "Apply Egg Wash and Second Bake",
          zh: "刷蛋液并二次烘烤",
        },
        desc: {
          en: "Reduce oven to 360°F (180°C). When mooncakes are cool enough to handle, brush egg wash evenly on the surface. Return to oven and bake for 10 minutes. Remove and let cool.",
          zh: "将烤箱温度下调至360℉，等到月饼不烫手时，用羊毛刷将光亮液均匀刷在月饼表面，再次进入烤箱，10分钟后取出，放凉。",
        },
      },
      {
        title: { en: "Oil Return Period", zh: "回油" },
        desc: {
          en: "Wearing gloves, place mooncakes in a sealed container lined with parchment paper. Seal and wait 3 days. After 3 days, the mooncakes will have softened and are ready to eat.",
          zh: "穿戴塑料/橡胶手套将月饼放在垫有油纸的密封容器内，密封并等待3天，3天后取出即可食用。",
        },
      },
    ],
    story: {
      en: "Mooncakes were originally offerings to worship the moon goddess. The saying goes: 'The moon is perfectly round on August 15th, Mid-Autumn mooncakes are fragrant and sweet.' Eating mooncakes during the Mid-Autumn Festival brings happiness and celebrates family reunion.",
      zh: "月饼最初是用来拜祭月神的供品，'八月十五月正圆，中秋月饼香又甜'。在中秋节品尝月饼带来快乐，也是阖家团圆的庆祝。",
    },
    tips: [
      {
        en: "The 3-day resting period is crucial for texture development (called 'oil return').",
        zh: "3天回油期对口感发展至关重要。",
      },
      {
        en: "Don't over-handle the dough, it becomes more difficult to work with.",
        zh: "不要过度处理面团，会变得难以操作。",
      },
      {
        en: "The ratio should be 3:7 (30g skin : 70g filling) for best results.",
        zh: "皮馅比例3:7效果最佳。",
      },
      {
        en: "Store in an airtight container at room temperature for up to 1 week.",
        zh: "密封保存，常温可保存1周。",
      },
      {
        en: "Best enjoyed during Mid-Autumn Festival with family and tea!",
        zh: "最好在中秋节与家人一起品尝，配茶更佳！",
      },
    ],
  },
  {
    id: "cobalt-velvet",
    category: "cocktail",
    title: {
      en: "Cobalt Velvet",
      zh: "钴蓝天鹅绒",
    },
    subtitle: {
      en: "Bubbly · Classy · Burning",
      zh: "发泡 · 时尚 · 火辣",
    },
    description: {
      en: "It's like champagne served in a cup that had a bit of cola left.",
      zh: "就如同把香槟倒在还剩一点可乐的杯子里。",
    },
    image: "/cobalt_velvet.webp",
    accent: "#1f4fc4",
    glass: {
      en: "Highball with ice",
      zh: "高球杯加冰",
    },
    equivalent: {
      en: "Blue Long Island Iced Tea 蓝色长岛冰茶",
      zh: "蓝色长岛冰茶",
    },
    ingredients: [
      {
        name: {
          en: "Spirytus Rektyfikowany (Vodka)",
          zh: "生命之水伏特加",
        },
        amount: "10 ml",
      },
      {
        name: { en: "Brugal Blanco (White Rum)", zh: "布鲁格白朗姆" },
        amount: "15 ml",
      },
      {
        name: { en: "Beefeater London (Gin)", zh: "必富达伦敦金酒" },
        amount: "20 ml",
      },
      {
        name: { en: "Blue Curacao", zh: "蓝橙酒" },
        amount: "10 ml",
      },
      {
        name: { en: "Sweet & Sour Mix", zh: "酸甜混合液" },
        amount: "30 ml",
      },
      {
        name: { en: "Sprite (to top)", zh: "雪碧（注满）" },
        amount: "to top",
      },
    ],
    steps: [
      {
        title: { en: "Add Spirits", zh: "加入烈酒" },
        desc: {
          en: "Add Spirytus Rektyfikowany (vodka), white rum, gin, Blue Curacao, and sweet & sour mix to a shaker with ice.",
          zh: "在摇酒器中加入伏特加、白朗姆酒、金酒、蓝柑橘酒和酸甜混合液，加冰块。",
        },
      },
      {
        title: { en: "Shake", zh: "摇匀" },
        desc: {
          en: "Shake well until chilled.",
          zh: "充分摇匀至冰凉。",
        },
      },
      {
        title: { en: "Strain", zh: "滤入" },
        desc: {
          en: "Strain into a highball glass filled with ice.",
          zh: "滤入装满冰块的高球杯中。",
        },
      },
      {
        title: { en: "Top with Sprite", zh: "加入雪碧" },
        desc: {
          en: "Top with Sprite for a bubbly finish.",
          zh: "加入雪碧，增添气泡口感。",
        },
      },
    ],
    story: {
      en: "A cyberpunk cocktail inspired by VA-11 HALL-A. Cobalt Velvet is a blue Long Island Iced Tea variation: bubbly, classy, and burning. It's like champagne served in a cup that had a bit of cola left.",
      zh: "一款灵感来自 VA-11 HALL-A 的赛博朋克鸡尾酒。钴蓝天鹅绒是蓝色长岛冰茶的变体：发泡、时尚而火辣。就如同把香槟倒在还剩一点可乐的杯子里。",
    },
  },
  {
    id: "blue-fairy",
    category: "cocktail",
    title: {
      en: "Blue Fairy",
      zh: "蓝精灵",
    },
    subtitle: {
      en: "Sweet · Girly · Soft",
      zh: "甜味 · 女性化 · 温和",
    },
    description: {
      en: "One of these will make all your teeth turn blue. Hope you brushed them well.",
      zh: "只喝一口就能让你的牙齿变蓝。希望你喝完之后能好好刷牙。",
    },
    image: "/blue_fairy.webp",
    accent: "#188eff",
    glass: {
      en: "Highball",
      zh: "高球杯",
    },
    equivalent: {
      en: "Blue Fairy 蓝精灵",
      zh: "蓝精灵",
    },
    ingredients: [
      {
        name: { en: "Lychee Liqueur", zh: "荔枝利口酒" },
        amount: "45 ml",
      },
      {
        name: { en: "Blue Curacao", zh: "蓝橙酒" },
        amount: "10 ml",
      },
      {
        name: { en: "Grapefruit Juice", zh: "西柚汁" },
        amount: "45 ml",
      },
      {
        name: { en: "Tonic Water", zh: "汤力水" },
        amount: "fill up",
      },
      {
        name: { en: "Absinthe", zh: "苦艾酒" },
        amount: "spray",
      },
    ],
    steps: [
      {
        title: { en: "Build Over Ice", zh: "加冰调和" },
        desc: {
          en: "Add lychee liqueur, Blue Curacao, and grapefruit juice to a highball glass with ice.",
          zh: "在高球杯中加入荔枝利口酒、蓝柑橘酒和西柚汁，加冰块。",
        },
      },
      {
        title: { en: "Top and Stir", zh: "注满并搅拌" },
        desc: {
          en: "Fill up with tonic water and stir gently.",
          zh: "加入汤力水至满杯，轻轻搅拌。",
        },
      },
      {
        title: { en: "Finish with Absinthe", zh: "苦艾酒收尾" },
        desc: {
          en: "Spray a small amount of absinthe on top for aroma.",
          zh: "在顶部喷洒少量苦艾酒增添香气。",
        },
      },
    ],
    story: {
      en: "A cyberpunk cocktail inspired by VA-11 HALL-A. Sweet, girly, and soft, the Blue Fairy is a highball that glows an electric blue. One of these will make all your teeth turn blue, so hope you brushed them well.",
      zh: "一款灵感来自 VA-11 HALL-A 的赛博朋克鸡尾酒。甜美、女性化而温和，蓝精灵是一杯泛着电光蓝的高球鸡尾酒。只喝一口就能让你的牙齿变蓝，所以希望你喝完之后能好好刷牙。",
    },
  },
  {
    id: "piano-woman",
    category: "cocktail",
    title: {
      en: "Piano Woman",
      zh: "女钢琴家",
    },
    subtitle: {
      en: "Sweet · Happy · Promo",
      zh: "甜味 · 惬意 · 宣传",
    },
    description: {
      en: "It was originally called Pretty Woman, but too many people complained there should be a Piano Woman if there was a Piano Man.",
      zh: "它的本名是Pretty Woman，但有很多人投诉如果有种酒叫Piano Man（男钢琴师），就该有另一种被命名为Piano Woman（女钢琴师）。",
    },
    image: "/piano_woman.webp",
    accent: "#e8649b",
    glass: {
      en: "Wine glass with ice",
      zh: "葡萄酒杯加冰",
    },
    equivalent: {
      en: "Dong Hae 东海",
      zh: "东海",
    },
    ingredients: [
      {
        name: { en: "Vodka", zh: "伏特加" },
        amount: "15 ml",
      },
      {
        name: { en: "Peach Liqueur", zh: "蜜桃利口酒" },
        amount: "30 ml",
      },
      {
        name: { en: "Blue Curacao", zh: "蓝橙酒" },
        amount: "15 ml",
      },
      {
        name: { en: "Sweet & Sour Mix", zh: "酸甜混合液" },
        amount: "30 ml",
      },
      {
        name: { en: "Apple Juice", zh: "苹果汁" },
        amount: "30 ml",
      },
      {
        name: { en: "Pink Cranberry", zh: "粉红蔓越莓汁" },
        amount: "45 ml",
      },
    ],
    steps: [
      {
        title: { en: "Add Ingredients", zh: "加入原料" },
        desc: {
          en: "Add vodka, peach liqueur, Blue Curacao, sweet & sour mix, apple juice, and pink cranberry to a shaker with ice.",
          zh: "在摇酒器中加入伏特加、桃子利口酒、蓝柑橘酒、酸甜混合液、苹果汁和粉红蔓越莓，加冰块。",
        },
      },
      {
        title: { en: "Shake", zh: "摇匀" },
        desc: {
          en: "Shake well until chilled.",
          zh: "充分摇匀至冰凉。",
        },
      },
      {
        title: { en: "Strain", zh: "滤入" },
        desc: {
          en: "Strain into a wine glass filled with ice.",
          zh: "滤入装满冰块的葡萄酒杯中。",
        },
      },
    ],
    story: {
      en: "A cyberpunk cocktail inspired by VA-11 HALL-A. It was originally called Pretty Woman, but too many people complained there should be a Piano Woman if there was a Piano Man. Sweet, happy, and great for promotions.",
      zh: "一款灵感来自 VA-11 HALL-A 的赛博朋克鸡尾酒。它的本名是Pretty Woman，但有很多人投诉如果有种酒叫Piano Man（男钢琴师），就该有另一种被命名为Piano Woman（女钢琴师）。甜美、惬意，非常适合宣传活动。",
    },
  },
  {
    id: "moonblast",
    category: "cocktail",
    title: {
      en: "Moonblast",
      zh: "月球爆破",
    },
    subtitle: {
      en: "Sweet · Girly · Happy",
      zh: "甜蜜 · 女性化 · 惬意",
    },
    description: {
      en: "No relation to the Hadron cannon you can see on the moon for one week every month.",
      zh: "与你每个月都有一周时间能看到的那座月球强子大炮没有任何关系。",
    },
    image: "/moon_blast.webp",
    accent: "#cf3c71",
    glass: {
      en: "Highball with ice",
      zh: "高球杯加冰",
    },
    equivalent: {
      en: "Sea Breeze 海风",
      zh: "海风",
    },
    ingredients: [
      {
        name: { en: "Smirnoff (Vodka)", zh: "皇冠伏特加" },
        amount: "30 ml",
      },
      {
        name: { en: "Passoa", zh: "百香果利口酒" },
        amount: "15 ml",
      },
      {
        name: { en: "Grapefruit Juice", zh: "西柚汁" },
        amount: "45 ml",
      },
      {
        name: { en: "Cranberry Juice", zh: "蔓越莓汁" },
        amount: "fill up",
      },
    ],
    steps: [
      {
        title: { en: "Build Over Ice", zh: "加冰调和" },
        desc: {
          en: "Add vodka, Passoa, and grapefruit juice to a highball glass filled with ice.",
          zh: "在装满冰块的高球杯中加入伏特加、百香果利口酒和西柚汁。",
        },
      },
      {
        title: { en: "Top with Cranberry", zh: "加入蔓越莓汁" },
        desc: {
          en: "Fill up with cranberry juice.",
          zh: "加入蔓越莓汁至满杯。",
        },
      },
      {
        title: { en: "Stir", zh: "搅拌" },
        desc: {
          en: "Stir gently to combine.",
          zh: "轻轻搅拌混合。",
        },
      },
    ],
    story: {
      en: "A cyberpunk cocktail inspired by VA-11 HALL-A. A Sea Breeze variation that is sweet, girly, and happy. No relation to the Hadron cannon you can see on the moon for one week every month.",
      zh: "一款灵感来自 VA-11 HALL-A 的赛博朋克鸡尾酒。这是海风的变体，甜蜜、女性化而惬意。与你每个月都有一周时间能看到的那座月球强子大炮没有任何关系。",
    },
  },
  {
    id: "zen-star",
    category: "cocktail",
    title: {
      en: "Zen Star",
      zh: "禅星",
    },
    subtitle: {
      en: "Sour · Promo · Bland",
      zh: "酸味 · 宣传 · 清淡",
    },
    description: {
      en: "You'd think something so balanced would actually taste nice... you'd be dead wrong.",
      zh: "你可能会认为如此均衡的配方能够令这杯酒变得美味......那你就大错特错了。",
    },
    image: "/zen_star.webp",
    accent: "#4d4ca1",
    glass: {
      en: "Stemless wine glass",
      zh: "无脚葡萄酒杯",
    },
    equivalent: {
      en: "Zen Star 禅星",
      zh: "禅星",
    },
    ingredients: [
      {
        name: { en: "Gin", zh: "金酒" },
        amount: "20 ml",
      },
      {
        name: { en: "Dubonnet Red", zh: "杜本内红酒" },
        amount: "20 ml",
      },
      {
        name: { en: "Fino Sherry", zh: "菲诺雪莉酒" },
        amount: "20 ml",
      },
      {
        name: { en: "Bianco Vermouth", zh: "白味美思" },
        amount: "20 ml",
      },
      {
        name: { en: "Blue Curacao", zh: "蓝橙酒" },
        amount: "20 ml",
      },
    ],
    steps: [
      {
        title: { en: "Add Ingredients", zh: "加入原料" },
        desc: {
          en: "Add gin, Dubonnet Red, Fino Sherry, Bianco Vermouth, and Blue Curacao to a mixing glass with ice.",
          zh: "在调酒杯中加入金酒、杜本内红、菲诺雪莉酒、白苦艾酒和蓝柑橘酒，加冰块。",
        },
      },
      {
        title: { en: "Stir", zh: "搅拌" },
        desc: {
          en: "Stir gently until well chilled.",
          zh: "轻轻搅拌至充分冰凉。",
        },
      },
      {
        title: { en: "Strain", zh: "滤入" },
        desc: {
          en: "Strain into a stemless wine glass.",
          zh: "滤入无脚葡萄酒杯中。",
        },
      },
    ],
    story: {
      en: "A cyberpunk cocktail inspired by VA-11 HALL-A. Five fortified ingredients in perfect equal measure: gin, Dubonnet Red, Fino Sherry, Bianco Vermouth, and Blue Curacao. You'd think something so balanced would actually taste nice... you'd be dead wrong.",
      zh: "一款灵感来自 VA-11 HALL-A 的赛博朋克鸡尾酒。五种加强型原料以完全相等的比例调和：金酒、杜本内红、菲诺雪莉酒、白味美思和蓝橙酒。你可能会认为如此均衡的配方能够令这杯酒变得美味......那你就大错特错了。",
    },
    tips: [
      {
        en: "Dubonnet Red: French aperitif wine with herbs and spices.",
        zh: "杜本内红：法国开胃草药香料加强葡萄酒。",
      },
      {
        en: "Fino Sherry: Light and dry Spanish fortified white wine.",
        zh: "菲诺雪莉：西班牙清淡干爽加强白葡萄酒。",
      },
      {
        en: "Bianco Vermouth: Italian/French vermouth, a fortified wine.",
        zh: "白苦艾酒：意大利/法国苦艾酒，加强葡萄酒。",
      },
    ],
  },
  {
    id: "pile-driver",
    category: "cocktail",
    title: {
      en: "Pile Driver",
      zh: "打桩机",
    },
    subtitle: {
      en: "Bitter · Burning · Manly",
      zh: "苦味 · 火辣 · 男性化",
    },
    description: {
      en: "It doesn't burn as hard on the tongue but you better not have a sore throat when drinking it...",
      zh: "你的舌头可能察觉不到它的火辣程度，但喝的时候请小心不要烧到嗓子。",
    },
    image: "/pile_driver.webp",
    accent: "#e89a1f",
    glass: {
      en: "Lowball with ice",
      zh: "低球杯加冰",
    },
    equivalent: {
      en: "Godfather 教父",
      zh: "教父",
    },
    ingredients: [
      {
        name: { en: "Blended Whiskey", zh: "调和威士忌" },
        amount: "50 ml",
      },
      {
        name: { en: "Amaretto", zh: "杏仁利口酒" },
        amount: "10 ml",
      },
      {
        name: { en: "Angostura Bitters", zh: "安格斯特拉苦精" },
        amount: "3 dashes",
      },
    ],
    steps: [
      {
        title: { en: "Fill with Ice", zh: "装满冰块" },
        desc: {
          en: "Fill a lowball glass with ice.",
          zh: "在低球杯中装满冰块。",
        },
      },
      {
        title: { en: "Pour the Spirits", zh: "倒入烈酒" },
        desc: {
          en: "Pour blended whiskey and amaretto over ice.",
          zh: "倒入混合威士忌和杏仁利口酒。",
        },
      },
      {
        title: { en: "Add Bitters", zh: "加入苦精" },
        desc: {
          en: "Add 3 dashes of Angostura bitters.",
          zh: "加入3滴安格斯图拉苦精。",
        },
      },
      {
        title: { en: "Stir", zh: "搅拌" },
        desc: {
          en: "Stir gently to combine.",
          zh: "轻轻搅拌混合。",
        },
      },
    ],
    story: {
      en: "A cyberpunk cocktail inspired by VA-11 HALL-A. A Godfather variation that is strong and spirit-forward. The amaretto adds a subtle sweetness that balances the whiskey's intensity, while the bitters add depth and complexity. It doesn't burn as hard on the tongue but you better not have a sore throat when drinking it.",
      zh: "一款灵感来自 VA-11 HALL-A 的赛博朋克鸡尾酒。这是教父的变体，烈性且以烈酒为主。杏仁利口酒增添了微妙的甜味，平衡了威士忌的强烈，而苦精则增加了深度和复杂性。你的舌头可能察觉不到它的火辣程度，但喝的时候请小心不要烧到嗓子。",
    },
  },
  {
    id: "piano-man",
    category: "cocktail",
    title: {
      en: "Piano Man",
      zh: "男钢琴家",
    },
    subtitle: {
      en: "Sour · Promo · Strong",
      zh: "酸味 · 宣传 · 强烈",
    },
    description: {
      en: "This drink does not represent the opinions of the Bar Pianists Union or its associates.",
      zh: "该饮品不代表酒吧钢琴师协会及其相关组织的意见。",
    },
    image: "/piano_man.webp",
    accent: "#1f8e8e",
    glass: {
      en: "Hurricane glass with ice and a straw",
      zh: "飓风杯加冰加吸管",
    },
    equivalent: {
      en: "Blue Hawaii 蓝色夏威夷",
      zh: "蓝色夏威夷",
    },
    ingredients: [
      {
        name: { en: "White Rum", zh: "白朗姆" },
        amount: "30 ml",
      },
      {
        name: { en: "Agwa (Coca Leaf Liqueur)", zh: "古柯叶利口酒" },
        amount: "15 ml",
      },
      {
        name: { en: "Blue Curacao", zh: "蓝橙酒" },
        amount: "15 ml",
      },
      {
        name: { en: "Fresh Lime Juice", zh: "新鲜青柠汁" },
        amount: "15 ml",
      },
      {
        name: { en: "Simple Syrup", zh: "糖浆" },
        amount: "5 ml",
      },
      {
        name: { en: "Pineapple Juice", zh: "菠萝汁" },
        amount: "75 ml",
      },
    ],
    steps: [
      {
        title: { en: "Add Ingredients", zh: "加入原料" },
        desc: {
          en: "Add white rum, Agwa, Blue Curacao, fresh lime juice, simple syrup, and pineapple juice to a shaker with ice.",
          zh: "在摇酒器中加入白朗姆酒、古柯叶利口酒、蓝柑橘酒、新鲜青柠汁、糖浆和菠萝汁，加冰块。",
        },
      },
      {
        title: { en: "Shake", zh: "摇匀" },
        desc: {
          en: "Shake vigorously until well chilled.",
          zh: "用力摇匀至充分冰凉。",
        },
      },
      {
        title: { en: "Strain", zh: "滤入" },
        desc: {
          en: "Strain into a hurricane glass filled with ice.",
          zh: "滤入装满冰块的飓风杯中。",
        },
      },
      {
        title: { en: "Serve", zh: "享用" },
        desc: {
          en: "Serve with a straw.",
          zh: "插入吸管即可享用。",
        },
      },
    ],
    story: {
      en: "A cyberpunk cocktail inspired by VA-11 HALL-A. A Blue Hawaii variation that is sour, strong, and great for promotions. Agwa, a coca leaf liqueur from Bolivia, lends a unique herbal flavor with hints of mint and citrus. This drink does not represent the opinions of the Bar Pianists Union or its associates.",
      zh: "一款灵感来自 VA-11 HALL-A 的赛博朋克鸡尾酒。这是蓝色夏威夷的变体，酸爽、强烈，非常适合宣传活动。Agwa 是来自玻利维亚的古柯叶利口酒，带有薄荷与柑橘香气的独特草本风味。该饮品不代表酒吧钢琴师协会及其相关组织的意见。",
    },
  },
  {
    id: "fluffy-dream",
    category: "cocktail",
    title: {
      en: "Fluffy Dream",
      zh: "蓬松梦",
    },
    subtitle: {
      en: "Sweet · Girly · Soft",
      zh: "甜蜜 · 女性化 · 温和",
    },
    description: {
      en: "A couple of these will make your tongue feel velvet-y. More of them and you'll be sleeping soundly.",
      zh: "一两口就足以取悦你的舌头，再喝多就可能会导致睡过头。",
    },
    image: "/fluffy_dream.webp",
    accent: "#6fc478",
    glass: {
      en: "Highball with a long ice cube and a straw",
      zh: "高球杯加长冰块加吸管",
    },
    equivalent: {
      en: "June Bug 六月虫",
      zh: "六月虫",
    },
    ingredients: [
      {
        name: { en: "Lime (muddled)", zh: "青柠（捣碎）" },
        amount: "3 pcs",
      },
      {
        name: { en: "Melon Liqueur", zh: "蜜瓜利口酒" },
        amount: "30 ml",
      },
      {
        name: { en: "Banana Liqueur", zh: "香蕉利口酒" },
        amount: "15 ml",
      },
      {
        name: { en: "Coconut Liqueur", zh: "椰子利口酒" },
        amount: "15 ml",
      },
      {
        name: { en: "Sweet & Sour Mix", zh: "酸甜混合液" },
        amount: "15 ml",
      },
      {
        name: { en: "Pineapple Juice", zh: "菠萝汁" },
        amount: "75 ml",
      },
    ],
    steps: [
      {
        title: { en: "Muddle the Lime", zh: "捣碎青柠" },
        desc: {
          en: "Muddle 3 pieces of lime in a shaker.",
          zh: "在摇酒器中捣碎3片青柠。",
        },
      },
      {
        title: { en: "Add Ingredients", zh: "加入原料" },
        desc: {
          en: "Add melon liqueur, banana liqueur, coconut liqueur, sweet & sour mix, and pineapple juice.",
          zh: "加入蜜瓜利口酒、香蕉利口酒、椰子利口酒、酸甜混合液和菠萝汁。",
        },
      },
      {
        title: { en: "Shake", zh: "摇匀" },
        desc: {
          en: "Add ice and shake vigorously until well chilled.",
          zh: "加冰块，用力摇匀至充分冰凉。",
        },
      },
      {
        title: { en: "Strain", zh: "滤入" },
        desc: {
          en: "Strain into a highball glass with a long ice cube.",
          zh: "滤入装有长冰块的高球杯中。",
        },
      },
      {
        title: { en: "Serve", zh: "享用" },
        desc: {
          en: "Serve with a straw.",
          zh: "插入吸管即可享用。",
        },
      },
    ],
    story: {
      en: "A cyberpunk cocktail inspired by VA-11 HALL-A. A June Bug variation that is tropical and fruit-forward, with a smooth, creamy texture from the combination of melon, banana, and coconut liqueurs. The muddled lime adds a bright, citrusy note that cuts through the sweetness. A couple of these will make your tongue feel velvet-y; more of them and you'll be sleeping soundly.",
      zh: "一款灵感来自 VA-11 HALL-A 的赛博朋克鸡尾酒。这是六月虫的变体，热带风味、以水果为主，蜜瓜、香蕉和椰子利口酒的组合带来柔滑、奶油般的质地。捣碎的青柠增添了明亮的柑橘味，中和了甜味。一两口就足以取悦你的舌头，再喝多就可能会导致睡过头。",
    },
  },
];
