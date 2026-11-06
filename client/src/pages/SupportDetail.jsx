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

export default function SupportDetail() {
  const { slug } = useParams();
  const provider = PROVIDERS.find((p) => p.slug === slug);
  useTitle(provider ? `${provider.name} Support | Just After Midnight` : "24/7 Support | Just After Midnight");

  if (!provider) return <NotFound />;

  const others = PROVIDERS.filter((p) => p.slug !== slug);

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
          <p className="breadcrumb">
            <Link to="/support">24/7 Support</Link> <span aria-hidden="true">/</span> {provider.name}
          </p>
          <h1 className="page-hero-title support-hero-title reveal">{provider.title}</h1>
          <p className="page-hero-sub support-hero-sub reveal">{provider.tagline}</p>
          <div className="hero-actions reveal">
            <Link to="/contact" className="btn btn-primary support-hero-cta">Get in touch <span aria-hidden="true">➔</span></Link>
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
              <h2>What does {provider.name} support from us mean?</h2>
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
            <h2 className="section-title reveal">Why teams trust us with {provider.name}</h2>
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
              <p>Every provider we support is covered by one of three packages — pick the lightest one that genuinely covers you.</p>
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
                  24/7 support for {other.name}
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
