import { Link } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import { useApi } from "../lib/api";
import LatestInsights from "../components/Cards";

const INDUSTRIES = [
  {
    title: "Digital Agencies",
    text: "White-label cover for every client site you build. We stay invisible, your clients stay happy, and Monday mornings stop starting with an outage report.",
    points: [
      "Cover for your whole client portfolio under one agreement",
      "Updates in your brand voice, not ours",
      "CMS specialists across Sitecore, Umbraco, WordPress & more",
    ],
  },
  {
    title: "SaaS Platforms",
    text: "Your SLA is our SLA. We operate as your outsourced SRE function, monitoring user journeys rather than just host metrics.",
    points: [
      "Journey-level monitoring tied to your uptime promises",
      "Follow-the-sun rotations so no one carries the night alone",
      "Deploy support, rollback drills and pre-release checks",
    ],
  },
  {
    title: "eCommerce",
    text: "Every minute of downtime is abandoned baskets. Peak trading is where we earn our keep.",
    points: [
      "Peak-season war rooms and pre-peak load testing",
      "Checkout and payment flow monitoring, end to end",
      "Fast paths to fix for platform and plugin regressions",
    ],
  },
];

export default function Support() {
  useTitle("24/7 Support Packages | Just After Midnight");
  const { data: packages } = useApi("/api/packages");

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title reveal">24/7 Support Packages</h1>
          <p className="page-hero-sub reveal">Pick the level of cover that matches how much downtime hurts. Every package is backed by the same engineers, tooling and obsession with uptime — only the response commitments and extras change.</p>
        </div>
      </section>

      <section className="pricing" id="compare">
        <div className="container">
          <div className="pricing-grid">
            {(packages || []).map((pkg) => (
              <article className={`price-card reveal${pkg.featured ? " is-featured" : ""}`} key={pkg.name}>
                {pkg.featured && <p className="price-flag">Most popular</p>}
                <h2 className="price-name">{pkg.name}</h2>
                <p className="price-tagline">{pkg.tagline}</p>
                <p className="price-amount">{pkg.price}<span>{pkg.period}</span></p>
                <ul className="price-features">
                  {pkg.features.map((feature) => (
                    <li key={feature}><span className="tick" aria-hidden="true">✓</span>{feature}</li>
                  ))}
                </ul>
                <Link to={`/contact?package=${encodeURIComponent(pkg.name)}`} className={`btn ${pkg.featured ? "btn-primary" : "btn-ghost"}`}>
                  {pkg.cta} <span aria-hidden="true">➔</span>
                </Link>
              </article>
            ))}
          </div>
          <p className="pricing-note reveal">All prices ex-GST. Response times are contractual commitments, not best-effort promises — ask us for the SLA document.</p>
        </div>
      </section>

      <section className="industries" id="industries">
        <div className="container">
          <h2 className="section-title reveal">Support shaped around your world</h2>
          <div className="industry-grid">
            {INDUSTRIES.map((industry) => (
              <article className="industry-card reveal" key={industry.title}>
                <h3>{industry.title}</h3>
                <p>{industry.text}</p>
                <ul>
                  {industry.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="statement">
        <div className="container statement-inner">
          <h2 className="statement-title reveal">Not sure which tier fits?</h2>
          <p className="statement-text reveal">Tell us what breaks and when it hurts most — we'll recommend the lightest package that genuinely covers you. No upselling.</p>
          <div className="hero-actions reveal" style={{ justifyContent: "center" }}>
            <Link to="/contact" className="btn btn-primary">Get a recommendation <span aria-hidden="true">➔</span></Link>
          </div>
        </div>
      </section>

      <LatestInsights />
    </>
  );
}
