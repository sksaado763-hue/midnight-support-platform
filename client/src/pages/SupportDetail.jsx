import { Link, useParams } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import NotFound from "./NotFound";

const TRUST = [
  { title: "Named engineers, not a ticket queue", text: "The person who answers has your architecture diagram open. Rotas are published, so you know who before you call." },
  { title: "Changes proposed, never surprised", text: "Anything that touches production arrives as a written proposal with a rollback line. You approve; we execute; we report." },
  { title: "One handover every morning", text: "What fired, what we changed, what is still open and waiting on you. Nothing lives only in a dashboard." },
  { title: "Upstream honesty", text: "If the fault belongs to the provider, we say so, open the case with them and chase it until it closes — on our time, not yours." },
];

const PROVIDERS = [
  {
    slug: "aws-support",
    name: "AWS",
    title: "24/7 support for AWS",
    tagline: "The cluster, the queues, the lambdas and the bill — watched, patched and answered for, every hour of every day.",
    intro: "AWS rewards depth and punishes neglect. Most teams we meet run a competent estate that nobody has time to keep competent: images a year stale, roles wider than they need to be, a dashboard nobody opens. We take the whole thing onto our rota so your engineers stop being the on-call for infrastructure they inherited.",
    problem: "Your AWS bill grows every quarter while your confidence in it shrinks. Nobody is sure which of the four staging accounts still matters, the nightly batch is one expired certificate away from stopping, and the engineer who designed the VPC left two years ago.",
    solution: "We run your AWS estate as a named rota with a morning handover: monitoring and alerting we actually answer, patching and upgrades on a schedule you approve, cost reviews that end in actions rather than graphs, and a human on the phone when something fires at three in the morning.",
    pillarsTitle: "What we watch on AWS",
    pillars: [
      { title: "Compute & containers", text: "ECS, EKS, Lambda and the EC2 fleet beneath them: deploys, scaling policies, capacity headroom and the slow leaks that show up as a restart loop." },
      { title: "Data & storage", text: "RDS, DynamoDB, S3 and ElastiCache: backups that are tested restores, replication lag, versioning and the lifecycle rules quietly costing you money." },
      { title: "Network & edge", text: "VPC peering, transit gateways, load balancers, CloudFront and certificate expiry — the layer where most overnight calls actually start." },
      { title: "Identity & spend", text: "IAM drift, unused roles, over-provisioned instances and savings-plan maths, reviewed monthly and written up in plain language." },
    ],
    capabilities: [
      { title: "Every night", items: ["Alerting and incident response on a published rota", "Patching and runtime upgrades inside your approved window", "Backup verification and restore drills", "Certificate, domain and DNS expiry watch"] },
      { title: "Every month", items: ["Cost review with a written list of actions", "IAM and security-group drift review", "Capacity and scaling-policy check", "A plain-language report your finance team can read"] },
    ],
    fitWith: [
      "You run production on AWS with no dedicated platform team",
      "Your current cover ends at 18:00 and your users do not",
      "You inherited the estate and nobody current designed it",
      "You want one rota covering AWS and the application on top of it",
    ],
    faqs: [
      { q: "Do you need admin access on day one?", a: "No. We start read-only, write up what we find, and only take change access once you have approved the plan." },
      { q: "Can you work alongside our existing DevOps contractor?", a: "Yes. They keep the roadmap, we take the nights and the weekends, and the morning handover goes to both." },
      { q: "What if we are mostly serverless?", a: "Then the rota leans on Lambda, Step Functions and queue depth instead of fleets — same cover, different dials." },
    ],
  },
  {
    slug: "azure-support",
    name: "Azure",
    title: "24/7 support for Azure",
    tagline: "AKS, App Service, Functions and Entra — watched, patched and answered for, every hour of every day.",
    intro: "Azure estates tend to accrete: a subscription per project, an App Service plan per experiment, an Entra tenant nobody wants to own. We take the whole subscription group onto our rota so the estate stays legible and the alerts reach someone awake.",
    problem: "Half your Azure spend is staging environments nobody remembers creating, and the other half is production running on an App Service plan sized by guesswork. When something breaks at night, the alert goes to a distribution list.",
    solution: "We run Azure as a named rota with a morning handover: monitoring we answer, patching and version upgrades on an approved schedule, enrolment and licence cleanup, and a cost review that names what should be deleted.",
    pillarsTitle: "What we watch on Azure",
    pillars: [
      { title: "Compute & containers", text: "AKS node pools, App Service plans, Functions and container apps: deploys, scaling rules and the quota limits that bite mid-launch." },
      { title: "Data & storage", text: "Azure SQL, Cosmos DB, Storage Accounts and Redis: backup policy that survives a restore test, replication and retention rules." },
      { title: "Network & edge", text: "VNets, private endpoints, Front Door, Application Gateway and certificate expiry — the layer most overnight incidents start in." },
      { title: "Identity & spend", text: "Entra roles, stale service principals, licence sprawl and reservation maths, reviewed monthly and written up plainly." },
    ],
    capabilities: [
      { title: "Every night", items: ["Alerting and incident response on a published rota", "Patch and runtime upgrades inside your approved window", "Backup verification and restore drills", "Certificate, domain and DNS expiry watch"] },
      { title: "Every month", items: ["Subscription and cost review with a delete list", "Entra role and service-principal drift review", "Quota and scaling-policy check", "A plain-language report your finance team can read"] },
    ],
    fitWith: [
      "You run production across several Azure subscriptions",
      "Your alerts currently land on a distribution list",
      "Compliance needs evidence of patching and backups, not promises",
      "You want one rota covering Azure and the application on top of it",
    ],
    faqs: [
      { q: "Do you work with our Microsoft partner?", a: "Happily. They keep the licence relationship and the roadmap; we keep the nights and the handover." },
      { q: "Can you take over a landing zone we did not build?", a: "Yes. We start read-only, map what exists against what the zone assumes, and write up the gaps before touching anything." },
      { q: "What about hybrid estates?", a: "ExpressRoute and VPN links into on-premises are on the cover too, as long as we can see the Azure side of the wire." },
    ],
  },
  {
    slug: "gcp-support",
    name: "GCP",
    title: "24/7 support for GCP",
    tagline: "GKE, Cloud Run, BigQuery and the projects around them — watched, patched and answered for, every hour of every day.",
    intro: "GCP is where data-heavy products live, and where idle projects go to accumulate cost. We take the organisation onto our rota: the clusters, the pipelines, the IAM bindings and the budget alerts that currently nobody owns.",
    problem: "Your GCP organisation has nineteen projects, three of which are production and none of which share a billing alert. The nightly pipeline into BigQuery fails quietly, and the on-call rota is a group chat.",
    solution: "We run GCP as a named rota with a morning handover: monitoring we answer, GKE and Cloud Run upgrades on an approved schedule, pipeline failure triage, and a monthly review of projects, identity and spend.",
    pillarsTitle: "What we watch on GCP",
    pillars: [
      { title: "Compute & containers", text: "GKE node pools, Cloud Run services and Cloud Functions: deploys, autoscaling bounds and the quota walls that appear mid-release." },
      { title: "Data & pipelines", text: "BigQuery, Cloud SQL, Pub/Sub and Dataflow: failed jobs, dead-letter depth, slot capacity and backups that are tested restores." },
      { title: "Network & edge", text: "VPCs, shared networks, Cloud Load Balancing, Cloud CDN and certificate expiry — where most overnight calls begin." },
      { title: "Identity & spend", text: "IAM bindings, service-account sprawl, idle projects and committed-use maths, reviewed monthly and written up plainly." },
    ],
    capabilities: [
      { title: "Every night", items: ["Alerting and incident response on a published rota", "GKE and Cloud Run upgrades inside your approved window", "Backup verification and restore drills", "Pipeline failure triage with a morning note"] },
      { title: "Every month", items: ["Project and billing review with a delete list", "IAM and service-account drift review", "Quota and autoscaling check", "A plain-language report your finance team can read"] },
    ],
    fitWith: [
      "Your product lives on GKE or Cloud Run with no platform team",
      "BigQuery pipelines currently fail without anyone noticing",
      "Your organisation has more projects than anyone can list",
      "You want one rota covering GCP and the application on top of it",
    ],
    faqs: [
      { q: "We use GCP mostly for data, not hosting. Is that enough?", a: "It is. Pipeline and warehouse cover is most of what we do on GCP for half of our clients." },
      { q: "Can you share cover with our BigQuery consultant?", a: "Yes. They own the models, we own the nights, and the morning handover reaches both." },
      { q: "Do you cover multi-cloud estates?", a: "One rota can carry AWS, Azure and GCP together — most clients start with the provider that hurts and add the others later." },
    ],
  },
];

const INDUSTRIES = [
  {
    slug: "agencies",
    name: "Agencies",
    scene: "city",
    title: "24/7 support for agencies",
    tagline: "Client sites, launch dates and retainer SLAs — carried by a rota that never sleeps, so your account managers never have to.",
    gap: {
      title: "We carry the support your agency sells but never staffs.",
      lead: "Your name is in the footer of every site you build, and the maintenance after it is on nobody's timesheet. We are the desk behind your brand, set up for the work that lands after launch:",
      points: [
        "Client sites that still need a human answer when your office is dark",
        "The update backlog that keeps landing on whoever shipped the build",
        "Campaign and go-live nights watched by engineers who have done this before",
      ],
      question: "Sound like the arrangement your agency has been missing?",
      join: "Talk to us about white-label cover:",
    },
    problem: "Retainers eat your senior devs. Every client site is a different stack, a different host and a different idea of urgent, and the engineer who built half of them left last spring. Launches slip because the team is rebuilding a client's broken form for the third time.",
    solution: "We become the agency's support desk: one rota across all client sites, triage graded by the SLA you signed, fixes shipped through your process with your ticket numbers, and a morning handover your account managers can forward verbatim.",
    pillarsTitle: "What we watch for agencies",
    pillars: [
      { title: "Client sites & CMS", text: "WordPress, Sitecore, Kentico, Umbraco and the headless builds in between: plugin and core updates, editorial breakages, form and search regressions." },
      { title: "Launch cover", text: "Campaign and go-live windows with extra eyes on checkout, forms and page speed, plus a rollback plan written before the traffic arrives." },
      { title: "Hosting & performance", text: "Shared boxes, managed cloud or static edges: caching, PHP and Node runtimes, database slow queries and the hero image that is four megabytes again." },
      { title: "SLAs & reporting", text: "Response clocks per retainer, monthly summaries per client, and evidence for the renewal conversation instead of anecdotes." },
    ],
    capabilities: [
      { title: "Every night", items: ["Uptime and journey monitoring across every retainer site", "Security patching and CMS updates inside each client's window", "Backup verification before anyone sleeps on a change", "A triage queue graded by the SLA you signed, not by who shouts"] },
      { title: "Every month", items: ["Per-client health summary your account managers can forward", "Patch, plugin and runtime update ledger", "Performance and page-speed trend per site", "Retainer load review: which clients cost you hours you never priced"] },
    ],
    fitWith: [
      "You run ten client sites or a hundred, and the retainers outnumber the builders",
      "Your SLAs promise response times your current rota cannot keep at 2am",
      "Clients call developers directly and nobody wants that anymore",
      "You want a support desk that can answer in your name, in your tone",
    ],
    trustTitle: "Why agencies hand us the retainers",
    faqs: [
      { q: "Can you answer clients in our name?", a: "Yes. We work under your domain, your ticket templates and your tone of voice, or as a named partner — whichever the retainer expects." },
      { q: "What if a client site is on a stack you have not listed?", a: "We onboard new stacks every quarter. Send us the repo and the hosting panel and we will quote cover for it inside a week." },
      { q: "Do you take over mid-retainer, mid-disaster?", a: "We do. Half of our agency engagements start as a rescue: we stabilise first, write the handover second, and the retainer continues without the client noticing the seam." },
    ],
  },
  {
    slug: "saas-platforms",
    name: "SaaS Platforms",
    title: "24/7 support for SaaS platforms",
    tagline: "Uptime, observability and release confidence for products where downtime is a churn conversation.",
    whatTitle: "What SaaS support from us means",
    intro: "A SaaS product never closes. Every minute of downtime is a line in a renewal conversation, and every silent degradation is a support ticket waiting to happen. Most product teams we meet have good tests and no nights: monitoring that emails nobody, dashboards nobody reads at 3am. We take the nights, so your engineers ship features instead of carrying pagers.",
    problem: "Your error budget burns in incidents nobody notices until customers complain in public. Observability exists but nobody owns it at 3am, deploys stop on Fridays, and the on-call rota is two people deep and one holiday away from collapse.",
    solution: "We run observability and incident response as a service: alerts that page a named engineer, triage to code level, fixes or rollbacks inside your deploy process, and a morning handover that tells your stand-up what happened and what we changed.",
    pillarsTitle: "What we watch on SaaS platforms",
    pillars: [
      { title: "Availability & journeys", text: "Synthetic and real-user monitoring of signup, checkout and the five journeys your revenue depends on, not just the health endpoint." },
      { title: "Application health", text: "Error rates, latency percentiles, queue depth, worker lag and the slow memory leak that only shows on day six of an uptime streak." },
      { title: "Releases & rollbacks", text: "Deploy watches, canary checks, feature-flag hygiene and a rollback path rehearsed before it is needed at 2am." },
      { title: "Data & integrations", text: "Database health, migration safety, third-party API failures and the webhook backlog that quietly stops syncing." },
    ],
    capabilities: [
      { title: "Every night", items: ["Alerting and incident response on a published rota", "Triage to code level with a fix or a rollback decision", "Deploy and canary watches through your release window", "Queue, worker and webhook backlog checks"] },
      { title: "Every month", items: ["Error-budget and incident review with your engineers", "Observability audit: alerts that page humans, not mailboxes", "Capacity and scaling-policy review ahead of your growth curve", "A reliability report your customer teams can quote in renewal calls"] },
    ],
    fitWith: [
      "Downtime and degradation cost you renewals, not just embarrassment",
      "Your on-call rota is thinner than your uptime promise",
      "You want incident response that reads code, not just dashboards",
      "Releases have slowed down because nobody trusts the nights",
    ],
    trustTitle: "Why SaaS teams hand us the pager",
    faqs: [
      { q: "Do you replace our SRE team?", a: "No. We take the nights and the routine so your SREs spend their days on platform work instead of pager hangovers." },
      { q: "Can you work inside our existing observability stack?", a: "Yes. Datadog, Grafana, Sentry, CloudWatch or a homegrown dashboard — we answer what you already have and propose what is missing." },
      { q: "Who talks to our customers during an incident?", a: "Your team does, with our status notes as the source. We write the internal truth; you decide the public wording." },
    ],
  },
  {
    slug: "ecommerce",
    name: "eCommerce",
    title: "24/7 support for eCommerce",
    tagline: "Checkout, payments and catalogue uptime for stores where an hour dark is a month of revenue.",
    whatTitle: "What eCommerce support from us means",
    intro: "A store is never 'down for maintenance' — it is down for revenue. Most commerce teams we meet watch the server but not the sale: the payment gateway that fails only on one card type, the promo code that breaks the basket, the checkout that slows every evening at peak. We watch the money path as closely as the machines.",
    problem: "Peak trading is when things break: flash sales, campaign emails, the big seasonal weekend. The basket throws an error nobody can reproduce, the payment provider changes an API without warning, and the team finds out from customers, not monitoring.",
    solution: "We cover the whole trading surface: storefront, checkout, payments, integrations and the catalogue feeds behind them, with journey monitoring that buys things at 3am so you do not have to, and incident response graded by revenue at risk.",
    pillarsTitle: "What we watch on eCommerce",
    pillars: [
      { title: "Checkout & payments", text: "End-to-end transaction monitoring, gateway health, refund and webhook flows, and the card-type edge cases that only appear in production." },
      { title: "Storefront & catalogue", text: "Page speed under campaign load, search and filter regressions, stock and price feed failures, and the plugin that breaks the theme." },
      { title: "Integrations & fulfilment", text: "ERP, order management, courier and email integrations: queue health, sync failures and the order that never reached the warehouse." },
      { title: "Peak & campaigns", text: "Launch and sale cover with capacity checks beforehand, extra eyes during, and a written rollback plan for every deploy in the window." },
    ],
    capabilities: [
      { title: "Every night", items: ["Synthetic purchases through checkout on a published rota", "Payment gateway, webhook and refund flow monitoring", "Platform, plugin and runtime patching inside your trading window", "Backup and restore verification before peak seasons"] },
      { title: "Every month", items: ["Conversion-path performance review with page-speed metrics", "Integration and feed health audit", "Peak-readiness check ahead of every campaign in the calendar", "A trading report your commercial team can read without a translator"] },
    ],
    fitWith: [
      "An hour of checkout downtime is a board-level number",
      "You trade through peaks that your current cover cannot absorb",
      "Payment and fulfilment integrations fail in ways monitoring misses",
      "You want cover that watches the sale, not just the server",
    ],
    trustTitle: "Why stores hand us the nights",
    faqs: [
      { q: "Do you cover Magento and Shopify Plus builds?", a: "Yes, plus WooCommerce, BigCommerce and headless stacks. Platform-specific cover sits under our platforms pages; this rota covers whichever one you trade on." },
      { q: "Can you join our Black Friday war room?", a: "We run them. Capacity review two weeks out, freeze windows agreed, extra engineers on shift and a live incident channel for the weekend." },
      { q: "What if the failure is the payment provider's?", a: "We detect it, prove it with transaction traces, open the case with the provider and keep your team informed until it closes." },
    ],
  },
];

const PAGES = [
  ...PROVIDERS.map((page) => ({ ...page, kind: "provider" })),
  ...INDUSTRIES.map((page) => ({ ...page, kind: "industry" })),
];

/* Our own city skyline: three rows of blocks that ramp up from left to right,
   so the copy sits over a low horizon and the town grows behind the rocket.
   The window pattern is deterministic — the same page paints the same way. */
const CITY_BACK = [
  [0, 150, 96], [150, 90, 118], [240, 130, 84], [370, 80, 132], [450, 150, 104],
  [600, 100, 148], [700, 140, 118], [840, 90, 164], [930, 150, 132], [1080, 110, 180],
  [1190, 130, 148], [1320, 120, 196],
];
const CITY_MID = [
  [40, 120, 128], [170, 80, 152], [260, 140, 110], [410, 100, 166], [520, 130, 134],
  [660, 90, 180], [760, 150, 146], [920, 100, 198], [1030, 140, 164], [1180, 90, 214],
  [1280, 160, 180],
];
const CITY_FRONT = [
  [0, 140, 96], [150, 110, 128], [270, 150, 104], [430, 100, 140], [540, 160, 118],
  [710, 120, 160], [840, 150, 132], [1000, 110, 186], [1120, 160, 152], [1290, 150, 206],
];

function skylineWindows() {
  const cells = [];
  CITY_FRONT.forEach(([x, w, h], b) => {
    const cols = Math.floor((w - 20) / 22);
    const rows = Math.floor((h - 26) / 26);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const seed = (c * 3 + r * 5 + b * 7) % 7;
        if (seed > 2) continue;
        cells.push({
          key: `${b}-${c}-${r}`,
          x: x + 11 + c * 22,
          y: 320 - h + 14 + r * 26,
          lit: seed === 0,
        });
      }
    }
  });
  return cells;
}

export default function SupportDetail() {
  const { slug } = useParams();
  const provider = PAGES.find((p) => p.slug === slug);
  useTitle(provider ? `${provider.title} | Just After Midnight` : "24/7 Support | Just After Midnight");

  if (!provider) return <NotFound />;

  const others = PAGES.filter((p) => p.kind === provider.kind && p.slug !== slug);

  return (
    <>
      <section className={`page-hero page-hero--support${provider.scene ? ` page-hero--${provider.scene}` : ""}`}>
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
        {provider.scene === "city" && (
          <div className="city-skyline" aria-hidden="true">
            <svg viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice">
              <g className="city-back">
                {CITY_BACK.map(([x, w, h]) => <rect key={`b${x}`} x={x} y={320 - h} width={w - 6} height={h} />)}
              </g>
              <g className="city-mid">
                {CITY_MID.map(([x, w, h]) => <rect key={`m${x}`} x={x} y={320 - h} width={w - 8} height={h} />)}
              </g>
              <g className="city-front">
                {CITY_FRONT.map(([x, w, h]) => <rect key={`f${x}`} x={x} y={320 - h} width={w - 10} height={h} />)}
              </g>
              <g className="city-windows">
                {skylineWindows().map((c) => (
                  <rect key={c.key} className={c.lit ? "is-lit" : undefined} x={c.x} y={c.y} width={8} height={12} />
                ))}
              </g>
            </svg>
          </div>
        )}
        {provider.scene === "city" && (
          <div className="city-art" aria-hidden="true">
            <svg viewBox="0 0 220 300">
              <circle className="city-moon" cx="42" cy="40" r="22" />
              <g className="city-rocket">
                <path d="M124 30c22 24 32 58 32 96v50H92v-50c0-38 10-72 32-96z" />
                <circle className="city-porthole" cx="124" cy="112" r="14" />
                <path className="city-fin" d="M92 138v48H56c6-24 18-42 36-48z" />
                <path className="city-fin" d="M156 138v48h36c-6-24-18-42-36-48z" />
                <path className="city-flame" d="M108 176h32l-5 20-11 26-11-26z" />
              </g>
            </svg>
          </div>
        )}
        <div className="container">
          <div className="hero-copy">
            <p className="breadcrumb">
              <Link to="/support">24/7 Support</Link> <span aria-hidden="true">/</span> {provider.name}
            </p>
            <h1 className="page-hero-title support-hero-title reveal">{provider.title}</h1>
            <p className="page-hero-sub support-hero-sub reveal">{provider.tagline}</p>
            <div className="hero-actions reveal">
              <Link to="/contact" className="btn btn-primary support-hero-cta">Get in touch <span aria-hidden="true">➔</span></Link>
            </div>
          </div>
        </div>
        <div className="support-hero-divider" aria-hidden="true">
          <svg viewBox="0 0 1920 160" preserveAspectRatio="none">
            <path d="M0 68 C180 24 320 0 480 0 C700 0 1120 135 1450 135 C1660 135 1790 100 1920 69 L1920 160 L0 160 Z" fill="var(--bg)" />
          </svg>
        </div>
      </section>

      <section className="platform-detail">
        <div className="container">
          <div className="plat-what reveal">
            <div>
              <h2>{provider.whatTitle || `What does ${provider.name} support from us mean?`}</h2>
              <p>{provider.intro}</p>
            </div>
          </div>

          <div className="ps-grid">
            <article className="ps-card ps-card--problem reveal">
              <h2>Your problem</h2>
              <p>{provider.problem}</p>
            </article>
            <article className="ps-card ps-card--solution reveal">
              <h2>Our solution</h2>
              <p>{provider.solution}</p>
            </article>
          </div>

          <div className="platform-band">
            <h2 className="band-title band-title--dark band-title--center reveal">{provider.pillarsTitle}</h2>
            <span className="band-rule band-rule--center" aria-hidden="true" />
            <div className="cap-grid">
              {provider.pillars.map((pillar) => (
                <article className="cap-card reveal" key={pillar.title}>
                  <h3>{pillar.title}</h3>
                  <span className="cap-rule" aria-hidden="true" />
                  <p>{pillar.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="feature-section">
            <h2 className="section-title reveal">{provider.trustTitle || `Why teams trust us with ${provider.name}`}</h2>
            <div className="feature-grid">
              {TRUST.map((feature) => (
                <article className="feature-card reveal" key={feature.title}>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="platform-band">
            <h2 className="band-title band-title--dark band-title--center reveal">What the cover includes</h2>
            <span className="band-rule band-rule--center" aria-hidden="true" />
            <div className="cap-grid cap-grid--2">
              {provider.capabilities.map((cap) => (
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

          <div className="platform-band">
            <h2 className="band-title band-title--dark band-title--center reveal">A good fit if</h2>
            <span className="band-rule band-rule--center" aria-hidden="true" />
            <ul className="fit-list reveal">
              {provider.fitWith.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <div className="packages-band reveal">
            <div>
              <h2>Our service packages</h2>
              <p>Everything we support is covered by one of three packages — pick the lightest one that genuinely covers you.</p>
            </div>
            <Link to="/support" className="btn btn-primary">Compare packages <span aria-hidden="true">➔</span></Link>
          </div>

          <div className="faq-section">
            <h2 className="section-title reveal">FAQ</h2>
            <div className="faq-list reveal">
              {provider.faqs.map((faq) => (
                <details className="faq-item" key={faq.q}>
                  <summary>{faq.q}<span className="faq-chevron" aria-hidden="true"></span></summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
            <p className="faq-more reveal">More questions? <Link to="/contact">Ask us anything</Link> — we answer quickly, even at strange hours.</p>
          </div>

          <div className="other-platforms">
            <h2 className="section-title reveal">We also cover</h2>
            <div className="other-platform-grid">
              {others.map((other) => (
                <Link className="other-platform-chip reveal" to={`/support/${other.slug}`} key={other.slug}>
                  {other.title}
                </Link>
              ))}
              <Link className="other-platform-chip other-platform-chip--all reveal" to="/support">
                All support services <span aria-hidden="true">➔</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
