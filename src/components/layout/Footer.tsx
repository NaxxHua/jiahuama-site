import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const SOCIAL = [
  { href: "https://github.com/NaxxHua", label: "GitHub", Icon: Github },
  {
    href: "https://www.linkedin.com/in/jiahua-ma/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  { href: "mailto:naxxhua@gmail.com", label: "Email", Icon: Mail },
];

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const pages = [
    { to: "/about", label: t.nav.about },
    { to: "/portfolio", label: t.nav.portfolio },
    { to: "/recipes", label: t.nav.recipes },
    { to: "/blog", label: t.nav.blog },
    { to: "/contact", label: t.nav.contact },
    { to: "/guestbook", label: t.nav.guestbook },
  ];

  return (
    <footer className="border-t border-border bg-bg-1">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <div className="flex items-center gap-2.5">
            <img src="/favicon.png" alt="" className="h-9 w-9 rounded-md" />
            <span className="font-display text-[15px] font-semibold text-fg">
              Jiahua Ma
            </span>
          </div>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-fg-2">
            {t.footer.tagline}
          </p>
        </div>

        <nav aria-label={t.footer.sections}>
          <h2 className="text-[12px] font-semibold uppercase tracking-wider text-fg-3">
            {t.footer.sections}
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {pages.map((p) => (
              <li key={p.to}>
                <Link
                  to={p.to}
                  className="text-[14px] text-fg-1 transition-colors hover:text-accent"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[12px] font-semibold uppercase tracking-wider text-fg-3">
            {t.footer.elsewhere}
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {SOCIAL.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-[14px] text-fg-1 transition-colors hover:text-accent"
                >
                  <Icon size={15} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-5 text-[12.5px] text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {year} Jiahua Ma. {t.footer.rights}
          </span>
          <span>{t.footer.builtWith}</span>
        </div>
      </div>
    </footer>
  );
}
