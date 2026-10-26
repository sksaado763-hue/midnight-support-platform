import { Link } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import LatestInsights, { CaseArt } from "../components/Cards";
import StatsStrip from "../components/StatsStrip";
import { useEffect, useRef, useState } from "react";
import { useApi } from "../lib/api";

const TABS = [
  { key: "brands", label: "Brands", logos: ["TESSERA", "NORTHBANK", "ARCADIA", "VOLTA", "MERIDIAN", "HALCYON", "ORCHARD&CO", "BLUEPINE"] },
  { key: "technology", label: "Technology", logos: ["CLOUDVEIL", "STACKFORGE", "QUANTA", "NIMBUS9", "COREWIRE", "BYTEHARBOR", "LATTICE", "SIGNALWORKS"] },
  { key: "agencies", label: "Agencies", logos: ["PIXEL&MORE", "STUDIO NORTH", "FRAMECRAFT", "THE ATELIER", "MOSAIC CO", "BOLDTYPE", "FIELDNOTES", "HARLOW"] },
];

const HERO_CARDS = [
  {
    to: "/support",
    title: "24/7 Support",
    copy: "Full-stack monitoring, triage and resolution, every hour of every day.",
    icon: (
      <svg className="hero-card-icon" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeWidth="2.4" /><path d="M24 13v11l7 5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
    ),
  },
  {
    to: "/cloud",
    title: "Managed Cloud",
    copy: "Consulting, architecture and delivery across AWS, Azure and Google Cloud.",
    icon: (
      <svg className="hero-card-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M14 30a8 8 0 0 1 .6-15.9A10 10 0 0 1 34 17a7 7 0 0 1-1 13H14z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" /><path d="M17 37l4-5m5 5l-3-4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
    ),
  },
  {
    to: "/cloud#devops",
    title: "DevOps",
    copy: "Helping teams ship faster without trading away reliability or quality.",
    icon: (
      <svg className="hero-card-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 34l6-6 6 4 7-10 6 6 7-12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="40" cy="12" r="3" fill="currentColor" /></svg>
    ),
  },
  {
    to: "/platforms",
    title: "SaaS Support",
    copy: "Care and maintenance for SaaS products, CMS platforms and custom apps.",
    icon: (
      <svg className="hero-card-icon" viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="9" width="34" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2.4" /><path d="M17 41h14M24 33v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><path d="M16 20l5 4-5 4M25 28h7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
    ),
  },
];

const SERVICES = [
  {
    title: "24/7 Support",
    to: "/support",
    copy: "Supporting your full stack, 24 hours a day, 365 days a year.",
    icon: <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeWidth="2.4" />,
    iconExtra: <path d="M24 13v11l7 5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />,
    groups: [
      {
        label: "Support Packages",
        to: "/support",
        children: [
          { label: "Silver", to: "/support" },
          { label: "Gold", to: "/support" },
          { label: "Platinum", to: "/support" },
        ],
      },
      {
        label: "By Industry",
        to: "/support#industries",
        children: [
          { label: "Agencies", to: "/support#industries" },
          { label: "SaaS", to: "/support#industries" },
          { label: "eCommerce", to: "/support#industries" },
        ],
      },
    ],
  },
  {
    title: "Managed Cloud",
    to: "/cloud",
    copy: "Specialist consulting, design and delivery on AWS, Azure and GCP.",
    icon: <path d="M14 30a8 8 0 0 1 .6-15.9A10 10 0 0 1 34 17a7 7 0 0 1-1 13H14z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />,
    iconExtra: <path d="M17 37l4-5m5 5l-3-4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />,
    groups: [
      {
        label: "By Cloud Provider",
        to: "/cloud",
        children: [
          { label: "AWS", to: "/cloud#aws" },
          { label: "Azure", to: "/cloud#aws" },
          { label: "GCP", to: "/cloud#aws" },
        ],
      },
      {
        label: "Cloud Consulting",
        to: "/cloud#consulting",
        children: [
          { label: "Cost Optimisation", to: "/cloud#consulting" },
          { label: "Well-Architected Review", to: "/cloud#consulting" },
        ],
      },
    ],
  },
  {
    title: "DevOps",
    to: "/cloud#devops",
    copy: "Helping teams ship faster without trading away reliability or quality.",
    icon: <path d="M8 34l6-6 6 4 7-10 6 6 7-12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />,
    iconExtra: <circle cx="40" cy="12" r="3" fill="currentColor" />,
    groups: [
      {
        label: "DevOps Delivery",
        to: "/cloud#devops",
        children: [
          { label: "CI/CD Pipelines", to: "/cloud#devops" },
          { label: "Infrastructure as Code", to: "/cloud#devops" },
        ],
      },
      {
        label: "Application Modernisation",
        to: "/cloud#devops",
        children: [
          { label: "Platform Engineering", to: "/cloud#devops" },
          { label: "Observability", to: "/cloud#devops" },
        ],
      },
    ],
  },
  {
    title: "SaaS Support",
    to: "/platforms",
    copy: "Care and maintenance for SaaS products, CMS platforms and custom apps.",
    icon: <rect x="7" y="9" width="34" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2.4" />,
    iconExtra: <path d="M17 41h14M24 33v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />,
    groups: [
      {
        label: "By Platform",
        to: "/platforms",
        children: [
          { label: "Sitecore", to: "/platforms" },
          { label: "Umbraco", to: "/platforms" },
          { label: "WordPress", to: "/platforms" },
        ],
      },
      {
        label: "Custom Applications",
        to: "/support#industries",
        children: [
          { label: "SaaS Application Support", to: "/support#industries" },
          { label: "Legacy Modernisation", to: "/support#industries" },
        ],
      },
    ],
  },
];

function Arrow() {
  return (
    <svg className="hero-card-arrow" viewBox="0 0 18 16" aria-hidden="true">
      <path d="M1 8h13m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg className="link-chevron" viewBox="0 0 9 16" aria-hidden="true">
      <path d="M1 1l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WorkSlider() {
  const { data: studies } = useApi("/api/case-studies");
  const trackRef = useRef(null);
  const [arrows, setArrows] = useState({ start: true, end: true });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    function measure() {
      const max = track.scrollWidth - track.clientWidth;
      setArrows({ start: track.scrollLeft <= 2, end: track.scrollLeft >= max - 2 });
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [studies]);

  if (!studies || studies.length === 0) return null;

  const { start: atStart, end: atEnd } = arrows;

  function step(direction) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".work-slide");
    const width = card ? card.getBoundingClientRect().width + 30 : track.clientWidth;
    track.scrollBy({ left: direction * width, behavior: "smooth" });
  }

  return (
    <section className="case-study-examples" id="work">
      <div className="container">
        <h2 className="work-title reveal">Some of the teams we back up:</h2>
        <div className="work-slider-container">
          <div
            className="work-slider"
            ref={trackRef}
            tabIndex="-1"
            onScroll={(event) => {
              const track = event.currentTarget;
              setArrows({
                start: track.scrollLeft <= 2,
                end: track.scrollLeft >= track.scrollWidth - track.clientWidth - 2,
              });
            }}
          >
            {studies.map((study) => (
              <div className="work-slide" key={study.slug}>
                <Link className="work-card" to={`/case-studies/${study.slug}`}>
                  <div className="work-image" aria-hidden="true">
                    <CaseArt theme={study.theme} />
                  </div>
                  <div className="work-content">
                    <div className="work-text">
                      <h4 className="work-client">{study.client}</h4>
                    </div>
                    <p className="work-summary">{study.headline}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={`work-arrow work-arrow-left${atStart ? " disabled" : ""}`}
            aria-label="Previous work"
            disabled={atStart}
            onClick={() => step(-1)}
          >
            <svg viewBox="0 0 25 50" aria-hidden="true"><path d="M20 3L4 25l16 22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            type="button"
            className={`work-arrow work-arrow-right${atEnd ? " disabled" : ""}`}
            aria-label="Next work"
            disabled={atEnd}
            onClick={() => step(1)}
          >
            <svg viewBox="0 0 25 50" aria-hidden="true"><path d="M20 3L4 25l16 22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useTitle("Just After Midnight | 24/7 Support, Managed Cloud & DevOps");
  const [tab, setTab] = useState("brands");
  const navRef = useRef(null);
  const [lineStyle, setLineStyle] = useState({});

  /* The reference slides a fixed 76px bar under the active tab; measuring the
     button keeps it aligned however the labels wrap. */
  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector(".partners-tab.active");
    if (!nav || !active) return undefined;

    function move() {
      const navBox = nav.getBoundingClientRect();
      const activeBox = active.getBoundingClientRect();
      setLineStyle({
        transform: `translateX(${activeBox.left - navBox.left}px)`,
        width: `${activeBox.width}px`,
      });
    }

    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [tab]);

  function scrollToNext() {
    document.getElementById("statement")?.scrollIntoView({ block: "start" });
  }

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
        <div className="hero-clouds" aria-hidden="true">
          <svg className="hero-cloud hero-cloud-a" viewBox="0 0 200 90">
            <path d="M40 88c-22 0-38-14-38-32S20 22 40 24C46 8 64 0 82 6c14-16 40-14 52 4 24-2 42 12 42 30s-18 30-42 30z" />
          </svg>
          <svg className="hero-cloud hero-cloud-b" viewBox="0 0 200 90">
            <path d="M40 88c-22 0-38-14-38-32S20 22 40 24C46 8 64 0 82 6c14-16 40-14 52 4 24-2 42 12 42 30s-18 30-42 30z" />
          </svg>
        </div>
        <svg className="hero-moon" viewBox="0 0 96 96" aria-hidden="true">
          <path d="M58 6a42 42 0 1 0 27 75A46 46 0 0 1 58 6z" fill="#FABD14" />
        </svg>
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1 className="hero-title reveal">24/7 support, cloud &amp; DevOps for brands, agencies and digital products</h1>
            <p className="hero-subtitle reveal">Keeping your revenue, reputation and digital estate protected — every hour, every day of the year.</p>
            <div className="hero-actions reveal">
              <Link to="/support" className="btn btn-primary">View support packages <span aria-hidden="true">➔</span></Link>
              <Link to="/contact" className="btn btn-primary">Speak to us <span aria-hidden="true">➔</span></Link>
            </div>
          </div>
          <div className="hero-trust reveal">
            <p className="trust-label">Trusted by:</p>
            <ul className="trust-logos" aria-label="Selected clients">
              <li className="trust-logo">TESSERA</li>
              <li className="trust-logo">HELIOS&nbsp;BANK</li>
              <li className="trust-logo">NORTHBANK</li>
              <li className="trust-logo">ARCADIA</li>
              <li className="trust-logo">VOLTA</li>
              <li className="trust-logo">BLUEPINE</li>
              <li className="trust-logo">MERIDIAN</li>
            </ul>
          </div>
          <div className="hero-cards card-links reveal">
            {HERO_CARDS.map((card) => (
              <Link to={card.to} className="hero-card card-link" key={card.to}>
                {card.icon}
                <h2 className="h3">{card.title} <Arrow /></h2>
                <p className="md">{card.copy}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="hero-divider" aria-hidden="true">
          <svg className="hero-wave" viewBox="0 0 1920 124" preserveAspectRatio="none">
            <path className="hero-wave__fill" d="M0 24 C150 20 310 25 470 30 C660 36 820 62 960 62 C1080 62 1240 42 1420 46 C1600 50 1740 62 1920 58 V124 H0 Z" />
          </svg>
        </div>

        <button type="button" className="scroll-down" aria-label="Scroll down" onClick={scrollToNext}>
          <svg viewBox="0 0 70 70" aria-hidden="true">
            <circle className="scroll-disc" cx="35" cy="35" r="35" />
            <path className="scroll-arrow" d="M35 21v24m-10-10 10 10 10-10" fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </section>

      <section className="uptime-block seo-text-block" id="statement">
        <div className="container">
          <div className="uptime-content">
            <h2 className="uptime-title reveal">We're the experts in uptime.</h2>
            <p className="uptime-text reveal">We build, run and look after your infrastructure, applications and services through a world-class 24/7 support operation.</p>
            <p className="uptime-text reveal">And we step in fast when things go wrong, so your team can sleep at night.</p>
          </div>
        </div>
      </section>

      <WorkSlider />

      <StatsStrip />

      <section className="full-services" id="services">
        <div className="container">
          <h2 className="section-title reveal">Our Services</h2>
          <div className="services-wrapper">
              {SERVICES.map((service) => (
                <div className="service-item reveal" key={service.title}>
                  <div className="service-wrap">
                    <div className="service-icon" aria-hidden="true">
                      <svg viewBox="0 0 48 48">{service.icon}{service.iconExtra}</svg>
                    </div>
                    <h3 className="service-title">
                      <Link to={service.to}>{service.title} <Chevron /></Link>
                    </h3>
                    <div className="service-content">
                      <p>{service.copy}</p>
                    </div>
                  </div>
                  <div className="title-and-service-wrapper">
                    {service.groups.map((group) => (
                      <div className="title-service-item" key={group.label}>
                        <div className="service-link">
                          <h4>
                            <Link to={group.to}>{group.label} <Chevron /></Link>
                          </h4>
                        </div>
                        <div className="links-of-service-wrapper">
                          <ul className="child-services-list">
                            {group.children.map((child) => (
                              <li key={child.label}>
                                <Link to={child.to}>{child.label} <Chevron /></Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="container">
          <div className="cta reveal">
            <h2>Tell us what your queue looks like.</h2>
            <h3>Our engineers are on shift around the clock.</h3>
            <Link to="/contact" className="btn filled">Talk to our team <span aria-hidden="true">➔</span></Link>
          </div>
        </div>
      </section>

      <section className="report-download-cta">
        <div className="stars-bg">
          <div className="wrapper">
            <div className="container">
              <div className="report-grid">
                <div className="report-col">
                  <div className="content">
                    <h2>What does real 24/7 cover actually look like?</h2>
                    <p>A night shift is more than someone awake at 3am. This short guide walks through the escalation ladder, the handover notes, and the response targets we hold every queue to &mdash; across cloud, DevOps and SaaS support.</p>
                  </div>
                  <div className="btns">
                    <Link to="/contact" className="btn btn-outline">Download the report <span aria-hidden="true">➔</span></Link>
                  </div>
                </div>
                <div className="report-media">
                  <div className="report-art" aria-hidden="true">
                    <svg viewBox="0 0 200 160">
                      <path d="M40 132h120" stroke="#BFBFBF" strokeWidth="4" strokeLinecap="round" />
                      <path d="M52 132V84l32-24 32 20 32-36v88" fill="none" stroke="#FABD14" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="116" cy="44" r="6" fill="#243F88" />
                      <rect x="146" y="52" width="10" height="80" rx="4" fill="#1F2C49" transform="rotate(18 151 92)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="partners-and-clients">
        <div className="container">
          <div className="partners-header">
            <h2 className="partners-title reveal">A few of our partners &amp; clients</h2>
            <div className="partners-nav reveal" ref={navRef}>
              <div className="nav-tabs" role="tablist" aria-label="Client types">
                {TABS.map((item) => (
                  <button
                    key={item.key}
                    className={`partners-tab${tab === item.key ? " active" : ""}`}
                    role="tab"
                    aria-selected={String(tab === item.key)}
                    onClick={() => setTab(item.key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="nav-underline" aria-hidden="true">
                <span className="nav-line-full" />
                <span className="nav-line-active" style={lineStyle} />
              </div>
            </div>
          </div>

          {TABS.map((item) => (
            <div key={item.key} className={`partners-grid${tab === item.key ? " active" : ""}`} hidden={tab !== item.key}>
              {item.logos.map((logo) => (
                <div className="partner-logo" key={logo}>{logo}</div>
              ))}
            </div>
          ))}

          <div className="buttons reveal">
            <Link to="/contact" className="btn btn-primary">Find out more about partnership <span aria-hidden="true">➔</span></Link>
          </div>
        </div>
      </section>

      <LatestInsights />
    </>
  );
}
