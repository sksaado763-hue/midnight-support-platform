import { useApi } from "../lib/api";
import { useTitle } from "../lib/useReveal";
import InsightsBand from "../components/InsightsBand";
import ReviewsBand from "../components/ReviewsBand";

/* Replica of /devops-delivery-services/: navy hero on the SaaS grid photo,
   white split intro with the moon list, a six-card icon grid, the grey
   "biggest difference" split with the tick list, the navy four-step method,
   the shared reviews slider, the four-shield why grid and the insights band. */

const INTRO_POINTS = [
  "Faster, safer releases through modern CI/CD pipelines and automated testing",
  "Infrastructure that builds itself with IaC and orchestration",
  "Cloud environments engineered for performance across AWS, Azure & GCP",
  "Out-of-hours engineering cover for deployments, rollbacks and urgent fixes",
  "A partner who plugs into your unique workflow",
];

const CARDS = [
  {
    icon: "/icons/dd-icon-optimisation.png",
    title: "Build & own your CI/CD pipelines (so you don’t have to)",
    text: "We design and implement CI/CD pipelines that automate the entire development cycle, code commit to production deployment. This includes code integration, automated testing, continuous monitoring and reliable deployments across AWS, Azure and Google Cloud.",
  },
  {
    icon: "/icons/dd-icon-web.webp",
    title: "Automate deployments across all environments",
    text: "Whether you’re dealing with complex staging environments, multi-service architectures or sensitive production environments, we create automated workflows that handle deployment processes with fewer bugs, fewer failures and far less manual effort.",
  },
  {
    icon: "/icons/dd-icon-monitoring.webp",
    title: "Improve your software delivery lifecycle",
    text: "We optimise your software development lifecycle and software delivery lifecycle by removing bottlenecks, improving pipeline performance and building a repeatable deployment process your teams can trust.",
  },
  {
    icon: "/icons/dd-icon-cog.png",
    title: "Deliver continuous testing & test automation",
    text: "From unit tests and integration tests to performance tests and security practices, we automate testing so issues are caught early and software quality is consistently high.",
  },
  {
    icon: "/icons/dd-icon-cloud.webp",
    title: "Establish resilient cloud infrastructure for delivery",
    text: "We work with all major cloud platforms, including AWS services and Google Cloud, to build scalable solutions, load balancing strategies and container registry workflows that keep delivery predictable and stable.",
  },
  {
    icon: "/icons/dd-icon-web.webp",
    title: "Help dev and ops teams collaborate like a single team",
    text: "DevOps delivery is as much about culture as infrastructure. We foster collaboration using the right collaboration tools, branching strategies and shared delivery pipelines, creating a collaborative framework where development and operations teams actually work together.",
  },
];

const DIFFERENCES = [
  {
    title: "Replacing manual processes with reliable automation",
    text: "Manual effort slows everything down. We automate deployments, testing, configuration management and environments to reduce risk and accelerate delivery.",
  },
  {
    title: "Increasing deployment frequency safely",
    text: "You ship new code more often without sacrificing quality thanks to CI/CD, automated workflows and continuous delivery that automates the riskiest steps.",
  },
  {
    title: "Strengthening operational efficiency",
    text: "Streamlined DevOps processes improve the entire development lifecycle and create more consistent delivery at every stage.",
  },
  {
    title: "Delivering high-quality releases with fewer bugs",
    text: "Continuous integration and continuous testing ensure issues are caught long before production.",
  },
  {
    title: "Achieving a competitive edge through speed",
    text: "When reliable releases become the norm, you deliver new features faster. This means you also outpace slower competitors stuck in the manual world.",
  },
];

const INCLUDED = [
  "CI/CD pipeline engineering design, to build and optimisation of delivery pipelines for consistent delivery",
  "Automated deployment workflows, for deploying applications across cloud platforms and environments without manual processes",
  "Infrastructure & environment setup, including staging, production and ephemeral environment management for scalable software development",
  "Automated testing across all phases: functional, integration, security and performance testing",
  "Continuous monitoring & performance metrics to track system behaviour to detect issues early",
  "Configuration management, including automating configuration across multiple servers, apps and cloud provider environments",
  "Security practices built into the pipeline: security scanning, compliance checks and vulnerability detection baked into the delivery process",
  "Container-oriented delivery, including container orchestration, container registry management and automated container-based deployments",
];

const STEPS = [
  {
    title: "1. Assess & understand your delivery challenges",
    text: "We begin by reviewing your current development process, delivery pipelines, tools, version control setup, release cycles and pain points.",
  },
  {
    title: "2. Define the delivery strategy",
    text: "We design a DevOps implementation plan tailored to your dev and ops teams, focusing on performance, reliability and cost efficiency.",
  },
  {
    title: "3. Build the automation & delivery framework",
    text: "We implement CI/CD pipelines, automated deployment processes, test automation and cloud infrastructure needed for reliable releases.",
  },
  {
    title: "4. Optimise & improve continuously",
    text: "We continue refining pipeline performance, improving deployment frequency and removing inefficiencies as your product evolves.",
  },
];

const WHY = [
  {
    icon: "/icons/azure-superhero-shield-80x80-svg.svg",
    title: "Engineers who don’t flinch at complex delivery pipelines",
    text: "We’ve worked with production environments for global brands. Nothing surprises us.",
  },
  {
    icon: "/icons/azure-superhero-shield-80x80-svg.svg",
    title: "Delivery that integrates seamlessly with your workflow",
    text: "We won’t replace what works. We enhance it, automate it and make it faster.",
  },
  {
    icon: "/icons/azure-superhero-shield-80x80-svg.svg",
    title: "Always-on support for critical releases",
    text: "Late-night deployments? Hotfixes? Production emergencies? Our follow-the-sun model keeps your delivery cycle covered 24/7.",
  },
  {
    icon: "/icons/azure-superhero-shield-80x80-svg.svg",
    title: "A partner invested in your long-term success",
    text: "We don’t just build pipelines. We want to build a long-term delivery capability that gives you a competitive edge.",
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
    client: "Sainsbury’s Bank",
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

export default function DevOpsDelivery() {
  useTitle("DevOps Delivery Services | Just After Midnight");
  const { data: articles } = useApi("/api/articles");

  return (
    <>
      <section className="cloud-hero dd-hero" aria-labelledby="dd-title">
        <div className="cost-container">
          <div className="cloud-hero__text reveal">
            <h1 id="dd-title">DevOps Delivery Services</h1>
            <p className="dd-hero__sub">Reliable deployments, faster release cycles and real engineers on hand to make your delivery pipelines work</p>
            <a href="#site-footer" className="btn btn-primary">Get in touch</a>
          </div>
        </div>
      </section>

      <section className="cost-intro dd-intro" aria-labelledby="dd-intro-title">
        <div className="cost-container">
          <div className="cost-intro__split">
            <div className="cost-intro__lead reveal">
              <h2 id="dd-intro-title">Hands-on DevOps delivery for teams that need to move faster</h2>
              <p>When you’re juggling code changes, staging environments, production deployments and ambitious release cycles, the last thing you need is manual processes slowing everyone down.</p>
              <p>DevOps delivery is how development and operations teams finally get on the same page: automating processes, improving reliability and building a consistent delivery pipeline that scales with you.</p>
              <p>We work directly with your development teams and operations teams to implement DevOps practices that improve software delivery end to end: continuous integration, continuous testing, continuous deployment and continuous delivery. In short: everything needed for reliable software delivery that won’t wake you up at night.</p>
              <p>Our engineers plug into your existing workflows, tools and cloud infrastructure, bringing hands-on support, automation and the collaborative environment needed for high quality software to ship on time.</p>
            </div>
            <span className="seo-intro-rule cost-intro__rule" aria-hidden="true" />
            <div className="cost-intro__points reveal">
              <h4>What our DevOps team delivers:</h4>
              <ul className="seo-intro-points seo-intro-points--marked cost-moon-list">
                {INTRO_POINTS.map((point) => (
                  <li key={point}>
                    <img className="seo-intro-mark" src="/icons/moon-list.svg" alt="" width="25" height="27" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="dd-grid" aria-labelledby="dd-grid-title">
        <div className="cost-container">
          <div className="dd-grid__intro reveal">
            <h2 id="dd-grid-title">What can our DevOps delivery team do for you?</h2>
          </div>
          <div className="dd-grid__cards">
            {CARDS.map((card) => (
              <article className="dd-grid__card reveal" key={card.title}>
                <img src={card.icon} alt="" width="80" height="80" loading="lazy" decoding="async" />
                <h3>
                  {card.title}
                  <span className="dd-card-rule" aria-hidden="true" />
                </h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <DividerUp fill="#efefef" />

      <section className="dd-diff" aria-labelledby="dd-diff-title">
        <div className="cost-container">
          <div className="dd-diff__head reveal">
            <h2 id="dd-diff-title">Where does DevOps delivery make the biggest difference?</h2>
          </div>
          <div className="dd-diff__split">
            <div className="dd-diff__col reveal">
              {DIFFERENCES.map((item) => (
                <div className="dd-diff__item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <span className="seo-intro-rule dd-diff__rule" aria-hidden="true" />
            <div className="dd-diff__col dd-diff__col--list reveal">
              <h3>What’s included in our DevOps delivery service?</h3>
              <ul className="seo-intro-points seo-intro-points--marked dd-list">
                {INCLUDED.map((item) => (
                  <li key={item}>
                    <img className="seo-intro-mark" src="/icons/dd-tick.svg" alt="" width="25" height="25" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="dd-divider--navy"><DividerDown fill="#efefef" /></div>

      <section className="dd-steps" aria-labelledby="dd-steps-title">
        <div className="cost-container">
          <div className="dd-steps__head reveal">
            <img src="/icons/dd-target.png" alt="" width="80" height="80" loading="lazy" decoding="async" />
            <h2 id="dd-steps-title">How we work with you</h2>
          </div>
          <div className="dd-steps__grid">
            <div className="dd-steps__col reveal">
              {STEPS.slice(0, 2).map((step) => (
                <div className="dd-step" key={step.title}>
                  <h3>{step.title}</h3>
                  <span className="dd-step__rule" aria-hidden="true" />
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
            <span className="seo-intro-rule dd-steps__rule" aria-hidden="true" />
            <div className="dd-steps__col reveal">
              {STEPS.slice(2).map((step) => (
                <div className="dd-step" key={step.title}>
                  <h3>{step.title}</h3>
                  <span className="dd-step__rule" aria-hidden="true" />
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="dd-divider--navy"><DividerUp fill="#ffffff" /></div>

      <ReviewsBand reviews={REVIEWS} />

      <section className="cost-why dd-why" aria-labelledby="dd-why-title">
        <div className="cost-why__outer">
          <div className="cost-container">
            <h2 className="cost-why__title" id="dd-why-title">Why Just After Midnight?</h2>
            <div className="cost-why__grid">
              {WHY.map((reason) => (
                <article className="cost-why__card reveal" key={reason.title}>
                  <img src={reason.icon} width="80" height="80" alt="" loading="lazy" decoding="async" />
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <InsightsBand title="You may also be interested in" articles={articles || []} />
    </>
  );
}
