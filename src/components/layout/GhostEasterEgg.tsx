import { useEffect, useRef } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A glowing "ghost" trail that follows the cursor inside the zone.
 * Pure canvas — no dependencies.
 */
function GhostZone() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = container.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const pos = { x: -200, y: -200 };
    let active = false;
    const trail: { x: number; y: number }[] = [];

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      pos.x = (e.clientX - r.left) * dpr;
      pos.y = (e.clientY - r.top) * dpr;
      active = true;
    };
    const onLeave = () => {
      active = false;
    };
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (active) trail.unshift({ x: pos.x, y: pos.y });
      else if (trail.length) trail.pop();
      while (trail.length > 26) trail.pop();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowColor = "rgba(140, 195, 255, 0.7)";
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        const fade = 1 - i / trail.length;
        ctx.beginPath();
        ctx.fillStyle = `rgba(150, 200, 255, ${fade * 0.5})`;
        ctx.shadowBlur = 14 * dpr;
        ctx.arc(p.x, p.y, (3 + fade * 13) * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative h-32 overflow-hidden rounded-lg border border-border-2 bg-bg-2"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <p className="pointer-events-none absolute inset-0 grid place-items-center font-mono text-[13px] text-fg-2">
        {t.footer.easterEgg}
      </p>
    </div>
  );
}

/**
 * Hidden footer easter egg — hovering the tagline reveals a ghost-cursor zone.
 */
export default function GhostEasterEgg() {
  const { t } = useLang();
  return (
    <div className="group/egg mt-4 max-w-xs">
      <p className="cursor-help text-[14px] leading-relaxed text-fg-2">
        {t.footer.tagline}
      </p>
      <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover/egg:mt-3 group-hover/egg:max-h-40 group-hover/egg:opacity-100">
        <GhostZone />
      </div>
    </div>
  );
}
