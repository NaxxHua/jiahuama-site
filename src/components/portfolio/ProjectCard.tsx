import { ArrowUpRight, Check, type LucideIcon } from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";
import SpotlightCard from "@/components/ui/SpotlightCard";

export interface Project {
  org: string;
  role: string;
  period: string;
  title: string;
  summary: string;
  bullets: string[];
  tags: string[];
  link: string;
  linkLabel: string;
}

export default function ProjectCard({
  project,
  Icon,
}: {
  project: Project;
  Icon: LucideIcon;
}) {
  return (
    <BorderGlow>
      <SpotlightCard className="rounded-lg border border-border bg-panel p-7 transition-colors hover:border-border-strong">
        <div className="flex items-start gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-accent-border bg-accent-bg text-accent">
            <Icon size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
              {project.org} · {project.role} · {project.period}
            </p>
            <h3 className="mt-1 font-display text-[19px] font-semibold tracking-tight text-fg">
              {project.title}
            </h3>
          </div>
        </div>

        <p className="mt-4 text-[14px] leading-relaxed text-fg-1">
          {project.summary}
        </p>

        <ul className="mt-4 flex flex-col gap-2.5">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-2.5 text-[13.5px] leading-relaxed text-fg-2">
              <Check size={15} className="mt-0.5 shrink-0 text-accent" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border-2 bg-bg-2 px-2.5 py-1 font-mono text-[11.5px] text-fg-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-accent transition-colors hover:text-accent-2"
          >
            {project.linkLabel}
            <ArrowUpRight size={15} />
          </a>
        )}
      </SpotlightCard>
    </BorderGlow>
  );
}
