import type { ComponentProps } from "react";
import { Link } from "react-router-dom";

// Tailwind-styled element map for rendered MDX post bodies. Passed to
// <MDXProvider> so posts get consistent typography without a plugin.
export const mdxComponents = {
  h2: (p: ComponentProps<"h2">) => (
    <h2
      className="mt-12 scroll-mt-24 font-display text-[26px] font-bold tracking-tight text-fg"
      {...p}
    />
  ),
  h3: (p: ComponentProps<"h3">) => (
    <h3
      className="mt-8 font-display text-[20px] font-semibold tracking-tight text-fg"
      {...p}
    />
  ),
  p: (p: ComponentProps<"p">) => (
    <p className="mt-5 text-[16px] leading-[1.75] text-fg-1" {...p} />
  ),
  ul: (p: ComponentProps<"ul">) => (
    <ul className="mt-5 flex list-disc flex-col gap-2 pl-5 text-[16px] leading-[1.7] text-fg-1 marker:text-fg-3" {...p} />
  ),
  ol: (p: ComponentProps<"ol">) => (
    <ol className="mt-5 flex list-decimal flex-col gap-2 pl-5 text-[16px] leading-[1.7] text-fg-1 marker:text-fg-3" {...p} />
  ),
  li: (p: ComponentProps<"li">) => <li className="pl-1" {...p} />,
  a: ({ href = "", ...rest }: ComponentProps<"a">) =>
    href.startsWith("/") ? (
      <Link
        to={href}
        className="text-accent underline-offset-2 hover:underline"
        {...rest}
      />
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="text-accent underline-offset-2 hover:underline"
        {...rest}
      />
    ),
  blockquote: (p: ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-6 border-l-2 border-accent-border pl-5 text-[17px] italic leading-relaxed text-fg-2"
      {...p}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  strong: (p: ComponentProps<"strong">) => (
    <strong className="font-semibold text-fg" {...p} />
  ),
  em: (p: ComponentProps<"em">) => <em className="italic" {...p} />,
  code: (p: ComponentProps<"code">) => (
    <code
      className="rounded bg-bg-2 px-1.5 py-0.5 font-mono text-[13.5px] text-fg"
      {...p}
    />
  ),
  pre: (p: ComponentProps<"pre">) => (
    <pre
      className="mt-6 overflow-x-auto rounded-lg border border-border bg-bg-1 p-4 font-mono text-[13.5px] leading-relaxed text-fg-1 [&_code]:bg-transparent [&_code]:p-0"
      {...p}
    />
  ),
  img: (p: ComponentProps<"img">) => (
    <img
      className="mt-6 w-full rounded-lg border border-border"
      loading="lazy"
      decoding="async"
      {...p}
    />
  ),
};
