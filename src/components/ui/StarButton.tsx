import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import StarBorder from "./StarBorder";

interface StarButtonProps {
  children: ReactNode;
  /** Internal route. */
  to?: string;
  /** External URL. */
  href?: string;
  onClick?: () => void;
  /** Button type when rendered as a <button> (no `to`/`href`). */
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

const FACE =
  "inline-flex items-center justify-center gap-2 rounded-[9px] bg-bg-1 px-5 py-3 text-[14px] font-semibold text-fg-1 transition-colors hover:text-fg";

/**
 * Secondary call-to-action button wrapped in StarBorder's animated comet
 * trails. Renders as a router Link, an external anchor, or a button.
 */
export default function StarButton({
  children,
  to,
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: StarButtonProps) {
  if (to) {
    return (
      <StarBorder
        as={Link}
        to={to}
        color="rgb(var(--accent))"
        speed="5s"
        className={className}
        innerClassName={FACE}
      >
        {children}
      </StarBorder>
    );
  }
  if (href) {
    return (
      <StarBorder
        as="a"
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        color="rgb(var(--accent))"
        speed="5s"
        className={className}
        innerClassName={FACE}
      >
        {children}
      </StarBorder>
    );
  }
  return (
    <StarBorder
      as="button"
      type={type}
      onClick={onClick}
      disabled={disabled}
      color="rgb(var(--accent))"
      speed="5s"
      className={`${className} ${disabled ? "pointer-events-none opacity-60" : ""}`}
      innerClassName={FACE}
    >
      {children}
    </StarBorder>
  );
}
