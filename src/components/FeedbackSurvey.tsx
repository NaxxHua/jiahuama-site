import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { submitFeedback } from "@/lib/feedback";

// 问卷题目（中文，对应 design-docs/试玩反馈表.txt）。除昵称外全部可选。
type Field =
  | { id: string; q: string; type: "text" | "textarea" }
  | { id: string; q: string; type: "rating"; max: number }
  | { id: string; q: string; type: "choice"; options: string[] };

interface Section {
  title: string;
  fields: Field[];
}

const SECTIONS: Section[] = [
  {
    title: "A · 基本情况",
    fields: [
      { id: "device", q: "设备 / 系统", type: "text" },
      { id: "duration", q: "大概玩了多久", type: "text" },
      { id: "progress", q: "玩到哪", type: "choice", options: ["序章", "I.1", "I.2", "I.3", "通关第一章", "中途退了"] },
      { id: "deaths", q: "大概死了几次", type: "text" },
      { id: "quit_reason", q: "如果中途不玩了，是因为", type: "choice", options: ["卡住", "太难", "无聊", "没空", "bug"] },
    ],
  },
  {
    title: "B · 好不好玩（最重要）",
    fields: [
      { id: "combo", q: "有没有凑出一套让你觉得「我变强了 / 这套真爽」的组合？是哪一套？", type: "textarea" },
      { id: "path", q: "这把大概在走什么路子（先锋抽牌黑客 / 辉格中毒虚弱 / 森下重甲高伤 / 街头骰子弃牌散热 / 没特意凑）？", type: "textarea" },
      { id: "unwinnable", q: "有没有哪一把感觉「怎么凑都赢不了 / 组合突然废了」？什么情况？（这条超重要）", type: "textarea" },
      { id: "power_fantasy", q: "「变强、滚雪球」的爽感打分", type: "rating", max: 5 },
      { id: "variety", q: "每一把感觉够不够「不一样」？还是几把下来都差不多？", type: "textarea" },
    ],
  },
  {
    title: "C · 难度 & 运气",
    fields: [
      { id: "difficulty", q: "难度", type: "choice", options: ["太简单", "偏简单", "刚好", "偏难", "太难"] },
      { id: "death_feel", q: "你死的时候，更像「我没玩好」还是「游戏坑我 / 运气太差」？举个例子", type: "textarea" },
      { id: "bad_start", q: "有没有「开局抽得太烂，这把直接没法玩」的感觉？", type: "textarea" },
    ],
  },
  {
    title: "D · 手感（打击 / 出牌）",
    fields: [
      { id: "input_feel", q: "出牌方式（拖动卡牌到目标松手）顺不顺手", type: "rating", max: 5 },
      { id: "juice", q: "打击 / 击杀 / 过载无双引爆 / 骰子，哪个最爽、哪个最平？", type: "textarea" },
      { id: "unclear_combat", q: "战斗里有没有看不清、卡顿、不知道发生了什么的地方？", type: "textarea" },
    ],
  },
  {
    title: "E · 剧情 & 调性",
    fields: [
      { id: "story_hook", q: "开场和对话有没有勾住你？想不想知道后面", type: "rating", max: 5 },
      { id: "story_amount", q: "剧情量", type: "choice", options: ["太多想跳过", "刚好", "太少没感觉"] },
      { id: "voices", q: "「脑内进程」那些内心旁白（自我校验 / 江湖手腕 / 城市电波…）有意思还是干扰？", type: "textarea" },
    ],
  },
  {
    title: "F · 看不看得懂",
    fields: [
      { id: "learn_systems", q: "热力 / 过载 / 无双 / 内存 / 公司协同，大概多久搞懂？有没有一直没懂的？", type: "textarea" },
      { id: "glossary", q: "不认识的词，鼠标悬停能查到解释吗？够用吗？", type: "textarea" },
      { id: "confusing_ui", q: "哪个界面 / 数字 / 图标让你一头雾水？", type: "textarea" },
    ],
  },
  {
    title: "G · Bug / 卡死 / 错别字",
    fields: [
      { id: "bugs", q: "在哪个环节 + 怎么触发 + 发生了什么（越细越好）", type: "textarea" },
    ],
  },
  {
    title: "H · 总评",
    fields: [
      { id: "want_continue", q: "还想继续玩的欲望", type: "rating", max: 10 },
      { id: "best_point", q: "一句话，最爽的点是", type: "text" },
      { id: "worst_point", q: "一句话，最劝退 / 最烦的点是", type: "text" },
      { id: "recommend", q: "会推荐给喜欢杀戮尖塔 / 小丑牌的朋友吗", type: "choice", options: ["会", "不会", "看后续"] },
    ],
  },
  {
    title: "I · 随便吐槽",
    fields: [{ id: "misc", q: "想到啥写啥", type: "textarea" }],
  },
];

const inputCls =
  "w-full rounded-md border border-border bg-bg-1 px-3 py-2 text-[14px] text-fg outline-none transition-colors focus:border-border-strong";

export default function FeedbackSurvey() {
  const { t } = useLang();
  const f = t.game.feedback;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const set = (id: string, v: string) =>
    setAnswers((a) => ({ ...a, [id]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError(f.nameRequired);
      return;
    }
    setError(null);
    setState("sending");
    try {
      await submitFeedback({ name, answers });
      setState("done");
    } catch {
      setError(f.error);
      setState("idle");
    }
  }

  function reset() {
    setName("");
    setAnswers({});
    setState("idle");
    setError(null);
  }

  if (!open) {
    return (
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md border border-border px-4 py-2 text-[14px] text-fg-2 transition-colors hover:border-border-strong hover:text-fg"
        >
          {f.cta}
        </button>
      </div>
    );
  }

  if (state === "done") {
    return (
      <div className="mt-6 rounded-xl border border-border bg-bg-1 p-6 text-center">
        <p className="text-[15px] text-fg">{f.success}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded-md border border-border px-4 py-2 text-[13px] text-fg-2 transition-colors hover:border-border-strong hover:text-fg"
        >
          {f.another}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mt-6 rounded-xl border border-border bg-bg-1 p-5 sm:p-6"
    >
      <h2 className="font-display text-[18px] font-semibold text-fg">{f.title}</h2>
      <p className="mt-1 text-[13px] text-fg-3">{f.intro}</p>

      {/* 昵称（必填） */}
      <div className="mt-5">
        <label htmlFor="fb-name" className="mb-1.5 block text-[14px] font-medium text-fg-2">
          {f.name}
        </label>
        <input
          id="fb-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(null);
          }}
          placeholder={f.namePlaceholder}
          maxLength={60}
          className={inputCls}
        />
      </div>

      {SECTIONS.map((section) => (
        <fieldset key={section.title} className="mt-7">
          <legend className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-fg-3">
            {section.title}
          </legend>
          <div className="flex flex-col gap-4">
            {section.fields.map((field) => (
              <div key={field.id}>
                <label className="mb-1.5 block text-[14px] text-fg-2">{field.q}</label>
                {field.type === "text" && (
                  <input
                    value={answers[field.id] ?? ""}
                    onChange={(e) => set(field.id, e.target.value)}
                    className={inputCls}
                  />
                )}
                {field.type === "textarea" && (
                  <textarea
                    value={answers[field.id] ?? ""}
                    onChange={(e) => set(field.id, e.target.value)}
                    rows={3}
                    className={inputCls + " resize-y"}
                  />
                )}
                {field.type === "rating" && (
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from({ length: field.max }, (_, i) => String(i + 1)).map((n) => {
                      const active = answers[field.id] === n;
                      return (
                        <button
                          key={n}
                          type="button"
                          onClick={() => set(field.id, active ? "" : n)}
                          className={
                            "h-9 w-9 rounded-md border text-[13px] transition-colors " +
                            (active
                              ? "border-accent bg-bg-2 text-accent"
                              : "border-border text-fg-3 hover:border-border-strong hover:text-fg-2")
                          }
                        >
                          {n}
                        </button>
                      );
                    })}
                  </div>
                )}
                {field.type === "choice" && (
                  <div className="flex flex-wrap gap-1.5">
                    {field.options.map((opt) => {
                      const active = answers[field.id] === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => set(field.id, active ? "" : opt)}
                          className={
                            "rounded-md border px-3 py-1.5 text-[13px] transition-colors " +
                            (active
                              ? "border-accent bg-bg-2 text-accent"
                              : "border-border text-fg-3 hover:border-border-strong hover:text-fg-2")
                          }
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </fieldset>
      ))}

      {error && <p className="mt-4 text-[13px] text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-6 w-full rounded-md bg-fg px-4 py-3 text-[15px] font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {state === "sending" ? f.submitting : f.submit}
      </button>
    </form>
  );
}
