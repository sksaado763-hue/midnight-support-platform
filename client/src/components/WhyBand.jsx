import { Link } from "react-router-dom";
import BandSeam from "./BandSeam";

/* The reference's starfield is a cover-positioned texture of blurred dots: a
   bright core about 3px across, a halo roughly twice as wide, none brighter
   than 19% white over the navy, and about one per 12,200px². They stop where
   the texture turns blue, so the field is authored into the top half only.
   The gradient carries each dot's falloff, so `r` below is the halo and the
   core is ~40% of it. Brightness goes on `fill-opacity`, not `opacity`: twinkle
   animates the `opacity` property, which beats the presentation attribute.
   0.6 twinkle mean × 0.32 fill = 0.19. */
const WHY_STARS = Array.from({ length: 140 }, (_, i) => {
  const rnd = (n) => { const s = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453; return s - Math.floor(s); };
  return {
    cx: rnd(1) * 1911,
    cy: Math.pow(rnd(2), 1.15) * 880,
    r: 2.4 + Math.pow(rnd(3), 2.2) * 7.4,
    o: 0.23 + rnd(4) * 0.18,
  };
});

/* Reference `.icon-grid`: the starfield band of reason cards, on /support at the
   wide scale and on its sub-pages at the narrower detail scale — the same block
   the reference itself ships twice. `curveTop` caps the band with the navy of
   the slab above it on a sine crest, for pages where the section is white. */
export default function WhyBand({ title, intro, cards, accent, variant = "wide", curveTop = false, curveFill = "var(--navy)" }) {
  const detail = variant === "detail";
  return (
    <section className={`why-band${detail ? " why-band--detail" : ""}${curveTop ? " why-band--curved" : ""}`}>
      <div className="hero-stars" aria-hidden="true">
        <svg viewBox="0 0 1911 1765" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="whyStarGlow">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="whyPlanetWarm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffddcd" />
              <stop offset="0.45" stopColor="#fea57c" />
              <stop offset="0.75" stopColor="#fc631e" />
              <stop offset="1" stopColor="#f2510b" />
            </linearGradient>
            <linearGradient id="whyPlanetCool" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8fc9e2" />
              <stop offset="0.55" stopColor="#3f88b3" />
              <stop offset="1" stopColor="#2a6b93" />
            </linearGradient>
            <clipPath id="whyWarmClip"><circle r="126" /></clipPath>
            <clipPath id="whyCoolClip"><circle r="42" /></clipPath>
          </defs>
          <g fill="url(#whyStarGlow)">
            {WHY_STARS.map((star, i) => (
              <circle key={i} cx={star.cx.toFixed(1)} cy={star.cy.toFixed(1)} r={star.r.toFixed(2)} fillOpacity={star.o.toFixed(2)} />
            ))}
          </g>
          <g className="why-planet" transform="translate(250 330) rotate(-16)">
            <ellipse rx="76" ry="18" fill="none" stroke="#9dc2d6" strokeWidth="6" opacity="0.75" />
            <circle r="42" fill="url(#whyPlanetCool)" />
            <g clipPath="url(#whyCoolClip)" fill="#8fd0e6">
              <rect x="-46" y="-22" width="92" height="9" rx="4.5" opacity="0.5" />
              <rect x="-46" y="1" width="92" height="7" rx="3.5" fill="#2f6f96" opacity="0.45" />
              <rect x="-46" y="18" width="92" height="8" rx="4" opacity="0.4" />
            </g>
            <path d="M-76 0A76 18 0 0 0 76 0" fill="none" stroke="#b9d7e6" strokeWidth="6" opacity="0.85" />
          </g>
          <g className="why-planet" transform="translate(130 543)">
            <circle r="126" fill="url(#whyPlanetWarm)" />
            <g clipPath="url(#whyWarmClip)">
              <rect x="-112" y="-92" width="104" height="24" rx="12" fill="#ffd2b6" opacity="0.6" />
              <rect x="18" y="-64" width="112" height="18" rx="9" fill="#ffd2b6" opacity="0.5" />
              <rect x="-74" y="-10" width="132" height="26" rx="13" fill="#d8410a" opacity="0.4" />
              <rect x="-124" y="34" width="88" height="20" rx="10" fill="#ffd2b6" opacity="0.45" />
              <rect x="34" y="60" width="96" height="16" rx="8" fill="#d8410a" opacity="0.35" />
            </g>
          </g>
        </svg>
      </div>
      {!detail && (
        <div className="band-wave band-wave--top" aria-hidden="true">
          <svg viewBox="0 0 1920 73" preserveAspectRatio="none">
            <path d="M0 0H1920V33.77L1750.82 51.39C1544.17 72.92 1335.83 72.92 1129.18 51.39L790.82 16.15C584.17 -5.38 375.84 -5.38 169.18 16.15L0 33.77Z" fill="var(--bg)" />
          </svg>
        </div>
      )}
      {curveTop && <BandSeam fill={curveFill} />}
      <div className="container">
        <div className="why-intro reveal">
          <h2 className="band-title band-title--center">{title}</h2>
          <p>{intro}</p>
        </div>
        <div className="why-grid">
          {cards.map((card) => (
            <article className="why-card reveal" key={card.title}>
              {card.icon && <img className="why-card-icon" src={card.icon} width="80" height="80" alt="" />}
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
          {accent && (
            <article className="why-card why-card--accent reveal">
              {accent.icon && <img className="why-card-icon" src={accent.icon} width="80" height="80" alt="" />}
              <h3>{accent.title}</h3>
              <p>{accent.text}</p>
              <Link to={accent.to} className="why-accent-cta">{accent.cta} <span aria-hidden="true">➔</span></Link>
            </article>
          )}
        </div>
      </div>
      {!detail && (
        <div className="band-wave band-wave--bottom" aria-hidden="true">
          <svg viewBox="0 0 1920 73" preserveAspectRatio="none">
            <path d="M0 73H1920V33.77L1750.82 51.39C1544.17 72.92 1335.83 72.92 1129.18 51.39L790.82 16.15C584.17 -5.38 375.84 -5.38 169.18 16.15L0 33.77Z" fill="var(--bg)" />
          </svg>
        </div>
      )}
    </section>
  );
}
