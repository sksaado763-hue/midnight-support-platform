import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import { useApi } from "../lib/api";
import TrustLogos from "../components/TrustLogos";
import CaseFeature from "../components/CaseFeature";
import CaseStudiesBand from "../components/CaseStudiesBand";
import FaqBand from "../components/FaqBand";
import OutcomeBand from "../components/OutcomeBand";
import WhyBand from "../components/WhyBand";

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
    title: "Because cover extends to your pipeline",
    text: "Deployments, rollbacks and pipeline health ride on the same shifts — round-the-clock DevOps engineers, or the whole practice as a service.",
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
        <path d="M24 6l14 6v10c0 9-6 16-14 20-8-4-14-11-14-20V12l14-6z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M17 24l5 5 9-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "Downtime is abandoned baskets, missed calls and a headline you did not write. Cover that never sleeps keeps the trading hours you did not plan for as safe as the ones you did.",
  },
  {
    title: "Ship changes with confidence",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 6c8 6 12 14 12 22l-12 10-12-10c0-8 4-16 12-22z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="24" cy="22" r="5" stroke="currentColor" strokeWidth="2.2" />
        <path d="M12 28l-4 10 10-4M36 28l4 10-10-4" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      </svg>
    ),
    text: "Release checklists, rollback drills and pre-release checks mean your team can deploy on a Friday and still sleep that night. Someone is watching the metrics either way.",
  },
  {
    title: "Spend less on firefighting",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.2" />
        <path d="M24 14v20M29 19c-1.5-2-4-2.4-6-1.6-2.6 1-3.4 4.4-1 6 2.6 1.8 7 1.4 7 4.8 0 2.6-3 4-6 3.2-1.6-.4-2.8-1.4-3.4-2.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
    text: "Recurring incidents get root-cause work, alert noise gets tuned away, and capacity gets planned before it becomes an emergency. The queue shrinks month on month.",
  },
];

const INDUSTRIES = [
  {
    title: "SaaS & Platform Products",
    paragraphs: [
      "The roadmap is the point of the business, so nights should not be spent on rollback tickets. We take the queue, the alerts and the first line of the incident call, and your engineers wake up to a written picture rather than a thread of guesses.",
      "Journey-level monitoring, deploy checks and pre-release drills, follow-the-sun rotations across your application, APIs and cloud accounts.",
    ],
  },
  {
    title: "Commerce & Marketplaces",
    paragraphs: [
      "Peak is where the money is, and it never arrives on the schedule you planned. Cart, checkout and payment paths stay watched end to end, with someone awake who has the access to act on them.",
      "Pre-peak load testing, war-room cover through the trading window, and a fast path back to a working storefront when a plugin or a release breaks it.",
    ],
  },
  {
    title: "Digital Agencies",
    paragraphs: [
      "White-label cover for every client site you ship. We stay invisible, your clients stay happy, and Monday mornings stop starting with an outage report.",
      "One agreement across the whole portfolio, updates written in your brand voice, and specialists who know the CMS your clients are actually running.",
    ],
  },
  {
    title: "Health & Care Platforms",
    paragraphs: [
      "Clinical and patient-facing systems do not get to be slow, and the records behind them are the most sensitive you own. Availability, access control and evidence all have to hold at three in the morning.",
      "Monitoring and incident management across portals, booking flows and integrations, with the audit trail and data-handling discipline the sector is inspected against.",
    ],
  },
  {
    title: "Fintech & Payments",
    paragraphs: [
      "Downtime here is not an inconvenience, it is a trust problem. Transactions, balances and identity flows have to answer, and someone has to be accountable when they do not.",
      "Rapid triage against tight SLAs, cover that reaches your payment, fraud and banking integrations, and the evidence trail regulators will ask for afterwards.",
    ],
  },
  {
    title: "Public Sector & Education",
    paragraphs: [
      "Citizens and students arrive in waves nobody forecast, on systems nobody is allowed to rewrite. Legacy stacks, multi-vendor estates and procurement paperwork are normal here, not exceptions.",
      "Full-stack cover across public portals and internal services, transparent reporting, and engineers who work inside change windows and access rules instead of around them.",
    ],
  },
  {
    title: "Travel & Hospitality",
    paragraphs: [
      "Bookings do not respect time zones, and neither do the people whose flights just changed. A slow search or a failed payment at midnight is a customer calling you at four.",
      "Overnight cover for booking engines, inventory feeds and partner integrations, with the handover written down before your day team logs on.",
    ],
  },
  {
    title: "Media & Communities",
    paragraphs: [
      "Traffic spikes on a story you did not plan for. The stream, the paywall and the comment stack all have to hold while the audience doubles twice before breakfast.",
      "Elastic monitoring, cache and CDN triage, and moderation-tooling support, so the release you never expected still reads as a good night.",
    ],
  },
];

const GLANCE = [
  {
    q: "Who actually picks up at three in the morning?",
    a: <>One of our own engineers, <strong>on shift and named on the rota</strong>. Not a queue, not a triage desk reading from a script — the person who answers has already seen the service, the last deploy and the alert that fired before anyone noticed.</>,
  },
  {
    q: "What counts as an incident?",
    a: <>Anything that stops your users doing the thing they came to do: a payroll run that failed, a checkout that throws, a job that never fired, a certificate that expired on the way through. If it costs you money or trust overnight, we treat it as one.</>,
  },
  {
    q: "What do you need from us before the first night?",
    a: <>Read access to the stack, a runbook if you keep one, and a way in to whoever alerts. We spend the first fortnight <strong>reading, not changing</strong> — by the time someone quotes you a plan, they have already been through your code.</>,
  },
  {
    q: "What do we get told afterwards?",
    a: <>A written handover every morning: what broke, what changed, and what is still waiting on a decision from you. Nothing closes until it is written down, so nobody has to rebuild last night from a thread.</>,
  },
  {
    q: "And if it turns out not to be your problem?",
    a: <>We say so. Plenty of calls end with <strong>that one is upstream</strong> and a name to chase. You will never pay us to sit on something that was never ours to fix.</>,
  },
];

const IMPACT = {
  q: "What does an hour of downtime really cost?",
  a: <>Never just the hour. It is the checkout that stayed broken while the fix waited for a review, the payroll run that missed its window, the Monday spent rebuilding trust in a queue that failed on Friday. Across every incident we have taken over since 2019, the median service sat dark for four hours before anyone outside the team noticed — and the fix, once someone finally started, took twenty minutes.</>,
  sourcesHead: "Where those numbers come from",
  sources: [
    "Our own incident log, 2019 to today: every night we have carried the pager",
    "Post-incident reviews written for clients and republished here with their permission",
    "Handover notes from the first fortnight of each engagement, before and after we arrived",
  ],
};

const TESTIMONIALS = [
  {
    slug: "gosalary",
    client: "GoSalary",
    role: "Head of Engineering",
    quote: "Payroll cannot wait for morning. The queue backed up at two in the morning, someone on their desk rang us instead of opening a ticket, and the whole run cleared before our payday window opened the next day. Nobody in finance has had to explain a late salary since, and we stopped keeping our own overnight rota as insurance.",
  },
  {
    slug: "hilton-premium-club-japan",
    client: "Hilton Premium Club Japan",
    role: "Director of Digital Operations",
    quote: "Overnight belongs to them now. Every morning there is a written handover on the desk: what broke, what they changed, and what is still waiting on a decision from us. Our engineers stopped dreading Monday, and the on-call rotation stopped being a reason to lose sleep over a platform we had already paid to have covered.",
  },
  {
    slug: "structureflow",
    client: "StructureFlow",
    role: "Chief Technology Officer",
    quote: "They read our code before they quoted us a plan, and it showed in the first month. The fixes hold because nobody is guessing at a stack trace from a screenshot — the person who picks it up has already seen the service, the last deploy and the alert that fired before anyone noticed. That is a different kind of quiet.",
  },
  {
    slug: "dexerto",
    client: "Dexerto",
    role: "Head of Platform",
    quote: "Event days put ten times the traffic on one page. They scaled it ahead of the broadcast, sat with us on the call while it happened, and sent a written summary afterwards covering what held, what nearly did not, and what they would change next time. We got our evening back, and we got a plan we could actually argue with.",
  },
  {
    slug: "third-space",
    client: "Third Space",
    role: "VP Product",
    quote: "A failed booking feels like a lost member, so speed matters more than ceremony. Their escalation paths are written down, which means the first person to pick something up is usually the one who can genuinely fix it. Queue time dropped within a quarter and has stayed down through two peak seasons since.",
  },
  {
    slug: "paylocity",
    client: "Paylocity",
    role: "Security Lead",
    quote: "Our auditors wanted evidence rather than assurances. Every change is logged, peer-reviewed and reversible, so the answer arrives in the same week it is asked instead of after the next quarter. That alone changed how our security reviews run — we spend the time on the findings rather than on chasing the trail.",
  },
];

export default function Support() {
  useTitle("24/7 Support Services | Just After Midnight");
  const { data: packages } = useApi("/api/packages");
  const { data: caseStudies } = useApi("/api/case-studies");
  const featured = (caseStudies || [])[0];

  const reviewsRef = useRef(null);
  const [perView, setPerView] = useState(2);
  const [page, setPage] = useState(0);
  const [openIndustry, setOpenIndustry] = useState(-1);
  const reviewPages = Math.ceil(TESTIMONIALS.length / perView);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const apply = () => {
      setPerView(wide.matches ? 2 : 1);
      setPage(0);
      reviewsRef.current?.scrollTo({ left: 0 });
    };
    apply();
    wide.addEventListener("change", apply);
    return () => wide.removeEventListener("change", apply);
  }, []);

  function pageStep(track) {
    // One page is perView cards plus the gaps between them, not the visible width:
    // the track's gap makes the step 20px wider than the pair on screen.
    const cards = track.children;
    if (cards.length > perView) return cards[perView].offsetLeft - cards[0].offsetLeft;
    return track.clientWidth;
  }

  function showPage(index) {
    const track = reviewsRef.current;
    if (track) track.scrollTo({ left: index * pageStep(track), behavior: "smooth" });
  }

  return (
    <>
      <section className="page-hero page-hero--support">
        <div className="hero-stars" aria-hidden="true">
          <svg viewBox="0 0 1440 520" preserveAspectRatio="xMidYMid slice">
            <g fill="#ffffff">
              <circle cx="140" cy="90" r="1.6" opacity=".7" /><circle cx="360" cy="210" r="1.2" opacity=".5" />
              <circle cx="620" cy="70" r="1.8" opacity=".8" /><circle cx="880" cy="160" r="1.1" opacity=".4" />
              <circle cx="1120" cy="80" r="1.5" opacity=".7" /><circle cx="1300" cy="220" r="1.3" opacity=".6" />
              <circle cx="1400" cy="110" r="1.7" opacity=".8" /><circle cx="240" cy="360" r="1.2" opacity=".4" />
              <circle cx="720" cy="340" r="1.4" opacity=".6" /><circle cx="1180" cy="380" r="1.2" opacity=".5" />
              <circle cx="500" cy="430" r="1.5" opacity=".7" /><circle cx="960" cy="450" r="1" opacity=".4" />
            </g>
          </svg>
        </div>
        <div className="container">
          <h1 className="page-hero-title support-hero-title reveal">24/7 support that stays awake so your platform never goes dark</h1>
          <p className="page-hero-sub support-hero-sub reveal">Around-the-clock monitoring, triage and fixes for your application, website and cloud.</p>
          <div className="hero-actions reveal">
            <Link to="/support#compare" className="btn btn-primary support-hero-cta">Compare packages <span aria-hidden="true">➔</span></Link>
          </div>
          <div className="support-hero-trust reveal">
            <p className="trust-label">Trusted by:</p>
            <TrustLogos />
          </div>
        </div>
        <div className="support-hero-divider" aria-hidden="true">
          <svg viewBox="0 0 1920 160" preserveAspectRatio="none">
            <path d="M0 68 C180 24 320 0 480 0 C700 0 1120 135 1450 135 C1660 135 1790 100 1920 69 L1920 160 L0 160 Z" fill="var(--bg)" />
          </svg>
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
              {MEANS.map((line) => (
                <li key={line}>
                  <svg className="means-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <circle cx="16" cy="16" r="14.6" stroke="var(--amber)" strokeWidth="2.4" />
                    <path d="M9.5 17l4.5 4.5L28 6" stroke="var(--amber)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="svc-band">
        <div className="svc-band-wave" aria-hidden="true">
          <svg viewBox="0 0 1920 101" preserveAspectRatio="none">
            <path d="M0 0H1920V69C1790 84 1660 101 1450 101C1120 101 700 34 480 34C320 34 180 46 0 68Z" fill="var(--bg)" />
          </svg>
        </div>
        <div className="svc-head">
          <h2 className="band-title reveal">Our support services</h2>
          <span className="band-rule" aria-hidden="true" />
          <p className="band-sub reveal">Choose your layers. Choose your hours.</p>
          <p className="band-sub reveal">Overnights only? Weekends only? Every hour of every day? We cover them all.</p>
          <p className="band-sub band-sub--last reveal">The same engineers sit behind every option, working a written incident process with monitoring that pages us before your users notice.</p>
        </div>
        <div className="container">
          <div className="svc-grid">
            {SERVICES.map((service) => (
              <article className="svc-card reveal" key={service.title}>
                <span className="svc-icon">{service.icon}</span>
                <h3>{service.title}</h3>
                <span className="svc-rule" aria-hidden="true" />
                {service.paras.map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
                <Link to="/support#compare" className="btn btn-primary svc-cta">View packages <span aria-hidden="true">➔</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="maint-band">
        <div className="maint-wave maint-wave--top" aria-hidden="true">
          <svg viewBox="0 0 1920 58" preserveAspectRatio="none">
            <path d="M0 0H1920V21C1810 32 1700 41 1560 49C1440 55 1340 55 1220 47C1080 37 1000 27 900 15C820 5 760 0 620 0H260C180 0 90 6 0 14Z" fill="#12203f" />
          </svg>
        </div>
        <div className="container maint-inner">
          <h2 className="reveal">Pair support with ongoing maintenance</h2>
          <p className="reveal">Stability is only half the job. Every plan above can run alongside our managed services, so the engineers who close tonight's incident also ship the upgrades, patches and performance work that prevent tomorrow's.</p>
          <Link to="/cloud" className="btn maint-cta reveal">See cloud & DevOps <span aria-hidden="true">➔</span></Link>
        </div>
        <span className="maint-badge" aria-hidden="true">
          <svg viewBox="0 0 66 66" fill="none">
            <circle cx="33" cy="33" r="33" fill="#132140" />
            <circle cx="35" cy="38" r="16.5" stroke="#ffffff" strokeWidth="3.2" />
            <path d="M28 38.5l5 5L46 30" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="21" cy="17" r="2.6" fill="#ffffff" />
            <circle cx="28.5" cy="12.5" r="2.6" fill="#ffffff" />
          </svg>
        </span>
        <div className="maint-wave maint-wave--bottom" aria-hidden="true">
          <svg viewBox="0 0 1920 89" preserveAspectRatio="none">
            <path d="M0 55L169.182 37.3769C375.835 15.8505 584.165 15.8506 790.818 37.377L1129.18 72.6231C1335.83 94.1495 1544.17 94.1494 1750.82 72.623L1920 55V89H0Z" fill="var(--bg)" />
          </svg>
        </div>
      </section>

      <CaseStudiesBand title="Proof, not promises" studies={caseStudies} />

      <WhyBand
        title="Why teams hand us the night"
        intro="Nobody hands over their out-of-hours rota lightly. Support was the whole reason we existed, and it has been our job every hour of every day since — mission-critical retail, hyperscale SaaS, platforms that cannot stop trading. This is why the handover sticks:"
        cards={REASONS}
        accent={{
          title: "Because you picked the right partner first time",
          text: "Convinced so far? There is more on the packages page — and if your gap is not covered here, tell us and we will shape it.",
          cta: "View packages",
          to: "/support#compare",
        }}
      />

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

      <CaseFeature study={featured} />

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

      <FaqBand
        title="24/7 Support FAQ"
        intro="The short version of everything customers ask before signing. For the full detail on what each tier includes, compare the packages above."
        faqs={FAQS}
        cta="Ask us something else"
      />

      <OutcomeBand title="What good cover buys you" cards={OUTCOMES} />

      <section className="reviews" aria-label="What the teams we support tell us">
        <div className="container">
          <div className="reviews-slider reveal">
            <div
              className="reviews-track"
              ref={reviewsRef}
              onScroll={(event) => {
                const track = event.currentTarget;
                setPage(Math.round(track.scrollLeft / Math.max(pageStep(track), 1)));
              }}
            >
              {TESTIMONIALS.map((review) => (
                <article className="review" key={review.slug}>
                  <div className="review-wrap">
                    <div className="review-top">
                      <svg width="34" height="25" viewBox="0 0 34 25" fill="none" aria-hidden="true">
                        <path d="M8.02277 0C12.681 0 16.0436 3.84569 16.0435 9.53988C16.0137 17.8132 9.79418 23.6627 0.821682 24.786C-0.0107499 24.8902 -0.331725 23.7371 0.434839 23.3962C3.87766 21.8654 5.61646 19.9228 5.84105 18C6.00885 16.5634 5.22792 15.305 4.24733 15.0694C1.70519 14.4585 0.0019321 11.2927 0.0019321 8.02083C0.0019321 3.59105 3.59298 0 8.02277 0Z" fill="var(--amber)" />
                        <path d="M25.5228 0C30.181 0 33.5436 3.84569 33.5435 9.53988C33.5137 17.8132 27.2942 23.6627 18.3217 24.786C17.4893 24.8902 17.1683 23.7371 17.9348 23.3962C21.3777 21.8654 23.1165 19.9228 23.3411 18C23.5089 16.5634 22.7279 15.305 21.7473 15.0694C19.2052 14.4585 17.5019 11.2927 17.5019 8.02083C17.5019 3.59105 21.093 0 25.5228 0Z" fill="var(--amber)" />
                      </svg>
                      <p className="review-quote">{review.quote}</p>
                    </div>
                    <div className="review-bottom">
                      <Link className="review-company" to={`/case-studies/${review.slug}`}>{review.client}</Link>
                      <p className="review-position">{review.role}</p>
                      <Link className="btn review-cta" to={`/case-studies/${review.slug}`}>Read the case study</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <ul className="review-dots">
            {Array.from({ length: reviewPages }, (_, index) => (
              <li key={index}>
                <button
                  type="button"
                  className={`review-dot${page === index ? " is-active" : ""}`}
                  aria-label={`Show testimonials ${index * perView + 1} to ${Math.min((index + 1) * perView, TESTIMONIALS.length)}`}
                  aria-current={page === index || undefined}
                  onClick={() => showPage(index)}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ind-band" id="industries">
        <div className="band-wave band-wave--top" aria-hidden="true">
          <svg viewBox="0 0 1920 88" preserveAspectRatio="none">
            <path d="M0 0H1920V55L1750.82 72.623C1544.17 94.1494 1335.83 94.1495 1129.18 72.6231L790.818 37.377C584.165 15.8506 375.835 15.8505 169.182 37.3769L0 55V0Z" fill="var(--bg)" />
          </svg>
        </div>
        <div className="container ind-band-grid">
          <div className="ind-band-copy reveal">
            <h2>Industries we support</h2>
            <p>Every organisation breaks differently. These are the sectors we know best — and why their queues look the way they do.</p>
            <div className="ind-acc">
              {INDUSTRIES.map((industry, index) => {
                const open = openIndustry === index;
                return (
                  <div className={`ind-item${open ? " is-open" : ""}`} key={industry.title}>
                    <button
                      type="button"
                      className="ind-head"
                      aria-expanded={open}
                      aria-controls={`industry-${index}`}
                      onClick={() => setOpenIndustry(open ? -1 : index)}
                    >
                      <h3>{industry.title}</h3>
                      <span className="ind-plus" aria-hidden="true" />
                    </button>
                    <div className="ind-body" id={`industry-${index}`} role="region">
                      <div className="ind-body-inner">
                        {industry.paragraphs.map((text) => <p key={text}>{text}</p>)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="ind-art reveal" aria-hidden="true">
            <svg viewBox="0 0 540 591" fill="none">
              <g fill="#ffffff">
                <circle cx="416" cy="172" r="6" />
                <circle cx="404" cy="196" r="8" />
                <circle cx="390" cy="224" r="10" />
                <circle cx="373" cy="256" r="13" />
                <circle cx="352" cy="292" r="16" />
                <circle cx="328" cy="330" r="19" />
                <circle cx="302" cy="368" r="22" />
                <circle cx="274" cy="406" r="24" />
                <circle cx="348" cy="232" r="4" />
                <circle cx="240" cy="465" r="26" />
                <circle cx="258" cy="436" r="25" />
                <circle cx="200" cy="487" r="30" />
                <circle cx="152" cy="503" r="36" />
                <circle cx="104" cy="517" r="28" />
                <circle cx="66" cy="533" r="20" />
                <circle cx="86" cy="486" r="6" />
                <circle cx="130" cy="541" r="32" />
                <circle cx="188" cy="533" r="26" />
                <circle cx="232" cy="523" r="20" />
                <ellipse cx="146" cy="545" rx="92" ry="26" />
              </g>
              <g transform="translate(452 118) rotate(35)">
                <path d="M-20 6C-33 18 -41 36 -44 54L-20 44Z" fill="var(--amber)" />
                <path d="M20 6C33 18 41 36 44 54L20 44Z" fill="var(--amber)" />
                <path d="M-13 42H13L18 58H-18Z" fill="var(--navy-soft)" />
                <path d="M0 -66C14 -48 22 -28 22 -8V32C22 39 17 44 10 44H-10C-17 44 -22 39 -22 32V-8C-22 -28 -14 -48 0 -66Z" fill="#ffffff" />
                <path d="M0 -66C9 -54 15 -41 18 -30H-18C-15 -41 -9 -54 0 -66Z" fill="var(--amber)" />
                <path d="M-22 14H22V24H-22Z" fill="var(--amber)" />
                <circle cx="0" cy="-6" r="12" fill="var(--navy-soft)" />
                <circle cx="0" cy="-6" r="12" stroke="var(--amber)" strokeWidth="3.5" />
              </g>
            </svg>
          </div>
        </div>
        <div className="container ind-cta reveal">
          <h3>Not in the list?</h3>
          <p>Everyone fits a category eventually. <Link to="/contact">Tell us what you run</Link> and we will show you what cover looks like for it.</p>
        </div>
        <div className="band-wave band-wave--bottom" aria-hidden="true">
          <svg viewBox="0 0 1920 73" preserveAspectRatio="none">
            <path d="M0 73H1920V33.77L1750.82 51.39C1544.17 72.92 1335.83 72.92 1129.18 51.39L790.82 16.15C584.17 -5.38 375.84 -5.38 169.18 16.15L0 33.77Z" fill="var(--bg)" />
          </svg>
        </div>
      </section>

      <section className="glance-band">
        <div className="container">
          <div className="glance-card reveal">
            <p className="glance-eyebrow">The short version</p>
            <h2>The questions we get asked first</h2>
            {GLANCE.map((item) => (
              <div className="glance-item" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="impact-band">
        <div className="container">
          <div className="impact-grid">
            <div className="impact-card reveal">
              <h3>{IMPACT.q}</h3>
              <p>{IMPACT.a}</p>
            </div>
            <div className="impact-sources reveal">
              <h3>{IMPACT.sourcesHead}</h3>
              <ul>
                {IMPACT.sources.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
