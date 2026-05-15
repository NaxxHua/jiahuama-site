import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

export default function NotFoundPage() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-2xl px-5 py-32 text-center">
      <p className="font-mono text-[64px] font-bold text-accent">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-fg">
        {t.notFound.title}
      </h1>
      <p className="mt-2 text-fg-2">{t.notFound.body}</p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-lg bg-accent px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-accent-2"
      >
        {t.notFound.home}
      </Link>
    </section>
  );
}
