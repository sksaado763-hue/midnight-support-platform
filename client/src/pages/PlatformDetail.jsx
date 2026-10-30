import { Link, useParams } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import { useApi } from "../lib/api";
import LatestInsights from "../components/Cards";
import NotFound from "./NotFound";

export default function PlatformDetail() {
  const { slug } = useParams();
  const { data, loading, error } = useApi(`/api/platforms/${slug}`);
  const platform = data && data.platform;
  useTitle(platform ? `${platform.name} Support | Just After Midnight` : "Platforms We Support | Just After Midnight");

  if (error) return <NotFound />;
  if (!platform) {
    return (
      <section className="page-hero">
        <div className="container">
          <p className="empty-note">Loading…</p>
        </div>
      </section>
    );
  }

  const otherPlatforms = data.otherPlatforms;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link to="/platforms">Platforms</Link> <span aria-hidden="true">/</span> {platform.name}
          </p>
          <h1 className="page-hero-title reveal">{platform.name} Support</h1>
          <p className="page-hero-sub reveal">{platform.tagline}</p>
          <div className="hero-actions reveal">
            <Link to="/contact" className="btn btn-primary">Get in touch <span aria-hidden="true">➔</span></Link>
          </div>
        </div>
      </section>

      <section className="platform-detail">
        <div className="container">
          <div className="plat-what reveal">
            <div className={`platform-badge platform-badge--${platform.tint} platform-badge--big`} aria-hidden="true">{platform.short}</div>
            <div>
              <h2>What is {platform.name} support, maintenance &amp; hosting?</h2>
              <p>{platform.intro}</p>
            </div>
          </div>

          <div className="ps-grid">
            <article className="ps-card ps-card--problem reveal">
              <h2>Your problem</h2>
              <p>{platform.problem}</p>
            </article>
            <article className="ps-card ps-card--solution reveal">
              <h2>Our solution</h2>
              <p>{platform.solution}</p>
            </article>
          </div>

          {platform.pillars && (
            <div className="platform-band">
              <h2 className="band-title band-title--dark band-title--center reveal">{platform.pillarsTitle}</h2>
              <span className="band-rule band-rule--center" aria-hidden="true" />
              {platform.pillarsSub && <p className="band-sub band-sub--dark band-sub--center reveal">{platform.pillarsSub}</p>}
              <div className="cap-grid">
                {platform.pillars.map((pillar) => (
                  <article className="cap-card reveal" key={pillar.title}>
                    <h3>{pillar.title}</h3>
                    <span className="cap-rule" aria-hidden="true" />
                    <p>{pillar.text}</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          <div className="feature-section">
            <h2 className="section-title reveal">Why teams trust us with {platform.name}</h2>
            <div className="feature-grid">
              {platform.features.map((feature) => (
                <article className="feature-card reveal" key={feature.title}>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </div>

          {platform.capabilities && (
            <div className="platform-band">
              <h2 className="band-title band-title--dark band-title--center reveal">{platform.capsTitle}</h2>
              <span className="band-rule band-rule--center" aria-hidden="true" />
              {platform.capsSub && <p className="band-sub band-sub--dark band-sub--center reveal">{platform.capsSub}</p>}
              <div className="cap-grid cap-grid--2">
                {platform.capabilities.map((cap) => (
                  <article className="cap-card reveal" key={cap.title}>
                    <h3>{cap.title}</h3>
                    <span className="cap-rule" aria-hidden="true" />
                    <ul>
                      {cap.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          )}

          {platform.fitWith && (
            <div className="platform-band">
              <h2 className="band-title band-title--dark band-title--center reveal">{platform.fitTitle}</h2>
              <span className="band-rule band-rule--center" aria-hidden="true" />
              <ul className="fit-list reveal">
                {platform.fitWith.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          )}

          <div className="packages-band reveal">
            <div>
              <h2>Our service packages</h2>
              <p>Every platform we support is covered by one of three packages — pick the lightest one that genuinely covers you.</p>
            </div>
            <Link to="/support" className="btn btn-primary">Compare packages <span aria-hidden="true">➔</span></Link>
          </div>

          <div className="faq-section">
            <h2 className="section-title reveal">FAQ</h2>
            <div className="faq-list reveal">
              {platform.faqs.map((faq) => (
                <details className="faq-item" key={faq.q}>
                  <summary>{faq.q}<span className="faq-chevron" aria-hidden="true"></span></summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
            <p className="faq-more reveal">More questions? <Link to="/contact">Ask us anything</Link> — we answer quickly, even at strange hours.</p>
          </div>

          <div className="other-platforms">
            <h2 className="section-title reveal">We also support</h2>
            <div className="other-platform-grid">
              {otherPlatforms.map((other) => (
                <Link className="other-platform-chip reveal" to={`/platforms/${other.slug}`} key={other.slug}>
                  <span className={`platform-badge platform-badge--${other.tint}`} aria-hidden="true">{other.short}</span>
                  {other.name}
                </Link>
              ))}
              <Link className="other-platform-chip other-platform-chip--all reveal" to="/platforms">
                All platforms <span aria-hidden="true">➔</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LatestInsights />
    </>
  );
}
