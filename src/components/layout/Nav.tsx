import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Languages, Menu, Moon, Sun, X } from "lucide-react";
import clsx from "clsx";
import { useLang } from "@/i18n/LanguageContext";
import { useTheme, toggleTheme } from "@/hooks/useTheme";

export default function Nav() {
  const { t, lang, toggleLang } = useLang();
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname]);

  const links = [
    { to: "/about", label: t.nav.about },
    { to: "/portfolio", label: t.nav.portfolio },
    { to: "/recipes", label: t.nav.recipes },
    { to: "/blog", label: t.nav.blog },
    { to: "/contact", label: t.nav.contact },
    { to: "/guestbook", label: t.nav.guestbook },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      "rounded-md px-3 py-2 text-[14px] font-medium transition-colors",
      isActive
        ? "text-fg bg-bg-2"
        : "text-fg-2 hover:text-fg hover:bg-bg-2"
    );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          aria-label="Jiahua Ma — home"
        >
          <img src="/favicon.svg" alt="" className="h-9 w-9" />
          <span className="hidden font-display text-[15px] font-semibold tracking-tight text-fg sm:block">
            Jiahua Ma
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleLang}
            className="flex h-9 items-center gap-1.5 rounded-md px-2.5 text-[13px] font-medium text-fg-2 transition-colors hover:bg-bg-2 hover:text-fg"
            aria-label={t.nav.toggleLang}
          >
            <Languages size={16} />
            {lang === "en" ? "中文" : "EN"}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-md text-fg-2 transition-colors hover:bg-bg-2 hover:text-fg"
            aria-label={t.nav.toggleTheme}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-md text-fg-2 transition-colors hover:bg-bg-2 hover:text-fg md:hidden"
            aria-label={t.nav.menu}
            aria-expanded={open}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg px-5 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
