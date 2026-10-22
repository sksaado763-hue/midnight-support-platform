import { Link } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import { useApi } from "../lib/api";
import LatestInsights from "../components/Cards";

export default function Platforms() {
  useTitle("Platforms We Support | Just After Midnight");
  const { data: platforms } = useApi("/api/platforms");

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title reveal">Platforms We Support</h1>
          <p className="page-hero-sub reveal">Managed support services for all major platforms. 24/7 full-stack support; uptime guaranteed.</p>
          <div className="hero-actions reveal">
            <Link to="/contact" className="btn btn-primary">Speak to us about your platform <span aria-hidden="true">➔</span></Link>
          </div>
        </div>
      </section>

      <section className="platforms-list">
        <div className="container">
          <div className="platform-grid">
            {(platforms || []).map((platform) => (
              <article className="platform-card reveal" key={platform.slug}>
                <div className={`platform-badge platform-badge--${platform.tint}`} aria-hidden="true">{platform.short}</div>
                <h2>{platform.name}</h2>
                <p>{platform.intro}</p>
                <Link className="text-link" to={`/platforms/${platform.slug}`}>
                  Explore {platform.name} support <span aria-hidden="true">➔</span>
                </Link>
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
