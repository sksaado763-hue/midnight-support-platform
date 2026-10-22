import { Link } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import LatestInsights from "../components/Cards";
import StatsStrip from "../components/StatsStrip";
import { useState } from "react";

const TABS = [
  { key: "brands", label: "Brands", logos: ["TESSERA", "NORTHBANK", "ARCADIA", "VOLTA", "MERIDIAN", "HALCYON", "ORCHARD&CO", "BLUEPINE"] },
  { key: "technology", label: "Technology", logos: ["CLOUDVEIL", "STACKFORGE", "QUANTA", "NIMBUS9", "COREWIRE", "BYTEHARBOR", "LATTICE", "SIGNALWORKS"] },
  { key: "agencies", label: "Agencies", logos: ["PIXEL&MORE", "STUDIO NORTH", "FRAMECRAFT", "THE ATELIER", "MOSAIC CO", "BOLDTYPE", "FIELDNOTES", "HARLOW"] },
];

export default function Home() {
  useTitle("Just After Midnight | 24/7 Support, Managed Cloud & DevOps");
  const [tab, setTab] = useState("brands");

  return (
    <>
      <section className="homepage-hero">
        <div className="hero-stars" aria-hidden="true">
          <svg viewBox="0 0 1440 520" preserveAspectRatio="xMidYMid slice">
            <g fill="#ffffff">
              <circle cx="120" cy="80" r="1.6" opacity=".7" /><circle cx="300" cy="180" r="1.2" opacity=".5" />
              <circle cx="520" cy="60" r="1.8" opacity=".8" /><circle cx="760" cy="140" r="1.1" opacity=".4" />
              <circle cx="980" cy="70" r="1.5" opacity=".7" /><circle cx="1180" cy="190" r="1.3" opacity=".6" />
              <circle cx="1340" cy="90" r="1.7" opacity=".8" /><circle cx="200" cy="320" r="1.2" opacity=".4" />
              <circle cx="640" cy="300" r="1.4" opacity=".6" /><circle cx="1080" cy="330" r="1.2" opacity=".5" />
              <circle cx="1380" cy="300" r="1.5" opacity=".7" /><circle cx="440" cy="200" r="1" opacity=".4" />
            </g>
          </svg>
        </div>
        <div className="container hero-inner">
          <h1 className="hero-title reveal">24/7 support, cloud &amp; DevOps for brands, agencies and digital products</h1>
          <p className="hero-subtitle reveal">Keeping your revenue, reputation and digital estate protected — every hour, every day of the year.</p>
          <div className="hero-actions reveal">
            <Link to="/support" className="btn btn-primary">View support packages <span aria-hidden="true">➔</span></Link>
            <Link to="/contact" className="btn btn-outline">Speak to us <span aria-hidden="true">➔</span></Link>
          </div>
          <div className="hero-trust reveal">
            <p className="trust-label">Trusted by:</p>
            <ul className="trust-logos" aria-label="Selected clients">
              <li className="trust-logo">TESSERA</li>
              <li className="trust-logo">HELIOS&nbsp;BANK</li>
              <li className="trust-logo">NORTHBANK</li>
              <li className="trust-logo">ARCADIA</li>
            </ul>
          </div>
        </div>
      </section>

      <StatsStrip />

      <section className="full-services" id="services">
        <div className="container">
          <h2 className="section-title reveal">Our Services</h2>
          <div className="services-grid">
            <article className="service-card reveal">
              <div className="service-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeWidth="2.4" /><path d="M24 13v11l7 5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
              </div>
              <h3>24/7 Support</h3>
              <p>Full-stack monitoring, triage and resolution — every hour of every day, all year round.</p>
              <ul className="service-links">
                <li><Link to="/support">Support Packages</Link></li>
                <li><Link to="/support#industries">By Industry <span aria-hidden="true">·</span> Agencies · SaaS · eCommerce</Link></li>
                <li><Link to="/cloud">By Cloud Provider <span aria-hidden="true">·</span> AWS · Azure · GCP</Link></li>
              </ul>
            </article>

            <article className="service-card reveal">
              <div className="service-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48"><path d="M14 30a8 8 0 0 1 .6-15.9A10 10 0 0 1 34 17a7 7 0 0 1-1 13H14z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" /><path d="M17 37l4-5m5 5l-3-4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
              </div>
              <h3>Managed Cloud</h3>
              <p>Consulting, architecture and delivery across AWS, Azure and Google Cloud.</p>
              <ul className="service-links">
                <li><Link to="/cloud#aws">AWS · Azure · GCP · Alibaba Cloud</Link></li>
                <li><Link to="/cloud#consulting">Cloud Consulting &amp; Cost Optimisation</Link></li>
                <li><Link to="/cloud#consulting">Cloud Migration &amp; Managed Hosting</Link></li>
              </ul>
            </article>

            <article className="service-card reveal">
              <div className="service-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48"><path d="M8 34l6-6 6 4 7-10 6 6 7-12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="40" cy="12" r="3" fill="currentColor" /></svg>
              </div>
              <h3>DevOps</h3>
              <p>Helping teams ship faster without trading away reliability or quality.</p>
              <ul className="service-links">
                <li><Link to="/cloud#devops">DevOps Delivery &amp; Automation</Link></li>
                <li><Link to="/cloud#devops">DevOps Consulting</Link></li>
                <li><Link to="/cloud#devops">Application Modernisation</Link></li>
              </ul>
            </article>

            <article className="service-card reveal">
              <div className="service-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48"><rect x="7" y="9" width="34" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2.4" /><path d="M17 41h14M24 33v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><path d="M16 20l5 4-5 4M25 28h7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
              </div>
              <h3>Platform Support</h3>
              <p>Care and maintenance for SaaS products, CMS platforms and custom applications.</p>
              <ul className="service-links">
                <li><Link to="/support#industries">SaaS Application Support</Link></li>
                <li><Link to="/support#industries">Custom Applications</Link></li>
                <li><Link to="/platforms">Platforms <span aria-hidden="true">·</span> Sitecore · Umbraco · WordPress</Link></li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="statement" id="statement">
        <div className="container statement-inner">
          <svg className="statement-arrow" viewBox="0 0 64 64" aria-hidden="true">
            <path d="M32 56V14M16 30l16-16 16 16" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h2 className="statement-title reveal">We're the experts in uptime.</h2>
          <p className="statement-text reveal">We build, run and look after your infrastructure, applications and services through a world-class 24/7 support operation — and we step in fast when things go wrong, so your team can sleep at night.</p>
        </div>
      </section>

      <section className="partners-and-clients">
        <div className="container">
          <h2 className="section-title reveal">A few of our partners &amp; clients</h2>

          <div className="tabs reveal" role="tablist" aria-label="Client types">
            {TABS.map((item) => (
              <button
                key={item.key}
                className={`tab${tab === item.key ? " is-active" : ""}`}
                role="tab"
                aria-selected={String(tab === item.key)}
                data-tab={item.key}
                onClick={() => setTab(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {TABS.map((item) => (
            <div key={item.key} className={`tab-panel${tab === item.key ? " is-active" : ""}`} data-panel={item.key} hidden={tab !== item.key}>
              <ul className="logo-grid">
                {item.logos.map((logo) => (
                  <li className="logo-cell" key={logo}>{logo}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="partners-cta reveal">
            <Link to="/contact" className="btn btn-primary">Find out more about partnerships <span aria-hidden="true">➔</span></Link>
            <svg className="partners-illustration" viewBox="0 0 220 200" aria-hidden="true">
              <circle cx="120" cy="110" r="62" fill="#123044" />
              <circle cx="120" cy="110" r="62" fill="none" stroke="#00A6B8" strokeWidth="2" opacity=".5" />
              <path d="M120 48a62 62 0 0 1 0 124 78 78 0 0 0 0-124z" fill="#00E8F0" />
              <circle cx="150" cy="78" r="5" fill="#B6F5FA" />
              <line x1="150" y1="73" x2="150" y2="58" stroke="#B6F5FA" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="150" cy="55" r="3.5" fill="#B6F5FA" />
              <circle cx="42" cy="46" r="2" fill="#ffffff" opacity=".7" />
              <circle cx="196" cy="160" r="2.4" fill="#ffffff" opacity=".6" />
              <circle cx="60" cy="170" r="1.8" fill="#ffffff" opacity=".5" />
            </svg>
          </div>
        </div>
      </section>

      <section className="cases-teaser">
        <div className="container">
          <div className="insights-head reveal">
            <h2 className="section-title">Proof, not promises</h2>
            <Link to="/case-studies" className="text-link">All case studies <span aria-hidden="true">➔</span></Link>
          </div>
          <div className="case-teaser-grid">
            <Link className="case-teaser reveal" to="/case-studies">
              <div className="case-teaser-art case-teaser-art--a" aria-hidden="true">
                <svg viewBox="0 0 200 90"><path d="M30 74h140" stroke="#6E8FAD" strokeWidth="4" strokeLinecap="round" /><path d="M44 74V48l24-16 24 14 24-24v52" fill="none" stroke="#00E8F0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <p className="case-teaser-copy"><strong>40+ platforms</strong> kept online through peak campaigns, payroll windows and 3am surprises. See how.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="report-download-cta">
        <div className="container">
          <div className="report-card reveal">
            <div className="report-art" aria-hidden="true">
              <svg viewBox="0 0 200 160">
                <path d="M40 132h120" stroke="#6E8FAD" strokeWidth="4" strokeLinecap="round" />
                <path d="M52 132V84l32-24 32 20 32-36v88" fill="none" stroke="#00E8F0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="116" cy="44" r="6" fill="#00A6B8" />
                <rect x="146" y="52" width="10" height="80" rx="4" fill="#123044" transform="rotate(18 151 92)" />
              </svg>
            </div>
            <div className="report-copy">
              <h2>What does a "perfect" AWS setup look like for SaaS?</h2>
              <p>Perfection may not exist — but seeing how experts approach it is the next best thing. Four frontline perspectives on hyperscale, developer-first architecture, and balancing next-gen tech with what's proven and comfy.</p>
              <Link to="/contact" className="btn btn-primary">Download the report <span aria-hidden="true">➔</span></Link>
            </div>
          </div>
        </div>
      </section>

      <LatestInsights />
    </>
  );
}
