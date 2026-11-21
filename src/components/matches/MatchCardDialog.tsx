import { useEffect, useId, useRef } from 'react';
import { Download, X } from 'lucide-react';
import { personalBestMatch as match } from '@/data/tableTennis';
import { useLang } from '@/i18n/LanguageContext';
import './MatchCardDialog.css';

interface MatchCardDialogProps {
  open: boolean;
  onClose: () => void;
}

export function MatchCardDialog({ open, onClose }: MatchCardDialogProps) {
  const { lang } = useLang();
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;

    const opener = document.activeElement;
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = previousOverflow;
      dialog.close();
      if (opener instanceof HTMLElement && opener.isConnected) {
        opener.focus({ preventScroll: true });
      }
    };
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      className="match-print-dialog"
      ref={dialogRef}
      aria-labelledby={titleId}
      data-lenis-prevent
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        if (event.shiftKey && event.target === closeRef.current) {
          event.preventDefault();
          downloadRef.current?.focus();
        } else if (!event.shiftKey && event.target === downloadRef.current) {
          event.preventDefault();
          closeRef.current?.focus();
        }
      }}
    >
      <div className="match-print-viewer">
        <header className="match-print-toolbar">
          <h2 id={titleId}>{lang === 'zh' ? '比赛纪念卡' : 'Match card'}</h2>
          <button ref={closeRef} onClick={onClose} type="button" aria-label={lang === 'zh' ? '关闭' : 'Close'}>
            <X size={20} aria-hidden="true" />
          </button>
        </header>
        <img
          src={match.card}
          width="1122"
          height="1402"
          lang="en"
          alt={`Jiahua Ma preparing to serve. USATT career high ${match.rating} at the ${match.event}, November 7, 2026. ${match.wins} wins, ${match.losses} losses. Photo cr. ${match.credit}.`}
        />
        <a className="match-print-download" href={match.download} download="Jiahua-Ma-USATT-1831.png" ref={downloadRef}>
          <Download size={16} aria-hidden="true" />
          {lang === 'zh' ? '保存原图' : 'Save original'}
          <span>PNG</span>
        </a>
      </div>
    </dialog>
  );
}
