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
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={item.name}
      className="h-9 w-9 shrink-0 text-fg-1 transition-colors hover:text-accent"
      fill="currentColor"
    >
      <title>{item.name}</title>
      <path d={item.svgPath} />
    </svg>
  );
}

/**
 * Infinite horizontal marquee of tech-stack logos (icons only). Pauses on
 * hover/focus. Under prefers-reduced-motion it renders a static,
 * horizontally scrollable row instead of animating.
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
        className={`flex gap-10 overflow-x-auto py-2 ${className}`}
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
        className="flex w-max items-center gap-12 py-2 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <Logo key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
