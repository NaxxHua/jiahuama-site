// Dump every editable Chinese string into zh-copy.md for hand-editing.
// Each entry is a `**key**` line followed by the current text. Edit the text,
// keep the keys, send it back, and the sync maps each key to its source.
//
//   node scripts/extract-zh.mjs

import { writeFile } from "node:fs/promises";
import { translations } from "../src/i18n/translations.ts";
import { recipes } from "../src/data/recipes.ts";

const SECTION_TITLE = {
  nav: "导航",
  game: "游戏页",
  footer: "页脚",
  common: "通用",
  notFound: "404 页",
  home: "首页",
  about: "关于页",
  portfolio: "作品集页",
  contact: "联系页",
  recipes: "食谱页（界面文字）",
  guestbook: "留言板",
  blog: "博客",
  palette: "命令面板",
};

const hasCJK = (s) => /[一-鿿]/.test(s);

function flatten(value, prefix, out) {
  if (typeof value === "string") {
    if (hasCJK(value)) out.push([prefix, value]);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      flatten(v, prefix ? `${prefix}.${k}` : k, out);
    }
  }
}

function block(key, text) {
  return `**${key}**\n${text}\n`;
}

const zh = translations.zh;
const lines = [];

lines.push("# 网站中文文案");
lines.push("");
lines.push("> 直接改下面每条的**文本**就行，别动 `**键名**`。改完把这个文件发我，我精准同步回代码（没改的不会动）。");
lines.push("> 英文我不碰；专有名词（Visa、VA-11 HALL-A、USATT 等）建议保留。");
lines.push("");

for (const section of Object.keys(zh)) {
  const out = [];
  flatten(zh[section], section, out);
  if (!out.length) continue;
  lines.push(`## ${SECTION_TITLE[section] ?? section}`);
  lines.push("");
  for (const [key, text] of out) lines.push(block(key, text));
}

// ── 食谱内容（你之前说不改，默认别动，要改才改）─────────────────
lines.push("---");
lines.push("");
lines.push("## 食谱内容（可选 · 你之前说不改）");
lines.push("");
lines.push("> 这部分是 10 道食谱本身的文字，默认别动。只有想改的那几条改掉就行。");
lines.push("");

const bi = (key, v) => {
  if (v && typeof v === "object" && typeof v.zh === "string") lines.push(block(key, v.zh));
};

for (const r of recipes) {
  lines.push(`### ${r.title.zh}（${r.id}）`);
  lines.push("");
  bi(`recipe.${r.id}.title`, r.title);
  bi(`recipe.${r.id}.subtitle`, r.subtitle);
  bi(`recipe.${r.id}.description`, r.description);
  if (r.glass) bi(`recipe.${r.id}.glass`, r.glass);
  if (r.equivalent) bi(`recipe.${r.id}.equivalent`, r.equivalent);
  r.ingredients.forEach((ing, i) => bi(`recipe.${r.id}.ingredient[${i}]`, ing.name));
  r.steps.forEach((s, i) => {
    bi(`recipe.${r.id}.step[${i}].title`, s.title);
    bi(`recipe.${r.id}.step[${i}].desc`, s.desc);
  });
  bi(`recipe.${r.id}.story`, r.story);
  (r.tips ?? []).forEach((t, i) => bi(`recipe.${r.id}.tip[${i}]`, t));
}

await writeFile("zh-copy.md", lines.join("\n") + "\n", "utf8");
const count = lines.filter((l) => l.startsWith("**")).length;
console.log(`extract-zh: wrote zh-copy.md (${count} strings)`);
