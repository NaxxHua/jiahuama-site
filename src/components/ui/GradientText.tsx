import type { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  gradient?: string;
  className?: string;
}

/**
 * Inline span that paints its text with a CSS gradient via background-clip.
 * `gradient-text-host` is targeted by a rule in index.css so GSAP-injected
 * .split-char descendants also pick up the gradient.
 */
export default function GradientText({
  children,
  gradient = "linear-gradient(135deg, rgb(var(--accent)) 0%, rgb(var(--accent-2)) 55%, #bfe3ff 100%)",
  className = "",
}: GradientTextProps) {
  return (
    <span
      className={`gradient-text-host bg-clip-text text-transparent ${className}`.trim()}
      style={{ backgroundImage: gradient }}
    >
      {children}
    </span>
  );
}
