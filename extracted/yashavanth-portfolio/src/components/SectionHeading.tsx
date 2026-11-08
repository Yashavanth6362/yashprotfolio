type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
};

export function SectionHeading({ eyebrow, title, description, light = false }: Props) {
  return (
    <div className={`section-heading${light ? ' section-heading--light' : ''}`}>
      <span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
