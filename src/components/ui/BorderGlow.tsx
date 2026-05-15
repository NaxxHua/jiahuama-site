/**
 * BorderGlow — soft halo + thin ring around a card, brightest on the side
 * facing the cursor. Inspired by React Bits BorderGlow (MIT).
 */
import { useCallback, useRef, type ReactNode, type PointerEvent } from "react";
import "./BorderGlow.css";

interface BorderGlowProps {
  children: ReactNode;
  className?: string;
}

export default function BorderGlow({ children, className = "" }: BorderGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    el.style.setProperty("--cursor-angle", `${angle.toFixed(1)}deg`);
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={`border-glow ${className}`}
    >
      {children}
    </div>
  );
}
