import { Link } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import { useApi } from "../lib/api";
import LatestInsights from "../components/Cards";

/* Measured off the reference capture at 1908px: ~43 soft dots per 1911x450,
   core radius p50 2 / p90 4.8, mean alpha 0.12 over the navy. `r` below is the
   gradient halo (the core is ~40% of it). Brightness goes on `fill-opacity`,
   not `opacity`: twinkle animates the `opacity` property, which beats the
   presentation attribute. 0.6 twinkle mean x 0.20 fill = 0.12. */
const HERO_STARS = Array.from({ length: 64 }, (_, i) => {
  const rnd = (n) => { const s = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453; return s - Math.floor(s); };
  return {
    cx: rnd(1) * 1911,
    cy: rnd(2) * 665,
    r: 1.7 + Math.pow(rnd(3), 2.2) * 5.3,
    o: 0.14 + rnd(4) * 0.13,
  };
});

/* The hero hands the navy over to the page on one cosine: crest at x 470,
   trough at x 1430, amplitude 40, wavelength the full 1920. */
const HERO_WAVE = (() => {
  const pts = [];
  for (let x = 0; x <= 1920; x += 40) {
    pts.push(`${x} ${(40 - 40 * Math.cos((2 * Math.PI * (x - 470)) / 1920)).toFixed(2)}`);
  }
  return `M${pts.join("L")}L1920 80L0 80Z`;
})();

export default function Platforms() {
  useTitle("Platforms We Support | Just After Midnight");
  const { data: platforms } = useApi("/api/platforms");

  return (
    <>
      <section className="page-hero page-hero--platforms">
        <div className="hero-stars" aria-hidden="true">
          <svg viewBox="0 0 1911 665" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="heroStarGlow">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="heroEarth" x1="0.2" y1="0" x2="0.8" y2="1">
                <stop offset="0" stopColor="#a9d6e8" />
                <stop offset="0.45" stopColor="#79a4bc" />
                <stop offset="1" stopColor="#41708f" />
              </linearGradient>
              <radialGradient id="heroEarthShade" cx="0.34" cy="0.3" r="0.78">
                <stop offset="0.5" stopColor="#0d1b3a" stopOpacity="0" />
                <stop offset="1" stopColor="#0d1b3a" stopOpacity="0.34" />
              </radialGradient>
              <linearGradient id="heroSaturn" x1="0.15" y1="0" x2="0.85" y2="1">
                <stop offset="0" stopColor="#f6d68b" />
                <stop offset="0.45" stopColor="#e28c31" />
                <stop offset="0.8" stopColor="#c6320c" />
                <stop offset="1" stopColor="#a52a09" />
              </linearGradient>
              <clipPath id="heroEarthClip"><circle cx="1768" cy="290" r="218" /></clipPath>
              <clipPath id="heroSaturnClip"><circle r="118" /></clipPath>
            </defs>
            <g fill="url(#heroStarGlow)">
              {HERO_STARS.map((star, i) => (
                <circle key={i} cx={star.cx.toFixed(1)} cy={star.cy.toFixed(1)} r={star.r.toFixed(2)} fillOpacity={star.o.toFixed(2)} />
              ))}
            </g>
            <g className="hero-planet">
              <circle cx="1760" cy="297" r="225" fill="#dbeaf0" />
              <circle cx="1768" cy="290" r="218" fill="url(#heroEarth)" />
              <g clipPath="url(#heroEarthClip)" fill="#3f8f2f">
                <path d="M1626 118h96l-22 58h52l16 44-40 52h-72l-30-58 26-46h-44z" />
                <path d="M1810 86h104l28 54-46 40 34 52-58 44-64-30-14-62 34-40z" />
                <path d="M1674 392h84l36 62-52 54h-72l-24-66z" />
                <path d="M1866 370h72l20 60-64 44-52-40z" opacity="0.9" />
                <path d="M1574 290h54l18 48-46 34-40-30z" opacity="0.75" />
              </g>
              <g clipPath="url(#heroEarthClip)" fill="#ace48b" opacity="0.5">
                <path d="M1816 94h56l14 26-44 12z" />
                <path d="M1714 180h34l-10 30h-30z" />
              </g>
              <circle clipPath="url(#heroEarthClip)" cx="1768" cy="290" r="218" fill="url(#heroEarthShade)" />
            </g>
            <g className="hero-planet" transform="translate(112 472) rotate(20)">
              <ellipse rx="190" ry="40" fill="none" stroke="#f3e09e" strokeWidth="16" opacity="0.9" />
              <circle r="118" fill="url(#heroSaturn)" />
              <g clipPath="url(#heroSaturnClip)" transform="rotate(-20)">
                <rect x="-120" y="-84" width="240" height="26" rx="13" fill="#f6d68b" opacity="0.7" />
                <rect x="-120" y="-40" width="240" height="18" rx="9" fill="#fabd14" opacity="0.45" />
                <rect x="-120" y="6" width="240" height="24" rx="12" fill="#a52a09" opacity="0.35" />
                <rect x="-120" y="52" width="240" height="16" rx="8" fill="#f6d68b" opacity="0.4" />
              </g>
              <path d="M-190 0A190 40 0 0 0 190 0" fill="none" stroke="#f7e9c9" strokeWidth="16" opacity="0.95" />
            </g>
          </svg>
        </div>
        <div className="container">
          <h1 className="page-hero-title platforms-hero-title reveal">Platforms We Support</h1>
          <p className="page-hero-sub platforms-hero-sub reveal">Round-the-clock engineering, hosting and monitoring for the platforms your business already runs on.</p>
          <div className="hero-actions reveal">
            <Link to="/contact" className="btn btn-primary platforms-hero-cta">Talk to us about your stack <span aria-hidden="true">➔</span></Link>
          </div>
        </div>
        <div className="platforms-hero-divider" aria-hidden="true">
          <svg viewBox="0 0 1920 80" preserveAspectRatio="none">
            <path d={HERO_WAVE} fill="var(--bg)" />
          </svg>
        </div>
      </section>

      <section className="platforms-list">
        <div className="container">
          <div className="platform-grid">
            {(platforms || []).map((platform) => (
              <article className="platform-card reveal" key={platform.slug}>
                <div className={`platform-badge platform-badge--${platform.tint}`} aria-hidden="true">{platform.short}</div>
                <h2 className="platform-card-title">
                  <Link to={`/platforms/${platform.slug}`}>{platform.name} <span aria-hidden="true">➔</span></Link>
                </h2>
                <p>{platform.intro}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="statement">
        <div className="container statement-inner">
          <h2 className="statement-title reveal">Running something else entirely?</h2>
          <p className="statement-text reveal">If it runs software, we've probably supported something like it. Tell us what you're running and we'll tell you honestly whether we can help.</p>
          <div className="hero-actions reveal" style={{ justifyContent: "center" }}>
            <Link to="/contact" className="btn btn-primary">Ask about your stack <span aria-hidden="true">➔</span></Link>
          </div>
        </div>
      </section>

      <LatestInsights />
    </>
  );
}
