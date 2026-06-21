// Apply the zh-copy.md edits to translations.ts. Each changed value is matched
// as a complete quoted string literal ("old" -> "new") and only replaced when
// it appears exactly once, so nothing is touched by accident.
//   node scripts/apply-zh.mjs

import { readFile, writeFile } from "node:fs/promises";
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
  const put = (k, bi) => bi?.zh && (code[k] = bi.zh);
  put(`${p}.title`, r.title); put(`${p}.subtitle`, r.subtitle);
  put(`${p}.description`, r.description);
  if (r.glass) put(`${p}.glass`, r.glass);
  if (r.equivalent) put(`${p}.equivalent`, r.equivalent);
  r.ingredients.forEach((ing, i) => put(`${p}.ingredient[${i}]`, ing.name));
  r.steps.forEach((s, i) => { put(`${p}.step[${i}].title`, s.title); put(`${p}.step[${i}].desc`, s.desc); });
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
  if (!m) { i++; continue; }
  const key = m[1]; i++;
  const val = [];
  while (i < lines.length && !isBoundary(lines[i])) val.push(lines[i++]);
  mdVals[key] = val.join("\n");
}

const changes = Object.entries(mdVals)
  .filter(([k, v]) => k in code && code[k] !== v)
  .map(([key, nv]) => ({ key, old: code[key], new: nv }));

const FILES = { tr: "src/i18n/translations.ts", rc: "src/data/recipes.ts" };
const buf = {
  tr: await readFile(FILES.tr, "utf8"),
  rc: await readFile(FILES.rc, "utf8"),
};
const applied = [], manual = [];
for (const c of changes) {
  const target = c.key.startsWith("recipe.") ? "rc" : "tr";
  const needle = `"${c.old}"`;
  const count = buf[target].split(needle).length - 1;
  if (count === 1) {
    buf[target] = buf[target].replace(needle, () => `"${c.new}"`);
    applied.push(c.key);
  } else {
    manual.push(`${c.key} (found ${count}x in ${target})`);
  }
}
await writeFile(FILES.tr, buf.tr);
await writeFile(FILES.rc, buf.rc);
console.log(`apply-zh: ${applied.length} applied, ${manual.length} need manual`);
if (manual.length) console.log("MANUAL:\n  " + manual.join("\n  "));
