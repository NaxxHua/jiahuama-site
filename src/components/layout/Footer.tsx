import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import "./SiteShell.css";

export default function Footer() {
  const { t, lang } = useLang();
  const pages = [
    { to: "/about", label: t.nav.about },
    { to: "/portfolio", label: t.nav.portfolio },
    { to: "/recipes", label: t.nav.recipes },
    { to: "/blog", label: t.nav.blog },
    { to: "/game", label: t.nav.game },
    { to: "/contact", label: t.nav.contact },
    { to: "/guestbook", label: t.nav.guestbook },
  ];
  const socials = [
    { href: "https://github.com/NaxxHua", label: "GitHub", Icon: Github },
    { href: "https://www.linkedin.com/in/jiahua-ma/", label: "LinkedIn", Icon: Linkedin },
    { href: "mailto:naxxhua@gmail.com", label: lang === "zh" ? "电子邮件" : "Email", Icon: Mail },
  ];

  return (
    <footer className="site-footer">
      <div className="site-shell-frame site-footer-layout">
        <div className="site-footer-identity">
          <Link to="/" className="site-footer-name">Jiahua Ma</Link>
          <p>{t.footer.tagline}</p>
        </div>
        <nav aria-labelledby="footer-pages">
          <h2 id="footer-pages">{t.footer.sections}</h2>
          <ul className="site-footer-pages">
            {pages.map(({ to, label }) => (
              <li key={to}><Link to={to}>{label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2>{t.footer.elsewhere}</h2>
          <ul className="site-footer-socials">
            {socials.map(({ href, label, Icon }) => (
              <li key={href}>
                <a href={href} target={href.startsWith("https:") ? "_blank" : undefined} rel="noreferrer noopener">
                  <Icon size={15} aria-hidden="true" />{label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="site-footer-copyright">© {new Date().getFullYear()} Jiahua Ma. {t.footer.rights}</p>
      </div>
    </footer>
  );
}
