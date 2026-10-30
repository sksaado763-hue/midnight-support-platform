import { Link } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import Icon from "../components/Icons";
import LatestInsights from "../components/Cards";

/* The six tiles are the page's table of contents: five services plus one
   catch-all. `to` points at the detail section further down, so the anchors the
   header and homepage link to have to keep existing below. */
const TILES = [
  {
    icon: "layers",
    title: "Cloud Strategy & Roadmaps",
    to: "/cloud#consulting",
    text: "We start from what you are trying to ship and work backwards to the parts of cloud that earn their keep. You get a sequenced plan with costs, risks and owners attached.",
  },
  {
    icon: "sitemap",
    title: "Solution Architecture",
    to: "/cloud#consulting",
    text: "Landing zones, network topology and the failover story — drawn properly and pressure-tested before anyone writes a line of Terraform.",
  },
  {
    icon: "blocks",
    title: "Application Modernisation",
    to: "/cloud#devops",
    text: "Moving a working product onto containers and smaller services without a big-bang rewrite or a feature freeze.",
  },
  {
    icon: "cube",
    title: "Managed Cloud",
    to: "/cloud#aws",
    text: "We run your AWS, Azure or GCP estate end to end — monitoring, patching, capacity and the on-call rota — so your engineers spend the week building.",
  },
  {
    icon: "cost",
    title: "Cloud Cost Optimisation",
    to: "/cloud#consulting",
    text: "Right-sizing, commitment strategy and the guardrails that stop next quarter's bill quietly drifting back up again.",
  },
];

const PROVIDERS = [
  {
    id: "aws",
    badge: "aws",
    name: "Amazon Web Services",
    text: "Our deepest specialism — from Well-Architected Reviews to landing zones, ECS/EKS operations and cost programmes that routinely claw back double-digit percentages of spend.",
    links: ["Well-Architected Reviews", "EKS & container platforms", "Reserved capacity strategy"],
  },
  {
    id: "azure",
    badge: "A",
    tint: "azure",
    name: "Microsoft Azure",
    text: "Enterprise-grade Azure design and operations: AKS, App Service estates, hybrid connectivity and the governance guardrails that keep a growing subscription estate tidy.",
    links: ["AKS operations & upgrades", "Landing zones & policy as code", "Hybrid connectivity"],
  },
  {
    id: "gcp",
    badge: "G",
    tint: "gcp",
    name: "Google Cloud Platform",
    text: "Data-heavy workloads, GKE fleets and the networking clarity that GCP rewards when it's done right. We run production GCP estates for SaaS and analytics teams.",
    links: ["GKE fleet management", "BigQuery & data pipelines", "Cloud Run & serverless"],
  },
];

const CONSULTING = [
  ["Cost Optimisation", "A forensic review of your estate that typically finds 20–40% of spend with no good reason to exist. We fix the causes, not just the symptoms."],
  ["Well-Architected Review", "A structured health check against the pillars that matter — operational excellence, security, reliability, performance and cost — with a prioritised remediation plan."],
  ["Solution Architecture", "Designs for the tricky bits: multi-region failover, compliance-ready environments, event-driven architectures that stay debuggable at scale."],
  ["Cloud Migration", "Wave-based migrations with rollback paths at every step. We've moved platforms with zero customer-visible downtime — and we can prove it."],
];

const DEVOPS_CARDS = [
  ["DevOps Consulting", "Embedded coaching for teams who want to own their pipeline, not rent one. We work in your repo, with your engineers, until good practices are just how things are done."],
  ["Application Modernisation", "Containerisation, decomposition and cloud-native rewrites — sequenced so the business keeps running while the foundations improve underneath it."],
];

export default function Cloud() {
  useTitle("Managed Cloud & DevOps Services | Just After Midnight");
  return (
    <>
      <section className="cloud-hero">
        <div className="container">
          <div className="cloud-hero__text">
            <h1 className="page-hero-title reveal">Managed Cloud &amp; DevOps</h1>
            <p className="page-hero-sub reveal">We design, build, migrate and run cloud infrastructure on AWS, Azure and GCP — then stay on the rota afterwards, so your own engineers get their week back to build product.</p>
            <div className="hero-actions reveal">
              <Link to="/contact" className="btn btn-primary">Get in touch <span aria-hidden="true">➔</span></Link>
            </div>
          </div>
        </div>
        <div className="hero-divider" aria-hidden="true">
          <svg className="hero-wave" viewBox="0 0 1920 124" preserveAspectRatio="none">
            <path className="hero-wave__fill" d="M0 24 C150 20 310 25 470 30 C660 36 820 62 960 62 C1080 62 1240 42 1420 46 C1600 50 1740 62 1920 58 V124 H0 Z" />
          </svg>
        </div>
      </section>

      <section className="cloud-grid">
        <div className="container">
          <div className="cloud-grid__intro reveal">
            <h2 className="section-title">Where do you need us?</h2>
            <p>Each tile jumps straight to the detail for that service, so you can skip the parts you have already solved.</p>
          </div>
          <div className="cloud-grid__cards">
            {TILES.map((tile) => (
              <article className="cloud-tile reveal" key={tile.title}>
                <span className="cloud-tile__icon">
                  <Icon name={tile.icon} strokeWidth={1.1} />
                </span>
                <h3>
                  <Link to={tile.to}>{tile.title} <span aria-hidden="true">➔</span></Link>
                </h3>
                <p>{tile.text}</p>
              </article>
            ))}
            <article className="cloud-tile cloud-tile--cta reveal">
              <span className="cloud-tile__icon">
                <Icon name="search" strokeWidth={1.1} />
              </span>
              <h3>
                <Link to="/contact">Something else entirely? <span aria-hidden="true">➔</span></Link>
              </h3>
              <p>If your problem does not have a tidy name, it is usually the interesting one. Tell us what is going wrong and we will say honestly whether we can help.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="cloud-section">
        <div className="container">
          <h2 className="section-title reveal">Cloud providers we work across</h2>
          <div className="provider-grid">
            {PROVIDERS.map((provider) => (
              <article className="provider-card reveal" id={provider.id} key={provider.id}>
                <div className={`provider-badge${provider.tint ? ` provider-badge--${provider.tint}` : ""}`} aria-hidden="true">
                  <strong>{provider.badge}</strong>
                </div>
                <h3>{provider.name}</h3>
                <p>{provider.text}</p>
                <ul className="service-links">
                  {provider.links.map((link) => (
                    <li key={link}><a href="#">{link}</a></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cloud-section cloud-section--alt" id="consulting">
        <div className="container">
          <h2 className="section-title reveal">Cloud consulting</h2>
          <div className="consult-grid">
            {CONSULTING.map(([title, text]) => (
              <article className="consult-card reveal" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cloud-section" id="devops">
        <div className="container">
          <h2 className="section-title reveal">DevOps services</h2>
          <div className="devops-feature reveal">
            <div>
              <h3>Delivery &amp; Automation</h3>
              <p>Pipelines that teams actually trust: fast, boring, reversible. Progressive delivery, automated rollback, environment parity, and test gates that catch the right things. When deploys stop being scary, teams ship more — and sleep better.</p>
              <Link to="/contact" className="btn btn-primary">Talk DevOps <span aria-hidden="true">➔</span></Link>
            </div>
            <div className="pipeline-art" aria-hidden="true">
              <svg viewBox="0 0 360 220">
                <g fontFamily="Montserrat, sans-serif" fontSize="12" fontWeight="700">
                  <rect x="10" y="20" width="88" height="34" rx="17" fill="#243F88" />
                  <text x="54" y="41" fill="#fff" textAnchor="middle">commit</text>
                  <rect x="122" y="20" width="88" height="34" rx="17" fill="#1F2C49" />
                  <text x="166" y="41" fill="#fff" textAnchor="middle">build</text>
                  <rect x="234" y="20" width="88" height="34" rx="17" fill="#243F88" />
                  <text x="278" y="41" fill="#fff" textAnchor="middle">test</text>
                  <rect x="122" y="100" width="88" height="34" rx="17" fill="#1F2C49" />
                  <text x="166" y="121" fill="#fff" textAnchor="middle">staging</text>
                  <rect x="234" y="100" width="88" height="34" rx="17" fill="#FABD14" />
                  <text x="278" y="121" fill="#132140" textAnchor="middle">deploy</text>
                </g>
                <g stroke="#FABD14" strokeWidth="2.5" fill="none" strokeLinecap="round">
                  <path d="M98 37h16" />
                  <path d="M210 37h16" />
                  <path d="M278 54v22c0 12-10 20-22 20h-58" />
                  <path d="M210 117h16" />
                  <path d="M166 54v30c0 10 8 16 18 16h-14" />
                </g>
                <g fill="#A2CCE4">
                  <circle cx="166" cy="160" r="4" />
                  <circle cx="278" cy="160" r="4" />
                </g>
                <text x="166" y="184" fill="#9BB4CC" fontSize="11" fontFamily="Inter, sans-serif" textAnchor="middle">rollback in 60s</text>
                <text x="278" y="184" fill="#9BB4CC" fontSize="11" fontFamily="Inter, sans-serif" textAnchor="middle">canary + auto-halt</text>
              </svg>
            </div>
          </div>
          <div className="consult-grid">
            {DEVOPS_CARDS.map(([title, text]) => (
              <article className="consult-card reveal" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LatestInsights />
    </>
  );
}
