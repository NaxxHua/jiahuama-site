import { useLang } from "@/i18n/LanguageContext";

export default function PortfolioPage() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-6xl px-5 py-28 text-center">
      <h1 className="font-display text-4xl font-bold text-fg">
        {t.nav.portfolio}
      </h1>
    </section>
  );
}
