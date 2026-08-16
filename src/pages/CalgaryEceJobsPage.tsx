import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  ExternalLink,
  KeyRound,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";
import {
  CALGARY_ECE_JOBS,
  LIVE_SEARCH_LINKS,
  type JobTrack,
} from "@/data/calgaryEceJobs";

const PASSWORD_HASH =
  "2ed79aeb79cd7d3b59033a63430090ac28e23da6c33d20c4f60f3886393cee22";
const UNLOCK_KEY = "jiahuama:yuyuan-jobs:unlocked";
const APPLIED_KEY = "jiahuama:yuyuan-jobs:applied";

type Filter = "all" | JobTrack | "applied";

async function hashText(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [wrong, setWrong] = useState(false);
  const [checking, setChecking] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setChecking(true);
    const matches = (await hashText(password)) === PASSWORD_HASH;
    setChecking(false);
    if (matches) {
      sessionStorage.setItem(UNLOCK_KEY, "1");
      onUnlock();
    } else {
      setWrong(true);
    }
  }

  return (
    <section className="relative isolate overflow-hidden px-5 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-panel/90 p-6 shadow-[0_24px_80px_rgba(47,136,224,0.12)] backdrop-blur sm:p-8">
        <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
          <KeyRound size={22} />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          Private job board
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-fg">
          卡尔加里幼教岗位
        </h1>
        <p className="mt-2 text-sm leading-6 text-fg-2">
          输入访问密码，查看近期 ECE / daycare 岗位和直接申请入口。
        </p>

        <form onSubmit={submit} className="mt-7 space-y-3">
          <label htmlFor="job-board-password" className="sr-only">
            访问密码
          </label>
          <input
            id="job-board-password"
            type="password"
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setWrong(false);
            }}
            placeholder="访问密码"
            className="w-full rounded-lg border border-border bg-bg-1 px-4 py-3 text-[15px] text-fg outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
          />
          {wrong && (
            <p role="alert" className="text-sm text-danger">
              密码不对，再试一次。
            </p>
          )}
          <button
            type="submit"
            disabled={!password || checking}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-fg px-4 py-3 text-sm font-semibold text-bg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {checking ? "验证中…" : "进入岗位清单"}
            {!checking && <ArrowUpRight size={16} />}
          </button>
        </form>
        <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-fg-3">
          <ShieldCheck size={14} className="mt-0.5 shrink-0" />
          页面不出现在主导航和搜索索引中。密码是前端访问门槛，不是服务器级加密。
        </p>
      </div>
    </section>
  );
}

function JobCard({
  job,
  applied,
  onToggleApplied,
}: {
  job: (typeof CALGARY_ECE_JOBS)[number];
  applied: boolean;
  onToggleApplied: () => void;
}) {
  return (
    <article
      className={`flex h-full flex-col rounded-xl border p-5 transition ${
        applied
          ? "border-success/35 bg-success/5"
          : "border-border bg-panel hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                job.track === "verified"
                  ? "bg-accent/10 text-accent"
                  : "bg-bg-2 text-fg-2"
              }`}
            >
              {job.track === "verified" ? "明确岗位" : "持续收简历"}
            </span>
            {job.urgent && (
              <span className="rounded-full bg-warn/10 px-2.5 py-1 text-[11px] font-semibold text-warn">
                建议今天投
              </span>
            )}
          </div>
          <h2 className="mt-3 font-display text-lg font-semibold leading-6 text-fg">
            {job.title}
          </h2>
          <p className="mt-1 text-sm font-medium text-fg-1">{job.employer}</p>
        </div>
        <button
          type="button"
          onClick={onToggleApplied}
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition ${
            applied
              ? "border-success bg-success text-white"
              : "border-border text-fg-3 hover:border-success/50 hover:text-success"
          }`}
          aria-label={applied ? "标记为未投递" : "标记为已投递"}
          title={applied ? "已投递" : "标记为已投递"}
        >
          {applied ? <Check size={17} /> : <Circle size={17} />}
        </button>
      </div>

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex gap-2.5">
          <MapPin size={16} className="mt-0.5 shrink-0 text-fg-3" />
          <div>
            <dt className="sr-only">地点</dt>
            <dd className="text-fg-2">{job.location}</dd>
          </div>
        </div>
        <div className="flex gap-2.5">
          <BriefcaseBusiness size={16} className="mt-0.5 shrink-0 text-fg-3" />
          <div>
            <dt className="sr-only">薪资与工时</dt>
            <dd className="text-fg-2">
              {job.pay} · {job.schedule}
            </dd>
          </div>
        </div>
        <div className="flex gap-2.5">
          <Clock3 size={16} className="mt-0.5 shrink-0 text-fg-3" />
          <div>
            <dt className="sr-only">开始时间</dt>
            <dd className="text-fg-2">{job.start}</dd>
          </div>
        </div>
        <div className="flex gap-2.5">
          <BadgeCheck size={16} className="mt-0.5 shrink-0 text-fg-3" />
          <div>
            <dt className="sr-only">资格要求</dt>
            <dd className="text-fg-2">{job.certification}</dd>
          </div>
        </div>
      </dl>

      <p className="mt-5 rounded-lg bg-bg-1 px-3.5 py-3 text-[13px] leading-5 text-fg-2">
        <span className="font-semibold text-fg">匹配提示：</span>
        {job.fit}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <span className="text-xs text-fg-3">来源：{job.source}</span>
        <a
          href={job.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-fg px-3.5 py-2 text-sm font-semibold text-bg transition hover:opacity-85"
        >
          查看并申请
          <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}

export default function CalgaryEceJobsPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(UNLOCK_KEY) === "1");
    try {
      const saved = JSON.parse(localStorage.getItem(APPLIED_KEY) ?? "[]");
      if (Array.isArray(saved)) setAppliedIds(new Set(saved));
    } catch {
      setAppliedIds(new Set());
    }
  }, []);

  const visibleJobs = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return CALGARY_ECE_JOBS.filter((job) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "applied" ? appliedIds.has(job.id) : job.track === filter);
      const haystack = `${job.title} ${job.employer} ${job.location} ${job.certification}`.toLocaleLowerCase();
      return matchesFilter && (!needle || haystack.includes(needle));
    });
  }, [appliedIds, filter, query]);

  function toggleApplied(id: string) {
    setAppliedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem(APPLIED_KEY, JSON.stringify([...next]));
      return next;
    });
  }

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: `全部 ${CALGARY_ECE_JOBS.length}` },
    {
      id: "verified",
      label: `明确岗位 ${CALGARY_ECE_JOBS.filter((job) => job.track === "verified").length}`,
    },
    {
      id: "ongoing",
      label: `持续收简历 ${CALGARY_ECE_JOBS.filter((job) => job.track === "ongoing").length}`,
    },
    { id: "applied", label: `已投递 ${appliedIds.size}` },
  ];

  return (
    <div className="pb-20">
      <section className="relative isolate overflow-hidden border-b border-border bg-bg-1 px-5 py-12 sm:py-16">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-60" />
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-accent">
                <Sparkles size={16} />
                <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
                  Checked August 15, 2026
                </span>
              </div>
              <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                卡尔加里 ECE 求职清单
              </h1>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-fg-2">
                不用等搬家，也不用等实体 PGWP。先投、先约电话或视频初面；园方真要现场见面，再集中安排行程。
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem(UNLOCK_KEY);
                setUnlocked(false);
              }}
              className="self-start rounded-lg border border-border bg-panel px-3.5 py-2 text-xs font-medium text-fg-2 transition hover:border-border-strong hover:text-fg lg:self-auto"
            >
              锁定页面
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: <BadgeCheck size={18} />,
                title: "今天先办认证",
                text: "创建 Alberta.ca Account，申请阿省 ECE；让 Douglas 直接寄正式成绩单。",
              },
              {
                icon: <BriefcaseBusiness size={18} />,
                title: "今天先投 5 家",
                text: "优先投带“建议今天投”的岗位，简历写 Relocating to Calgary。",
              },
              {
                icon: <Video size={18} />,
                title: "先约线上初面",
                text: "说明目前在 Vancouver，可立即 Zoom / Teams，后期再安排到园。",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-panel p-4">
                <div className="text-accent">{item.icon}</div>
                <h2 className="mt-3 font-display text-sm font-semibold text-fg">
                  {item.title}
                </h2>
                <p className="mt-1.5 text-xs leading-5 text-fg-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-5 pt-9">
        <section aria-labelledby="status-copy-heading" className="rounded-xl border border-accent/20 bg-accent/5 p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={19} />
            <div>
              <h2 id="status-copy-heading" className="font-display text-sm font-semibold text-fg">
                求职状态可以直接这样写
              </h2>
              <p className="mt-2 font-mono text-xs leading-6 text-fg-1">
                Relocating to Calgary, AB · Available for virtual interviews immediately · Legally authorized to work full-time under IRCC R186(w) · No LMIA or employer sponsorship required
              </p>
              <p className="mt-2 text-xs leading-5 text-fg-3">
                阿省认证递交后，再加：Alberta ECE certification application in progress。
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="筛选岗位">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                  filter === item.id
                    ? "bg-fg text-bg"
                    : "border border-border bg-panel text-fg-2 hover:border-border-strong hover:text-fg"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <label className="relative block lg:w-72">
            <span className="sr-only">搜索岗位</span>
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-3" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索雇主、区域或等级"
              className="w-full rounded-full border border-border bg-panel py-2.5 pl-9 pr-4 text-xs text-fg outline-none transition placeholder:text-fg-3 focus:border-accent"
            />
          </label>
        </div>

        <p className="mt-4 text-xs leading-5 text-fg-3">
          岗位在 2026 年 8 月 15 日核对。招聘页面可能随时关闭；打开后如果显示已截止，就继续投下一家。
        </p>

        {visibleJobs.length > 0 ? (
          <section className="mt-5 grid gap-4 md:grid-cols-2" aria-label="岗位列表">
            {visibleJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                applied={appliedIds.has(job.id)}
                onToggleApplied={() => toggleApplied(job.id)}
              />
            ))}
          </section>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-border p-10 text-center text-sm text-fg-3">
            没有符合当前筛选的岗位。
          </div>
        )}

        <section className="mt-10 rounded-xl border border-border bg-bg-1 p-5 sm:p-6">
          <h2 className="font-display text-base font-semibold text-fg">继续看最新岗位</h2>
          <p className="mt-1 text-sm text-fg-2">这些搜索页会不断更新，按最新发布日期排序查看。</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {LIVE_SEARCH_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-panel px-3.5 py-2 text-xs font-semibold text-fg-1 transition hover:border-border-strong hover:text-fg"
              >
                {link.label}
                <ExternalLink size={13} />
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
