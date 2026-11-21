interface PageHeaderProps {
  eyebrow: string;
  title: string;
  intro?: string;
}

export default function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="page-masthead">
      <div className="page-masthead-inner">
        {eyebrow.toLowerCase() !== title.toLowerCase() && <p className="page-kicker">{eyebrow}</p>}
        <div className="page-masthead-copy">
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
        </div>
      </div>
    </header>
  );
}
