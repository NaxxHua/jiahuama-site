import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { recipes } from "@/data/recipes";
import { useLang } from "@/i18n/LanguageContext";
import "./Highlights.css";

const housePour = recipes.find((recipe) => recipe.id === "pile-driver");

function ProjectRow({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: ReactNode;
}) {
  const content = (
    <>
      <span className="work-index-name">{title}</span>
      <span className="work-index-field">{children}</span>
    </>
  );

  return (
    <li>
      {href.startsWith("/") ? (
        <Link to={href}>{content}</Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>
      )}
    </li>
  );
}

function BarFeature() {
  const { lang, t } = useLang();
  if (!housePour) return null;
  const recipe = housePour;

  return (
    <section aria-labelledby="bar-feature-heading" className="bar-feature">
      <div className="work-index-header">
        <h2 id="bar-feature-heading">{lang === "zh" ? "家里的吧台" : "From the bar"}</h2>
        <Link to="/recipes" className="work-index-inline-link">{t.nav.recipes}</Link>
      </div>
      <Link to={`/recipes/${recipe.id}`} className="bar-spread" aria-labelledby="bar-recipe-name">
        <div className="bar-spread-page">
          <p className="bar-spread-source">VA-11 HALL-A</p>
          <h3 id="bar-recipe-name">{recipe.title[lang]}</h3>
          <ul className="bar-spread-ingredients">
            {recipe.ingredients.map(({ amount, name }) => (
              <li key={name.en}>
                <span className="bar-spread-amount">{lang === "zh" && amount === "3 dashes" ? "3 滴" : amount}</span>
                <span>{name[lang]}</span>
              </li>
            ))}
          </ul>
          <span className="bar-spread-open">{lang === "zh" ? "查看调法" : "View recipe"}</span>
        </div>
        <div className="bar-spread-image">
          <img src={recipe.image} alt="" width="900" height="1600" loading="lazy" decoding="async" />
        </div>
      </Link>
    </section>
  );
}

export default function Highlights() {
  const { lang, t } = useLang();
  const projects = t.portfolio.projects;
  const zh = lang === "zh";

  return (
    <div className="work-index-spread" id="selected-work">
      <section aria-labelledby="work-index-heading">
        <div className="work-index-header">
          <h2 id="work-index-heading">{zh ? "精选作品" : "Selected work"}</h2>
          <Link to="/portfolio" className="work-index-inline-link">{t.nav.portfolio}</Link>
        </div>
        <ul className="work-index-list">
          <ProjectRow href="/portfolio#design-system" title="Visa Nova">
            {zh ? "Flutter 设计系统" : "Flutter design system"}
          </ProjectRow>
          <ProjectRow href="/game" title={zh ? "缸中之脑：重启" : "Brain in a Vat: Reboot"}>
            {zh ? "独立卡牌游戏" : "Card roguelite"}
          </ProjectRow>
          <ProjectRow href="/portfolio#psyspace" title="PsySpace">
            {zh ? "移动应用 · 联合创始人" : "Mobile app · Co-founder"}
          </ProjectRow>
          <ProjectRow href={projects.research.link} title={zh ? "用户能动性研究" : "User agency research"}>
            CSCW 2020
          </ProjectRow>
        </ul>
      </section>
      <BarFeature />
    </div>
  );
}
