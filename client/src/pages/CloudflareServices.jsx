import { useState } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import BookingWidget from "../components/BookingWidget";

const TRUSTED_LOGOS = [
  { name: "The Body Coach", src: "https://www.justaftermidnight247.com/wp-content/uploads/2025/10/The_Body_Coach_logo.svg" },
  { name: "Heineken", src: "https://www.justaftermidnight247.com/wp-content/uploads/2025/09/Heineken_logo-1.svg" },
  { name: "DLA Piper", src: "https://www.justaftermidnight247.com/wp-content/uploads/2025/09/DLA_Piper_logo-1-1.svg" },
  { name: "Coles", src: "https://www.justaftermidnight247.com/wp-content/uploads/2025/09/Coles_logo-1.svg" },
  { name: "Tesco", src: "https://www.justaftermidnight247.com/wp-content/uploads/2025/09/Tesco_Logo-1-1.svg" },
  { name: "Vodafone", src: "https://www.justaftermidnight247.com/wp-content/uploads/2025/09/Vector.svg" },
  { name: "Brand", src: "https://www.justaftermidnight247.com/wp-content/uploads/2025/09/Group-16.svg" },
];

const CERT_BADGES = [
  { name: "Cloudflare Accredited Configuration Engineer", src: "/images/cloudflare/badge-sec-eng.png" },
  { name: "Cloudflare Application Security Associate", src: "/images/cloudflare/badge-sec-perf.png" },
  { name: "Cloudflare Zero Trust Fundamentals", src: "/images/cloudflare/badge-zero-trust.png" },
  { name: "Cloudflare Accredited Sales Professional", src: "/images/cloudflare/badge-sales.png" },
  { name: "Cloudflare Registered Partner", src: "/images/cloudflare/badge-partner.svg" },
];

const ENGINEERS = [
  { name: "Arif", role: "Technical Director", img: "/images/cloudflare/arif.png" },
  { name: "Rob", role: "Head of Technical Consulting (UK + US)", img: "/images/cloudflare/rob.svg" },
  { name: "Hang", role: "Senior DevOps Engineer", img: "/images/cloudflare/hang.png" },
  { name: "Shyama", role: "DevOps Engineer", img: "/images/cloudflare/shyama.png" },
  { name: "Saul", role: "DevOps Engineer", img: "/images/cloudflare/saul.svg" },
  { name: "Ray", role: "Senior DevOps Engineer", img: "/images/cloudflare/ray.png" },
  { name: "Dan", role: "Cloud Engineer", img: "/images/cloudflare/dan.png" },
  { name: "Zek", role: "Head of Technology, Asia", img: "/images/cloudflare/zek.png" },
];

const COMPARISON_ROWS = [
  { feature: "Engagement type", c1: "One-off engagement", c2: "Fixed-scope project", c3: "Ongoing managed service", isHeader: true },
  { feature: "Assess existing environment", c1: "✓", c2: "✓", c3: "—" },
  { feature: "Architecture and solution design", c1: "✓", c2: "✓", c3: "—" },
  { feature: "Initial Cloudflare configuration", c1: "—", c2: "✓", c3: "✓" },
  { feature: "Zero Trust rollout", c1: "✓", c2: "✓", c3: "✓" },
  { feature: "Migration planning", c1: "✓", c2: "✓", c3: "—" },
  { feature: "Deployment and testing", c1: "—", c2: "✓", c3: "—" },
  { feature: "Change management", c1: "—", c2: "✓", c3: "—" },
  { feature: "Ongoing platform administration", c1: "—", c2: "—", c3: "✓" },
  { feature: "24/7 monitoring and alerting", c1: "—", c2: "—", c3: "✓" },
  { feature: "24/7 incident management", c1: "—", c2: "—", c3: "✓" },
  { feature: "24/7 Slack access", c1: "—", c2: "—", c3: "✓" },
  { feature: "Cloudflare escalation", c1: "—", c2: "—", c3: "✓" },
  { feature: "SLA-backed support", c1: "—", c2: "—", c3: "✓" },
  { feature: "Performance optimisation", c1: "—", c2: "—", c3: "✓" },
  { feature: "Regular service reviews", c1: "—", c2: "—", c3: "✓" },
  { feature: "Payment by invoice", c1: "—", c2: "—", c3: "✓" },
  { feature: "Monthly reporting", c1: "—", c2: "—", c3: "✓" },
];

const FAQS = [
  {
    q: "What are Cloudflare managed services?",
    a: "Cloudflare managed services are a suite of operational solutions focused on security and performance. They cover centralised management of Cloudflare's security, performance and networking features: DDoS protection, Web Application Firewall (WAF), Zero Trust access and edge computing – delivered by a specialist provider for configuration, monitoring and incident response.",
  },
  {
    q: "What is a Web Application Firewall (WAF)?",
    a: "A Web Application Firewall (WAF) protects web applications and APIs from common attacks: SQL injection, cross-site scripting and malicious automated traffic. Cloudflare provides a WAF with managed rulesets and custom policies, which blocks threats while keeping false positives low.",
  },
  {
    q: "What is DDoS protection?",
    a: "DDoS protection defends applications and networks against Distributed Denial of Service (DDoS) attacks, which try to overwhelm a service with traffic surges. Cloudflare provides DDoS protection on every request, using its global network to absorb and mitigate attacks automatically.",
  },
  {
    q: "What is Zero Trust?",
    a: "Zero Trust is a security framework that controls access to applications, systems and data based on identity, device posture and contextual signals rather than network location. Cloudflare's Zero Trust controls secure remote workers, third-party users and distributed environments, reducing reliance on traditional VPNs.",
  },
  {
    q: "What is edge computing in Cloudflare?",
    a: "Edge computing processes and enforces security policies at the edge of the network, closer to users. Cloudflare operates in over 335 cities worldwide, running application logic and protections at the edge for low-latency security and performance.",
  },
  {
    q: "What is Cloudflare and why do organisations use it?",
    a: "Cloudflare is a connectivity cloud platform for improving security, performance and reliability across applications, networks and digital services. Organisations use it to protect websites and APIs, accelerate content delivery, manage DNS, secure remote access and improve application availability.",
  },
  {
    q: "What services does Cloudflare provide?",
    a: "Cloudflare covers security, networking and performance: CDN, DDoS protection, WAF, DNS management, bot management, Zero Trust access controls, API security, load balancing, traffic management and edge computing.",
  },
  {
    q: "Is Cloudflare a CDN or a WAF?",
    a: "Both. Cloudflare began as a CDN. It now also provides a WAF, DDoS protection, bot management, Zero Trust security and a range of networking services.",
  },
  {
    q: "Does Cloudflare offer a WAF?",
    a: "Yes. Cloudflare's Web Application Firewall protects applications and APIs from common attacks, with managed rulesets, custom policies and threat intelligence.",
  },
  {
    q: "What is WAF management?",
    a: "WAF management is the ongoing work of configuring, maintaining and improving a Web Application Firewall: reviewing rules, investigating alerts, reducing false positives and responding to emerging threats.",
  },
  {
    q: "What is managed WAF?",
    a: "Managed WAF is a service where a specialist provider operates and maintains a Web Application Firewall on your behalf, providing expertise, monitoring, rule tuning and incident support.",
  },
  {
    q: "How does Cloudflare Bot Management work?",
    a: "Cloudflare Bot Management analyses traffic patterns to separate legitimate and malicious automated activity, using machine learning, behavioural analysis and threat intelligence.",
  },
  {
    q: "How much does Cloudflare cost?",
    a: "Cloudflare offers a range of pricing, from free plans to enterprise services. Cost depends on the services, traffic volumes, security requirements and support you need.",
  },
  {
    q: "Is Cloudflare a managed service?",
    a: "Cloudflare itself is a platform, not a managed service. Managed Cloudflare services add operational management, monitoring, incident response and ongoing support, delivered by a specialist provider like Just After Midnight.",
  },
];

export default function CloudflareServices() {
  useTitle("Cloudflare Managed Services | Just After Midnight");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq((curr) => (curr === idx ? null : idx));
  };

  return (
    <main className="cf-page" id="main-content">
      {/* 0. HERO SECTION */}
      <section className="cf-hero" aria-label="Cloudflare Managed Services">
        <div className="cf-container">
          <div className="cf-hero__content">
            <h1 className="cf-hero__title">Cloudflare Managed Services</h1>
            <p className="cf-hero__sub">
              From architecture and implementation to 24/7 managed operations, we help organisations configure, govern and support Cloudflare with clear ownership, SLAs and escalation routes.
            </p>
            <div className="cf-hero__actions">
              <a href="#consultation" className="btn-primary cf-hero__btn">
                Request a Cloudflare maturity assessment <span>➔</span>
              </a>
            </div>

            <div className="cf-hero__trusted">
              <p className="cf-hero__trusted-label">Trusted by:</p>
              <div className="cf-hero__logos">
                {TRUSTED_LOGOS.map((logo, i) => (
                  <div className="cf-hero__logo-item" key={i}>
                    <img src={logo.src} alt={logo.name} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Global curved divider */}
        <div className="global-curved-divider global-curved-divider__down" aria-hidden="true">
          <svg viewBox="0 0 1920 89" fill="none" preserveAspectRatio="none">
            <path
              d="M0 0H915.5H1920V55L1750.82 72.623C1544.17 94.1494 1335.83 94.1494 1129.18 72.623L960 55L790.819 72.623C584.17 94.1494 375.83 94.1494 169.181 72.623L0 55V0Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* 1. CLOUDFLARE SPECIALISTS END TO END */}
      <section className="cf-section cf-overview" aria-label="Cloudflare specialists, end to end">
        <div className="cf-container">
          <div className="cf-overview__grid">
            <div className="cf-overview__main">
              <h2 className="cf-section-title">Cloudflare specialists, end to end</h2>
              <p className="cf-lead-text">
                We’re Just After Midnight. We are UK-based Cloudflare specialists providing consultancy, implementation and fully managed services.
              </p>
              <p className="cf-body-text">
                We support Cloudflare estates at every stage, from self-serve accounts that need a proper review to larger environments requiring governance, escalation and ongoing management. Most teams come to us to assess what they should be running, build it around their estate, then hand the day-to-day management to us.
              </p>

              <div className="cf-benefits-list">
                <h3 className="cf-benefits-heading">We can help you:</h3>
                <div className="cf-benefit-item">
                  <div className="cf-check-icon">✓</div>
                  <div>
                    <h4>Know your Cloudflare setup is doing what it should</h4>
                    <p>We review and optimise your Cloudflare configuration so you can be confident the right protections, rules and features are in place.</p>
                  </div>
                </div>
                <div className="cf-benefit-item">
                  <div className="cf-check-icon">✓</div>
                  <div>
                    <h4>Get support and escalation when it matters</h4>
                    <p>We give you a clear support route, SLA-backed service and escalation paths, so you’re not left trying to resolve urgent Cloudflare issues alone.</p>
                  </div>
                </div>
                <div className="cf-benefit-item">
                  <div className="cf-check-icon">✓</div>
                  <div>
                    <h4>Turn alerts into managed incidents</h4>
                    <p>We review security events, investigate false positives and help manage incidents properly.</p>
                  </div>
                </div>
                <div className="cf-benefit-item">
                  <div className="cf-check-icon">✓</div>
                  <div>
                    <h4>Keep control of changes over time</h4>
                    <p>Your Cloudflare setup needs governance, audit trails and rollback planning, so changes can be made safely as your sites, traffic and risks evolve.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="cf-overview__side">
              <div className="cf-pain-card">
                <h3 className="cf-pain-card__title">Sound familiar?</h3>
                <ul className="cf-pain-list">
                  <li>You have Cloudflare in place, but you’re not confident it’s protecting you properly</li>
                  <li>You signed up directly through self-serve, but now need better support, SLAs and escalation</li>
                  <li>You’re still seeing attacks, suspicious traffic or bot activity.</li>
                  <li>You need SLA-backed support when incidents happen.</li>
                  <li>Legitimate users are being blocked by false positives.</li>
                  <li>You know Cloudflare can do more, but you’re not sure what to switch on, tune or review.</li>
                  <li>You have multiple vendors but no single point of accountability.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AT A GLANCE (TWO CARDS) */}
      <section className="cf-section cf-glance" aria-label="At a glance">
        <div className="cf-container">
          <div className="cf-glance__grid">
            {/* Card 1 */}
            <div className="cf-glance-card">
              <span className="cf-badge-tag">At a glance</span>
              <h2 className="cf-glance-card__title">What are Cloudflare managed services and who are they for?</h2>
              <p className="cf-glance-card__desc">
                <strong>Cloudflare managed services</strong> are the day-to-day operation of the Cloudflare platform on your behalf: securing applications, tuning performance and managing your configuration as your business changes.
              </p>

              <div className="cf-glance-covered">
                <h4>What’s covered</h4>
                <ul className="cf-dots-list">
                  <li>Web Application Firewall (WAF) management and optimisation</li>
                  <li>DDoS protection monitoring and response</li>
                  <li>Zero Trust access policies and identity management</li>
                  <li>Bot Management and Rate Limiting configuration</li>
                  <li>Performance optimisation, caching and CDN tuning</li>
                  <li>Cloudflare Workers and edge application support</li>
                  <li>DNS, Load Balancing and Traffic Management</li>
                  <li>Logpush, SIEM integration, analytics and alerting where required</li>
                </ul>
              </div>

              <div className="cf-glance-target">
                <p>
                  Designed for organisations that rely on business-critical applications, APIs and websites delivered on the public internet. Ideal for businesses that want to ensure their Cloudflare platform is continuously optimised without the overhead of managing it internally.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="cf-glance-card">
              <span className="cf-badge-tag">At a glance</span>
              <h2 className="cf-glance-card__title">Who are Just After Midnight?</h2>
              <p className="cf-glance-card__desc">
                Just After Midnight (JAM) is a managed cloud services provider and <strong>Cloudflare Registered Partner</strong>.
              </p>
              <p className="cf-glance-card__text">
                Partner-managed Cloudflare gives you a service wrapper. We add the operational layer: configuration, governance, incident management, reporting, escalation and 24/7 support.
              </p>
              <p className="cf-glance-card__text">
                We work as an extension of your team, assessing, building and running your Cloudflare estate so it stays secure, fast and cost-efficient as you grow.
              </p>

              <div className="cf-accreditations">
                <h4>Certified and accredited</h4>
                <div className="cf-badges-flex">
                  {CERT_BADGES.map((b, i) => (
                    <div className="cf-badge-item" key={i} title={b.name}>
                      <img src={b.src} alt={b.name} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE STATS */}
      <section className="cf-section cf-stats" aria-label="Cloudflare stats">
        <div className="cf-container">
          <div className="cf-stats__header">
            <span className="cf-eyebrow">THE STATS</span>
            <h2 className="cf-section-title">
              Many customers pay for the whole Cloudflare platform <br />
              <span>(and use a slice of it)</span>
            </h2>
            <p className="cf-stats__intro">
              Idle WAF rules, unused Zero Trust seats, default cache settings, no Bot Management. Every gap is latent risk and spend you’ve already paid for.
            </p>
          </div>

          <p className="cf-stats__lead">On average:</p>

          <div className="cf-stats__grid">
            <div className="cf-stat-card">
              <div className="cf-stat-card__number">~30%</div>
              <div className="cf-stat-card__label">of features enabled today (your plan includes 100%)</div>
            </div>
            <div className="cf-stat-card">
              <div className="cf-stat-card__number">62%</div>
              <div className="cf-stat-card__label">of security features sit unconfigured in a typical estate</div>
            </div>
            <div className="cf-stat-card">
              <div className="cf-stat-card__number">40%</div>
              <div className="cf-stat-card__label">average egress & overage spend reducible with the right config</div>
            </div>
            <div className="cf-stat-card">
              <div className="cf-stat-card__number">5+</div>
              <div className="cf-stat-card__label">licensed products never switched on</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE DO (3 PILLARS) */}
      <section className="cf-section cf-pillars" aria-label="What we do">
        <div className="cf-container">
          <div className="cf-pillars__intro">
            <h2 className="cf-section-title">What we do</h2>
            <p className="cf-pillars__text">
              We work with customers at every stage of the Cloudflare journey, from initial setup and configuration through to full managed operations and end-to-end stack ownership.
            </p>
          </div>

          <div className="cf-pillars__grid">
            <div className="cf-pillar-card">
              <div className="cf-pillar-card__icon">
                <img src="/images/cloudflare/thumb-consultancy.svg" alt="" aria-hidden="true" />
              </div>
              <h3 className="cf-pillar-card__title">Cloudflare Maturity Assessments and Consultancy</h3>
              <p className="cf-pillar-card__desc">
                We assess your existing Cloudflare setup, identify gaps and tune rules, policies and features to your requirements.
              </p>
              <a href="#consultancy" className="cf-pillar-card__link">
                Explore consultancy ➔
              </a>
            </div>

            <div className="cf-pillar-card">
              <div className="cf-pillar-card__icon">
                <img src="/images/cloudflare/thumb-implementation.svg" alt="" aria-hidden="true" />
              </div>
              <h3 className="cf-pillar-card__title">Cloudflare Configuration and Implementation</h3>
              <p className="cf-pillar-card__desc">
                Every Cloudflare instance is configured around your traffic, risks, users, integrations and operating model.
              </p>
              <a href="#configuration" className="cf-pillar-card__link">
                Explore implementation ➔
              </a>
            </div>

            <div className="cf-pillar-card">
              <div className="cf-pillar-card__icon">
                <img src="/images/cloudflare/thumb-mssp.svg" alt="" aria-hidden="true" />
              </div>
              <h3 className="cf-pillar-card__title">24/7 Cloudflare Managed Services</h3>
              <p className="cf-pillar-card__desc">
                We provide incident management, service reporting, escalation paths, governance and 24/7 operational support.
              </p>
              <a href="#managed-services" className="cf-pillar-card__link">
                Explore managed services ➔
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MEET SOME OF YOUR ENGINEERS */}
      <section className="cf-section cf-team" aria-label="Meet some of your engineers">
        <div className="cf-container">
          <div className="cf-team__intro">
            <h2 className="cf-section-title">Meet some of your engineers</h2>
            <p className="cf-team__text">
              With JAM, you’ll work directly with the consultants and engineers who design, deploy and support your environment. Not a separate offshore delivery team.
            </p>
          </div>

          <div className="cf-team__grid">
            {ENGINEERS.map((eng, i) => (
              <div className="cf-team-card" key={i}>
                <div className="cf-team-card__image-wrap">
                  <img src={eng.img} alt={eng.name} loading="lazy" />
                </div>
                <h4 className="cf-team-card__name">{eng.name}</h4>
                <p className="cf-team-card__role">{eng.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CARTIER CASE STUDY CALLOUT */}
      <section className="cf-section cf-case-feature" aria-label="Cartier case study">
        <div className="cf-container">
          <div className="cf-case-card">
            <div className="cf-case-card__content">
              <span className="cf-case-card__tag">CASE STUDY</span>
              <h2 className="cf-case-card__client">Cartier</h2>
              <h3 className="cf-case-card__headline">Strengthening security for a global luxury retailer</h3>
              <p className="cf-case-card__text">
                Discover how Just After Midnight helped Cartier strengthen application security with Cloudflare WAF while improving resilience, scalability and delivering 24/7 managed support.
              </p>
              <Link to="/case-studies/cartier" className="cf-case-card__link">
                Read case study <span>➔</span>
              </Link>
            </div>
            <div className="cf-case-card__visual">
              <img src="/images/cloudflare/cartier.png" alt="Cartier case study" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. STEP 1: ASSESSMENT */}
      <section className="cf-section cf-step" id="consultancy" aria-label="1. Assessment">
        <div className="cf-container">
          <div className="cf-step__header">
            <span className="cf-step__num">1 ››› ASSESSMENT</span>
            <h2 className="cf-section-title">Cloudflare consultancy and strategy</h2>
          </div>

          <div className="cf-step__content">
            <p className="cf-lead-text">
              Before any configuration changes, the question is usually which parts of Cloudflare you should be running, and in what order.
            </p>
            <p className="cf-body-text">
              Our consultancy is built around a maturity assessment. We score your estate against Cloudflare’s reference architecture, then work outward from there: a prioritised roadmap, plan and cost advice, and an executive translation for the board.
            </p>
            <p className="cf-subheading-text">That means:</p>

            <div className="cf-check-grid">
              <div className="cf-check-box">
                <div className="cf-check-bullet">✓</div>
                <p>Your estate is scored across six pillars, with the gaps and risks named</p>
              </div>
              <div className="cf-check-box">
                <div className="cf-check-bullet">✓</div>
                <p>Findings are sequenced by impact, effort and cost, so quick wins are easy to separate from strategic work</p>
              </div>
              <div className="cf-check-box">
                <div className="cf-check-bullet">✓</div>
                <p>You receive a detailed plan-fit and licensing analysis, plus where egress and overage spend is reducible</p>
              </div>
              <div className="cf-check-box">
                <div className="cf-check-bullet">✓</div>
                <p>Technical findings are framed as business risk and cost, ready for the board</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. THE MATURITY MODEL */}
      <section className="cf-section cf-maturity" aria-label="The maturity model">
        <div className="cf-container">
          <div className="cf-maturity__header">
            <h2 className="cf-section-title">The maturity model</h2>
            <p className="cf-maturity__sub">
              Every pillar is scored from 1 to 5 against Cloudflare’s reference architecture, so progress is measurable and defensible to the board.
            </p>
          </div>

          <div className="cf-levels-grid">
            <div className="cf-level-card">
              <div className="cf-level-card__num">1</div>
              <h3 className="cf-level-card__title">Ad-hoc</h3>
              <p className="cf-level-card__desc">Defaults, reactive, blind spots</p>
            </div>
            <div className="cf-level-card">
              <div className="cf-level-card__num">2</div>
              <h3 className="cf-level-card__title">Developing</h3>
              <p className="cf-level-card__desc">Some controls, inconsistent</p>
            </div>
            <div className="cf-level-card">
              <div className="cf-level-card__num">3</div>
              <h3 className="cf-level-card__title">Defined</h3>
              <p className="cf-level-card__desc">Documented, broadly applied</p>
            </div>
            <div className="cf-level-card">
              <div className="cf-level-card__num">4</div>
              <h3 className="cf-level-card__title">Managed</h3>
              <p className="cf-level-card__desc">Measured, tuned, proactive</p>
            </div>
            <div className="cf-level-card">
              <div className="cf-level-card__num">5</div>
              <h3 className="cf-level-card__title">Optimised</h3>
              <p className="cf-level-card__desc">Automated, continuously improving</p>
            </div>
          </div>

          <div className="cf-pillars-row">
            <span className="cf-pillars-row__label">Scored pillars:</span>
            <div className="cf-pillars-pills">
              <span>Security</span>
              <span>Performance</span>
              <span>Reliability</span>
              <span>Cost</span>
              <span>Observability</span>
              <span>Governance</span>
            </div>
          </div>

          <div className="cf-maturity__ctas">
            <div className="cf-cta-prompt">
              <span>Ready to get started?</span>
              <a href="#consultation" className="cf-text-arrow-link">
                Request a maturity assessment ➔
              </a>
            </div>
            <div className="cf-cta-prompt">
              <span>Prefer to speak to a specialist first?</span>
              <a href="#consultation" className="cf-text-arrow-link">
                Book a consultation ➔
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. STEP 2: BUILD */}
      <section className="cf-section cf-step" id="configuration" aria-label="2. Build">
        <div className="cf-container">
          <div className="cf-step__header">
            <span className="cf-step__num">2 ››› BUILD</span>
            <h2 className="cf-section-title">Cloudflare configuration and implementation</h2>
          </div>

          <p className="cf-lead-text">
            Cloudflare is only as effective as the way it is configured. We design, build and implement your Cloudflare setup around your applications, traffic, risks and operating requirements. We do not treat it as an out-of-the-box deployment.
          </p>
          <p className="cf-body-text">
            Whether you are starting from scratch, migrating an existing setup or improving a self-serve account, we configure the platform properly, document what has been built, and give your team a clear handover.
          </p>

          <p className="cf-subheading-text">The configuration work includes:</p>

          <div className="cf-config-grid">
            <div className="cf-config-card">
              <h3 className="cf-config-card__title">Onboarding and migration</h3>
              <p className="cf-config-card__text">
                End-to-end implementation, zone setup, DNS cutover and traffic migration, planned to minimise disruption to live services.
              </p>
            </div>
            <div className="cf-config-card">
              <h3 className="cf-config-card__title">Security configuration</h3>
              <p className="cf-config-card__text">
                Design and configuration of WAF managed rulesets, custom rules, rate limiting, DDoS mitigation, bot controls and Turnstile where appropriate. Where applications handle sensitive data or personally identifiable information (PII), policies and access are aligned to it.
              </p>
            </div>
            <div className="cf-config-card">
              <h3 className="cf-config-card__title">Access configuration</h3>
              <p className="cf-config-card__text">
                Zero Trust Access and Gateway configuration, identity provider integration and device posture controls, helping employees, suppliers and third parties access only what they need.
              </p>
            </div>
            <div className="cf-config-card">
              <h3 className="cf-config-card__title">Platform governance</h3>
              <p className="cf-config-card__text">
                Operational guardrails, audit trails, rollback planning and configuration documentation, so changes are controlled, visible and safe to manage over time.
              </p>
            </div>
            <div className="cf-config-card">
              <h3 className="cf-config-card__title">Feature review and optimisation</h3>
              <p className="cf-config-card__text">
                A review of your Cloudflare estate to identify underused or misconfigured functionality, from security controls and analytics through to features such as Turnstile, Logpush, Pages and other Cloudflare capabilities where relevant.
              </p>
            </div>
            <div className="cf-config-card">
              <h3 className="cf-config-card__title">Handover and documentation</h3>
              <p className="cf-config-card__text">
                Clear documentation of what has been configured, why decisions were made and how the setup should be operated.
              </p>
            </div>
          </div>

          <div className="cf-step__cta-box">
            <a href="#consultation" className="btn-primary cf-cta-btn">
              Book a consultation <span>➔</span>
            </a>
          </div>
        </div>
      </section>

      {/* 10. STEP 3: OPERATE */}
      <section className="cf-section cf-step cf-step--operate" id="managed-services" aria-label="3. Operate">
        <div className="cf-container">
          <div className="cf-step__header">
            <span className="cf-step__num">3 ››› OPERATE</span>
            <h2 className="cf-section-title">24/7 Cloudflare managed services</h2>
          </div>

          <p className="cf-lead-text">
            Cloudflare is not something you configure once and leave alone. Traffic patterns change, threats evolve, rules drift, API tokens expire, applications move and new Cloudflare functionality becomes available.
          </p>
          <p className="cf-body-text">
            Our managed service keeps your Cloudflare estate reviewed, tuned and operationally supported over time with 24/7 service coverage, defined SLAs, escalation routes and ongoing platform administration.
          </p>
          <p className="cf-body-text">
            Day to day, that means security controls tuned to real traffic, incidents managed properly, changes governed safely, and regular reporting that keeps your Cloudflare setup visible, current and accountable.
          </p>

          <div className="cf-mssp-highlights">
            <div className="cf-mssp-item">
              <div className="cf-check-icon">✓</div>
              <div>
                <h4>Recognised Cloudflare MSSP</h4>
                <p>One of a handful of UK firms in Cloudflare’s MSSP programme for managed security</p>
              </div>
            </div>
            <div className="cf-mssp-item">
              <div className="cf-check-icon">✓</div>
              <div>
                <h4>SLA-backed support and escalation</h4>
                <p>Defined service levels, clear response paths and Cloudflare escalation when issues need partner-led support</p>
              </div>
            </div>
            <div className="cf-mssp-item">
              <div className="cf-check-icon">✓</div>
              <div>
                <h4>UK delivery</h4>
                <p>Delivered by UK-based engineers, with 24/7 operational cover when you need it</p>
              </div>
            </div>
            <div className="cf-mssp-item">
              <div className="cf-check-icon">✓</div>
              <div>
                <h4>Direct access to named specialists</h4>
                <p>Access to the people who understand your environment and no faceless ticket queue</p>
              </div>
            </div>
            <div className="cf-mssp-item">
              <div className="cf-check-icon">✓</div>
              <div>
                <h4>24/7 Slack access</h4>
                <p>Reach your account team around the clock for urgent support, updates and escalation</p>
              </div>
            </div>
            <div className="cf-mssp-item">
              <div className="cf-check-icon">✓</div>
              <div>
                <h4>No outsourcing</h4>
                <p>The people who help configure your Cloudflare estate are the people who help run and support it</p>
              </div>
            </div>
          </div>

          <div className="cf-operate-pillars-grid">
            <div className="cf-operate-card">
              <h3 className="cf-operate-card__title">Continuous optimisation</h3>
              <p className="cf-operate-card__text">
                Ongoing tuning and refinement of your Cloudflare configuration, including WAF rules, custom rules, rate limiting, DDoS mitigation, bot controls, Turnstile and traffic policies.
              </p>
            </div>
            <div className="cf-operate-card">
              <h3 className="cf-operate-card__title">Change and governance</h3>
              <p className="cf-operate-card__text">
                Cloudflare environments change over time. We help manage that change through platform governance, documented change control, audit trails, rollback planning and drift checks.
              </p>
            </div>
            <div className="cf-operate-card">
              <h3 className="cf-operate-card__title">Observability and incident response</h3>
              <p className="cf-operate-card__text">
                Our 24/7 service reviews security events, traffic anomalies, alerts and performance signals so issues can be triaged, escalated and resolved through a defined process. We support Logpush and SIEM integration, analytics views, alerting, incident runbooks, escalation paths and direct Cloudflare escalation.
              </p>
            </div>
            <div className="cf-operate-card">
              <h3 className="cf-operate-card__title">Service reporting and ongoing review</h3>
              <p className="cf-operate-card__text">
                Monthly or quarterly reporting on trends and improvements, with usage reviewed to reduce egress and overage where configuration allows. You know exactly what has changed, what has been reviewed and where improvements are being made.
              </p>
            </div>
          </div>

          <div className="cf-quote-box">
            <p className="cf-quote-box__quote">
              “JAM turned our Cloudflare estate from a cost centre into a measurable advantage. We finally know what we own and how to use it.”
            </p>
            <p className="cf-quote-box__author">
              Platform Engineering Lead, Bensussen Deutsch &amp; Associates
            </p>
          </div>
        </div>
      </section>

      {/* 11. COMPARE SERVICES TABLE */}
      <section className="cf-section cf-compare" aria-label="Compare Cloudflare services">
        <div className="cf-container">
          <div className="cf-compare__header">
            <span className="cf-eyebrow">COMPARE SERVICES</span>
            <h2 className="cf-section-title">Choose the right level of Cloudflare support</h2>
            <p className="cf-compare__sub">
              Whether you need a one-off assessment, a fixed-scope implementation or a fully managed service, we can meet you where you are.
            </p>
          </div>

          <div className="cf-table-wrap">
            <table className="cf-table">
              <thead>
                <tr>
                  <th className="cf-th-feature">Feature / Service</th>
                  <th className="cf-th-tier">
                    <span className="cf-tier-num">01</span>
                    <span className="cf-tier-name">Consultancy &amp; strategy</span>
                    <span className="cf-tier-sub">Plan your Cloudflare roadmap</span>
                  </th>
                  <th className="cf-th-tier">
                    <span className="cf-tier-num">02</span>
                    <span className="cf-tier-name">Configuration &amp; build</span>
                    <span className="cf-tier-sub">Deliver your Cloudflare project</span>
                  </th>
                  <th className="cf-th-tier cf-th-tier--highlight">
                    <span className="cf-tier-num">03</span>
                    <span className="cf-tier-name">Managed &amp; 24/7 support</span>
                    <span className="cf-tier-sub">Run and optimise Cloudflare 24/7</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className={row.isHeader ? "cf-tr-header" : ""}>
                    <td className="cf-td-feature">{row.feature}</td>
                    <td className={`cf-td-val ${row.c1 === "✓" ? "is-checked" : ""}`}>{row.c1}</td>
                    <td className={`cf-td-val ${row.c2 === "✓" ? "is-checked" : ""}`}>{row.c2}</td>
                    <td className={`cf-td-val cf-td-val--highlight ${row.c3 === "✓" ? "is-checked" : ""}`}>{row.c3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cf-compare__footer">
            <a href="#consultation" className="btn-primary cf-cta-btn">
              Book a Cloudflare consultation <span>➔</span>
            </a>
          </div>
        </div>
      </section>

      {/* 12. WE WORK BEST WITH */}
      <section className="cf-section cf-fit" aria-label="We work best with organisations that">
        <div className="cf-container">
          <div className="cf-fit__header">
            <h2 className="cf-section-title">We work best with organisations that…</h2>
          </div>

          <div className="cf-fit__grid">
            <div className="cf-fit-card">
              <h3 className="cf-fit-card__title">…operate across time zones</h3>
              <p className="cf-fit-card__desc">
                Global brands with distributed teams who need genuine 24/7 coverage. Not a ticket queue that opens at 9am GMT.
              </p>
            </div>
            <div className="cf-fit-card">
              <h3 className="cf-fit-card__title">…treat uptime as revenue</h3>
              <p className="cf-fit-card__desc">
                SaaS platforms, digital commerce and businesses where an hour of downtime has a number attached to it.
              </p>
            </div>
            <div className="cf-fit-card">
              <h3 className="cf-fit-card__title">…answer to regulators</h3>
              <p className="cf-fit-card__desc">
                Financial services, healthcare and other sectors where security posture, audit trails and contractual accountability aren’t optional.
              </p>
            </div>
            <div className="cf-fit-card">
              <h3 className="cf-fit-card__title">…have outgrown self-serve Cloudflare</h3>
              <p className="cf-fit-card__desc">
                You’re past the point where your team can manage Cloudflare alongside everything else, but full Enterprise feels like more than you need right now.
              </p>
            </div>
            <div className="cf-fit-card">
              <h3 className="cf-fit-card__title">…need one team to own the full picture</h3>
              <p className="cf-fit-card__desc">
                You have Cloudflare, a hosting provider and an internal team – and when something breaks, everyone looks at each other.
              </p>
            </div>
            <div className="cf-fit-card">
              <h3 className="cf-fit-card__title">…want real engineers on the job</h3>
              <p className="cf-fit-card__desc">
                You’ve tried monitoring tools. What you actually want is a human who knows your environment and can act on it. So do we, frankly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 13. PREFER TO DISCUSS YOUR ENVIRONMENT INSTEAD? (BOOKING) */}
      <section className="cf-section cf-booking" id="consultation" aria-label="Book a consultation">
        <div className="cf-container">
          <div className="cf-booking__header">
            <span className="cf-eyebrow">Talk to us</span>
            <h2 className="cf-section-title">Prefer to discuss your environment instead?</h2>
            <p className="cf-booking__sub">Grab 15 or 30 minutes with one of our specialists.</p>
          </div>

          <div className="cf-booking__widget-box">
            <BookingWidget context="Cloudflare Managed Services" />
          </div>
        </div>
      </section>

      {/* 14. CLOUDFLARE FAQ */}
      <section className="cf-section cf-faq" aria-label="Frequently Asked Questions">
        <div className="cf-container">
          <div className="cf-faq__header">
            <div className="cf-faq__header-text">
              <span className="cf-eyebrow">Cloudflare FAQ</span>
              <h2 className="cf-section-title">Frequently Asked Questions</h2>
            </div>
            <div className="cf-faq__rocket-img" aria-hidden="true">
              <img src="/images/cloudflare/rocket.webp" alt="" />
            </div>
          </div>

          <div className="cf-faq__list">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div className={`cf-faq-item ${isOpen ? "is-open" : ""}`} key={idx}>
                  <button
                    type="button"
                    className="cf-faq-item__btn"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={String(isOpen)}
                  >
                    <span className="cf-faq-item__q">{faq.q}</span>
                    <span className="cf-faq-item__icon" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="cf-faq-item__body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
