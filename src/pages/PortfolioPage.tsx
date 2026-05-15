import {
  Boxes,
  Brain,
  CreditCard,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ProjectCard from "@/components/portfolio/ProjectCard";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Reveal from "@/components/ui/Reveal";
import { useLang } from "@/i18n/LanguageContext";

type SkillKey = "languages" | "web" | "backend" | "ai" | "design";
const SKILL_ORDER: SkillKey[] = ["languages", "web", "backend", "ai", "design"];

type ProjectKey = "designSystem" | "plasma" | "psyspace" | "research";
const PROJECT_ORDER: { key: ProjectKey; Icon: LucideIcon }[] = [
  { key: "designSystem", Icon: CreditCard },
  { key: "plasma", Icon: Boxes },
  { key: "psyspace", Icon: Brain },
  { key: "research", Icon: GraduationCap },
];

export default function PortfolioPage() {
  const { t } = useLang();
  const p = t.portfolio;

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} intro={p.intro} />

      {/* Skills */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <h2 className="font-display text-[clamp(22px,3vw,30px)] font-bold tracking-tight text-fg">
            {p.skillsTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SKILL_ORDER.map((key) => {
              const group = p.skills[key];
              return (
                <div
                  key={key}
                  className="rounded-lg border border-border bg-panel p-5"
                >
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    {group.label}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-border-2 bg-bg-2 px-2.5 py-1 text-[12.5px] text-fg-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* Professional work */}
      <section className="border-t border-border bg-bg-1">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <h2 className="font-display text-[clamp(22px,3vw,30px)] font-bold tracking-tight text-fg">
              {p.workTitle}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {PROJECT_ORDER.map(({ key, Icon }, i) => (
              <Reveal key={key} delay={0.05 * i}>
                <ProjectCard project={p.projects[key]} Icon={Icon} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <h2 className="font-display text-[clamp(22px,3vw,30px)] font-bold tracking-tight text-fg">
            {p.eduTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[p.education.masters, p.education.bachelors].map((edu) => (
              <SpotlightCard
                key={edu.degree}
                className="rounded-lg border border-border bg-panel p-6 transition-colors hover:border-border-strong"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-accent-border bg-accent-bg text-accent">
                  <GraduationCap size={19} />
                </span>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
                  {edu.period}
                </p>
                <h3 className="mt-1 font-display text-[17px] font-semibold leading-snug text-fg">
                  {edu.degree}
                </h3>
                <p className="mt-1.5 text-[14px] text-fg-1">{edu.school}</p>
                <p className="mt-1 text-[13.5px] text-fg-2">{edu.detail}</p>
              </SpotlightCard>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
