import { Link } from "react-router-dom";
import { InsightCard } from "./Cards";

/* The reference draws this slab's grey "wave" with no image at all — it is a
   flat polygon clipped over the white section, with the curve sampled at nine
   percentage stops. The mascot is parked on the container's right edge and
   hangs above the section, so it overlaps the prose band before it. Their cards
   are white boxes wearing a 5px white border, artwork bleeding into the top
   corners and the copy panel pulled 20px up over it, and the tag row sits in an
   inset grey panel at the foot of the card. */
export default function InsightsBand({ title, cta, to, articles = [], variant = "blog" }) {
  const plain = variant === "plain";
  const byDate = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
  const recent = new Set(byDate.slice(0, 2).map((article) => article.slug));

  return (
    <section className={`insight-band${plain ? " insight-band--plain" : ""}`}>
      {!plain && <div className="insight-band-wave" aria-hidden="true" />}
      <svg className="insight-band-flair" viewBox="0 0 221 200" aria-hidden="true">
        <path
          className="flair-moon"
          d="M150 12a86 86 0 1 0 24 162 94 94 0 0 1-24-162z"
        />
        <g transform="rotate(34 110 104)">
          <path
            className="flair-hull"
            d="M110 26c23 19 34 46 34 75 0 16-3 31-9 45H85c-6-14-9-29-9-45 0-29 11-56 34-75z"
          />
          <circle className="flair-window" cx="110" cy="84" r="15" />
          <path className="flair-fin" d="M76 116c-15 8-23 22-25 37l25-9z" />
          <path className="flair-fin" d="M144 116c15 8 23 22 25 37l-25-9z" />
          <path className="flair-flame" d="M110 150c-12 13-17 23-17 31 0 12 8 21 17 21s17-9 17-21c0-8-5-18-17-31z" />
        </g>
      </svg>

      <div className="container">
        <div className="insight-band-head reveal">
          <h2 className="insight-band-title">{title}</h2>
          {cta && (
            <Link className="btn btn-navy insight-band-cta insight-band-cta--desk" to={to}>
              {cta}
            </Link>
          )}
        </div>

        <div className="insight-band-grid">
          {byDate.slice(0, 3).map((article) => (
            <InsightCard
              key={article.slug}
              article={article}
              variant={variant}
              withBadge={!plain}
              isNew={recent.has(article.slug)}
            />
          ))}
        </div>

        {cta && (
          <Link className="btn btn-navy insight-band-cta insight-band-cta--mobile" to={to}>
            {cta}
          </Link>
        )}
      </div>
    </section>
  );
}
