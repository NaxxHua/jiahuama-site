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

function Pill({ item }: { item: TechIcon }) {
  return (
    <span className="flex shrink-0 items-center gap-2.5 rounded-full border border-border-2 bg-bg-1 px-4 py-2 font-mono text-[13px] text-fg-1">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 text-accent"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={item.svgPath} />
      </svg>
      {item.name}
    </span>
  );
}

/**
 * Infinite horizontal marquee of tech-stack logos. Pauses on hover/focus.
 * Under prefers-reduced-motion it renders a static, horizontally
 * scrollable row instead of animating.
 */
export default function TechMarquee({
  items,
  speed = 36,
  direction = "left",
  className = "",
}: TechMarqueeProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div
        className={`flex gap-3 overflow-x-auto py-1 ${className}`}
        role="list"
        aria-label="Tech stack"
      >
        {items.map((item) => (
          <div role="listitem" key={item.name}>
            <Pill item={item} />
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
        className="flex w-max gap-3 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <Pill key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
