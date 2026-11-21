import SplitText from "@/components/ui/SplitText";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  intro?: string;
}

/** Shared page-top header: eyebrow label, animated title, optional intro. */
export default function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(560px 240px at 50% 0%, var(--hero-glow-1), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-5 pb-16 pt-24 text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
        <SplitText
          tag="h1"
          text={title}
          delay={38}
          duration={0.9}
          className="mt-3 font-display text-[clamp(32px,5.5vw,56px)] font-bold leading-[1.08] tracking-tight text-fg"
        />
        {intro && (
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-fg-2">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}
