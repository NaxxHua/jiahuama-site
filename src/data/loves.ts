/**
 * Text I love, shown in the "Things I love" section on the About page.
 *
 * This is your own curated content — edit it freely. To show the full
 * passage, paste the text you'd like into `en` / `zh` below (line breaks are
 * preserved). It's seeded with the closing lines as a starting point.
 */
export interface Quote {
  /** English text. Newlines are rendered as line breaks. */
  en: string;
  /** Chinese text. */
  zh: string;
  /** Where it's from. */
  source: { en: string; zh: string };
  /** Optional sub-attribution (scene, speaker, etc.). */
  note?: { en: string; zh: string };
}

export const discoQuote: Quote = {
  // ↓ Paste the FULL passage you want shown here. The section displays the
  // field that matches the site's current language. (Seeded with the closing
  // lines as a placeholder — replace with as much as you'd like.)
  zh: "“哈里，我想给你写封信，这样你醒来就能看到了。也许它能让你感到开心。每天早晨我走出去的时候，你还在我身后酣睡，我感到一阵小小的悲伤。我把它攥在胸口，沿着远航路一路走……悲伤随着我卖出的每一步逐渐增长。当走到加油站时，悲伤已经充溢了我的脑海。我踏上轻轨，回头张望，看到集电弓上火花散落。我知道此情此景会一直持续至下午时分，直到我走下42路——回到你的身旁。你啊你。我每走一步，脚步就越发轻盈。几乎让我想要开始奔跑。我有时会这样做。不敢相信我会遇见你，不敢相信跟你在一起的那些快乐。你拥有如此浩瀚又博大的灵魂，而我也将一直，永远回到它身边。吻你，吻你，吻你。” 你感觉肺里的空气全都被抽干，大脑里的血液也被全部吸了出来。你周围的一切变得黑暗起来。一些小白点开始浮现……火花像白雪一样从弓形集电器上飘落下来。一辆有轨电车渐行渐远。",
  en: "“Harry, I wanted to write you a letter, so you can read it when you wake up. Maybe it will make you happy. Every morning when I step out and you're asleep behind me, I find a little piece of sadness in me. I carry it in my chest down Voyager Road... Every step I take, it grows. By the time I reach the fuel station it has filled me entirely. I step on the light rail and look back, sparks fall from the bow collector. I know it will be like this until late afternoon, when I get off the 42 -- and walk back to you... You, you... Every step I take will get lighter. It almost makes me run! Sometimes I do. I can't believe I met you. I can't believe the happiness I feel with you. You have a vast, vast soul and I will always, always, always come back to it. Kisses, kisses, kisses.” You feel the air sucked out of your lungs and the blood sucked out of your head. Everything around you gets dark. Small white dots appear...  Sparks fall like snow from the bow collector. A street-car distancing...",
  source: { en: "Disco Elysium", zh: "极乐迪斯科" },
  note: { en: "Dora's letter", zh: "朵拉的信" },
};
