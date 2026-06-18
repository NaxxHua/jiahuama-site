import { supabase } from "./supabase";

/**
 * 试玩反馈：写入 Supabase `playtest_feedback` 表。
 * 没配 Supabase（本地开发）时回退到 localStorage，方便先调 UI。
 *
 * 表结构（在 Supabase SQL Editor 跑一次，见 README/下方注释）：
 *   create table playtest_feedback (
 *     id uuid primary key default gen_random_uuid(),
 *     created_at timestamptz not null default now(),
 *     name text not null,
 *     answers jsonb not null default '{}'::jsonb,
 *     user_agent text
 *   );
 *   alter table playtest_feedback enable row level security;
 *   create policy "anon insert" on playtest_feedback
 *     for insert to anon with check (char_length(name) between 1 and 60);
 */

export const NAME_MAX = 60;

export interface FeedbackInput {
  name: string;
  /** 问题 id → 回答（字符串）。空回答会被过滤掉。 */
  answers: Record<string, string>;
}

const LS_KEY = "jiahuama:biav-feedback";

function readLocal(): unknown[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as unknown[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(rows: unknown[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(rows));
  } catch {
    /* storage full/unavailable — ignore */
  }
}

/** 去掉空白回答，姓名裁剪长度。 */
function clean(input: FeedbackInput): { name: string; answers: Record<string, string> } {
  const name = input.name.trim().slice(0, NAME_MAX);
  const answers: Record<string, string> = {};
  for (const [k, v] of Object.entries(input.answers)) {
    const t = (v ?? "").trim();
    if (t) answers[k] = t;
  }
  return { name, answers };
}

export async function submitFeedback(input: FeedbackInput): Promise<void> {
  const { name, answers } = clean(input);
  if (!name) throw new Error("name required");

  const user_agent =
    typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 300) : "";

  if (supabase) {
    const { error } = await supabase
      .from("playtest_feedback")
      .insert({ name, answers, user_agent });
    if (error) throw error;
    return;
  }

  // 本地回退
  writeLocal([
    { id: crypto.randomUUID(), name, answers, user_agent, created_at: new Date().toISOString() },
    ...readLocal(),
  ]);
}
