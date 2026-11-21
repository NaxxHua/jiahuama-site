import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { useTheme, toggleTheme } from "@/hooks/useTheme";
import { OPEN_EVENT } from "@/components/ui/CommandPalette";
import "./SiteShell.css";

export default function Nav() {
  const { t, lang, toggleLang } = useLang();
  const theme = useTheme();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const homeLabel = lang === "zh" ? "马家骅 · 首页" : "Jiahua Ma · Home";
  const navLabel = lang === "zh" ? "主导航" : "Main navigation";
  const themeLabel = theme === "dark" ? t.palette.lightMode : t.palette.darkMode;

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const closeOutside = (event: Event) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("focusin", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("focusin", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  const links = [
    { to: "/about", label: t.nav.about },
    { to: "/portfolio", label: t.nav.portfolio },
    { to: "/recipes", label: t.nav.recipes },
    { to: "/blog", label: t.nav.blog },
    { to: "/game", label: t.nav.game },
    { to: "/contact", label: t.nav.contact },
    { to: "/guestbook", label: t.nav.guestbook },
  ];
  const pageLinks = links.map(({ to, label }) => (
    <NavLink key={to} to={to} className="site-nav-link" onClick={() => setOpen(false)}>
      {label}
    </NavLink>
  ));

  return (
    <header className="site-masthead" ref={headerRef}>
      <div className="site-shell-frame site-nav-bar">
        <Link to="/" className="site-signature" aria-label={homeLabel} onClick={() => setOpen(false)}>
          <span className="site-monogram" aria-hidden="true">jm</span>
          <span className="site-signature-name">Jiahua Ma</span>
        </Link>
        <nav className="site-nav-desktop" aria-label={navLabel}>
          {pageLinks}
        </nav>
        <div className="site-nav-tools">
          <button
            type="button"
            className="site-tool"
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new Event(OPEN_EVENT));
            }}
            aria-label={t.palette.open}
            aria-keyshortcuts="Meta+K Control+K"
            title={t.palette.open}
          >
            <Search size={17} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="site-tool site-language"
            onClick={toggleLang}
            aria-label={t.nav.toggleLang}
            title={t.nav.toggleLang}
          >
            <span lang={lang === "en" ? "zh" : "en"}>{lang === "en" ? "中文" : "EN"}</span>
          </button>
          <button
            type="button"
            className="site-tool"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
          >
            {theme === "dark" ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
          <button
            type="button"
            className="site-tool site-menu-toggle"
            ref={menuButton}
            onClick={() => setOpen((value) => !value)}
            aria-label={t.nav.menu}
            aria-controls="mobile-site-nav"
            aria-expanded={open}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-site-nav" aria-label={navLabel} className="site-nav-mobile" hidden={!open}>
        <div className="site-shell-frame">{pageLinks}</div>
      </nav>
    </header>
  );
}
