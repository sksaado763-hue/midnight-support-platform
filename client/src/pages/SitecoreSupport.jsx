import { useState } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import ReviewsBand from "../components/ReviewsBand";
import WhyBand from "../components/WhyBand";
import InsightsBand from "../components/InsightsBand";

const HERO_IMAGE = "/images/sitecore/hero-bg.jpg";
const SITECORE_LOGO = "/images/sitecore/sitecore-logo.svg";
const ROCKET_STACK = "/images/sitecore/rocket-stack.webp";
const DOWNTIME_GIF = "/images/sitecore/downtime.webp";
const DLA_PIPER_IMG = "/images/sitecore/dla-piper.png";
const EVERTON_IMG = "/images/sitecore/everton.png";

const HERO_FEATURES = [
  {
    icon: "/images/sitecore/icon-clock.webp",
    title: "We provide end-to-end Sitecore incident management",
    desc: "From full-stack monitoring to a real human L2 on the end of the phone or Slack channel, we provide end-to-end IM for your Sitecore stack under an industry-leading SLA.",
  },
  {
    icon: "/images/sitecore/icon-block.webp",
    title: "Sitecore specialists",
    desc: "We’re ready to lead when it comes to AI integration, headless architectures or composable solutions. You set the direction, we build the road.",
  },
  {
    icon: "/images/sitecore/icon-route.webp",
    title: "We're proactive about performance",
    desc: "From autoscaling to proper CDN implementation, we're proactive about your application's performance. We build cloud-native best practices as standard.",
  },
  {
    icon: "/images/sitecore/icon-bed.webp",
    title: "We follow the sun",
    desc: "With teams of engineers across 4 time zones, we can always have an engineer on your ticket within minutes. When you clock off, we clock on.",
  },
  {
    icon: "/images/sitecore/icon-puzzle.webp",
    title: "We're full-stack",
    desc: "No piece of the puzzle is too small, too big or too complex for us to handle. From your core Sitecore application to the shopping cart microservice, we cover the whole stack.",
  },
  {
    icon: "/icons/why-cloud-strategy.svg",
    title: "We're tech-enabled; person-led",
    desc: "We're not a cookie-cutter SaaS-based hosting service. And we're not an old-guard hardware company that pivoted to cloud. We provide a tech-enabled service led by Sitecore gurus.",
  },
  {
    icon: "/icons/cloud-web-application.svg",
    title: "We support DevOps",
    desc: "We can accelerate an existing DevOps function or guide you towards a full CI/CD pipeline. We can build a DevOps function that suits you and your industry.",
  },
  {
    icon: "/icons/cloud-design.svg",
    title: "We're backed by best-in-show design",
    desc: "If you have a Sitecore application hosted on legacy architecture, we can help you modernise. From refactoring to microservices to building for HIPAA compliance, we build tailored cloud solutions.",
  },
  {
    isCta: true,
    title: "Hitting the mark?",
    desc: "If you like what you're hearing, there's plenty more where that came from. Get in touch with one of our Sitecore experts today and have your solution protected come rain or shine.",
  },
];

const PACKAGES = [
  {
    tier: "Simple Reassurance",
    name: "FIRST-LINE SUPPORT",
    features: ["Monitoring", "L1 Communications", "<30 Minute Response Time"],
  },
  {
    tier: "Overnight & weekends",
    name: "OUT-OF-HOURS SUPPORT",
    features: ["Monitoring", "L1 Communications", "L2 Resolution", "Incident Reporting", "Recommendations", "<30 Minute Response Time"],
  },
  {
    tier: "Complete cover",
    name: "24/7 SUPPORT",
    popular: true,
    features: ["Monitoring", "L1 Communications", "L2 Resolution", "Incident Reporting", "Recommendations", "<30 Minute Response Time"],
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
    items: ["Incident triage", "Rapid incident escalation", "RCA (Root Cause Analysis)", "Out-of-hours coverage", "Multi-vendor co-ordination"],
  },
  {
    title: "Service continuity and recovery",
    items: ["Backup monitoring", "DR planning and testing", "DR activation and recovery", "RPO & RTO tracking", "Post-incident recovery"],
  },
  {
    title: "Access and security management",
    items: ["Access review and auditing", "Secret and key rotation", "WAF/Firewall monitoring", "Certificate renewal and management", "Patching and CVE management"],
  },
  {
    title: "Quality and process improvement",
    items: ["Runbook review", "Trend and root-cause analysis", "Architectural review", "DevOps best-practice alignment", "Continual service improvement"],
  },
  {
    title: "Observability and performance",
    items: ["Full-stack monitoring", "Performance and latency analysis", "Capacity management and forecasting"],
  },
  {
    title: "Service management and operations",
    items: ["SLA management", "Change management", "Patch management", "Downtime reporting", "Ticket management", "Outage communication", "Configuration management", "Service request management", "Escalation management"],
  },
];

const SITECORE_FAQS = [
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
    a: "Monitoring: Continuous tracking of your systems, applications, or cloud infrastructure to ensure optimal performance, uptime, and security. L1 Communications: First line of communication in support, dealing with basic technical issues. <30 Minute Response Time: A commitment to acknowledge and respond to any support request within 30 minutes. L2 Resolution: Level 2 support involving advanced troubleshooting and in-depth application debugging. Incident Reporting: Detailed post-incident reports with root causes and preventive recommendations.",
  },
];

export default function SitecoreSupport() {
  useTitle("Sitecore Support, Maintenance & Hosting | Just After Midnight");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq((curr) => (curr === idx ? null : idx));
  };

  return (
    <main className="sc-page" id="main-content">
      {/* 0. HERO SECTION */}
      <section
        className="sc-hero"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
        }}
        aria-label="Sitecore Support, Maintenance & Hosting"
      >
        <div className="sc-container">
          <div className="sc-hero__row">
            <div className="sc-hero__col sc-hero__col--text">
              <h1 className="sc-hero__title">Sitecore Support, Maintenance &amp; Hosting</h1>
              <p className="sc-hero__sub">24/7 support, hosting and consulting from a leading Sitecore agency</p>
              <div className="sc-hero__actions">
                <Link to="/contact" className="sc-btn-primary">
                  Get in touch <span>➔</span>
                </Link>
              </div>
            </div>

            <div className="sc-hero__col sc-hero__col--badge">
              <div className="sc-partner-badge">
                <div className="sc-partner-badge__logo-wrap">
                  <img src={SITECORE_LOGO} alt="Sitecore logo" />
                </div>
                <span className="sc-partner-badge__text">Specialist support provider</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global curved wave divider */}
        <div className="global-curved-divider global-curved-divider__down" aria-hidden="true">
          <svg viewBox="0 0 1920 89" fill="none" preserveAspectRatio="none">
            <path
              d="M0 0H915.5H1920V55L1750.82 72.623C1544.17 94.1494 1335.83 94.1494 1129.18 72.623L960 55L790.819 72.623C584.17 94.1494 375.83 94.1494 169.181 72.623L0 55V0Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* 1. WHAT IS SITECORE SUPPORT */}
      <section className="sc-section sc-what" aria-label="What is Sitecore support">
        <div className="sc-container">
          <div className="sc-what__row">
            <div className="sc-what__text">
              <h2 className="sc-heading-primary">What is Sitecore support, maintenance &amp; hosting?</h2>
              <p className="sc-lead-p">
                We’re the go-to support people for Sitecore brands and agencies. Whether you need 24/7 support for your Sitecore application and cloud-native infrastructure, help with CMS maintenance or a cloud consulting agency to take the lead on your environment, we’ve got you covered.
              </p>
              <p className="sc-sub-lead">Here&apos;s how:</p>
            </div>
            <div className="sc-what__visual">
              <img src={ROCKET_STACK} alt="Sitecore full stack illustration" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM & SOLUTION */}
      <section className="sc-section sc-problem-solution" aria-label="Your problem vs Our solution">
        <div className="sc-container">
          <div className="sc-ps-grid">
            {/* Your Problem */}
            <div className="sc-ps-card sc-ps-card--problem">
              <h2 className="sc-ps-card__heading">Your problem</h2>
              <h3 className="sc-ps-card__sub">You have a Sitecore application that could do more</h3>
              <ul className="sc-ps-list sc-ps-list--problem">
                <li>
                  <span className="sc-ps-icon sc-ps-icon--cross" aria-hidden="true">✕</span>
                  <span><strong>You’re with a cookie-cutter hosting provider:</strong> when you need to customise, there’s no wiggle room</span>
                </li>
                <li>
                  <span className="sc-ps-icon sc-ps-icon--cross" aria-hidden="true">✕</span>
                  <span><strong>Your support solution isn’t full-stack or 24/7:</strong> when things go wrong outside your Sitecore stack or office hours – you’re in the lurch</span>
                </li>
                <li>
                  <span className="sc-ps-icon sc-ps-icon--cross" aria-hidden="true">✕</span>
                  <span><strong>Your hosting provider isn’t cloud-native:</strong> you’re not adopting new technology fast enough</span>
                </li>
                <li>
                  <span className="sc-ps-icon sc-ps-icon--cross" aria-hidden="true">✕</span>
                  <span><strong>Maybe you&apos;ve gone with XM Cloud for ease of deployment:</strong> a 24/7 call center with a ping when your app goes down doesn&apos;t cut the mustard</span>
                </li>
              </ul>
            </div>

            {/* Our Solution */}
            <div className="sc-ps-card sc-ps-card--solution">
              <h2 className="sc-ps-card__heading">Our solution</h2>
              <h3 className="sc-ps-card__sub">Full-stack support, tailored cloud solutions and real engineers on your tickets</h3>
              <ul className="sc-ps-list sc-ps-list--solution">
                <li>
                  <span className="sc-ps-icon sc-ps-icon--check" aria-hidden="true">✓</span>
                  <span><strong>We offer customer-centric solutions:</strong> HIPAA-compliant hosting? Headless architecture? You got it</span>
                </li>
                <li>
                  <span className="sc-ps-icon sc-ps-icon--check" aria-hidden="true">✓</span>
                  <span><strong>We’re 24/7 and full-stack:</strong> we’re on your tickets whether it’s an issue with your Sitecore application or any stack component</span>
                </li>
                <li>
                  <span className="sc-ps-icon sc-ps-icon--check" aria-hidden="true">✓</span>
                  <span><strong>We build for the future:</strong> we’re here to ensure you stay where you belong – at the head of the pack</span>
                </li>
                <li>
                  <span className="sc-ps-icon sc-ps-icon--check" aria-hidden="true">✓</span>
                  <span><strong>Proactive means proactive:</strong> when we detect an issue, we deploy engineers in minutes — we&apos;re tech-enabled, person-led</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="sc-ps-summary">
            <p>
              <strong>All in all?</strong> We’re not a cookie-cutter SaaS-based hosting service. And we’re not an old-guard hardware company that pivoted to cloud. We provide a human-led, tech-enabled service headed up by Sitecore experts to meet your needs.
            </p>
          </div>
        </div>
      </section>

      {/* 3. VIDEO / DOWNTIME BANNER */}
      <section className="sc-section sc-video-banner" aria-label="See how we support your Sitecore solution">
        <div className="sc-container">
          <div className="sc-video-banner__row">
            <div className="sc-video-banner__text">
              <h2 className="sc-video-banner__title">See how we support your Sitecore solution</h2>
              <p className="sc-video-banner__desc">
                This video will explain how we cover your Sitecore infrastructure, application and integrations 24/7, out of hours or whenever you need.
              </p>
              <p className="sc-video-banner__sub">To take a closer look at your support options and SLAs...</p>
              <a href="#packages" className="sc-btn-primary">
                View our packages! <span>➔</span>
              </a>
            </div>
            <div className="sc-video-banner__visual">
              <img src={DOWNTIME_GIF} alt="Sitecore solution support downtime animation" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. NOT YOUR NEIGHBOURHOOD SITECORE SUPPORT (ICON GRID ON NAVY) */}
      <section className="sc-section sc-icon-grid" aria-label="Not your neighbourhood Sitecore support">
        <div className="sc-container">
          <div className="sc-icon-grid__header">
            <h2 className="sc-icon-grid__title">Not your neighbourhood Sitecore support</h2>
            <p className="sc-icon-grid__sub">
              <strong>But still pretty heroic.</strong> Just After Midnight is the Sitecore managed services agency that goes all the extra miles. From custom cloud solutions to best-in-show full-stack support.
            </p>
          </div>

          <div className="sc-icon-grid__cards">
            {HERO_FEATURES.map((item, i) => (
              <div className={`sc-feature-card ${item.isCta ? "sc-feature-card--cta" : ""}`} key={i}>
                {!item.isCta && item.icon && (
                  <div className="sc-feature-card__icon-wrap">
                    <img src={item.icon} alt="" aria-hidden="true" />
                  </div>
                )}
                <h3 className="sc-feature-card__title">{item.title}</h3>
                <p className="sc-feature-card__desc">{item.desc}</p>
                {item.isCta && (
                  <Link to="/contact" className="sc-btn-primary sc-feature-card__btn">
                    Get in touch <span>➔</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR SERVICE PACKAGES */}
      <section className="sc-section sc-packages" id="packages" aria-label="Our service packages">
        <div className="sc-container">
          <div className="sc-packages__header">
            <h2 className="sc-heading-primary">Our service packages</h2>
            <p className="sc-packages__intro">
              It&apos;s simple – you pick the level of support you need and we provide it. If you&apos;re in need of something bespoke, just{" "}
              <Link to="/contact" className="sc-inline-link">get in touch</Link>.
            </p>
          </div>

          <div className="sc-packages__grid">
            {PACKAGES.map((pkg, i) => (
              <div className={`sc-package-card ${pkg.popular ? "sc-package-card--popular" : ""}`} key={i}>
                {pkg.popular && <span className="sc-package-card__badge">Most Popular</span>}
                <div className="sc-package-card__header">
                  <span className="sc-package-card__tier">{pkg.tier}</span>
                  <h3 className="sc-package-card__name">{pkg.name}</h3>
                </div>
                <ul className="sc-package-card__list">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx}>
                      <span className="sc-pkg-check">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <div className="sc-package-card__footer">
                  <Link to="/contact" className={`sc-package-btn ${pkg.popular ? "sc-package-btn--primary" : ""}`}>
                    {pkg.name.includes("CUSTOM") ? "Learn more" : "Select package"}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="sc-packages__note">
            <p>
              <strong>Need build solutions, not support?</strong> If you’re more interested in refactoring or modernising your infrastructure, check out our{" "}
              <Link to="/cloud/solution-architecture" className="sc-inline-link">solutions page</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="sc-section sc-faq" aria-label="Frequently Asked Questions">
        <div className="sc-container">
          <h2 className="sc-heading-primary sc-faq__title">FAQ</h2>
          <div className="sc-faq__list">
            {SITECORE_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div className={`sc-faq-item ${isOpen ? "is-open" : ""}`} key={idx}>
                  <button
                    type="button"
                    className="sc-faq-item__trigger"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={String(isOpen)}
                  >
                    <span className="sc-faq-item__q">{faq.q}</span>
                    <span className="sc-faq-item__icon" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="sc-faq-item__content">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. DLA PIPER CASE STUDY */}
      <section className="sc-section sc-case-study" aria-label="DLA Piper Case Study">
        <div className="sc-container">
          <div className="sc-case-box">
            <div className="sc-case-box__text">
              <span className="sc-case-box__eyebrow">DLA Piper</span>
              <h2 className="sc-case-box__title">Supporting DLA Piper’s global operations with AWS and Sitecore expertise</h2>
              <p className="sc-case-box__desc">
                DLA Piper, a leading global law firm, needed to stabilise their cloud-based Sitecore deployment. Just After Midnight stepped in, modernising their AWS infrastructure, providing 24/7 support, and ensuring peak performance.
              </p>
              <Link to="/case-studies/dla-piper" className="sc-btn-primary">
                READ CASE STUDY <span>➔</span>
              </Link>
            </div>
            <div className="sc-case-box__image-wrap">
              <img src={DLA_PIPER_IMG} alt="DLA Piper case study" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. ON OUR LIST, OFF YOUR MIND */}
      <section className="sc-section sc-checklist" aria-label="On our list, off your mind">
        <div className="sc-container">
          <div className="sc-checklist__header">
            <h2 className="sc-heading-primary">On our list, off your mind</h2>
            <p className="sc-checklist__sub">We&apos;re a one-and-done partner for delivering world-class applications</p>
          </div>

          <div className="sc-checklist__grid">
            {CHECKLIST_SECTIONS.map((sec, i) => (
              <div className="sc-checklist-card" key={i}>
                <h3 className="sc-checklist-card__title">{sec.title}</h3>
                <ul className="sc-checklist-card__items">
                  {sec.items.map((item, j) => (
                    <li key={j}>
                      <span className="sc-check-bullet">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="sc-checklist__bottom-cta">
            <div className="sc-bottom-cta-box">
              <p className="sc-bottom-cta-box__text">
                It&apos;s simple – you tell us your requirements and we plug in wherever you need us. So, where can we help?
              </p>
              <Link to="/contact" className="sc-btn-primary">
                Get in touch <span>➔</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. EVERTON CASE STUDY */}
      <section className="sc-section sc-case-study sc-case-study--alt" aria-label="Everton Football Club Case Study">
        <div className="sc-container">
          <div className="sc-case-box sc-case-box--reverse">
            <div className="sc-case-box__text">
              <span className="sc-case-box__eyebrow">Everton Football Club</span>
              <h2 className="sc-case-box__title">Optimising Everton FC’s website for peak performance</h2>
              <p className="sc-case-box__desc">
                Everton FC’s website struggled with slow performance and frequent errors during peak traffic. Just After Midnight optimised their AWS-hosted Sitecore platform, updating security patches, automating backups, and improving server capacity. We reduced AWS costs by 30% and provided intensive match day support to ensure fast response times. The results included 99.9% uptime, improved site speed, enhanced security, and compliance with GDPR regulations.
              </p>
              <Link to="/case-studies/everton-football-club" className="sc-btn-primary">
                READ CASE STUDY <span>➔</span>
              </Link>
            </div>
            <div className="sc-case-box__image-wrap">
              <img src={EVERTON_IMG} alt="Everton Football Club" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 10. REVIEWS */}
      <ReviewsBand />

      {/* 11. WHY JAM */}
      <WhyBand />

      {/* 12. LATEST INSIGHTS */}
      <InsightsBand />

      {/* 13. AT A GLANCE (COLOURED BOXES) */}
      <section className="sc-section sc-glance" aria-label="Just After Midnight's support offering">
        <div className="sc-container">
          <div className="sc-glance-grid">
            {/* Dark Box */}
            <div className="sc-glance-box sc-glance-box--dark">
              <span className="sc-glance-tag">At a glance</span>
              <h2 className="sc-glance-title">Just After Midnight’s support offering</h2>

              <div className="sc-glance-item">
                <h3>What technologies do you support?</h3>
                <p>We support cloud platforms (AWS, Azure, GCP, Alibaba Cloud), CMS and DXP platforms (Sitecore, Kentico, Umbraco, AEM, Optimizely, WordPress, Drupal, Magento), custom-built applications, edge/CDN networks, and third-party integrations including APIs.</p>
              </div>

              <div className="sc-glance-item">
                <h3>What support windows are available?</h3>
                <p>24/7/365 support, out-of-hours coverage, first-line support, and bespoke packages tailored to business hours or mission-critical traffic spikes.</p>
              </div>

              <div className="sc-glance-item">
                <h3>What functions does your support team cover?</h3>
                <p>Full-stack monitoring, incident management, triage, resolution, deployment assistance, DevOps support, security and patching, and preventative maintenance.</p>
              </div>

              <div className="sc-glance-item">
                <h3>What industries do you support?</h3>
                <p>Media, publishing, legal, finance, government, charity, eCommerce, entertainment, healthcare, and higher education.</p>
              </div>

              <div className="sc-glance-item">
                <h3>What security accreditations do you hold?</h3>
                <p>ISO 27001, Cyber Essentials Plus, HIPAA-ready architecture, and full GDPR compliance standards.</p>
              </div>
            </div>

            {/* Light Blue Box */}
            <div className="sc-glance-box sc-glance-box--light">
              <h2 className="sc-glance-title">What are the impacts of incidents on teams and revenue?</h2>
              <p className="sc-glance-p">
                According to industry sources, downtime costs businesses between <strong>$540,000</strong> (Splunk, The Hidden Costs of Downtime) and <strong>$2 million</strong> (New Relic, Observability Forecast 2025) per hour for many high-impact outages.
              </p>
              <p className="sc-glance-p">
                Incidents also consume significant engineering capacity: the median engineering team spends <strong>30% of its time</strong> addressing disruptions (New Relic, Observability Forecast 2024), draining resources that could otherwise drive product development.
              </p>

              <div className="sc-sources-box">
                <h3>Sources</h3>
                <ul>
                  <li>Splunk, The Hidden Costs of Downtime (2,000 global executives surveyed)</li>
                  <li>New Relic, Observability Forecast 2025 (1,700 global technology professionals surveyed)</li>
                  <li>New Relic, Observability Forecast 2024 (1,700 global technology professionals surveyed)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
