import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import "./BorderGlow.css";

interface BorderGlowProps {
  children: ReactNode;
  className?: string;
}

const canTrackPointer = "(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)";

export default function BorderGlow({ children, className = "" }: BorderGlowProps) {
  const frame = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function track(event: PointerEvent<HTMLDivElement>) {
    const host = event.currentTarget;
    if (host.dataset.tracking === undefined || event.pointerType === "touch") return;
    pointer.current.x = event.clientX;
    pointer.current.y = event.clientY;
    if (frame.current) return;

    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      // Measure the fixed host while its inner surface tilts.
      const { left, top, width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      const x = Math.max(0, Math.min(1, (pointer.current.x - left) / width));
      const y = Math.max(0, Math.min(1, (pointer.current.y - top) / height));
      const angle = Math.atan2((y - 0.5) * height, (x - 0.5) * width) * 180 / Math.PI;
      host.style.setProperty("--cursor-angle", `${angle + 90}deg`);
      host.style.setProperty("--mouse-x", `${x * 100}%`);
      host.style.setProperty("--mouse-y", `${y * 100}%`);
      host.style.setProperty("--tilt-x", `${(0.5 - y) * 4}deg`);
      host.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
    });
  }

  function enter(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || !window.matchMedia(canTrackPointer).matches) return;
    event.currentTarget.dataset.tracking = "";
    track(event);
  }

  function release(event: PointerEvent<HTMLDivElement>) {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    delete event.currentTarget.dataset.tracking;
  }

  return (
    <div
      className={`border-glow ${className}`}
      onPointerEnter={enter}
      onPointerMove={track}
      onPointerLeave={release}
      onPointerCancel={release}
    >
      <div className="border-glow-surface">{children}</div>
    </div>
  );
}
