/**
 * Bilingual string dictionary. `en` defines the shape; `zh` must match it.
 * Page-specific sections are added as pages are built.
 */

export type Lang = "en" | "zh";

const en = {
  nav: {
    about: "About",
    portfolio: "Portfolio",
    recipes: "Recipes",
    contact: "Contact",
    guestbook: "Guestbook",
    menu: "Menu",
    toggleTheme: "Toggle theme",
    toggleLang: "Switch to Chinese",
  },
  footer: {
    tagline: "Design Engineer, game developer, and table tennis player.",
    sections: "Pages",
    elsewhere: "Elsewhere",
    builtWith: "Built with React, Vite & a lot of coffee.",
    rights: "All rights reserved.",
  },
  common: {
    backToRecipes: "Back to recipes",
    getInTouch: "Get in touch",
    skipToContent: "Skip to content",
  },
  notFound: {
    title: "Page not found",
    body: "The page you are looking for does not exist.",
    home: "Back home",
  },
  home: {
    eyebrow: "Hi, I'm",
    roles: ["Design Engineer", "Game Developer", "Table Tennis Player"],
    tagline:
      "I'm a design engineer at Visa, where I build polished, accessible interfaces. Off the clock I design games and chase the perfect topspin.",
    ctaWork: "View my work",
    ctaContact: "Get in touch",
    scroll: "Scroll",
    techLabel: "Tools & technologies I work with",
    highlightsTitle: "A few things I'm proud of",
    highlightsSub:
      "Spanning design engineering, games, research, and sport.",
    highlights: {
      visa: {
        tag: "2022 — Now",
        title: "Design Engineer at Visa",
        desc: "Building a cross-platform Flutter design system used across Visa's products — accessible tokens, components, and VGAR-compliant UI.",
      },
      game: {
        tag: "In progress",
        title: "An auto-chess game",
        desc: "Designing and building an auto-battler from scratch, headed for a Steam release.",
      },
      psyspace: {
        tag: "Co-founder",
        title: "PsySpace",
        desc: "Co-founded a mental-health platform connecting students with support. Led the Flutter app and front-end.",
      },
      research: {
        tag: "CSCW 2020",
        title: "Published HCI research",
        desc: "Co-authored a paper at CSCW 2020 on user agency, from the User Agency Lab at Penn State.",
      },
      tabletennis: {
        tag: "USATT",
        title: "Competitive table tennis",
        desc: "A rated USATT player — focus, footwork, and a relentless amount of topspin.",
      },
    },
    exploreTitle: "Explore the rest",
    explore: {
      portfolio: {
        title: "Portfolio",
        desc: "Tech stack, professional work, and the projects behind them.",
      },
      recipes: {
        title: "Recipes",
        desc: "A cyberpunk-themed collection of cocktails and dishes.",
      },
      about: {
        title: "About",
        desc: "The longer story — where I come from and what I care about.",
      },
    },
    stats: {
      years: "Years at Visa",
      recipes: "Recipes in the bar",
      game: "Game in the making",
    },
    ctaTitle: "Let's build something",
    ctaBody:
      "Always up for a conversation about design engineering, games, or a friendly hit of table tennis.",
  },
};

export type Dict = typeof en;

const zh: Dict = {
  nav: {
    about: "关于",
    portfolio: "作品集",
    recipes: "食谱",
    contact: "联系",
    guestbook: "留言板",
    menu: "菜单",
    toggleTheme: "切换主题",
    toggleLang: "切换到英文",
  },
  footer: {
    tagline: "设计工程师、游戏开发者，也是乒乓球爱好者。",
    sections: "页面",
    elsewhere: "在别处",
    builtWith: "用 React、Vite 和大量咖啡构建。",
    rights: "保留所有权利。",
  },
  common: {
    backToRecipes: "返回食谱",
    getInTouch: "联系我",
    skipToContent: "跳到主内容",
  },
  notFound: {
    title: "页面不存在",
    body: "你访问的页面不存在。",
    home: "返回首页",
  },
  home: {
    eyebrow: "你好，我是",
    roles: ["设计工程师", "游戏开发者", "乒乓球选手"],
    tagline:
      "我是 Visa 的一名设计工程师，打造精致、可访问的界面。工作之余我设计游戏，也在球台上追求那记完美的上旋。",
    ctaWork: "查看我的作品",
    ctaContact: "联系我",
    scroll: "向下滚动",
    techLabel: "我常用的工具与技术",
    highlightsTitle: "几件我引以为豪的事",
    highlightsSub: "横跨设计工程、游戏、研究与运动。",
    highlights: {
      visa: {
        tag: "2022 — 至今",
        title: "Visa 设计工程师",
        desc: "构建跨平台 Flutter 设计系统，服务于 Visa 的多个产品——可访问的设计令牌、组件与符合 VGAR 规范的界面。",
      },
      game: {
        tag: "进行中",
        title: "一款自走棋游戏",
        desc: "从零设计并开发一款自走棋游戏，目标是登陆 Steam。",
      },
      psyspace: {
        tag: "联合创始人",
        title: "PsySpace",
        desc: "联合创办一个连接学生与心理支持的平台，主导 Flutter 应用与前端。",
      },
      research: {
        tag: "CSCW 2020",
        title: "已发表的 HCI 研究",
        desc: "在 CSCW 2020 合著一篇关于用户能动性的论文，来自宾州州立 User Agency Lab。",
      },
      tabletennis: {
        tag: "USATT",
        title: "竞技乒乓球",
        desc: "USATT 注册选手——专注、步法，以及无穷无尽的上旋。",
      },
    },
    exploreTitle: "继续探索",
    explore: {
      portfolio: {
        title: "作品集",
        desc: "技术栈、职业经历，以及背后的项目。",
      },
      recipes: {
        title: "食谱",
        desc: "一个赛博朋克主题的鸡尾酒与菜肴合集。",
      },
      about: {
        title: "关于",
        desc: "更完整的故事——我从哪来，在意什么。",
      },
    },
    stats: {
      years: "在 Visa 的年头",
      recipes: "酒吧里的食谱",
      game: "正在做的游戏",
    },
    ctaTitle: "一起做点东西吧",
    ctaBody: "随时欢迎聊聊设计工程、游戏，或者来一场友谊乒乓球赛。",
  },
};

export const translations: Record<Lang, Dict> = { en, zh };
