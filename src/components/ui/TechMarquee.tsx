import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TechMarqueeProps {
  items: string[];
  /** Seconds for one full loop. Lower = faster. */
  speed?: number;
  /** Scroll direction. */
  direction?: "left" | "right";
  className?: string;
}

/**
 * Infinite horizontal marquee of tech-stack pills. Pauses on hover/focus.
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

  const Pill = ({ label }: { label: string }) => (
    <span
      className="flex shrink-0 items-center gap-2 rounded-full border border-border-2 bg-bg-1 px-4 py-2 font-mono text-[13px] text-fg-1"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
      {label}
    </span>
  );

  if (reducedMotion) {
    return (
      <div
        className={`flex gap-3 overflow-x-auto py-1 ${className}`}
        role="list"
        aria-label="Tech stack"
      >
        {items.map((label) => (
          <div role="listitem" key={label}>
            <Pill label={label} />
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
        {[...items, ...items].map((label, i) => (
          <Pill key={`${label}-${i}`} label={label} />
        ))}
      </div>
    </div>
  );
}
