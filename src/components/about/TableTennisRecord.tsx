import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { MatchCardDialog } from "@/components/matches/MatchCardDialog";
import { personalBestMatch as match } from "@/data/tableTennis";
import { useLang } from "@/i18n/LanguageContext";
import "./TableTennisRecord.css";

const labels = {
  en: {
    best: "USATT personal best",
    record: "Tournament record",
    milestone: "My first tournament finish above 1800.",
    open: "View match card",
  },
  zh: {
    best: "USATT 生涯最高分",
    record: "本场战绩",
    milestone: "打完这场比赛，我的积分第一次过了 1800。",
    open: "查看比赛卡片",
  },
};

export default function TableTennisRecord() {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const copy = labels[lang];
  const result = lang === "en" ? `${match.wins}W–${match.losses}L` : `${match.wins} 胜 ${match.losses} 负`;
  const date = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "zh-CN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(match.date));

  return (
    <>
      <article id="table-tennis" className="tennis-record" aria-labelledby="match-event">
        <button
          type="button"
          className="tennis-record__print"
          onClick={() => setOpen(true)}
          aria-label={copy.open}
          aria-haspopup="dialog"
        >
          <img src={match.card} alt="" width="1122" height="1402" loading="lazy" decoding="async" />
          <span className="tennis-record__zoom" aria-hidden="true">
            {copy.open}
            <Maximize2 size={16} strokeWidth={1.5} />
          </span>
        </button>
        <div className="tennis-record__detail">
          <div className="tennis-record__meta">
            <span>{t.about.facets.tabletennis.title}</span>
            <time dateTime={match.date}>{date}</time>
          </div>
          <h3 id="match-event" lang="en">{match.event}</h3>
          <p className="tennis-record__note">{copy.milestone}</p>
          <dl className="tennis-record__stats">
            <div>
              <dt>{copy.best}</dt>
              <dd>{match.rating}</dd>
            </div>
            <div>
              <dt>{copy.record}</dt>
              <dd>{result}</dd>
            </div>
          </dl>
          <p className="tennis-record__credit" lang="en">Photo cr. {match.credit}</p>
        </div>
      </article>
      <MatchCardDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
