import { Link } from "react-router-dom";

/* The reference's case-study block: a navy starfield slab, the client in a
   hand-drawn oval, an amber rule, then the story and a white CTA. Shared by
   /support and the 24/7 support sub-pages so the treatment cannot drift.
   `split` carries the reference's own 12-column spans for the page it sits on. */
export default function CaseFeature({ study, variant = "wide", split = "3-1-8" }) {
  if (!study) return null;
  const detail = variant === "detail";
  return (
    <section className={`case-feature${detail ? " case-feature--detail" : ""}${detail ? ` case-feature--split-${split}` : ""}`}>
      <div className="hero-stars" aria-hidden="true">
        <svg viewBox="0 0 1440 420" preserveAspectRatio="xMidYMid slice">
          <g fill="#ffffff">
            <circle cx="120" cy="80" r="1.4" opacity=".55" /><circle cx="420" cy="60" r="1.1" opacity=".45" />
            <circle cx="700" cy="130" r="1.6" opacity=".65" /><circle cx="980" cy="70" r="1.2" opacity=".5" />
            <circle cx="1250" cy="150" r="1.5" opacity=".6" /><circle cx="260" cy="300" r="1.2" opacity=".45" />
            <circle cx="560" cy="360" r="1.4" opacity=".55" /><circle cx="880" cy="320" r="1.1" opacity=".5" />
            <circle cx="1150" cy="380" r="1.5" opacity=".6" /><circle cx="1380" cy="260" r="1.2" opacity=".45" />
          </g>
        </svg>
      </div>
      <div className="case-wave case-wave--top" aria-hidden="true">
        <svg viewBox="0 0 1920 73" preserveAspectRatio="none">
          <path d="M0 0H1920V33.77L1750.82 51.39C1544.17 72.92 1335.83 72.92 1129.18 51.39L790.82 16.15C584.17 -5.38 375.84 -5.38 169.18 16.15L0 33.77Z" fill="var(--bg)" />
        </svg>
      </div>
      <div className="container case-feature-grid">
        {detail && <p className="case-feature-label">Case study</p>}
        <div className="case-feature-art reveal">
          <svg viewBox="0 0 560 300" aria-hidden="true">
            <ellipse cx="280" cy="150" rx="262" ry="126" fill="none" stroke="#ffffff" strokeWidth="9" />
            <text x="280" y="150" textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fontWeight="700" fontSize={Math.max(44, Math.min(112, Math.round(1900 / study.client.length)))} textLength={Math.min(440, study.client.length * 62)} lengthAdjust="spacingAndGlyphs">{study.client}</text>
          </svg>
        </div>
        <span className="case-feature-line" aria-hidden="true" />
        <div className="case-feature-content reveal">
          {!detail && <p className="case-feature-label">Case study</p>}
          <h2>{study.client}</h2>
          <h4 className="case-feature-headline">{study.headline}</h4>
          <p className="case-feature-text">{study.challenge}</p>
          <Link to={`/case-studies/${study.slug}`} className="btn case-feature-cta">Read case study <span aria-hidden="true">➔</span></Link>
        </div>
      </div>
      <div className="case-wave case-wave--bottom" aria-hidden="true">
        <svg viewBox="0 0 1920 73" preserveAspectRatio="none">
          <path d="M0 73H1920V33.77L1750.82 51.39C1544.17 72.92 1335.83 72.92 1129.18 51.39L790.82 16.15C584.17 -5.38 375.84 -5.38 169.18 16.15L0 33.77Z" fill="var(--bg)" />
        </svg>
      </div>
    </section>
  );
}
