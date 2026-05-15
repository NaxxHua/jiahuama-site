import { Link } from "react-router-dom";
import ASCIIText from "@/components/ui/ASCIIText";
import { useLang } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function NotFoundPage() {
  const { t } = useLang();
  const reducedMotion = useReducedMotion();

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-5 py-20 text-center">
      <h1 className="sr-only">{t.notFound.title}</h1>

      <div className="relative h-72 w-full">
        {reducedMotion ? (
          <p className="grid h-full place-items-center font-display text-[120px] font-bold text-accent">
            404
          </p>
        ) : (
          <ASCIIText text="404" asciiFontSize={9} enableWaves />
        )}
      </div>

      <div className="mt-3 flex flex-col gap-1 font-mono text-[13px] text-fg-3">
        {t.notFound.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <Link
        to="/"
        className="mt-7 inline-flex rounded-lg bg-accent px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-accent-2"
      >
        {t.notFound.home}
      </Link>
    </section>
  );
}
