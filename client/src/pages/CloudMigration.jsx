import { useApi } from "../lib/api";
import { useTitle } from "../lib/useReveal";
import InsightsBand from "../components/InsightsBand";
import ReviewsBand from "../components/ReviewsBand";

const TICKS = [
  "AWS Advanced Partner with experience across on-premises, cloud-to-cloud and refactoring migrations",
  "A proven framework: discovery, design, delivery and ongoing management",
  "Fixed-cost set-up and management – no incentive to increase the size of your environment",
  "24/7 application support from day one, with guaranteed SLAs for P1 and P2 incidents",
];

const ADD_VALUE = [
  "Moving the right resources to cloud efficiently and with minimal disruption",
  "Refactoring previous migrations into environments that deliver on the actual benefits of cloud",
];

const STAGES = [
  {
    lead: "Discovery:",
    text: "We review your existing infrastructure from a security, data and technical perspective. We assess current performance, identify legacy challenges and consult on what we find.",
  },
  {
    lead: "Design:",
    text: "We work through iterations until we arrive at a solution that is both technically sound and operationally simple.",
  },
  {
    lead: "Delivery:",
    text: "Procurement, provisioning, hardening, system optimisation, data migration and compatibility testing, followed by a final environment that is ready to run.",
  },
  {
    lead: "On-going management and 24/7 support:",
    text: "After delivery, we can provide ongoing management and 24/7 support across your cloud architecture and applications.",
  },
];

const CLIENTS = ["Fujitsu General Australia", "Abbott", "McCarthy & Stone", "Natural World Safaris", "Emperor", "HC One"];

const RESULTS = ["Zero downtime during migration", "Uptime improved to 99.99%+", "Security breaches reduced to zero incidents", "45% cost reduction"];

const BEYOND = [
  {
    icon: "/icons/cm-icon-assessment.png",
    iconW: 129,
    iconH: 77,
    title: "Assessment and planning",
    text: "From audits and reviews through to full design and provisioning of your AWS environment. We develop an understanding of your setup and work with you to plan what comes next.",
  },
  {
    icon: "/icons/cm-icon-security.png",
    iconW: 80,
    iconH: 94,
    title: "Security",
    text: "Security requirements are easier to design in than retrofit. JAM holds ISO 27001 and Cyber Essentials Plus certification. We make sure your migrated environment meets them from the start.",
  },
  {
    icon: "/icons/cm-icon-optimisation.png",
    iconW: 80,
    iconH: 82,
    title: "Optimisation",
    text: "Migration is an opportunity to rightsize. We identify what your investment is and is not doing for you, and make the adjustments before suboptimal patterns become entrenched.",
  },
  {
    icon: "/icons/cm-icon-observability.webp",
    iconW: 80,
    iconH: 80,
    title: "Observability",
    text: "You cannot manage what you cannot see. We establish an observability foundation during migration: monitoring the features and functions that drive key business outcomes before they're needed in production.",
  },
  {
    icon: "/icons/cm-icon-support.webp",
    iconW: 80,
    iconH: 80,
    title: "24/7 Support",
    text: "Application-level 24/7 support with guaranteed SLAs for P1 and P2 incidents. Available from day one of your migrated environment. Staffed by engineers with an understanding of your application.",
  },
];

const WHY = [
  {
    icon: "/icons/cm-why-cost.svg",
    title: "Reduced time and cost",
    text: "We help you maximise the value of your cloud investment with efficient migration planning, cost-conscious architecture and expert delivery from start to finish.",
  },
  {
    icon: "/icons/cm-why-reliability.svg",
    title: "Build for reliability",
    text: "High availability, resilience and fault tolerance should be built in from day one, helping you protect performance, customer experience and brand reputation.",
  },
  {
    icon: "/icons/cm-why-experts.svg",
    title: "Trusted, straight-talking experts",
    text: "We believe in clear communication, practical advice and honest recommendations, giving you the confidence to make the right decisions at every stage.",
  },
  {
    icon: "/icons/cm-why-sleep.svg",
    title: "Sleep easy with 24/7 support",
    text: "Once your migration is complete, our team is on hand around the clock with real engineers providing expert support whenever it matters most.",
  },
  {
    icon: "/icons/cm-why-security.svg",
    title: "Secure by design",
    text: "We build to meet current security standards: ISO 27001, Cyber Essentials Plus and PCI DSS compliance where required. Security is a design requirement (not a post-migration remediation task).",
  },
  {
    icon: "/icons/cm-why-assessment.svg",
    title: "Start with an assessment",
    text: "Contact our team to book a discovery call and initial assessment at no additional cost.",
  },
];

const REVIEWS = [
  {
    slug: "banyan-tree",
    client: "Banyan Tree",
    role: "Head, Information Technology",
    quote: "Quick and fast support and consulting on the overall web, DevOps and hosting needs. Very helpful as always.",
    companyUrl: "https://www.banyantree.com/",
    to: "https://www.justaftermidnight247.com/case-study/bristol-myers-squibb/",
  },
  {
    slug: "dla-piper",
    client: "DLA Piper",
    role: "CEO",
    quote: "I would not hesitate to recommend JAM based on the service they have provided to us. They have been very responsive and have done so in a positive and professional fashion. The team clearly have a thorough knowledge of Sitecore and AWS and have been able to explain things to us in language we can understand.",
    companyUrl: "https://www.dlapiper.com/en",
    to: "https://www.justaftermidnight247.com/case-study/dla-piper/",
  },
  {
    slug: "emperor",
    client: "Emperor",
    role: "Technical Director",
    quote: "Just After Midnight (JAM) has been providing us with 24/7/365 setup and support services to deliver the many financial reporting websites that we deliver each year. We count them as one of our critical trusted partners.",
    companyUrl: "https://emperor.works/",
    to: "https://www.justaftermidnight247.com/case-study/emperor/",
  },
  {
    slug: "rooftop-film-club",
    client: "Rooftop Film Club",
    role: "Product Manager",
    quote: "JAM’s excellent first-line service means no more late-night wake-up calls – responding to our clients and resolving issues any hour of the day.",
    companyUrl: "https://rooftopfilmclub.com/",
    to: "https://www.justaftermidnight247.com/case-study/rooftop-film-club/",
  },
  {
    slug: "sainsburys-bank",
    client: "Sainsbury's Bank",
    role: "Senior Manager",
    quote: "It makes a massive difference to us to have someone available for all of our global markets. We’re really happy to have you on our team.",
    companyUrl: "https://www.sainsburysbank.co.uk/",
    to: "https://www.justaftermidnight247.com/case-study/acara/",
  },
  {
    slug: "the-body-coach",
    client: "The Body Coach",
    role: "CEO",
    quote: "We want our users to be able to work out at a time that suits them, day or night. I can sleep easy knowing that Just After Midnight’s team of experts are taking care of any issues with the app, so I can focus on what I do best.",
    companyUrl: "https://www.thebodycoach.com/",
    to: "https://www.justaftermidnight247.com/case-study/the-body-coach-app/",
  },
];

function DividerUp({ fill }) {
  return (
    <div className="global-curved-divider" aria-hidden="true">
      <svg width="1920" height="73" viewBox="0 0 1920 73" fill="none" preserveAspectRatio="none">
        <path d="M1920 72.9999L0 73.0012L3.42974e-06 33.7695L169.182 16.1465C375.835 -5.37986 584.165 -5.37991 790.818 16.1465L1129.18 51.3927C1335.83 72.9191 1544.16 72.9191 1750.82 51.3928L1920 33.7697L1920 72.9999Z" fill={fill} />
      </svg>
    </div>
  );
}

function DividerDown({ fill }) {
  return (
    <div className="global-curved-divider" aria-hidden="true">
      <svg width="1920" height="89" viewBox="0 0 1920 89" fill="none" preserveAspectRatio="none">
        <path d="M0 0H915.5H1920V55L1750.82 72.623C1544.17 94.1494 1335.83 94.1495 1129.18 72.6231L790.818 37.377C584.165 15.8506 375.835 15.8505 169.182 37.3769L0 55V0Z" fill={fill} />
      </svg>
    </div>
  );
}

export default function CloudMigration() {
  useTitle("Cloud Migration Services | Just After Midnight");
  const { data: articles } = useApi("/api/articles");

  return (
    <>
      <section className="cloud-hero cloud-hero--photo cm-hero" aria-labelledby="cm-title">
        <div className="cost-container">
          <div className="cloud-hero__text reveal">
            <h1 id="cm-title">Cloud Migration Services</h1>
            <p className="cloud-hero__sub">Move your infrastructure, applications and data to the cloud. Clear strategy, sound architecture, expert delivery.</p>
            <a href="#site-footer" className="btn btn-primary">Book a discovery call ➔</a>
          </div>
        </div>
      </section>

      <section className="cm-intro" aria-labelledby="cm-intro-title">
        <div className="cost-container">
          <h2 className="cm-intro__title reveal" id="cm-intro-title">What cloud migration done properly looks like</h2>
          <div className="cm-intro__grid">
            <div className="cm-intro__lead reveal">
              <p>If you’re migrating to cloud for the first time, moving additional workloads or refactoring an existing cloud environment, the difference between a smooth migration and a disruptive one is usually preparation and experience.</p>
              <p>JAM holds AWS Advanced Partner status and operates across all major cloud platforms, including Azure and Google Cloud Platform. Our engineers have carried out migrations for global manufacturers, SaaS businesses and enterprises. We audit, design and implement, and we’re accountable for the outcome.</p>
            </div>
            <span className="cm-intro__rule" aria-hidden="true" />
            <ul className="cm-intro__points reveal">
              {TICKS.map((point) => (
                <li key={point}>
                  <img src="/icons/cm-tick.svg" alt="" width="24" height="24" loading="lazy" decoding="async" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <DividerUp fill="#121f3f" />

      <section className="cm-navy" aria-labelledby="cm-navy-title">
        <div className="cost-container">
          <h2 className="cm-navy__title reveal" id="cm-navy-title">Migrating your resources to the cloud</h2>
          <div className="cm-navy__grid">
            <div className="cm-navy__col reveal">
              <p>A migration that replicates your existing infrastructure is not a migration. It’s a more expensive version of the problem you already had.</p>
              <p>Many organisations find this out after the fact: the move is made, the costs increase, and the limitations of the previous environment follow them to the cloud.</p>
              <h3>Where we add value</h3>
              <p>We specialise in two things:</p>
              <ul>
                {ADD_VALUE.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <h3>Application specialists</h3>
              <p>Our engineers hold both infrastructure and application certifications. This allows us to design solutions that account for your entire digital estate. Not just the infrastructure layer. In fact, we specialise in migrating business-critical, customer-facing applications.</p>
              <h3>Proven framework</h3>
              <p>Our migration framework has been developed and tested across on-premises to cloud migrations, cloud-to-cloud migrations and refactoring projects. Consulting, auditing, solution design, provisioning and ongoing management: carried out in a sequence that reduces risk at each stage.</p>
              <h3>Cost optimisation</h3>
              <p>We regularly reduce migration costs by 30% or more. In one recent engagement with a global manufacturer, we drove costs down by 45%. We offer fixed-cost set-up and management, so we have no incentive to increase the size or cost of your environment.</p>
            </div>
            <span className="cm-navy__rule" aria-hidden="true" />
            <div className="cm-navy__col reveal">
              <h3>How it works</h3>
              <p>Our framework for migrations consists of four stages:</p>
              <ul>
                {STAGES.map((stage) => (
                  <li key={stage.lead}><strong>{stage.lead}</strong> {stage.text}</li>
                ))}
              </ul>
              <p>We have carried out migrations for prestigious companies such as:</p>
              <ul>
                {CLIENTS.map((client) => <li key={client}>{client}</li>)}
              </ul>
              <p>With results like:</p>
              <ul>
                {RESULTS.map((result) => <li key={result}>{result}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <DividerDown fill="#163576" />

      <section className="cm-grid" aria-labelledby="cm-beyond-title">
        <div className="cost-container">
          <div className="cm-grid__intro reveal">
            <h2 id="cm-beyond-title">Beyond the migration</h2>
          </div>
          <div className="cm-grid__cards">
            {BEYOND.map((card) => (
              <article className="cm-card reveal" key={card.title}>
                <img src={card.icon} alt="" width={card.iconW} height={card.iconH} loading="lazy" decoding="async" />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
            <article className="cm-card cm-card--cta reveal">
              <h3>Need something else?</h3>
              <p>Cloud migrations rarely follow a standard pattern. If yours is more involved, we’d be glad to find out how. Contact our engineering team.</p>
              <a href="#site-footer" className="btn">Book a discovery call ➔</a>
            </article>
          </div>
        </div>
      </section>

      <ReviewsBand reviews={REVIEWS} />

      <DividerUp fill="#12203f" />

      <section className="cm-why" aria-labelledby="cm-why-title">
        <div className="cm-why__outer">
          <div className="cost-container">
            <div className="cm-why__intro reveal">
              <h2 id="cm-why-title">Why Just After Midnight?</h2>
            </div>
            <div className="cm-why__grid">
              {WHY.map((card) => (
                <article className="cm-card cm-card--why reveal" key={card.title}>
                  <img src={card.icon} alt="" width="80" height="80" loading="lazy" decoding="async" />
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <InsightsBand
        title="Latest Insights from JAM"
        cta="See more articles"
        to="/insights"
        articles={articles || []}
      />
    </>
  );
}
