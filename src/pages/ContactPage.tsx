import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Reveal from "@/components/ui/Reveal";
import { useLang } from "@/i18n/LanguageContext";

const EMAIL = "naxxhua@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/jiahua-ma/";
const GITHUB = "https://github.com/NaxxHua";

const cardClass =
  "group relative rounded-lg border border-border bg-panel p-6 transition-colors hover:border-border-strong";
const iconClass =
  "grid h-11 w-11 place-items-center rounded-lg border border-accent-border bg-accent-bg text-accent";

export default function ContactPage() {
  const { t } = useLang();
  const c = t.contact;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the address is still visible to copy by hand */
    }
  };

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

      <section className="mx-auto max-w-3xl px-5 py-20">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Email — copy to clipboard */}
            <SpotlightCard className={cardClass}>
              <span className={iconClass}>
                <Mail size={20} />
              </span>
              <h2 className="mt-4 font-display text-[16px] font-semibold text-fg">
                {c.methods.email.label}
              </h2>
              <p className="mt-1 break-all font-mono text-[13px] text-fg-2">
                {c.methods.email.value}
              </p>
              <button
                type="button"
                onClick={copyEmail}
                className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-border-2 bg-bg-2 px-3 py-1.5 text-[13px] font-medium text-fg-1 transition-colors hover:border-border-strong hover:text-fg"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-accent" />
                    {c.copied}
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    {c.copy}
                  </>
                )}
              </button>
            </SpotlightCard>

            {/* LinkedIn */}
            <SpotlightCard className={cardClass}>
              <span className={iconClass}>
                <Linkedin size={20} />
              </span>
              <h2 className="mt-4 flex items-center gap-1.5 font-display text-[16px] font-semibold text-fg">
                {c.methods.linkedin.label}
                <ArrowUpRight
                  size={15}
                  className="text-fg-3 transition-colors group-hover:text-accent"
                />
              </h2>
              <p className="mt-1 font-mono text-[13px] text-fg-2">
                {c.methods.linkedin.value}
              </p>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer noopener"
                className="absolute inset-0"
                aria-label={c.methods.linkedin.label}
              />
            </SpotlightCard>

            {/* GitHub */}
            <SpotlightCard className={cardClass}>
              <span className={iconClass}>
                <Github size={20} />
              </span>
              <h2 className="mt-4 flex items-center gap-1.5 font-display text-[16px] font-semibold text-fg">
                {c.methods.github.label}
                <ArrowUpRight
                  size={15}
                  className="text-fg-3 transition-colors group-hover:text-accent"
                />
              </h2>
              <p className="mt-1 font-mono text-[13px] text-fg-2">
                {c.methods.github.value}
              </p>
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer noopener"
                className="absolute inset-0"
                aria-label={c.methods.github.label}
              />
            </SpotlightCard>

            {/* Location */}
            <SpotlightCard className={cardClass}>
              <span className={iconClass}>
                <MapPin size={20} />
              </span>
              <h2 className="mt-4 font-display text-[16px] font-semibold text-fg">
                {c.methods.location.label}
              </h2>
              <p className="mt-1 font-mono text-[13px] text-fg-2">
                {c.methods.location.value}
              </p>
            </SpotlightCard>
          </div>

          <p className="mt-8 text-center text-[14px] text-fg-2">{c.closing}</p>
        </Reveal>
      </section>
    </>
  );
}
