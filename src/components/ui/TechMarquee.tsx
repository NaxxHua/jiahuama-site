import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { TechIcon } from "@/data/techStack";

interface TechMarqueeProps {
  items: TechIcon[];
  /** Seconds for one full loop. Lower = faster. */
  speed?: number;
  /** Scroll direction. */
  direction?: "left" | "right";
  className?: string;
}

function Logo({ item }: { item: TechIcon }) {
  return (
    <div className="group/logo relative flex shrink-0 items-center justify-center">
      {/* Name label — pops above the icon on hover. */}
      <span
        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 scale-90 whitespace-nowrap rounded-md border border-accent-border bg-panel px-2.5 py-1 font-mono text-[11px] font-medium text-fg opacity-0 shadow-lg transition-all duration-200 ease-out group-hover/logo:scale-100 group-hover/logo:opacity-100"
        aria-hidden="true"
      >
        {item.name}
        <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-accent-border bg-panel" />
      </span>
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={item.name}
        className="h-9 w-9 text-fg-1 transition-all duration-200 ease-out group-hover/logo:scale-[1.18] group-hover/logo:text-accent"
        fill="currentColor"
      >
        <title>{item.name}</title>
        <path d={item.svgPath} />
      </svg>
    </div>
  );
}

/**
 * Infinite horizontal marquee of tech-stack logos (icons only). Pauses on
 * hover; hovering an individual icon pops up its name. Under
 * prefers-reduced-motion it renders a static, scrollable row instead.
 */
export default function TechMarquee({
  items,
  speed = 44,
  direction = "left",
  className = "",
}: TechMarqueeProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div
        className={`flex gap-12 overflow-x-auto px-2 py-12 ${className}`}
        role="list"
        aria-label="Tech stack"
      >
        {items.map((item) => (
          <div role="listitem" key={item.name}>
            <Logo item={item} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
      }}
      aria-label="Tech stack"
    >
      <div
        className="flex w-max items-center gap-12 py-12 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite ${
            direction === "right" ? "reverse" : "normal"
          }`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <Logo key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
