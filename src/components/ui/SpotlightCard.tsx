import type { CSSProperties, PointerEvent, PropsWithChildren } from "react";
import "./SpotlightCard.css";

interface SpotlightCardProps extends PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const trackingMedia = typeof window === "undefined" ? null : window.matchMedia(
  "(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)",
);

function updateSpotlight(event: PointerEvent<HTMLDivElement>) {
  const card = event.currentTarget;
  // Inside BorderGlow, the surface inherits coordinates from its steady outer box.
  if (event.pointerType === "touch" || !trackingMedia?.matches) return;
  if (card.closest(".border-glow-surface")) return;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
  card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(74, 163, 255, 0.15)",
}: SpotlightCardProps) {
  return (
    <div
      onPointerMove={updateSpotlight}
      className={`card-spotlight ${className}`}
      style={{ "--spotlight-color": spotlightColor } as CSSProperties}
    >
      {children}
    </div>
  );
}
