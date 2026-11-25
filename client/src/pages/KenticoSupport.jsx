import { useState } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import ReviewsBand from "../components/ReviewsBand";
import WhyBand from "../components/WhyBand";
import InsightsBand from "../components/InsightsBand";

const HERO_IMAGE = "/images/kentico/kentico-hero-bg.jpg";
const KENTICO_LOGO = "/images/kentico/kentico-logo.svg";
const ROCKET_STACK = "/images/sitecore/rocket-stack.webp";
const DOWNTIME_GIF = "/images/sitecore/downtime.webp";
const KINGSPAN_IMG = "/images/kentico/kingspan.png";
const TRANSLINK_IMG = "/images/kentico/translink.png";

const HERO_FEATURES = [
  {
    icon: "/images/sitecore/icon-clock.webp",
    title: "End-to-end Kentico incident management",
    desc: "From full-stack monitoring to a real human L2 on the end of the phone or Slack channel, we provide end-to-end IM for your Kentico stack under an industry-leading SLA.",
  },
  {
    icon: "/images/sitecore/icon-block.webp",
    title: "Kentico specialists",
    desc: "We support complex architectures using Xperience 13. We’re purpose-built to provide support for composable DXPs, headless and more.",
  },
  {
    icon: "/images/sitecore/icon-route.webp",
    title: "Proactive about performance",
    desc: "From database optimisation to content caching, we're proactive about your Kentico application’s performance. We build to your KPIs.",
  },
  {
    icon: "/images/sitecore/icon-bed.webp",
    title: "We follow the sun",
    desc: "With teams of engineers across 4 time zones, we can always have an engineer on your ticket within minutes. When you clock off, we clock on.",
  },
  {
    icon: "/images/sitecore/icon-puzzle.webp",
    title: "We're full-stack",
    desc: "No piece of the puzzle is too small, too big or too complex for us to handle. From your core Kentico application to the shopping cart microservice, we cover the whole stack.",
  },
  {
    icon: "/icons/why-cloud-strategy.svg",
    title: "Tech-enabled; person-led",
    desc: "We're not a SaaS-based, self-service factory. And we're not an old-guard hardware company that pivoted to cloud. We supply a tech-enabled service led by Kentico gurus.",
  },
  {
    icon: "/icons/cloud-web-application.svg",
    title: "DevOps Supported",
    desc: "We can accelerate an existing DevOps function or manage your full CI/CD pipeline. We build a DevOps function that suits your Kentico application and your industry.",
  },
  {
    icon: "/icons/cloud-design.svg",
    title: "Backed by best-in-show design",
    desc: "If you have a Kentico application hosted on legacy architecture, we can help you modernise. We can consult on fully composable designs and support them around the clock.",
  },
  {
    isCta: true,
    title: "Hitting the mark?",
    desc: "If you like what you're hearing, there's plenty more where that came from. Get in touch with one of our Kentico experts today and have your solution protected come rain or shine.",
  },
];

const PACKAGES = [
  {
    tier: "Simple Reassurance",
    name: "FIRST-LINE SUPPORT",
    features: ["Monitoring", "L1 Communications"],
  },
  {
    tier: "Overnight & weekends",
    name: "OUT-OF-HOURS SUPPORT",
    features: ["Monitoring", "L1 Communications", "L2 Resolution", "Incident Reporting", "Recommendations"],
  },
  {
    tier: "Complete cover",
    name: "24/7 SUPPORT",
    popular: true,
    features: ["Monitoring", "L1 Communications", "L2 Resolution", "Incident Reporting", "Recommendations"],
  },
  {
    tier: "A tailored service",
    name: "CUSTOM & ADD-ONS",
    features: [
      "Infrastructure or Application Only",
      "Faster SLA Response Times",
      "Custom Code",
      "Custom Applications",
      "DevOps Support",
      "Ticket Cap",
      "Anything else? Chat to our team and we can make it work",
    ],
  },
];

const CHECKLIST_SECTIONS = [
  {
    title: "Incident and response management",
    items: [
      "Incident management (IM)",
      "Root cause analysis (RCA)",
      "Incident response management",
      "Incident triage",
      "Security incident response",
    ],
  },
  {
    title: "Service continuity and recovery",
    items: [
      "Application rollbacks",
      "Restarting services",
      "Backup and restore procedures",
      "Manual scaling of resources",
    ],
  },
  {
    title: "Access and security management",
    items: [
      "IP whitelisting",
      "Access management",
      "Password resets",
      "User account provisioning",
      "User removal",
      "Access control",
    ],
  },
  {
    title: "Quality and process improvement",
    items: [
      "Service validation and testing",
      "Knowledge base management",
      "Post-incident review (PIR)",
      "Vendor liaison/3rd-party escalation",
    ],
  },
  {
    title: "Observability and performance",
    items: [
      "System health observability",
      "Monitoring, alerts and telemetry",
      "Performance monitoring",
      "Network diagnostics and flow analysis",
      "End-to-end latency analysis",
      "Capacity management and forecasting",
    ],
  },
  {
    title: "Service management and operations",
    items: [
      "SLA management",
      "Change management",
      "Patch management",
      "Downtime reporting",
      "Ticket management",
      "Outage communication",
      "Configuration management",
      "Service request management",
      "Escalation management",
    ],
  },
];

const FAQS = [
  {
    q: "What is application support?",
    a: "Application support means supporting everything in the application layer. App support engineers will be au fait with a wide array of languages, experience platforms as well as other dev-y stuff. When we provide app support, we make sure your app stays up, performs well and keeps delivering value to your customers.",
  },
  {
    q: "What is infrastructure support?",
    a: "Same deal, but for your cloud. When we take care of your infrastructure, we monitor and triage for any hiccups, ensuring it runs smoothly, cheaply or however you like it. We also build, review and optimise cloud infrastructure. So if you’re in the market for more than support, check out some of our other cloud services.",
  },
  {
    q: "What is full-stack support?",
    a: "Full-stack support is just the two above services combined. Although, with applications growing increasingly distributed, full-stack often means supporting 3rd-party integrations, too. That’s why Mission Control (our bespoke full-stack solution) is indispensable.",
  },
  {
    q: "Aren't cloud support and DevOps the same thing?",
    a: "Cloud/infrastructure support has some crossover with both DevOps and CloudOps. Essentially, if you’re looking to fine-tune your deployments, performance or cloud processes, we’ll be able to help; what you call it is up to you!",
  },
  {
    q: "How does it work?",
    a: "Our process is simple, just get in touch and we’ll take it from there. We work out what our support team will cover and when. Your business needs set the scope of the project. Maybe you need application support and incident resolution. Maybe you only need proactive monitoring so your own support teams can pick up tickets. It’s up to you. From website security to app support, from website maintenance to the ongoing monitoring of your cloud services – our mission is to fit like a glove.",
  },
  {
    q: "Need a glossary for our packages terms?",
    glossary: [
      { term: "Monitoring", desc: "Continuous tracking of your systems, applications, or cloud infrastructure to ensure optimal performance, uptime, and security. Monitoring includes real-time alerts for anomalies, potential bottlenecks, or system failures that may require immediate attention." },
      { term: "L1 Communications", desc: "This refers to the first line of communication in support, dealing with basic technical issues. L1 support typically handles tasks such as troubleshooting simple problems, resetting passwords, and answering general user queries, before escalating more complex issues to higher levels." },
      { term: "<30 Minute Response Time", desc: "A commitment to acknowledge and respond to any support request or issue within 30 minutes, ensuring that problems are addressed swiftly to minimise downtime and potential impact on business operations." },
      { term: "L2 Resolution", desc: "Level 2 (L2) support involves more advanced troubleshooting and technical expertise, often dealing with more complex issues that L1 cannot resolve. This could include in-depth application debugging, database issues, or network performance problems." },
      { term: "Incident Reporting", desc: "After resolving an issue, we provide a detailed report outlining what happened, how it was addressed, and any preventive actions that should be taken in the future. This helps in improving processes and avoiding recurring incidents." },
      { term: "Recommendations", desc: "Alongside solving problems, we offer expert suggestions to optimise your infrastructure or applications. These could range from security improvements to performance enhancements, based on our analysis of your systems and their behaviour during incidents." },
      { term: "Infrastructure or Application Only", desc: "You can choose to limit our support to just your cloud infrastructure or specific applications. For example, we can focus solely on maintaining your AWS environment or handle only your custom eCommerce platform, based on your needs." },
      { term: "Faster SLA Response Times", desc: "If the standard <30 minute response time isn’t enough for your business, we offer customisable Service Level Agreements (SLAs) with even quicker response times to ensure issues are handled with the utmost urgency." },
      { term: "Custom Code", desc: "We provide support for custom-built applications or software. This means our team is skilled in understanding, troubleshooting, and optimising code that isn’t part of off-the-shelf solutions, ensuring your unique systems run smoothly." },
      { term: "Custom Applications", desc: "Beyond just supporting standard platforms, we specialise in supporting fully bespoke applications. Whether your app is designed in-house or by a third-party developer, we ensure it’s maintained and optimised according to your specific needs." },
      { term: "DevOps Support", desc: "Our DevOps support focuses on managing and automating your software development pipelines and infrastructure. This includes Continuous Integration/Continuous Deployment (CI/CD), infrastructure as code (IaC), and other tools that streamline operations and enable faster, more reliable releases." },
      { term: "Ticket Cap", desc: "If you want to manage the number of support requests, we can set a cap on how many tickets we’ll handle within a given time frame. This allows you to control costs and prioritise critical issues while leaving routine tasks to your in-house team." },
    ],
  },
  {
    q: "More questions?",
    a: "Just drop us a line to see how we could support your Kentico application. A member of our team will be right with you.",
  },
];

const CASE_STUDY_CARDS = [
  {
    img: "/images/kentico/card-hc-one.png",
    name: "HC-One",
    headline: "Keeping a national care provider’s digital services fast, stable and always available",
    to: "/case-studies/hc-one",
  },
  {
    img: "/images/kentico/card-kingspan.png",
    name: "Kingspan",
    headline: "Robust support for the global leader in high performance insulation",
    to: "/case-studies/kingspan",
  },
  {
    img: "/images/kentico/card-translink.png",
    name: "Translink",
    headline: "Ensuring Northern Irish passengers a smooth journey",
    to: "/case-studies/translink",
  },
  {
    img: "/images/kentico/card-azora.png",
    name: "Azora Finance",
    headline: "Providing an auto-scaling solution and watertight security while empowering the in-house development team",
    to: "/case-studies/azora-finance",
  },
];

export default function KenticoSupport() {
  useTitle("Kentico Support, Hosting & DevOps Management | Just After Midnight");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="kt-page">
      {/* 0. HERO SECTION */}
      <section
        className="kt-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(18, 32, 63, 0.88), rgba(18, 32, 63, 0.95)), url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="kt-container">
          <div className="kt-hero__row">
            <div className="kt-hero__content">
              <h1 className="kt-hero__title">
                Kentico Support, Hosting & DevOps Management
              </h1>
              <p className="kt-hero__sub">
                24/7 support, hosting, consulting and DevOps management
              </p>
              <div className="kt-hero__actions">
                <Link to="/contact" className="kt-btn-primary">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="kt-hero__badge-card">
              <div className="kt-badge-inner">
                <img
                  src={KENTICO_LOGO}
                  alt="Kentico Logo"
                  className="kt-badge-logo"
                />
                <span className="kt-badge-text">
                  Kentico Specialist support provider
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. OVERVIEW & ROCKET */}
      <section className="kt-section kt-overview">
        <div className="kt-container">
          <div className="kt-overview__row">
            <div className="kt-overview__content">
              <h2 className="kt-heading-primary">
                Kentico support, DevOps & consulting
              </h2>
              <p className="kt-overview__body">
                We’re the go-to support people for Kentico brands and agencies.
                We provide end-to-end 24/7 support to ensure uptime and smooth
                delivery. We lead on cloud-native consulting and building – and
                we manage your DevOps process by either supplying DevOps as a
                managed service or filling the out-of-hours gaps with our own
                engineers. Here's how:
              </p>
            </div>
            <div className="kt-overview__visual">
              <img
                src={ROCKET_STACK}
                alt="Rocket stack illustration"
                className="kt-rocket-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM & SOLUTION */}
      <section className="kt-section kt-ps-section">
        <div className="kt-container">
          <div className="kt-ps-grid">
            {/* Problem card */}
            <div className="kt-ps-card kt-ps-card--problem">
              <h2 className="kt-ps-title kt-ps-title--problem">Your problem</h2>
              <p className="kt-ps-intro">
                You have a Kentico estate you can’t support and evolve. Here’s
                why:
              </p>
              <ul className="kt-ps-list">
                <li>
                  <span className="kt-ps-icon kt-ps-icon--cross">✕</span>
                  <div>
                    <strong>You’re self-hosted or using a cookie-cutter managed cloud provider:</strong>{" "}
                    you’ve got no wiggle room and no resource for change
                  </div>
                </li>
                <li>
                  <span className="kt-ps-icon kt-ps-icon--cross">✕</span>
                  <div>
                    <strong>Your support solution isn’t full-stack or 24/7:</strong>{" "}
                    incidents and downtime outside of office hours or beyond your
                    immediate application go ignored
                  </div>
                </li>
                <li>
                  <span className="kt-ps-icon kt-ps-icon--cross">✕</span>
                  <div>
                    <strong>Your provider can't keep up:</strong> you want to
                    evolve, but your environment isn't equipped to handle
                    modern challenges
                  </div>
                </li>
                <li>
                  <span className="kt-ps-icon kt-ps-icon--cross">✕</span>
                  <div>
                    <strong>Maybe you've run with Kentico Xperience for a one-vendor solution:</strong>{" "}
                    but a 24/7 call centre and a downtime alert don't get you back
                    online
                  </div>
                </li>
              </ul>
            </div>

            {/* Solution card */}
            <div className="kt-ps-card kt-ps-card--solution">
              <h2 className="kt-ps-title kt-ps-title--solution">Our solution</h2>
              <p className="kt-ps-intro">
                Customer-centric, 24/7 support and managed services for Kentico:
              </p>
              <ul className="kt-ps-list">
                <li>
                  <span className="kt-ps-icon kt-ps-icon--check">✓</span>
                  <div>
                    <strong>We offer customer-centric solutions:</strong> want
                    to rapidly adopt DevOps or need a lot of CMS support? We got
                    you covered
                  </div>
                </li>
                <li>
                  <span className="kt-ps-icon kt-ps-icon--check">✓</span>
                  <div>
                    <strong>We’re 24/7 and full-stack:</strong> we’re on your
                    tickets whether it’s an issue with your Kentico application
                    or any stack component
                  </div>
                </li>
                <li>
                  <span className="kt-ps-icon kt-ps-icon--check">✓</span>
                  <div>
                    <strong>We’re here for the future:</strong> we can support
                    and manage complex and distributed Kentico applications
                    built on Xperience 13
                  </div>
                </li>
                <li>
                  <span className="kt-ps-icon kt-ps-icon--check">✓</span>
                  <div>
                    <strong>We monitor, support, and triage:</strong> when your
                    application runs into an issue, we dispatch engineers in
                    minutes and fix according to an agreed runbook
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VIDEO / DOWNTIME BANNER */}
      <section className="kt-video-banner">
        <div className="kt-container">
          <div className="kt-video-banner__row">
            <div className="kt-video-banner__text">
              <h2 className="kt-video-banner__title">
                See how we support your Kentico solution
              </h2>
              <a href="#packages" className="kt-btn-primary">
                View our packages!
              </a>
            </div>
            <div className="kt-video-banner__media">
              <img
                src={DOWNTIME_GIF}
                alt="Kentico Downtime support animation"
                className="kt-downtime-gif"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. NOT YOUR NEIGHBOURHOOD KENTICO SUPPORT */}
      <section className="kt-section kt-icon-grid">
        <div className="kt-container">
          <div className="kt-icon-grid__header">
            <h2 className="kt-icon-grid__title">
              Not your neighbourhood Kentico support
            </h2>
            <p className="kt-icon-grid__subtitle">
              But still pretty heroic. Just After Midnight is the partner who
              lets you get back to delivering for your customers. We handle the
              rest.
            </p>
          </div>

          <div className="kt-icon-grid__cards">
            {HERO_FEATURES.map((feat, idx) => (
              <div
                key={idx}
                className={`kt-feature-card ${feat.isCta ? "kt-feature-card--cta" : ""}`}
              >
                {!feat.isCta && feat.icon && (
                  <div className="kt-feature-card__icon-wrap">
                    <img
                      src={feat.icon}
                      alt=""
                      className="kt-feature-card__icon"
                    />
                  </div>
                )}
                <h3 className="kt-feature-card__heading">{feat.title}</h3>
                <p className="kt-feature-card__text">{feat.desc}</p>
                {feat.isCta && (
                  <Link to="/contact" className="kt-btn-primary kt-feature-card__btn">
                    Get in touch
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 & 7. OUR SERVICE PACKAGES */}
      <section className="kt-section kt-packages" id="packages">
        <div className="kt-container">
          <div className="kt-packages__header">
            <h2 className="kt-heading-primary kt-packages__title">
              Our service packages
            </h2>
            <p className="kt-packages__sub">
              It's simple – you pick the level of support you need and we provide
              it. If you're in need of something bespoke,{" "}
              <Link to="/contact" className="kt-inline-link">
                just get in touch
              </Link>
              .
            </p>
          </div>

          <div className="kt-packages__grid">
            {PACKAGES.map((pkg, idx) => (
              <div
                key={idx}
                className={`kt-pkg-card ${pkg.popular ? "kt-pkg-card--popular" : ""}`}
              >
                {pkg.popular && (
                  <div className="kt-pkg-popular-tag">Most Popular</div>
                )}
                <div className="kt-pkg-tier">{pkg.tier}</div>
                <h3 className="kt-pkg-name">{pkg.name}</h3>

                <ul className="kt-pkg-features">
                  {pkg.features.map((f, fi) => (
                    <li key={fi}>
                      <span className="kt-pkg-check">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="kt-pkg-actions">
                  <Link
                    to="/contact"
                    className={
                      pkg.popular ? "kt-btn-primary" : "kt-pkg-btn-outline"
                    }
                  >
                    {pkg.name === "CUSTOM & ADD-ONS"
                      ? "Learn more"
                      : "Select package"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="kt-section kt-faq-section">
        <div className="kt-container">
          <div className="kt-faq-header">
            <h2 className="kt-heading-primary">FAQ</h2>
            <p className="kt-faq-intro">
              For a no-nonsense look at what we support, take a look at our
              packages. Still have questions about how our support services
              work? Take a look below.
            </p>
          </div>

          <div className="kt-faq-list">
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`kt-faq-item ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="kt-faq-question"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span className="kt-faq-arrow">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="kt-faq-answer">
                      {item.a && <p>{item.a}</p>}
                      {item.glossary && (
                        <div className="kt-faq-glossary">
                          {item.glossary.map((g, gi) => (
                            <div key={gi} className="kt-faq-glossary__row">
                              <strong>{g.term}:</strong> <span>{g.desc}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. CASE STUDY PREVIEW CARDS */}
      <section className="kt-section kt-case-cards-section">
        <div className="kt-container">
          <div className="kt-case-cards-grid">
            {CASE_STUDY_CARDS.map((card, idx) => (
              <Link key={idx} to={card.to} className="kt-case-card-item">
                <div className="kt-case-card-item__img-wrap">
                  <img src={card.img} alt={card.name} />
                </div>
                <div className="kt-case-card-item__body">
                  <h3 className="kt-case-card-item__title">{card.name}</h3>
                  <p className="kt-case-card-item__headline">{card.headline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CASE STUDY HERO 1: KINGSPAN */}
      <section className="kt-section kt-case-feature kt-case-feature--kingspan">
        <div className="kt-container">
          <div className="kt-case-box">
            <div className="kt-case-box__row">
              <div className="kt-case-box__content">
                <span className="kt-case-badge">Case study</span>
                <h2 className="kt-case-title">Kingspan</h2>
                <h4 className="kt-case-subtitle">
                  Supporting Kingspan's global website and infrastructure
                </h4>
                <p className="kt-case-desc">
                  Partnering with MMT Digital and third parties, we provided
                  out-of-hours support for Kingspan’s website and Azure
                  infrastructure. Our full-stack support team, spanning 4 time
                  zones, ensured seamless site performance across 70 countries,
                  protecting £4.4 billion in revenue.
                </p>
                <Link to="/case-studies/kingspan" className="kt-case-link">
                  READ CASE STUDY →
                </Link>
              </div>
              <div className="kt-case-box__image">
                <img
                  src={KINGSPAN_IMG}
                  alt="Kingspan Global website and infrastructure"
                  className="kt-case-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. ON OUR LIST, OFF YOUR MIND (6 CATEGORIES CHECKLIST) */}
      <section className="kt-section kt-checklist-section">
        <div className="kt-container">
          <div className="kt-checklist__header">
            <h2 className="kt-heading-primary kt-checklist__title">
              On our list, off your mind
            </h2>
            <p className="kt-checklist__sub">
              We're a one-and-done partner for delivering world-class
              applications
            </p>
          </div>

          <div className="kt-checklist__grid">
            {CHECKLIST_SECTIONS.map((sec, idx) => (
              <div key={idx} className="kt-check-col">
                <h4 className="kt-check-col__title">{sec.title}</h4>
                <ul className="kt-check-col__list">
                  {sec.items.map((it, i) => (
                    <li key={i}>
                      <span className="kt-check-bullet">✔</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="kt-checklist__footer">
            <p>
              It's simple – you tell us your requirements and we plug in
              wherever you need us.
            </p>
            <Link to="/contact" className="kt-btn-primary">
              So, where can we help?
            </Link>
          </div>
        </div>
      </section>

      {/* 13. CASE STUDY HERO 2: TRANSLINK */}
      <section className="kt-section kt-case-feature kt-case-feature--translink">
        <div className="kt-container">
          <div className="kt-case-box">
            <div className="kt-case-box__row">
              <div className="kt-case-box__content">
                <span className="kt-case-badge">Case study</span>
                <h2 className="kt-case-title">Translink</h2>
                <h4 className="kt-case-subtitle">
                  Ensuring seamless operations for Translink's website
                </h4>
                <p className="kt-case-desc">
                  Supporting Northern Ireland’s leading public transport
                  provider, we maintained smooth operations for Translink’s
                  high-traffic website and its ‘Journey Planner’ feature. Built on
                  Kentico MVC 11 and hosted on Azure, the site needed 24/7
                  monitoring to support 1.5 million daily passengers. Our team
                  implemented full-page monitors and real-time alerts, ensuring
                  99.9% uptime and a seamless user experience during peak travel
                  hours.
                </p>
                <Link to="/case-studies/translink" className="kt-case-link">
                  READ CASE STUDY →
                </Link>
              </div>
              <div className="kt-case-box__image">
                <img
                  src={TRANSLINK_IMG}
                  alt="Translink website support"
                  className="kt-case-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. REVIEWS BAND */}
      <ReviewsBand />

      {/* 15. WHY BAND (PROTECT REVENUE, SAVE FROM BURNOUT, INNOVATE) */}
      <WhyBand />

      {/* 16. INSIGHTS BAND */}
      <InsightsBand />

      {/* 17 & 18. SUPPORT OFFERING & DOWNTIME IMPACT / STATS */}
      <section className="kt-section kt-info-boxes">
        <div className="kt-container">
          <div className="kt-info-grid">
            {/* Box 1: Support Offering */}
            <div className="kt-info-card kt-info-card--dark">
              <span className="kt-info-tag">At a glance</span>
              <h2 className="kt-info-heading">
                Just After Midnight's support offering
              </h2>

              <div className="kt-qa-group">
                <h3>What technologies do you support?</h3>
                <p>
                  We support cloud platforms (AWS, Azure, GCP, Alibaba Cloud),
                  CMS and DXP platforms (Sitecore, Kentico, Umbraco, AEM,
                  Optimizely, WordPress, Drupal, Magento), custom-built
                  applications, edge/CDN networks, and third-party integrations
                  including APIs.
                </p>
              </div>

              <div className="kt-qa-group">
                <h3>What support windows are available?</h3>
                <p>
                  24/7/365 support, out-of-hours support and overnight support,
                  weekends-only support, or a custom schedule built around your
                  needs.
                </p>
              </div>

              <div className="kt-qa-group">
                <h3>What functions does your support team cover?</h3>
                <p>
                  Our support covers monitoring and alerting, incident triage,
                  issue resolution, performance and health checks, runbook
                  authoring, and preventative maintenance across your full
                  stack.
                </p>
              </div>

              <div className="kt-qa-group">
                <h3>What industries do you support?</h3>
                <p>
                  We support clients across healthcare, financial services,
                  retail, media and publishing, luxury hospitality, public
                  transport, higher education, and government agencies worldwide.
                </p>
              </div>

              <div className="kt-qa-group">
                <h3>What security accreditations do you hold?</h3>
                <p>
                  We are ISO 27001 certified and maintain SOC 2 compliance
                  standards, with strict data security, encrypted communication,
                  and audited operational procedures.
                </p>
              </div>
            </div>

            {/* Box 2: Impacts of Incidents & Sources */}
            <div className="kt-info-card kt-info-card--light">
              <h3 className="kt-info-heading kt-info-heading--dark">
                What are the impacts of incidents on teams and revenue?
              </h3>
              <p className="kt-info-body">
                According to industry sources, downtime costs businesses between{" "}
                <strong>$540,000</strong> (Splunk, The Hidden Costs of Downtime)
                and <strong>$2 million</strong> (New Relic, Observability
                Forecast 2025) per hour for many high-impact outages. Incidents
                also consume significant engineering capacity: the median
                engineering team spends <strong>30%</strong> of its time
                addressing disruptions (New Relic, Observability Forecast 2024).
              </p>

              <div className="kt-sources-box">
                <h3 className="kt-sources-title">Sources</h3>
                <ul className="kt-sources-list">
                  <li>
                    Splunk, <em>The Hidden Costs of Downtime</em> (2,000 global
                    executives surveyed)
                  </li>
                  <li>
                    New Relic, <em>Observability Forecast 2025</em> (1,700 global
                    technology professionals surveyed)
                  </li>
                  <li>
                    New Relic, <em>Observability Forecast 2024</em> (1,700 global
                    technology professionals surveyed)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
