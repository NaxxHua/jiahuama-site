import { useId, useLayoutEffect, useRef } from 'react';
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
  const printRef = useRef<HTMLImageElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const closeTimer = useRef<number>();

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const print = printRef.current;
    if (!dialog || !print || !open) return;

    const opener = document.activeElement;
    const thumbnail = opener?.matches('button') ? opener.querySelector('img') : null;
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    const previousVisibility = thumbnail?.style.visibility ?? '';
    dialog.showModal();
    html.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });

    // The print's parent always stays in its final position, even in mid-flight.
    const locateThumbnail = () => {
      if (!thumbnail || !print.parentElement) return;
      const source = thumbnail.getBoundingClientRect();
      const target = print.parentElement.getBoundingClientRect();
      if (!source.width || !target.width) return;
      const x = source.left + source.width / 2 - target.left - target.width / 2;
      const y = source.top + source.height / 2 - target.top - target.height / 2;
      print.style.setProperty('--print-x', `${x}px`);
      print.style.setProperty('--print-y', `${y}px`);
      print.style.setProperty('--print-scale', String(source.width / target.width));
      thumbnail.style.visibility = 'hidden';
    };
    locateThumbnail();
    dialog.dataset.stage = 'ready';
    // Commit the measured start pose before enabling the entrance transition.
    void getComputedStyle(print).transform;
    dialog.dataset.stage = 'open';
    window.addEventListener('resize', locateThumbnail);
    return () => {
      window.removeEventListener('resize', locateThumbnail);
      window.clearTimeout(closeTimer.current);
      if (thumbnail) thumbnail.style.visibility = previousVisibility;
      html.style.overflow = previousOverflow;
      dialog.close();
      if (opener instanceof HTMLElement && opener.isConnected) {
        opener.focus({ preventScroll: true });
      }
    };
  }, [open]);

  if (!open) return null;

  function requestClose() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.dataset.stage === 'closing') return;
    dialog.dataset.stage = 'closing';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onClose();
      return;
    }
    // Also completes when the entrance is cancelled before the first paint.
    closeTimer.current = window.setTimeout(onClose, 360);
  }

  return (
    <dialog
      className="match-print-dialog"
      ref={dialogRef}
      aria-labelledby={titleId}
      data-lenis-prevent
      onCancel={(event) => { event.preventDefault(); requestClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) requestClose(); }}
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
          <button ref={closeRef} onClick={requestClose} type="button" aria-label={lang === 'zh' ? '关闭' : 'Close'}>
            <X size={20} aria-hidden="true" />
          </button>
        </header>
        <div className="match-print-sheet">
          <img
            ref={printRef}
            src={match.card}
            width="1122"
            height="1402"
            lang="en"
            alt={`Jiahua Ma preparing to serve. USATT career high ${match.rating} at the ${match.event}, November 7, 2026. ${match.wins} wins, ${match.losses} losses. Photo cr. ${match.credit}.`}
            onTransitionEnd={(event) => {
              if (event.propertyName === 'transform' && dialogRef.current?.dataset.stage === 'closing') {
                window.clearTimeout(closeTimer.current);
                onClose();
              }
            }}
          />
        </div>
        <a className="match-print-download" href={match.download} download="Jiahua-Ma-USATT-1831.png" ref={downloadRef}>
          <Download size={16} aria-hidden="true" />
          {lang === 'zh' ? '保存原图' : 'Save original'}
          <span>PNG</span>
        </a>
      </div>
    </dialog>
  );
}
