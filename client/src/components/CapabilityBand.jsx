import { Link } from "react-router-dom";

/* The reference's starfield is a cover-positioned texture of blurred dots: a
   bright core about 3px across, a halo roughly twice as wide, none brighter
   than 19% white over the navy, and about one per 12,200px² — here 150 of them
   over the band's 1911×950. The gradient carries each dot's falloff, so `r`
   below is the halo and the core is ~40% of it. Brightness goes on
   `fill-opacity`, not `opacity`: twinkle animates the `opacity` property, which
   beats the presentation attribute. 0.6 twinkle mean × 0.32 fill = 0.19. */
const CAP_STARS = Array.from({ length: 150 }, (_, i) => {
  const rnd = (n) => { const s = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453; return s - Math.floor(s); };
  return {
    cx: rnd(1) * 1911,
    cy: rnd(2) * 950,
    r: 2.4 + Math.pow(rnd(3), 2.2) * 7.4,
    o: 0.23 + rnd(4) * 0.18,
  };
});

/* Reference `.seo-text-block` with the checklist columns — the cardless
   discipline list the reference ships at the wide scale on /support ("What the
   support desk actually does") and again at the detail scale on its sub-pages,
   where the same block sits on the starfield and closes with a centred line and
   a canary button. */
export default function CapabilityBand({ title, intro, groups, closer, variant = "wide" }) {
  if (variant !== "detail") {
    return (
      <section className="cap-band">
        <div className="container">
          <h2 className="band-title band-title--dark band-title--center reveal">{title}</h2>
          <span className="band-rule band-rule--center" aria-hidden="true" />
          <p className="band-sub band-sub--dark band-sub--center reveal">{intro}</p>
          <div className="cap-grid">
            {groups.map((group) => (
              <article className="cap-card reveal" key={group.title}>
                <h3>{group.title}</h3>
                <span className="cap-rule" aria-hidden="true" />
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cap-band cap-band--detail">
      <div className="hero-stars" aria-hidden="true">
        <svg viewBox="0 0 1911 950" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="capStarGlow">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g fill="url(#capStarGlow)">
            {CAP_STARS.map((star, i) => (
              <circle key={i} cx={star.cx.toFixed(1)} cy={star.cy.toFixed(1)} r={star.r.toFixed(2)} fillOpacity={star.o.toFixed(2)} />
            ))}
          </g>
        </svg>
      </div>
      <div className="container">
        <div className="cap-head reveal">
          <h2>{title}</h2>
          <p>{intro}</p>
        </div>
        <div className="cap-cols">
          {groups.map((group) => (
            <article className="cap-col reveal" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <svg viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      <path d="M19.8 6.4A9.5 9.5 0 1 1 11 1.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                      <path d="M5.9 11.4l3.6 3.7 9.6-10.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        {closer && (
          <div className="cap-closer reveal">
            <p>{closer.text}</p>
            <Link to={closer.to} className="btn btn-primary btn-lg">{closer.cta}</Link>
          </div>
        )}
      </div>
    </section>
  );
}
