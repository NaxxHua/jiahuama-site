// Diff zh-copy.md against the current code values and print every changed
// string (key, old, new). Read-only — I apply the edits from this report.
//   node scripts/sync-zh.mjs

import { readFile } from "node:fs/promises";
import { translations } from "../src/i18n/translations.ts";
import { recipes } from "../src/data/recipes.ts";

const code = {};
function flatten(v, prefix) {
  if (typeof v === "string") code[prefix] = v;
  else if (Array.isArray(v)) v.forEach((x, i) => flatten(x, `${prefix}[${i}]`));
  else if (v && typeof v === "object")
    for (const [k, val] of Object.entries(v))
      flatten(val, prefix ? `${prefix}.${k}` : k);
}
flatten(translations.zh, "");

for (const r of recipes) {
  const p = `recipe.${r.id}`;
  const put = (k, bi) => {
    if (bi && typeof bi.zh === "string") code[k] = bi.zh;
  };
  put(`${p}.title`, r.title);
  put(`${p}.subtitle`, r.subtitle);
  put(`${p}.description`, r.description);
  if (r.glass) put(`${p}.glass`, r.glass);
  if (r.equivalent) put(`${p}.equivalent`, r.equivalent);
  r.ingredients.forEach((ing, i) => put(`${p}.ingredient[${i}]`, ing.name));
  r.steps.forEach((s, i) => {
    put(`${p}.step[${i}].title`, s.title);
    put(`${p}.step[${i}].desc`, s.desc);
  });
  put(`${p}.story`, r.story);
  (r.tips ?? []).forEach((t, i) => put(`${p}.tip[${i}]`, t));
}

const md = await readFile("zh-copy.md", "utf8");
const lines = md.split("\n");
const isKey = (l) => /^\*\*(.+?)\*\*$/.exec(l);
const isBoundary = (l) =>
  l.trim() === "" || isKey(l) || /^#{1,3} /.test(l) || /^---/.test(l) || /^> /.test(l);

const mdVals = {};
for (let i = 0; i < lines.length; ) {
  const m = isKey(lines[i]);
  if (!m) {
    i++;
    continue;
  }
  const key = m[1];
  i++;
  const val = [];
  while (i < lines.length && !isBoundary(lines[i])) val.push(lines[i++]);
  mdVals[key] = val.join("\n");
}

const changes = [];
const missing = [];
for (const [key, newVal] of Object.entries(mdVals)) {
  if (!(key in code)) {
    missing.push(key);
    continue;
  }
  if (code[key] !== newVal) changes.push({ key, old: code[key], new: newVal });
}

console.log(JSON.stringify(changes, null, 2));
console.log(`\n=== ${changes.length} changed, ${missing.length} md-keys-not-in-code ===`);
if (missing.length) console.log("MISSING:", missing.join(", "));
