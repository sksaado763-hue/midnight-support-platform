/* The reference ships one card grid at three scales: the wide starfield slab on
   /support, the same slab at detail scale on its sub-pages, and a plain white
   two-up version with no heading. All three are this component — the variant
   picks the skin, the card count picks the grid. */
import BandSeam from "./BandSeam";

const PII_STARS = Array.from({ length: 84 }, (_, i) => {
  const rnd = (n) => { const s = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453; return s - Math.floor(s); };
  return { cx: rnd(1) * 1911, cy: Math.pow(rnd(2), 1.7) * 720, r: 0.9 + rnd(3) * 2.1, o: 0.18 + rnd(4) * 0.62 };
});

export default function OutcomeBand({ title, intro, cards, variant = "wide", curveTop = false, curveFill = "var(--bg)" }) {
  const detail = variant === "detail";
  const boxes = variant === "boxes";
  return (
    <section className={`pii-band${detail ? " pii-band--detail" : ""}${boxes ? " pii-band--boxes" : ""}${curveTop ? " pii-band--curved" : ""}`}>
      {!boxes && (
        <div className="hero-stars" aria-hidden="true">
          <svg viewBox="0 0 1911 760" preserveAspectRatio="xMidYMid slice">
            <g fill="#ffffff">
              {PII_STARS.map((star, i) => (
                <circle key={i} cx={star.cx.toFixed(1)} cy={star.cy.toFixed(1)} r={star.r.toFixed(2)} opacity={star.o.toFixed(2)} />
              ))}
            </g>
          </svg>
        </div>
      )}
      {curveTop && <BandSeam fill={curveFill} />}
      {!detail && !boxes && (
        <div className="band-wave band-wave--top" aria-hidden="true">
          <svg viewBox="0 0 1920 73" preserveAspectRatio="none">
            <path d="M0 0H1920V33.77L1750.82 51.39C1544.17 72.92 1335.83 72.92 1129.18 51.39L790.82 16.15C584.17 -5.38 375.84 -5.38 169.18 16.15L0 33.77Z" fill="var(--bg)" />
          </svg>
        </div>
      )}
      <div className="container">
        {(title || intro) && (
          <div className="pii-head reveal">
            {title && <h2 className="band-title band-title--center">{title}</h2>}
            {intro && <p>{intro}</p>}
          </div>
        )}
        <div className="pii-grid">
          {cards.map((card) => (
            <article className="pii-card reveal" key={card.title}>
              <span className="pii-icon">{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              {card.closer && <p>{card.closer}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
