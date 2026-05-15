# CLAUDE.local.md — jiahuama.com 个人站项目规约

> 适用范围：本仓库 `src/` 下所有源码（React 18 + TypeScript 5 + Vite 6 + TailwindCSS 3）。
>
> 规则等级：
> - **MUST / 禁止** —— 强制项，违反视为缺陷。
> - **SHOULD / 推荐** —— 应当遵守；偏离需说明理由。
> - **MAY / 允许** —— 可选项。
>
> 本文件是项目级前端规约。改动技术选型（框架/路由/动效库/样式方案/数据层）须同步更新本文件。

---

## 0. 项目背景

个人作品集网站（jiahuama.com）。站长 Jiahua Ma —— Visa 设计工程师、游戏开发者、乒乓球运动员。
2026 年 5 月从 Astro 迁移到 Vite + React。设计目标：**专业克制的主页 + 酷炫的食谱区**，浅蓝色调，中英双语。

---

## 1. 技术栈基线

| 类别 | 选型 | 说明 |
|---|---|---|
| 构建 | Vite 6 | |
| UI | React 18 + TypeScript 5 | |
| 样式 | TailwindCSS 3 + CSS 变量 token | 类 shadcn 的 `--bg/--accent/...` 体系 |
| 路由 | react-router-dom 6 | |
| 滚动 | `lenis` | 平滑滚动，与 GSAP ticker 共用 |
| 动效 - 时间线/滚动 | `gsap` + `@gsap/react`（含 ScrollTrigger / SplitText） | |
| 动效 - React 组件 | `motion`（即 framer-motion） | |
| WebGL | `ogl` | 仅用于少数装饰背景（Threads / Liquid Chrome 等） |
| 图标 | `lucide-react` | |
| 后端 | `@supabase/supabase-js` | 仅留言板使用 |

- **MUST NOT** 引入 `three.js` / `@react-three/*` / `next.js`。如需 3D 须先在本文件登记选型变更。
- **MUST NOT** 未经登记新增动画库（已有 gsap / motion / ogl 足够）。
- **MUST** 新增依赖须评估 bundle 影响，优先复用现有依赖。

---

## 2. 目录结构

```
src/
  main.tsx              入口 + 主题/语言 bootstrap
  App.tsx               路由表
  index.css             设计 token + 全局样式
  pages/                路由级页面组件（HomePage.tsx / AboutPage.tsx / ...）
  components/
    ui/                 React Bits 移植件 + 设计系统原子
    layout/             Nav / Footer / PageShell
    home/               主页区块
    about/ portfolio/ contact/ recipes/ guestbook/   各页专属子组件
  hooks/                通用 hooks（useReducedMotion / useTheme / useLang / useLenis）
  i18n/                 LanguageContext + 文案字典
  data/                 recipes.ts 等静态数据
  lib/                  supabase.ts、纯工具函数
```

新增代码 **MUST** 落位：
- 路由级页面 → `pages/`，命名 `XxxPage.tsx`。
- 单页面专属子组件 → `components/<page>/`。
- 跨页复用组件 → `components/ui/`。
- 纯逻辑 hook → `hooks/`，命名 `useXxx.ts`。
- 静态数据 → `data/`；外部请求封装 → `lib/`。
- **MUST** 组件文件 `PascalCase.tsx`；hook `useXxx.ts`；纯工具 `camelCase.ts`。

---

## 3. 代码风格

- **MUST** 正确性 > 可读性 > 性能。
- **MUST** 同一段 JSX / 逻辑出现 ≥ 3 次必须抽象；但不为 DRY 强行合并不相关逻辑。
- **MUST** 单组件文件 > 300 行须拆分；单一职责。
- **MUST NOT** 使用 `any`；无法定型用 `unknown` + 收敛。
- **MUST NOT** 用 `as` 绕过类型错误（`as const`、类型收窄除外）。
- **MUST** 公共导出的组件 / 函数有显式类型。
- **MUST** 使用 `@/` 路径别名，禁止 `../../../` 长相对路径。
- **MUST** `useEffect` 不用于派生状态（能 `useMemo` 就不要 `effect + setState`）。
- **MUST** 副作用必须有清理函数（事件监听、定时器、rAF、WebGL context、Supabase 订阅）。

---

## 4. 样式与设计 Token

- **MUST** 颜色、圆角、间距走 `tailwind.config.js` 暴露的 token，token 背后是 `src/index.css` 的 CSS 变量（`--bg` `--fg` `--accent` `--panel` `--border-*` 等）。
- **MUST NOT** 在 JSX / CSS 写硬编码颜色（`#fff`、`rgb(...)`、`bg-[#...]`）。需要新颜色 → 先在 `index.css` 加变量，再加 tailwind token。
- **白名单例外**：React Bits 移植件自带的装饰 CSS 文件（如 `Threads` / `LiquidChrome` 的 shader 颜色、`StarBorder.css`）允许保留硬编码，但不再扩展。
- **MUST** 暗色样式通过 `dark:` 前缀（基于 `[data-theme="dark"]`），禁止用 JS 判断主题切 className 字符串。
- **MUST** 主题持久化用 `hooks/useTheme.ts`，storage key 统一 `jiahuama:` 前缀（`jiahuama:theme`）。
- **MUST** 图标统一用 `lucide-react`，禁止散落 svg / 其他图标库。
- **SHOULD** className 组合用 `clsx`。

---

## 5. 动效（Motion）

- **MUST** 滚动驱动 / 时间线编排 / 文字拆分用 `gsap`（ScrollTrigger / SplitText）；React 组件级过渡用 `motion`。
- **MUST** Lenis 与 GSAP ScrollTrigger 共用同一 ticker（`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add`），否则滚动动画抖帧。
- **MUST** 所有动效尊重 `prefers-reduced-motion`：通过 `hooks/useReducedMotion.ts` 短路动画或退化为简单淡入。WebGL 装饰背景在 reduce 下渲染静态回退。
- **MUST** WebGL 组件（ogl）在 unmount 时释放 context（`WEBGL_lose_context`）；离屏时暂停 rAF。
- **SHOULD** 动效 duration / easing 走少量预设常量，避免每组件自定义魔数。
- **原则**：专业感来自克制。每个动画应引导注意力或解释状态变化，不堆特效。

---

## 6. 可访问性与国际化（a11y / i18n）

- **MUST** 中英双语：所有面向用户的文案、`aria-label`、`alt` 经 i18n 取词（`useLang()` / 文案字典在 `src/i18n/`）。禁止在 JSX 硬编码用户可见文案。
- **MUST** 语言持久化 storage key `jiahuama:lang`。
- **MUST** 交互元素有可达 label；图片有 `alt`（装饰图 `alt="" aria-hidden`）。
- **MUST** 键盘可达，焦点可见。
- **MUST** 跑马灯 / 滚动条特效在 hover/focus 可暂停，且尊重 reduced-motion。
- **SHOULD** 颜色对比满足 WCAG AA，在 token 层把控。

---

## 7. 数据层（Supabase）

- **MUST** Supabase 仅用于留言板。client 单例封装在 `lib/supabase.ts`，组件不直接 new client。
- **MUST** 环境变量通过 `import.meta.env.VITE_*` 注入，只放公开可见的 anon key；service_role key 禁止进前端。
- **MUST** 留言板表启用 RLS：匿名可 `insert` + `select`，禁止 `update/delete`。
- **MUST** 缺少 Supabase 环境变量时降级为 localStorage（本地开发用），不得整页崩溃。
- **MUST** 用户输入（昵称 / 留言）渲染前做长度限制与转义，禁止 `dangerouslySetInnerHTML`。

---

## 8. UI / 交互一致性

- **MUST** 涉及异步的数据视图（留言板）须有 `loading` / `error` / `empty` 三态。
- **MUST** 接口失败不导致整页崩溃，局部 fallback。
- **MUST** 列表 `key` 用稳定业务 ID，禁止数组 index。
- **SHOULD** 复用 `components/ui/` 原子组件，新建同语义组件前先确认是否已有。

---

## 9. 安全

- **MUST NOT** 使用 `dangerouslySetInnerHTML`。
- **MUST NOT** 把 secret / service key / 内部 URL 写进仓库。
- **MUST NOT** 提交 `dist/` `node_modules/` `.env`。

---

## 10. Git 提交规范

- **MUST** 增量提交，一个 commit 只做一件事。
- **MUST** Conventional Commits：`feat:` `fix:` `refactor:` `docs:` `style:` `test:` `chore:`。
- **MUST** commit message（标题与正文）一律英文。
- **MUST NOT** 在 commit message 加 `Co-Authored-By:`、"Generated with Claude Code" 等任何 AI 署名。
- **MUST** 合入前本地跑通 `npm run build`（含 `tsc`）。

---

## 11. 变更本规则

改动以下任一项视为技术选型变更，**MUST** 同步更新本文件：框架 / 路由 / 状态方案 / 数据层 / 样式方案 / 动效库 / 图标库；storage key 命名（`jiahuama:` 前缀）；设计 token 体系；目录约定（§2）。
