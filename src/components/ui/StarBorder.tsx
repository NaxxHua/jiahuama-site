/**
 * StarBorder — wraps a button/link with animated radial-gradient "comet"
 * trails along its edges. Ported from React Bits (MIT).
 * The face is styled by the consumer via `innerClassName`.
 */
import React from "react";
import "./StarBorder.css";

type StarBorderProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    className?: string;
    innerClassName?: string;
    children?: React.ReactNode;
    color?: string;
    speed?: React.CSSProperties["animationDuration"];
    thickness?: number;
  };

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  innerClassName = "",
  color = "rgb(var(--accent))",
  speed = "6s",
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";

  return (
    <Component
      className={`star-border-container ${className}`}
      {...(rest as Record<string, unknown>)}
      style={{
        padding: `${thickness}px 0`,
        ...((rest as { style?: React.CSSProperties }).style ?? {}),
      }}
    >
      <div
        className="border-gradient-bottom"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className={`inner-content ${innerClassName}`}>{children}</div>
    </Component>
  );
};

export default StarBorder;
