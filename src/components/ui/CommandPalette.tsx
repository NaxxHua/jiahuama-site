import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  FolderGit2,
  Home,
  Languages,
  Mail,
  Martini,
  MessageSquare,
  Moon,
  Search,
  Sun,
  User,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { useTheme, toggleTheme } from "@/hooks/useTheme";
import { recipes } from "@/data/recipes";
import { posts, resolvePostLang } from "@/lib/blog";

export const OPEN_EVENT = "command-palette:open";

interface Item {
  id: string;
  label: string;
  group: string;
  Icon: LucideIcon;
  keywords: string;
  run: () => void;
}

export default function CommandPalette() {
  const navigate = useNavigate();
  const { t, lang, toggleLang } = useLang();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const items = useMemo<Item[]>(() => {
    const go = (to: string) => () => {
      setOpen(false);
      navigate(to, { viewTransition: true });
    };

    const nav: Item[] = [
      { label: lang === "zh" ? "首页" : "Home", Icon: Home, to: "/" },
      { label: t.nav.about, Icon: User, to: "/about" },
      { label: t.nav.portfolio, Icon: FolderGit2, to: "/portfolio" },
      { label: t.nav.recipes, Icon: Martini, to: "/recipes" },
      { label: t.nav.blog, Icon: FileText, to: "/blog" },
      { label: t.nav.contact, Icon: Mail, to: "/contact" },
      { label: t.nav.guestbook, Icon: MessageSquare, to: "/guestbook" },
    ].map((n) => ({
      id: `nav-${n.to}`,
      label: n.label,
      group: t.palette.pages,
      Icon: n.Icon,
      keywords: `${n.label} ${n.to}`,
      run: go(n.to),
    }));

    const recipeItems: Item[] = recipes.map((r) => ({
      id: `recipe-${r.id}`,
      label: r.title[lang],
      group: t.nav.recipes,
      Icon: Martini,
      keywords: `${r.title.en} ${r.title.zh}`,
      run: go(`/recipes/${r.id}`),
    }));

    const postItems: Item[] = posts.map((p) => ({
      id: `post-${p.slug}`,
      label: p.langs[resolvePostLang(p, lang)]!.title,
      group: t.nav.blog,
      Icon: FileText,
      keywords: `${p.langs.en?.title ?? ""} ${p.langs.zh?.title ?? ""} ${p.tags.join(" ")}`,
      run: go(`/blog/${p.slug}`),
    }));

    const actions: Item[] = [
      {
        id: "action-theme",
        label: theme === "dark" ? t.palette.lightMode : t.palette.darkMode,
        group: t.palette.actions,
        Icon: theme === "dark" ? Sun : Moon,
        keywords: "theme dark light 主题 切换 明暗",
        run: () => {
          toggleTheme();
          setOpen(false);
        },
      },
      {
        id: "action-lang",
        label: t.nav.toggleLang,
        group: t.palette.actions,
        Icon: Languages,
        keywords: "language 语言 中文 english 切换",
        run: () => {
          toggleLang();
          setOpen(false);
        },
      },
    ];

    return [...nav, ...recipeItems, ...postItems, ...actions];
  }, [t, lang, theme, navigate, toggleLang]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) =>
        it.label.toLowerCase().includes(q) ||
        it.keywords.toLowerCase().includes(q)
    );
  }, [items, query]);

  // Open via ⌘K / Ctrl+K and the nav trigger; close on Esc.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        restoreFocus.current = document.activeElement as HTMLElement;
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => {
      restoreFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  // Reset on open + focus the input; restore focus on close.
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      restoreFocus.current?.focus?.();
    }
  }, [open]);

  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]">
      <div
        className="absolute inset-0 animate-[palette-fade_140ms_ease-out] bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.palette.title}
        className="relative w-full max-w-xl animate-[palette-in_160ms_cubic-bezier(0.16,1,0.3,1)] overflow-hidden rounded-xl border border-border-strong bg-panel shadow-[0_20px_70px_-15px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center gap-2.5 border-b border-border px-4">
          <Search size={17} className="shrink-0 text-fg-3" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder={t.palette.placeholder}
            className="w-full bg-transparent py-3.5 text-[15px] text-fg outline-none placeholder:text-fg-3"
            aria-label={t.palette.placeholder}
          />
        </div>

        <ul ref={listRef} className="max-h-[52vh] overflow-y-auto p-2" role="listbox">
          {filtered.length === 0 && (
            <li className="px-3 py-6 text-center text-[14px] text-fg-3">
              {t.palette.empty}
            </li>
          )}
          {filtered.map((it, i) => (
            <li key={it.id} role="option" aria-selected={i === active}>
              <button
                type="button"
                data-active={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => it.run()}
                className={
                  "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors " +
                  (i === active ? "bg-bg-2" : "hover:bg-bg-2/60")
                }
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border bg-bg-1 text-fg-2">
                  <it.Icon size={15} />
                </span>
                <span className="flex-1 truncate text-[14px] text-fg">
                  {it.label}
                </span>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-fg-3">
                  {it.group}
                </span>
                <ArrowRight
                  size={14}
                  className={
                    "shrink-0 text-fg-3 transition-opacity " +
                    (i === active ? "opacity-100" : "opacity-0")
                  }
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
