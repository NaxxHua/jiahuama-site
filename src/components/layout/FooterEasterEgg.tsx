import PixelTransition from "@/components/ui/PixelTransition";
import { useLang } from "@/i18n/LanguageContext";

/**
 * Hidden footer easter egg — an invisible zone below the tagline. Moving the
 * cursor over it triggers a pixel-dissolve that reveals a small message.
 */
export default function FooterEasterEgg() {
  const { t } = useLang();

  return (
    <div className="mt-4 max-w-xs">
      <p className="text-[14px] leading-relaxed text-fg-2">
        {t.footer.tagline}
      </p>
      <PixelTransition
        className="mt-3 rounded-lg"
        aspectRatio="28%"
        gridSize={9}
        pixelColor="var(--accent)"
        animationStepDuration={0.35}
        firstContent={<span aria-hidden="true" />}
        secondContent={
          <span className="flex h-full w-full items-center justify-center font-mono text-[13px] text-accent">
            {t.footer.easterEgg}
          </span>
        }
      />
    </div>
  );
}
