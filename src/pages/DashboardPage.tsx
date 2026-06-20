import { useEffect, useState } from "react";
import {
  getOverview,
  getBattles,
  getDeaths,
  getCards,
  getFunnel,
  getCompanies,
  getRelics,
  getHeat,
  getSkips,
  type Overview,
  type Battle,
  type NameCount,
  type FunnelStep,
  type CompanyCount,
  type RelicCount,
  type HeatBucket,
  type SkipCount,
} from "@/lib/dashboard";

const COMPANY_LABEL: Record<string, string> = {
  pioneer: "先锋",
  pflege: "辉格",
  morishita: "森下",
  street: "街头",
  neutral: "中立",
};

// 管理员暗号（你自己用，改成你想要的）。仅做遮挡——看板只展示聚合数字，不含原始反馈。
const ADMIN_CODE = "vat-admin-2026";
const STORAGE_KEY = "biav-dash-unlocked";

const FUNNEL_LABEL: Record<string, string> = {
  app_open: "打开游戏",
  run_start: "出发开局",
  battle_win: "赢过战斗",
  chapter_clear: "通关一章",
  demo_clear: "通关 Demo",
};

function Bar({ label, value, max, hint }: { label: string; value: number; max: number; hint?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="w-28 shrink-0 truncate text-[13px] text-fg-2" title={label}>{label}</div>
      <div className="relative h-6 flex-1 overflow-hidden rounded bg-bg-2">
        <div className="h-full rounded bg-accent/60" style={{ width: `${pct}%` }} />
      </div>
      <div className="w-20 shrink-0 text-right text-[13px] tabular-nums text-fg">
        {value}
        {hint && <span className="ml-1 text-fg-3">{hint}</span>}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 font-display text-[16px] font-semibold text-fg">{title}</h2>
      {children}
    </section>
  );
}

interface Data {
  overview: Overview;
  battles: Battle[];
  deaths: NameCount[];
  cards: NameCount[];
  funnel: FunnelStep[];
  companies: CompanyCount[];
  relics: RelicCount[];
  heat: HeatBucket[];
  skips: SkipCount[];
}

export default function DashboardPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [wrong, setWrong] = useState(false);

  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
  }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const [overview, battles, deaths, cards, funnel] = await Promise.all([
        getOverview(),
        getBattles(),
        getDeaths(),
        getCards(),
        getFunnel(),
      ]);
      // 新维度的 RPC 可能还没在 Supabase 跑过 → 各自兜底空数组，不拖垮整页
      const [companies, relics, heat, skips] = await Promise.all([
        getCompanies().catch(() => [] as CompanyCount[]),
        getRelics().catch(() => [] as RelicCount[]),
        getHeat().catch(() => [] as HeatBucket[]),
        getSkips().catch(() => [] as SkipCount[]),
      ]);
      setData({ overview, battles, deaths, cards, funnel, companies, relics, heat, skips });
    } catch (e) {
      setError(e instanceof Error ? e.message : "加载失败");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (unlocked) load();
  }, [unlocked]);

  if (!unlocked) {
    return (
      <section className="mx-auto max-w-sm px-5 py-20">
        <h1 className="mb-6 text-center font-display text-[20px] font-semibold text-fg">数据看板</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (code.trim() === ADMIN_CODE) {
              sessionStorage.setItem(STORAGE_KEY, "1");
              setUnlocked(true);
            } else setWrong(true);
          }}
          className="flex flex-col gap-3"
        >
          <input
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setWrong(false);
            }}
            placeholder="管理员暗号"
            className="rounded-md border border-border bg-bg-1 px-4 py-3 text-[15px] text-fg outline-none focus:border-border-strong"
          />
          {wrong && <p className="text-[13px] text-red-500">暗号不对。</p>}
          <button type="submit" className="rounded-md bg-fg px-4 py-3 text-[15px] font-medium text-bg hover:opacity-90">
            进入
          </button>
        </form>
      </section>
    );
  }

  const o = data?.overview;
  const maxFunnel = data ? Math.max(1, ...data.funnel.map((s) => s.n)) : 1;
  const maxDeath = data ? Math.max(1, ...data.deaths.map((d) => d.n)) : 1;
  const maxCard = data ? Math.max(1, ...data.cards.map((c) => c.n)) : 1;
  const maxCompany = data ? Math.max(1, ...data.companies.map((c) => c.cards)) : 1;
  const maxRelic = data ? Math.max(1, ...data.relics.map((r) => r.n)) : 1;
  const maxHeat = data ? Math.max(1, ...data.heat.map((h) => h.n)) : 1;
  const maxSkip = data ? Math.max(1, ...data.skips.map((s) => s.n)) : 1;

  // 按章聚合胜负
  const byChapter = new Map<number, { win: number; lose: number }>();
  for (const b of data?.battles ?? []) {
    const row = byChapter.get(b.chapter) ?? { win: 0, lose: 0 };
    if (b.result === "win") row.win += b.n;
    else row.lose += b.n;
    byChapter.set(b.chapter, row);
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-[22px] font-semibold text-fg">缸中之脑 · 数据看板</h1>
        <button
          onClick={load}
          disabled={loading}
          className="rounded-md border border-border px-3 py-1.5 text-[13px] text-fg-2 hover:border-border-strong hover:text-fg disabled:opacity-50"
        >
          {loading ? "刷新中…" : "刷新"}
        </button>
      </div>
      <p className="mt-1 text-[12px] text-fg-3">只展示匿名聚合；原始反馈内容请在 Supabase 后台看。</p>

      {error && (
        <p className="mt-6 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-[13px] text-red-500">
          {error}（确认已在 Supabase 跑过 supabase-dashboard.sql）
        </p>
      )}

      {o && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["玩家", o.players],
            ["会话", o.sessions],
            ["开局", o.runs],
            ["事件", o.events],
          ].map(([label, val]) => (
            <div key={label} className="rounded-lg border border-border bg-bg-1 p-3 text-center">
              <div className="text-[22px] font-semibold tabular-nums text-fg">{val}</div>
              <div className="text-[12px] text-fg-3">{label}</div>
            </div>
          ))}
        </div>
      )}

      {data && (
        <>
          <Section title="漏斗（玩家走到哪）">
            {data.funnel.map((s) => (
              <Bar key={s.step} label={FUNNEL_LABEL[s.step] ?? s.step} value={s.n} max={maxFunnel} />
            ))}
          </Section>

          <Section title="按章胜负">
            {[...byChapter.entries()].sort((a, b) => a[0] - b[0]).map(([ch, r]) => {
              const total = r.win + r.lose;
              const rate = total > 0 ? Math.round((r.win / total) * 100) : 0;
              return <Bar key={ch} label={`第 ${ch} 章`} value={r.win} max={total || 1} hint={`/ ${total}　胜率 ${rate}%`} />;
            })}
            {byChapter.size === 0 && <p className="text-[13px] text-fg-3">暂无战斗数据。</p>}
          </Section>

          <Section title="死因分布">
            {data.deaths.map((d) => (
              <Bar key={d.cause} label={d.cause ?? "?"} value={d.n} max={maxDeath} />
            ))}
            {data.deaths.length === 0 && <p className="text-[13px] text-fg-3">还没人死（或没数据）。</p>}
          </Section>

          <Section title="热门选牌（前 20）">
            {data.cards.map((c) => (
              <Bar key={c.card} label={c.card ?? "?"} value={c.n} max={maxCard} />
            ))}
            {data.cards.length === 0 && <p className="text-[13px] text-fg-3">暂无选牌数据。</p>}
          </Section>

          <Section title="玩家凑的流派（各公司牌数累计）">
            {data.companies.map((c) => (
              <Bar key={c.company} label={COMPANY_LABEL[c.company] ?? c.company} value={c.cards} max={maxCompany} />
            ))}
            {data.companies.length === 0 && <p className="text-[13px] text-fg-3">暂无（需在 Supabase 跑新版 supabase-dashboard.sql）。</p>}
          </Section>

          <Section title="热力峰值分布（有没有用增益区 / 过热）">
            {data.heat.map((h) => (
              <Bar key={h.bucket} label={h.bucket} value={h.n} max={maxHeat} />
            ))}
            {data.heat.length === 0 && <p className="text-[13px] text-fg-3">暂无（需跑新版 SQL）。</p>}
          </Section>

          <Section title="热门圣物（前 20）">
            {data.relics.map((r) => (
              <Bar key={r.relic} label={r.relic ?? "?"} value={r.n} max={maxRelic} />
            ))}
            {data.relics.length === 0 && <p className="text-[13px] text-fg-3">暂无（需跑新版 SQL）。</p>}
          </Section>

          <Section title="跳过奖励次数（做减法给钱用得多吗）">
            {data.skips.map((s) => (
              <Bar key={s.kind} label={s.kind} value={s.n} max={maxSkip} />
            ))}
            {data.skips.length === 0 && <p className="text-[13px] text-fg-3">暂无（需跑新版 SQL）。</p>}
          </Section>
        </>
      )}
    </section>
  );
}
