import { Fragment } from "react";
import { Link } from "react-router-dom";

const STACK_LAYERS = ["Websites", "Applications", "Platform", "Cloud", "Infrastructure"];

export default function FaqBand({ title, intro, faqs, cta, panel, variant = "wide", padded, artwork }) {
  const detail = variant === "detail";

  return (
    <section className={`support-faq${detail ? " support-faq--detail" : ""}${padded ? " support-faq--padded" : ""}`}>
      <div className="container support-faq-grid">
        <div className="support-faq-col">
          <h2 className="reveal">{title}</h2>
          {intro && <p className="support-faq-intro reveal">{intro}</p>}
          <div className="faq-list reveal">
            {faqs.map((faq, i) => (
              <details className="faq-item" key={faq.q} open={detail && i === 0}>
                <summary>
                  {faq.q}
                  <span className="faq-plus" aria-hidden="true" />
                </summary>
                {faq.paragraphs || faq.terms ? (
                  <div className="faq-answer">
                    {faq.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                    {faq.terms && <dl>{faq.terms.map(({ term, definition }) => <Fragment key={term}><dt>{term}</dt><dd>{definition}</dd></Fragment>)}</dl>}
                  </div>
                ) : <p>{faq.a}</p>}
              </details>
            ))}
          </div>
          {cta && (
            <Link to="/contact" className="btn btn-ghost faq-cta reveal">{cta}</Link>
          )}
        </div>
        <div className="support-faq-art reveal" aria-hidden="true">
          {artwork ? <img src={artwork} alt="" loading="lazy" decoding="async" /> : <svg viewBox="0 0 727 620" role="presentation" focusable="false">
            <defs>
              <mask id="faq-moon">
                <rect x="0" y="0" width="727" height="620" fill="#ffffff" />
                <circle cx="203" cy="130" r="48" fill="#000000" />
              </mask>
            </defs>
            <ellipse cx="235" cy="612" rx="186" ry="16" fill="rgba(19,33,64,0.10)" />
            <ellipse cx="582" cy="572" rx="130" ry="15" fill="rgba(19,33,64,0.10)" />
            <path d="M582 470V330" stroke="var(--sky)" strokeWidth="34" strokeLinecap="round" />
            <rect x="470" y="470" width="224" height="96" rx="14" fill="#132140" />
            <ellipse cx="582" cy="470" rx="112" ry="22" fill="var(--navy-soft)" />
            <g className="faq-lift">
              <circle cx="235" cy="150" r="78" fill="rgba(250,189,20,0.14)" />
              <circle cx="235" cy="150" r="58" fill="var(--amber)" mask="url(#faq-moon)" />
              <path d="M582 330 346 178" stroke="var(--sky)" strokeWidth="28" strokeLinecap="round" />
              <circle cx="346" cy="178" r="15" fill="#132140" />
              <path d="M346 178C336 152 318 128 286 118" stroke="#132140" strokeWidth="14" fill="none" strokeLinecap="round" />
              <path d="M346 178c-16 18-40 22-66 12" stroke="#132140" strokeWidth="14" fill="none" strokeLinecap="round" />
            </g>
            <circle cx="582" cy="330" r="21" fill="#132140" />
            {STACK_LAYERS.map((layer, i) => {
              const t = 280 + i * 66;
              return (
                <g key={layer}>
                  <ellipse cx="235" cy={t + 44} rx="168" ry="20" fill="#0b1526" />
                  <rect x="67" y={t} width="336" height="44" fill="#132140" />
                  <ellipse cx="235" cy={t} rx="168" ry="20" fill={i % 2 ? "var(--mint)" : "var(--navy-soft)"} />
                  <text x="235" y={t + 27} textAnchor="middle" fill="var(--sky)" fontFamily="Montserrat, sans-serif" fontSize="22" fontWeight="700" letterSpacing="2">
                    {layer.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>}
        </div>
      </div>

      {panel && (
        <div className="faq-panel reveal">
          <h3>{panel.title}</h3>
          <p>
            {panel.linkFirst ? (
              <>
                <Link to={panel.to}>{panel.cta}</Link> {panel.text}
              </>
            ) : (
              <>
                {panel.text} <Link to={panel.to}>{panel.cta}</Link>
              </>
            )}
          </p>
        </div>
      )}
    </section>
  );
}
