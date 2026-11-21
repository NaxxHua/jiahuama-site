import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { Maximize2, MapPin } from "lucide-react";
import { MatchCardDialog } from "@/components/matches/MatchCardDialog";
import { personalBestMatch as match } from "@/data/tableTennis";
import { useLang } from "@/i18n/LanguageContext";
import "./Hero.css";

const copy = {
  en: {
    location: "Austin, Texas", role: "Design engineer at Visa.",
    intro: "I build design systems and make games. Off the clock, I play table tennis and cook the dishes I grew up with in Xinjiang.",
    work: "View my work", about: "About me", gallery: "From my collection",
    tabs: ["Table tennis", "Kitchen", "Theatre"], card: "View match card", recipe: "Read recipe", play: "Theatre credits",
    photo: "Jiahua poised to serve over a blue table on a red court.",
    dish: "Chicken, peppers and potatoes cooking in a shallow pan.", poster: "Red and white poster for Rhinoceros in Love.",
    dishTitle: "Dapanji", dishNote: "Big plate chicken", dishMeta: "Xinjiang", dishType: "Recipe",
  },
  zh: {
    location: "美国，奥斯汀", role: "Visa 设计工程师。",
    intro: "平时做设计系统，业余做游戏。关了电脑，我爱去球馆打球，也爱做从小吃到大的新疆菜。",
    work: "看我的作品", about: "关于我", gallery: "个人收藏",
    tabs: ["乒乓球", "厨房", "剧场"], card: "查看比赛纪念卡", recipe: "看这道菜", play: "查看演出经历",
    photo: "红色场地上，家骅俯身在蓝色球桌前准备发球。",
    dish: "浅锅里炖着鸡肉、辣椒和土豆。", poster: "红白配色的《恋爱的犀牛》海报。",
    dishTitle: "大盘鸡", dishNote: "鸡肉、辣椒、土豆和皮带面", dishMeta: "新疆", dishType: "食谱",
  },
};

function Collection() {
  const { lang, t } = useLang();
  const [selected, setSelected] = useState(0);
  const [cardOpen, setCardOpen] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const c = copy[lang];
  const production = t.about.theater.rhinoceros;
  const slides = [
    { image: match.photo, alt: c.photo, action: c.card, title: `USATT ${match.rating}`, note: match.event,
      meta: "Personal best", detail: `${new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(match.date))} · ${match.wins}W / ${match.losses}L`, to: null, style: "tennis" },
    { image: "/big_plate_chicken.webp", alt: c.dish, action: c.recipe, title: c.dishTitle, note: c.dishNote,
      meta: c.dishType, detail: c.dishMeta, to: "/recipes/dapanji", style: "kitchen" },
    { image: "/theater-rhinoceros.webp", alt: c.poster, action: c.play, title: lang === "en" ? production.en : production.zh,
      note: t.about.theater.society, meta: lang === "en" ? "Production credit" : "演出职务", detail: production.credit, to: "/about#theatre", style: "theatre" },
  ];
  const slide = slides[selected];

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = slides.length - 1;
    const next = {
      ArrowRight: (index + 1) % slides.length, ArrowLeft: (index + last) % slides.length,
      Home: 0, End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  const picture = (
    <>
      <img key={slide.image} src={slide.image} alt={slide.alt} width="1122" height="1122"
        fetchPriority={selected === 0 ? "high" : "auto"} className="collection-image" />
      <span className="collection-action">
        {selected === 0 && <Maximize2 size={14} aria-hidden="true" />}
        {slide.action}
      </span>
    </>
  );

  return (
    <div className="collection">
      <div className="collection-tabs" role="tablist" aria-label={c.gallery}>
        {c.tabs.map((label, index) => (
          <button type="button" role="tab" aria-selected={selected === index} key={index}
            ref={(button) => { tabs.current[index] = button; }}
            aria-controls="collection-panel" id={`collection-tab-${index}`} tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)} onKeyDown={(event) => moveTab(event, index)}>
            {label}
          </button>
        ))}
      </div>
      <div id="collection-panel" role="tabpanel" aria-labelledby={`collection-tab-${selected}`}>
        {slide.to ? (
          <Link to={slide.to} className={`collection-frame collection-frame--${slide.style}`} aria-label={slide.action}>{picture}</Link>
        ) : (
          <button type="button" aria-label={c.card} aria-haspopup="dialog" className="collection-frame collection-frame--tennis" onClick={() => setCardOpen(true)}>
            {picture}
          </button>
        )}
        <div className="collection-caption" lang={selected === 0 ? "en" : lang}>
          <div>
            <p className="collection-meta">{slide.meta}</p>
            <p className="collection-title">{slide.title}</p>
            <p className="collection-note">{slide.note}</p>
          </div>
          <div className="collection-record">
            <p>{slide.detail}</p>
            {selected === 0 && <p>Photo cr. {match.credit}</p>}
          </div>
        </div>
      </div>
      <MatchCardDialog open={cardOpen} onClose={() => setCardOpen(false)} />
    </div>
  );
}

export default function Hero() {
  const { lang } = useLang();
  const c = copy[lang];
  return (
    <section className="home-masthead" aria-labelledby="home-name">
      <div className="home-intro">
        <p className="home-location"><MapPin size={15} strokeWidth={1.6} aria-hidden="true" />{c.location}</p>
        <h1 id="home-name" className="home-name" lang="en" aria-label="Jiahua Ma">
          <span>Jiahua</span>{" "}<em>Ma<span className="name-period" aria-hidden="true">.</span></em>
        </h1>
        <p className="home-role">{c.role}</p>
        <p className="home-bio">{c.intro}</p>
        <div className="home-intro-links">
          <Link to="/portfolio" className="home-work-link">{c.work}</Link>
          <Link to="/about" className="home-about-link">{c.about}</Link>
        </div>
      </div>
      <Collection />
    </section>
  );
}
