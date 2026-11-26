import { useState } from "react";
import { Link } from "react-router-dom";
import LatestInsights from "../components/Cards";
import ReviewsBand from "../components/ReviewsBand";
import WhyBand from "../components/WhyBand";
import { useTitle } from "../lib/useReveal";

const HERO_IMAGE = "/icons/gcp-Dark-no-graphic-1.webp";
const ROCKET = "/icons/azure-Rocket-stack2.webp";
const DOWNTIME = "/icons/azure-Downtime-gif.webp";
const CITY_BG = "/icons/gcp-JAM-City-BG-MW.webp";
const CHECKLIST_BG = "/icons/sa-city-bg.webp";
const UMBRACO_LOGO = "/images/umbraco/umbraco.svg";

const PROBLEMS = [
  "You use a self-service hosting option or a faceless, unresponsive partner: you haven’t got the resources to lead change",
  "Your support isn’t 24/7 or full-stack: if an outage hits outside 9-5 hours or as a result of a 3rd-party integration, you’re in it alone",
  "Your application’s held back on performance: you know your architecture isn’t fully optimised, but what can you do?",
  "You might be running Umbraco Cloud for headache-free management, but when your application goes down, a 24/7 call center and a ping won’t cut it",
];

const SOLUTIONS = [
  "We offer customer-centric solutions: need a custom monitoring setup to hit industry requirements? Turbo-charged DevOps? We got it",
  "We’re 24/7 and full-stack: we cover your Umbraco stack at the cloud, application and 3rd-party integration level 24/7, 365",
  "We lead on cloud-native and performance: from autoscaling to containerisation, we lead on adopting the best of cloud-native",
  "We monitor, support, and triage: when your application runs into an issue, we dispatch engineers in minutes and fix according to an agreed runbook",
];

const FEATURES = [
  {
    icon: "/icons/clock-arrow.webp",
    title: "End-to-end Umbraco IM; no more hiccups",
    text: "From full-stack monitoring to a real human L2 on the end of the phone or Slack channel, we provide end-to-end support and triage for your application 24/7.",
  },
  {
    icon: "/icons/azure-block-arrows-yellow-e1723042150435.webp",
    title: "Umbraco specialists; no more don’t know",
    text: "From supporting a composable architecture around the clock to fine-tuning your cache strategy, we got you covered.",
  },
  {
    icon: "/icons/azure-route-yellow-e1723042373466.webp",
    title: "Proactive about performance; no more too slow",
    text: "If you want to speed ‘er up, we got you. From autoscaling to serverless, we build the best of cloud-native for our partners.",
  },
  {
    icon: "/icons/azure-bed-yellow-e1723040297931.webp",
    title: "We follow the sun",
    text: "With teams of engineers across 4 time zones, we can always have an engineer on your ticket within minutes. When you clock off, we clock on.",
  },
  {
    icon: "/icons/azure-puzzle-2-yellow-e1723457815994.webp",
    title: "We’re full-stack",
    text: "No piece of the puzzle is too small, too big or too complex for us to handle. From your core Umbraco application to the shopping cart microservice, we cover the whole stack.",
  },
  {
    icon: "/icons/azure-handshake-yellow-e1723117997676.webp",
    title: "We’re tech-enabled; person-led",
    text: "We’re not a SaaS-based, self-service factory. And we’re not an old-guard hardware company trying on a new look. We supply a tech-enabled service led by Umbraco heroes.",
  },
  {
    icon: "/icons/azure-cog-arrow-yellow-e1723119842127.webp",
    title: "DevOps supported",
    text: "We can accelerate an existing DevOps function or manage your full CI/CD pipeline. We build a DevOps function that suits your application, industry and KPIs.",
  },
  {
    icon: "/icons/azure-hand-tick-yellow-e1722955432551.webp",
    title: "We’re backed by best-in-show design",
    text: "If you have an Umbraco application hosted on legacy architecture, we can help you modernise. We consult, build and support. Whatever you need, we got it.",
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
    features: ["Monitoring", "L1 Communications", "L2 Resolution", "Incident Reporting", "Recommendations", "<30 Minute Response Time"],
    popular: true,
  },
  {
    tier: "A tailored service",
    name: "CUSTOM & ADD-ONS",
    features: ["Infrastructure or Application Only", "Faster SLA Response Times", "Custom Code", "Custom Applications", "DevOps Support", "Ticket Cap", "Anything else? Chat to our team and we can make it work"],
  },
];

const GLOSSARY = [
  ["Monitoring", "Continuous tracking of your systems, applications, or cloud infrastructure to ensure optimal performance, uptime, and security. Monitoring includes real-time alerts for anomalies, potential bottlenecks, or system failures that may require immediate attention."],
  ["L1 Communications", "The first line of communication in support, dealing with basic technical issues. L1 support typically handles troubleshooting simple problems, resetting passwords, and answering general user queries before escalating more complex issues."],
  ["<30 Minute Response Time", "A commitment to acknowledge and respond to any support request or issue within 30 minutes, ensuring problems are addressed swiftly to minimise downtime and potential business impact."],
  ["L2 Resolution", "Level 2 support involves advanced troubleshooting and technical expertise for complex issues that L1 cannot resolve, including application debugging, database issues, or network performance problems."],
  ["Incident Reporting", "After resolving an issue, we provide a detailed report outlining what happened, how it was addressed, and preventive actions to improve processes and avoid recurring incidents."],
  ["Recommendations", "Alongside solving problems, we offer expert suggestions to optimise infrastructure or applications, from security improvements to performance enhancements."],
  ["Infrastructure or Application Only", "You can limit our support to just your cloud infrastructure or specific applications, based on your needs."],
  ["Faster SLA Response Times", "If the standard <30 minute response time isn’t enough, we offer customisable Service Level Agreements with quicker response times."],
  ["Custom Code", "We support custom-built applications and software, understanding, troubleshooting, and optimising code that isn’t part of an off-the-shelf solution."],
  ["Custom Applications", "We support fully bespoke applications, whether built in-house or by a third-party developer, and keep them maintained and optimised for your needs."],
  ["DevOps Support", "We manage and automate software development pipelines and infrastructure, including CI/CD, infrastructure as code, and the tools that streamline operations and enable reliable releases."],
  ["Ticket Cap", "We can set a cap on how many support requests we handle within a given time frame, helping you control costs and prioritise critical issues."],
];

const FAQS = [
  {
    q: "What is application support?",
    paragraphs: [
      "Application support means supporting everything in the application layer. App support engineers are comfortable across languages, platforms and the other dev-y stuff.",
      "When we provide app support, we make sure your app stays up, performs well and keeps delivering value to your customers.",
    ],
  },
  {
    q: "What is infrastructure support?",
    paragraphs: [
      "Same deal, but for your cloud. When we take care of your infrastructure, we monitor and triage for any hiccups, ensuring it runs smoothly, cheaply or however you like it.",
      "We also build, review and optimise cloud infrastructure.",
    ],
  },
  {
    q: "What is full-stack support?",
    paragraphs: [
      "Full-stack support is application and infrastructure support combined. As applications grow increasingly distributed, it often means supporting third-party integrations too. That’s why Mission Control, our bespoke full-stack solution, is indispensable.",
    ],
  },
  {
    q: "Aren’t cloud support and DevOps the same thing?",
    paragraphs: [
      "Cloud and infrastructure support has some crossover with DevOps and CloudOps. If you’re looking to fine-tune deployments, performance or cloud processes, we can help; what you call it is up to you.",
    ],
  },
  {
    q: "How does it work?",
    paragraphs: [
      "Our process is simple: get in touch and we’ll take it from there. We work out what our support team will cover and when.",
      "Your business needs set the scope. Maybe you need application support and incident resolution. Maybe you only need proactive monitoring so your own support teams can pick up tickets. It’s up to you.",
      "From website security to app support, from website maintenance to ongoing cloud monitoring, our mission is to fit like a glove.",
    ],
  },
  { q: "Need a glossary for our packages terms?", glossary: true },
];

const PARTNERS = [
  {
    client: "Paylocity",
    logo: "/icons/azure-Paylocity.png",
    lightLogo: true,
    summary: "Fully managed Azure hosting and Umbraco application support for a popular US HR and Payroll provider",
    to: "/case-studies/paylocity",
  },
  {
    client: "Tesco PLC",
    logo: "/icons/azure-Tesco-V2-2.png",
    summary: "Supporting 6 multinational Tesco sites around the clock",
    to: "/case-studies/tesco-plc",
  },
  {
    client: "Emperor",
    logo: "/icons/azure-Emperor.webp",
    lightLogo: true,
    summary: "Migrating and supporting over 130 enterprise sites for a specialist digital agency",
    to: "/case-studies/emperor",
  },
  {
    client: "Absolute Software",
    logo: "/images/umbraco/absolute-software.png",
    summary: "Optimum availability for a global cyber-security platform company",
    to: "/case-studies/absolute-software",
  },
];

const CHECKLIST = [
  {
    title: "Incident and response management",
    items: ["Incident management (IM)", "Root cause analysis (RCA)", "Incident response management", "Incident triage", "Security incident response"],
  },
  {
    title: "Service continuity and recovery",
    items: ["Application rollbacks", "Restarting services", "Backup and restore procedures", "Manual scaling of resources"],
  },
  {
    title: "Access and security management",
    items: ["IP whitelisting", "Access management", "Password resets", "User account provisioning", "User removal", "Access control"],
  },
  {
    title: "Quality and process improvement",
    items: ["Service validation and testing", "Knowledge base management", "Post-incident review (PIR)", "Vendor liaison/3rd-party escalation"],
  },
  {
    title: "Observability and performance",
    items: ["System health observability", "Monitoring, alerts and telemetry", "Performance monitoring", "Network diagnostics and flow analysis", "End-to-end latency analysis", "Capacity management and forecasting"],
  },
  {
    title: "Service management and operations",
    items: ["SLA management", "Change management", "Patch management", "Downtime reporting", "Ticket management", "Outage communication", "Configuration management", "Service request management", "Escalation management"],
  },
];

const WHY_CARDS = [
  {
    icon: "/icons/azure-hand-tick-yellow-e1722955432551.webp",
    title: "Protect revenue and reputation",
    text: "The average cost of downtime is $5,600 per minute. We’re not a budget option, but we’re certainly cheaper than that — not to mention the cost of a major outage to your reputation.",
  },
  {
    icon: "/icons/aws-cp-target.png",
    title: "Save your team from burnout",
    text: "Phone-by-the-bed support rotas wear out engineers who enjoy building, not fixing. Realign your team and get them back to what you hired them for.",
  },
  {
    icon: "/icons/azure-cog-arrow-yellow-e1723119842127.webp",
    title: "Innovate with confidence",
    text: "With a team who know your application on call day and night, you can accelerate without worrying about crashing. Deploy features, refactor — go forward.",
  },
];

export default function UmbracoSupport() {
  useTitle("24/7 Umbraco Support & Hosting | Just After Midnight");
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="umb-page sc-page" id="main-content">
      <section
        className="umb-hero sc-hero"
        style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundPosition: "right bottom" }}
        aria-label="24/7 Umbraco Support and Hosting"
      >
        <div className="sc-container">
          <div className="sc-hero__row">
            <div className="sc-hero__col sc-hero__col--text">
              <h1 className="sc-hero__title">24/7 Umbraco Support &amp; Hosting</h1>
              <p className="sc-hero__sub">Hosting &amp; support for your Umbraco cloud</p>
              <div className="sc-hero__actions">
                <Link to="/contact" className="sc-btn-primary">Get in touch <span aria-hidden="true">➔</span></Link>
              </div>
            </div>
            <div className="sc-hero__col sc-hero__col--badge">
              <div className="umb-partner-badge">
                <span>Specialist support provider</span>
                <img src={UMBRACO_LOGO} alt="Umbraco" />
              </div>
            </div>
          </div>
        </div>
        <div className="global-curved-divider global-curved-divider__down" aria-hidden="true">
          <svg viewBox="0 0 1920 89" fill="none" preserveAspectRatio="none">
            <path d="M0 0H915.5H1920V55L1750.82 72.623C1544.17 94.1494 1335.83 94.1494 1129.18 72.623L960 55L790.819 72.623C584.17 94.1494 375.83 94.1494 169.181 72.623L0 55V0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      <section className="sc-section sc-what umb-overview" aria-label="Customer-centric Umbraco hosting">
        <div className="sc-container">
          <div className="sc-what__row">
            <div className="sc-what__text">
              <h2 className="sc-heading-primary">Customer-centric Umbraco hosting; around-the-clock support</h2>
              <p className="sc-lead-p">Now more than ever, applications need to stay delivering 24/7, 365. But many are stuck with yesterday’s support and hosting or face an uphill battle under a self-service option. We’re the cloud-native partner who’s there come rain or shine.</p>
              <p className="sc-sub-lead">Here’s how:</p>
            </div>
            <div className="sc-what__visual">
              <img src={ROCKET} alt="Rocket illustrating Umbraco application and cloud support" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="sc-section sc-problem-solution umb-problem" aria-label="Your problem and our solution">
        <div className="sc-container">
          <div className="sc-ps-grid">
            <div className="sc-ps-card sc-ps-card--problem">
              <h2 className="sc-ps-card__heading">Your problem</h2>
              <p className="sc-ps-card__sub">A great Umbraco application and a not-so-great hosting &amp; support setup:</p>
              <ul className="sc-ps-list sc-ps-list--problem">
                {PROBLEMS.map((problem) => (
                  <li key={problem}>
                    <span className="sc-ps-icon sc-ps-icon--cross" aria-hidden="true">✕</span>
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sc-ps-card sc-ps-card--solution">
              <h2 className="sc-ps-card__heading">Our solution</h2>
              <p className="sc-ps-card__sub">Customer-centric hosting and trail-blazing 24/7 support for Umbraco:</p>
              <ul className="sc-ps-list sc-ps-list--solution">
                {SOLUTIONS.map((solution) => (
                  <li key={solution}>
                    <span className="sc-ps-icon sc-ps-icon--check" aria-hidden="true">✓</span>
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="sc-ps-summary">
            <p><strong>All in all?</strong> We’re not a cookie-cutter SaaS-based hosting service. And we’re not an old-guard hardware company that pivoted to cloud. We provide a human-led, tech-enabled service headed up by Umbraco experts to meet your needs.</p>
          </div>
        </div>
      </section>

      <section className="sc-section sc-video-banner umb-video" aria-label="See how we support your Umbraco solution">
        <div className="sc-container">
          <div className="sc-video-banner__row">
            <div className="sc-video-banner__visual">
              <img src={DOWNTIME} alt="Animated illustration of downtime" loading="lazy" />
            </div>
            <div className="sc-video-banner__text">
              <h2 className="sc-video-banner__title">See how we support your Umbraco solution</h2>
              <p className="sc-video-banner__desc">This video will explain how we cover your Umbraco infrastructure, application and integrations 24/7, out of hours or whenever you need.</p>
              <p className="sc-video-banner__sub">To take a closer look at your support options and SLAs…</p>
              <a href="#packages" className="sc-btn-primary">View our packages! <span aria-hidden="true">➔</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className="sc-section sc-icon-grid umb-icon-grid" aria-label="Not your neighbourhood Umbraco support">
        <div className="sc-container">
          <div className="sc-icon-grid__header">
            <h2 className="sc-icon-grid__title">Not your neighbourhood Umbraco support</h2>
            <p className="sc-icon-grid__sub">You’re sick of the same cookie-cutter hosting and support options. You need a hero. Just After Midnight is the leading 24/7 support and hosting provider for mission-critical Umbraco environments. Here’s why:</p>
          </div>
          <div className="sc-icon-grid__cards">
            {FEATURES.map((feature) => (
              <div className="sc-feature-card" key={feature.title}>
                <div className="sc-feature-card__icon-wrap">
                  <img src={feature.icon} alt="" aria-hidden="true" loading="lazy" />
                </div>
                <h3 className="sc-feature-card__title">{feature.title}</h3>
                <p className="sc-feature-card__desc">{feature.text}</p>
              </div>
            ))}
            <div className="sc-feature-card sc-feature-card--cta">
              <div className="sc-feature-card__icon-wrap">
                <img src="/icons/azure-output-onlinepngtools-1.png" alt="" aria-hidden="true" loading="lazy" />
              </div>
              <h3 className="sc-feature-card__title">Hitting the mark?</h3>
              <p className="sc-feature-card__desc">If you like what you’re hearing, there’s plenty more where that came from. Get in touch with one of our Umbraco experts today and have your solution protected come rain or shine.</p>
              <Link to="/contact" className="sc-btn-primary sc-feature-card__btn">Get in touch <span aria-hidden="true">➔</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sc-section sc-packages umb-packages" id="packages" aria-label="Our service packages">
        <div className="sc-container">
          <div className="sc-packages__header">
            <h2 className="sc-heading-primary">Our service packages</h2>
            <p className="sc-packages__intro">It’s simple – you pick the level of support you need and we provide it. If you’re in need of something bespoke, just <Link to="/contact" className="sc-inline-link">get in touch</Link>.</p>
          </div>
          <div className="sc-packages__grid">
            {PACKAGES.map((pkg) => (
              <div className={`sc-package-card${pkg.popular ? " sc-package-card--popular" : ""}`} key={pkg.name}>
                {pkg.popular && <span className="sc-package-card__badge">Most Popular</span>}
                <div className="sc-package-card__header">
                  <span className="sc-package-card__tier">{pkg.tier}</span>
                  <h3 className="sc-package-card__name">{pkg.name}</h3>
                </div>
                <ul className="sc-package-card__list">
                  {pkg.features.map((feature) => (
                    <li key={feature}><span className="sc-pkg-check" aria-hidden="true">✓</span><span>{feature}</span></li>
                  ))}
                </ul>
                <div className="sc-package-card__footer">
                  <Link to="/contact" className={`sc-package-btn${pkg.popular ? " sc-package-btn--primary" : ""}`}>{pkg.name.includes("CUSTOM") ? "Learn more" : "Select package"}</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="sc-packages__note">
            <p><strong>Need build solutions, not support?</strong> If you’re more interested in refactoring or modernising your infrastructure, check out our <Link to="/cloud/solution-architecture" className="sc-inline-link">solutions page</Link>.</p>
          </div>
        </div>
      </section>

      <section className="sc-section sc-faq umb-faq" aria-label="Frequently Asked Questions">
        <div className="sc-container umb-faq__grid">
          <div className="umb-faq__main">
            <h2 className="sc-heading-primary sc-faq__title">FAQ</h2>
            <p className="umb-faq__intro">For a no-nonsense look at what we support, take a look at our packages. Still have questions about how our support services work? Take a look below.</p>
            <div className="sc-faq__list">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                const contentId = `umbraco-faq-${index}`;
                return (
                  <div className={`sc-faq-item${isOpen ? " is-open" : ""}`} key={faq.q}>
                    <button
                      type="button"
                      className="sc-faq-item__trigger"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className="sc-faq-item__q">{faq.q}</span>
                      <span className="sc-faq-item__icon" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="sc-faq-item__content" id={contentId}>
                        {faq.glossary ? (
                          <dl className="umb-glossary">
                            {GLOSSARY.map(([term, definition]) => (
                              <div key={term}>
                                <dt>{term}</dt>
                                <dd>{definition}</dd>
                              </div>
                            ))}
                          </dl>
                        ) : faq.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <aside className="umb-faq__aside">
            <img src={ROCKET} alt="Rocket illustrating support coverage" loading="lazy" />
            <div className="umb-faq__cta">
              <h3>More questions?</h3>
              <p><Link to="/contact">Just drop us a line</Link> to see how we could support your Umbraco stack. A team member will be right with you to help you through any questions.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="umb-partners" aria-label="Some of our Umbraco partners">
        <div className="sc-container">
          <h2 className="sc-heading-primary">Some of our Umbraco partners</h2>
          <div className="umb-partners__grid">
            {PARTNERS.map((partner) => (
              <Link className="umb-partner-card" to={partner.to} key={partner.client}>
                <div className={`umb-partner-card__logo${partner.lightLogo ? " umb-partner-card__logo--light" : ""}`}><img src={partner.logo} alt={partner.client} loading="lazy" /></div>
                <div className="umb-partner-card__body">
                  <h3>{partner.client}</h3>
                  <p>{partner.summary}</p>
                  <span className="umb-partner-card__link">Read the case study <span aria-hidden="true">➔</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="umb-case-feature umb-case-feature--tesco" aria-label="Tesco case study">
        <div className="sc-container">
          <div className="umb-case-feature__grid">
            <div className="umb-case-feature__image"><img src="/icons/azure-Tesco.webp" alt="Tesco" loading="lazy" /></div>
            <div className="umb-case-feature__text">
              <span className="umb-case-feature__eyebrow">Tesco</span>
              <h2>Providing 24/7 support for Tesco’s key PLC sites</h2>
              <p>Tesco required 24/7 support for six PLC sites providing essential investor information. Partnering with Radley Yeldar, we delivered support for the Azure-hosted Umbraco sites. Our global team of certified Azure and Umbraco engineers quickly onboarded, ensuring smooth operations and resolving incidents in under 8 minutes to safeguard Tesco’s reputation.</p>
              <Link to="/case-studies/tesco-plc" className="sc-btn-primary">READ CASE STUDY <span aria-hidden="true">➔</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sc-section sc-checklist umb-checklist" aria-label="On our list, off your mind">
        <div className="sc-container">
          <div className="sc-checklist__header">
            <h2 className="sc-heading-primary">On our list, off your mind</h2>
            <p className="sc-checklist__sub">We’re a one-and-done partner for delivering world-class applications</p>
          </div>
          <div className="sc-checklist__grid">
            {CHECKLIST.map((section) => (
              <div className="sc-checklist-card" key={section.title}>
                <h3 className="sc-checklist-card__title">{section.title}</h3>
                <ul className="sc-checklist-card__items">
                  {section.items.map((item) => (
                    <li key={item}><span className="sc-check-bullet" aria-hidden="true">✓</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="sc-checklist__bottom-cta">
            <div className="sc-bottom-cta-box">
              <p className="sc-bottom-cta-box__text">It’s simple – you tell us your requirements and we plug in wherever you need us.</p>
              <Link to="/contact" className="sc-btn-primary">So, where can we help? <span aria-hidden="true">➔</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="umb-case-feature umb-case-feature--emperor" aria-label="Emperor case study">
        <div className="sc-container">
          <div className="umb-case-feature__grid">
            <div className="umb-case-feature__text">
              <span className="umb-case-feature__eyebrow">Emperor</span>
              <h2>Migrating Emperor’s client websites to the cloud</h2>
              <p>Emperor, a creative consultancy, needed to migrate over 130 client websites from a legacy on-premise solution to the cloud. Just After Midnight implemented a multi-cloud strategy using AWS and Azure, reducing costs by 25% and improving fault tolerance. We continue to provide DevOps as a service, ensuring Emperor’s cloud-based infrastructure is scalable, reliable, and high-performing.</p>
              <Link to="/case-studies/emperor" className="sc-btn-primary">READ CASE STUDY <span aria-hidden="true">➔</span></Link>
            </div>
            <div className="umb-case-feature__image"><img src="/icons/azure-Emperor.webp" alt="Emperor" loading="lazy" /></div>
          </div>
        </div>
      </section>

      <ReviewsBand />
      <WhyBand title="Why Just After Midnight?" intro="Human-led, tech-enabled support for the Umbraco applications your business depends on." cards={WHY_CARDS} />
      <LatestInsights />

      <section className="sc-section sc-glance" aria-label="Just After Midnight's support offering">
        <div className="sc-container">
          <div className="sc-glance-grid">
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
            <div className="sc-glance-box sc-glance-box--light">
              <h2 className="sc-glance-title">What are the impacts of incidents on teams and revenue?</h2>
              <p className="sc-glance-p">According to industry sources, downtime costs businesses between <strong>$540,000</strong> (Splunk, The Hidden Costs of Downtime) and <strong>$2 million</strong> (New Relic, Observability Forecast 2025) per hour for many high-impact outages.</p>
              <p className="sc-glance-p">Incidents also consume significant engineering capacity: the median engineering team spends <strong>30% of its time</strong> addressing disruptions (New Relic, Observability Forecast 2024), draining resources that could otherwise drive product development.</p>
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
    </div>
  );
}
