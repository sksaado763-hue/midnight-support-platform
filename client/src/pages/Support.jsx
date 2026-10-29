import { Link } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import { useApi } from "../lib/api";
import LatestInsights from "../components/Cards";

const MEANS = [
  "One ticket queue across the front end, the services, the infrastructure and the APIs",
  "Engineers on shift in every timezone, so nothing waits for morning",
  "Response targets written into the contract, not promised in a call",
  "A written handover after every incident, so your team wakes up to answers",
];

const SERVICES = [
  {
    title: "24/7 Application Support",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="8" y="10" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="3" />
        <path d="M20 40h8M24 34v6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M17 24l4 4 8-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    paras: [
      "When the product is the business, someone has to understand the code behind it. Our engineers monitor user journeys, triage bugs at code level and stay on the incident until it is closed.",
      "Performance regressions, failing releases, broken integrations: we catch them in the metrics first, and we tell you in plain language what happened and what we changed.",
    ],
  },
  {
    title: "24/7 Cloud Support",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M14 34h20a7 7 0 0 0 .6-13.97A10 10 0 0 0 15 17.8 8 8 0 0 0 14 34z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M19 26l4 4 7-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    paras: [
      "AWS, Azure and GCP infrastructure looked after by people who operate it daily: patching, scaling, cost control and security hygiene, plus the boring checks that stop outages.",
      "We keep the pipeline healthy too — deployments, rollbacks, infrastructure as code and the alerts that make sense of it all at 3am.",
    ],
  },
  {
    title: "24/7 Website & CMS Support",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="8" y="10" width="32" height="28" rx="3" stroke="currentColor" strokeWidth="3" />
        <path d="M8 18h32" stroke="currentColor" strokeWidth="3" />
        <circle cx="14" cy="14" r="1.6" fill="currentColor" />
        <circle cx="20" cy="14" r="1.6" fill="currentColor" />
        <path d="M15 26h10M15 31h18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    paras: [
      "Campaign pages, commerce fronts and content platforms that have to survive launch day. We watch checkout flows, form submissions and Core Web Vitals as closely as server health.",
      "Plugin and platform regressions get a fast path to fix, and editorial teams get a support desk that speaks CMS, not just infrastructure.",
    ],
  },
  {
    title: "24/7 Full-Stack Support",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 8l14 7-14 7-14-7 14-7z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M10 24l14 7 14-7M10 32l14 7 14-7" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    ),
    paras: [
      "One agreement across every layer: front end, services, data, cloud and third-party APIs. No blame tennis between vendors, because there is only one queue and it is ours.",
      "Best value for teams whose product spans several stacks and who want a single named team accountable for all of them.",
    ],
  },
];

const REASONS = [
  {
    title: "Because the 3am page goes to someone already awake",
    text: "Follow-the-sun shifts mean your incident lands on an engineer mid-shift, not on a phone ringing in an empty house.",
  },
  {
    title: "Because every alert has a named owner",
    text: "Severity grading and an escalation ladder decide who picks it up and who gets called in next. Nothing sits unowned.",
  },
  {
    title: "Because fixes arrive with a written handover",
    text: "What broke, what we changed, what we are watching. Your morning starts with answers instead of archaeology.",
  },
  {
    title: "Because your roadmap time stays yours",
    text: "We absorb the interrupts — the patches, the tickets, the odd fires — so your in-house team ships what it planned to.",
  },
  {
    title: "Because audits get evidence, not anecdotes",
    text: "Incident records, change logs and review notes are kept properly, so compliance questions become exports, not panic.",
  },
  {
    title: "Because the whole stack is one queue",
    text: "Website, app, cloud and integrations under a single agreement means no vendor blame tennis while your customers wait.",
  },
];

const CAPABILITIES = [
  {
    title: "Incident & response management",
    items: ["Severity grading and SLA clocks", "Bridge calls during major incidents", "Vendor and provider chasing", "Post-incident write-ups"],
  },
  {
    title: "Service continuity & recovery",
    items: ["Backup and restore drills", "Failover and redundancy checks", "Rollback plans for every release", "Disaster recovery runbooks"],
  },
  {
    title: "Access & security management",
    items: ["Patching and update windows", "Least-privilege access reviews", "Secret and certificate rotation", "WAF, CDN and edge rules"],
  },
  {
    title: "Quality & process improvement",
    items: ["Code-level bug triage", "Regression and release checklists", "Performance budgets on key journeys", "Recurring-issue root cause work"],
  },
  {
    title: "Observability & performance",
    items: ["Journey-level monitoring", "Alert tuning that kills noise", "Dashboards your team can read", "SLO and uptime reporting"],
  },
  {
    title: "Service management & operations",
    items: ["Ticket queue with contractual targets", "Scheduled change management", "Asset, domain and licence inventory", "Monthly service reviews"],
  },
];

const FAQS = [
  {
    q: "What does 24/7 actually cover?",
    a: "Watching the metrics, picking up incidents and fixing what broke, across whichever layers sit in your agreement — application, website, cloud or all three. Planned changes and maintenance slots are included too; the package you pick sets response targets and how much change work is bundled.",
  },
  {
    q: "How fast is fast?",
    a: "Each package carries contractual response times for each severity level, and the clock runs at 3am exactly as it does at 3pm. Ask us for the SLA document and you will see the numbers before you sign anything.",
  },
  {
    q: "Do you replace our in-house team?",
    a: "No. We take the interrupts — nights, weekends, patches, tickets, fires — so your team keeps its roadmap. Most customers treat us as the night shift and the safety net, not as a replacement.",
  },
  {
    q: "Which platforms and clouds do you support?",
    a: "AWS, Azure and GCP, plus the CMS and commerce platforms behind most customer-facing sites — Sitecore, Kentico, Umbraco, AEM, Magento, Optimizely, WordPress and custom applications. If yours is not listed, ask: we onboard new stacks regularly.",
  },
  {
    q: "How does onboarding work?",
    a: "We start with a review of your stack, then document the journeys, runbooks and alerts that matter. Access is granted least-privilege, monitoring goes in, and the first shift rota is agreed before we take the pager.",
  },
  {
    q: "What if we only need nights or weekends?",
    a: "Then do not pay for round-the-clock cover. Out-of-hours and first-line packages exist precisely for teams who are fine in office hours and want someone trustworthy holding the rest.",
  },
];

const OUTCOMES = [
  {
    title: "Protect revenue and reputation",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 6l14 6v10c0 9-6 16-14 20-8-4-14-11-14-20V12l14-6z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M17 24l5 5 9-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "Downtime is abandoned baskets, missed calls and a headline you did not write. Cover that never sleeps keeps the trading hours you did not plan for as safe as the ones you did.",
  },
  {
    title: "Ship changes with confidence",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 6c8 6 12 14 12 22l-12 10-12-10c0-8 4-16 12-22z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="24" cy="22" r="5" stroke="currentColor" strokeWidth="3" />
        <path d="M12 28l-4 10 10-4M36 28l4 10-10-4" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    ),
    text: "Release checklists, rollback drills and pre-release checks mean your team can deploy on a Friday and still sleep that night. Someone is watching the metrics either way.",
  },
  {
    title: "Spend less on firefighting",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="3" />
        <path d="M24 14v20M29 19c-1.5-2-4-2.4-6-1.6-2.6 1-3.4 4.4-1 6 2.6 1.8 7 1.4 7 4.8 0 2.6-3 4-6 3.2-1.6-.4-2.8-1.4-3.4-2.6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    text: "Recurring incidents get root-cause work, alert noise gets tuned away, and capacity gets planned before it becomes an emergency. The queue shrinks month on month.",
  },
];

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
  useTitle("24/7 Support Services | Just After Midnight");
  const { data: packages } = useApi("/api/packages");
  const { data: caseStudies } = useApi("/api/case-studies");
  const featured = (caseStudies || [])[0];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title reveal">24/7 Support Services</h1>
          <p className="page-hero-sub reveal">Monitoring, triage and fixes across your application, website and cloud — handled by engineers who are already awake when it breaks.</p>
          <div className="hero-actions reveal">
            <Link to="/support#compare" className="btn btn-primary">Compare packages <span aria-hidden="true">➔</span></Link>
            <Link to="/contact" className="btn btn-ghost">Talk to an engineer</Link>
          </div>
        </div>
      </section>

      <section className="support-intro">
        <div className="container support-intro-grid">
          <div className="support-intro-copy reveal">
            <h2>Always-on cover for the platforms your revenue runs on</h2>
            <p>We look after the digital platforms your customers actually touch, for teams that cannot afford downtime — front end, services, infrastructure, and the third-party APIs hanging off all three.</p>
            <p>Real engineers, real shift rotas and response targets written into the contract. When something breaks, the person who picks it up already has the runbook, the access and the context to fix it.</p>
          </div>
          <div className="means-card reveal">
            <h3>That means:</h3>
            <ul>
              {MEANS.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="svc-band">
        <div className="container">
          <h2 className="band-title reveal">Our support services</h2>
          <span className="band-rule" aria-hidden="true" />
          <p className="band-sub reveal">Choose the layers you want covered and the hours you want them covered for — overnights only, weekends only, or the entire clock. The same engineers sit behind every option.</p>
          <div className="svc-grid">
            {SERVICES.map((service) => (
              <article className="svc-card reveal" key={service.title}>
                <span className="svc-icon">{service.icon}</span>
                <h3>{service.title}</h3>
                <span className="svc-rule" aria-hidden="true" />
                {service.paras.map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="maint-band">
        <div className="container maint-band-inner reveal">
          <h2>Want changes shipped, not just incidents closed?</h2>
          <p>Support keeps you stable; managed cloud and DevOps delivery moves you forward. Most customers run both under one relationship.</p>
          <Link to="/cloud" className="btn btn-primary">See cloud & DevOps <span aria-hidden="true">➔</span></Link>
        </div>
      </section>

      <section className="support-cases">
        <div className="container">
          <h2 className="section-title reveal">Proof, not promises</h2>
          <div className="support-case-grid">
            {(caseStudies || []).slice(0, 4).map((study) => (
              <Link className="support-case reveal" to={`/case-studies/${study.slug}`} key={study.slug}>
                <span className="support-case-industry">{study.industry}</span>
                <h3>{study.client}</h3>
                <p>{study.headline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="why-band">
        <div className="container">
          <h2 className="band-title band-title--center reveal">Why teams hand us the night</h2>
          <p className="band-sub band-sub--center reveal">Nobody hands over their out-of-hours rota lightly. These are the things that make the handover stick.</p>
          <div className="why-grid">
            {REASONS.map((reason) => (
              <article className="why-card reveal" key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cap-band">
        <div className="container">
          <h2 className="band-title band-title--dark band-title--center reveal">What the support desk actually does</h2>
          <span className="band-rule band-rule--center" aria-hidden="true" />
          <p className="band-sub band-sub--dark band-sub--center reveal">The routines that keep platforms healthy, handled by one team before they become incidents.</p>
          <div className="cap-grid">
            {CAPABILITIES.map((cap) => (
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
      </section>

      {featured && (
        <section className="case-feature">
          <div className="container case-feature-inner reveal">
            <p className="case-feature-label">Case study</p>
            <h2>{featured.client}</h2>
            <p className="case-feature-headline">{featured.headline}</p>
            <Link to={`/case-studies/${featured.slug}`} className="btn btn-ghost">Read the story <span aria-hidden="true">➔</span></Link>
          </div>
        </section>
      )}

      <section className="pricing" id="compare">
        <div className="container">
          <h2 className="section-title reveal">Our service packages</h2>
          <p className="pricing-intro reveal">Monitoring, graded response and senior engineers come with every tier. What changes is how fast we pick up, how much of the routine work we take off your plate, and how deep the reporting goes. None of the three quite fit? Tell us what you run and we will shape the agreement around it.</p>
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

      <section className="support-faq">
        <div className="container support-faq-grid">
          <div className="support-faq-copy reveal">
            <h2>24/7 Support FAQ</h2>
            <p>The short version of everything customers ask before signing. For the no-nonsense detail on what each tier includes, compare the packages above.</p>
            <Link to="/contact" className="btn btn-ghost">Ask us something else</Link>
          </div>
          <div className="faq-list reveal">
            {FAQS.map((faq) => (
              <details className="faq-item" key={faq.q}>
                <summary>
                  {faq.q}
                  <span className="faq-chevron" aria-hidden="true" />
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="pii-band">
        <div className="container">
          <h2 className="band-title band-title--center reveal">What good cover buys you</h2>
          <div className="pii-grid">
            {OUTCOMES.map((outcome) => (
              <article className="pii-card reveal" key={outcome.title}>
                <span className="pii-icon">{outcome.icon}</span>
                <h3>{outcome.title}</h3>
                <p>{outcome.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ind-band" id="industries">
        <div className="container ind-band-grid">
          <div className="ind-band-copy reveal">
            <h2>Industries we support</h2>
            <p>Every organisation breaks differently. These are the shapes of business we know best — and the reasons their queues look the way they do.</p>
            <p className="ind-band-aside">Don't see your sector? <Link to="/contact">Tell us what you run ➔</Link></p>
          </div>
          <div className="ind-acc reveal">
            {INDUSTRIES.map((industry) => (
              <details className="ind-item" key={industry.title}>
                <summary>
                  {industry.title}
                  <span className="faq-chevron" aria-hidden="true" />
                </summary>
                <p>{industry.text}</p>
                <ul>
                  {industry.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </details>
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
