import { Link } from "react-router-dom";
import { useApi } from "../lib/api";
import { useTitle } from "../lib/useReveal";
import InsightsBand from "../components/InsightsBand";
import ReviewsBand from "../components/ReviewsBand";

const HERO_LOGOS = [
  "/icons/sa-logo-alibaba1.png",
  "/icons/sa-logo-gcp.png",
  "/icons/sa-logo-azure.png",
  "/icons/sa-logo-aws.png",
  "/icons/sa-logo-alibaba.png",
];

const PROVIDES = [
  "Strategic, goal-led cloud architecture design services",
  "Experience working with in-house teams and agencies",
  "Composable, MACH, and decoupled solutions built for flexibility",
];

const BADGES = [
  "/icons/sa-badge-aws.webp",
  "/icons/sa-badge-ms.png",
  "/icons/sa-badge-gcp.png",
];

const CHALLENGES = [
  {
    icon: "/icons/sa-icon-cost.png",
    title: "Cloud cost optimisation",
    text: "In the current market, clients want to cut the cost of their cloud resources. We help them do it without compromising performance.",
  },
  {
    icon: "/icons/sa-icon-security.png",
    title: "Cloud security & compliance",
    text: "With increased regulations, higher attack rates and hybrid complexity, secure cloud architecture is more important than ever.",
  },
  {
    icon: "/icons/sa-icon-devops.png",
    title: "DevOps & time-to-market",
    text: "Need to ship faster? We help partners meet their feature release goals and stay competitive by building agile, efficient cloud architectures.",
  },
  {
    icon: "/icons/sa-icon-web.png",
    title: "Legacy system issues",
    text: "Many partners find their legacy systems holding them back. We modernise infrastructure to unlock innovation and solve compliance challenges.",
  },
  {
    icon: "/icons/sa-icon-monitoring.png",
    title: "Scalability",
    text: "Whether you’re growing fast or planning ahead, we deliver cloud-native applications that can meet modern scalability standards through cutting-edge design.",
  },
];

const DIFFERENTIATORS = [
  {
    title: "Our strategy-first approach",
    text: "Your business goals guide everything we do. Where some partners present the same tools and solutions to every problem, we combine business strategy with cloud expertise. Our cloud architecture services are delivered in tandem with a cross-disciplinary review, turning your goals into KPIs, and those KPIs into a long-term strategy that extends beyond initial solution build.",
    question: "But what good is strategy without execution?",
    media: "/icons/sa-gif2.gif",
  },
  {
    title: "Cloud-native engineering skillset",
    text: "From Google Cloud to Microsoft Azure and AWS, our engineers’ skill sets evolve at the pace of innovation. We deliver tailored solutions leveraging best practices in composable architectures, zero trust security, FinOps, DevSecOps and more. We ensure our toolkit stays in line with the most market-competitive solutions.",
    question: "And what happens after go-live?",
    media: "/icons/sa-gif1.gif",
  },
  {
    title: "Continuous improvement beyond go-live",
    text: "Where some partners see a new cloud environment as a completed product, we see it as day one in an ongoing, iterative process. The KPIs and concerns identified in your strategy set the agenda for ongoing optimisation which is consistently reviewed and reported on. Digital transformation doesn’t have an end date.",
    question: "Ready to see what this could look like for you?",
    media: "/icons/sa-gif3.gif",
  },
];

const STEPS = [
  {
    title: "1. Discovery workshop",
    text: "We start with a discovery workshop to map your 6- to 12-month priorities and define clear success metrics (KPIs). When you sign off, we know we’re solving the right problems.",
  },
  {
    title: "2. Tailored action plan",
    text: "Next, we build a tailored action plan, whether that’s cost optimisation, modernisation or new capabilities, and rank the work that will deliver the biggest impact first.",
  },
  {
    title: "3. Living technical roadmap",
    text: "Together, we translate that plan into a living roadmap that links every initiative to a business outcome and a clear owner.",
  },
  {
    title: "4. Phase one execution",
    text: "We break work into sprints with defined milestones, agreeing which goals go into the first engagement phase and that timelines are reliable and realistic.",
  },
  {
    title: "5. Time-bound sprint delivery",
    text: "Work is broken into manageable sprints with clear checkpoints, so progress is visible and momentum never slips.",
  },
  {
    title: "6. Review and iterate",
    text: "Our engineers deliver the sprint goals, designing, automating, and deploying cloud improvements, while you stay in the loop through regular reviews.",
  },
  {
    title: "7. Measurable results",
    text: "When each milestone closes, we measure results against the KPIs defined in Step 1, turning data into proof of value.",
  },
  {
    title: "8. Ongoing innovation",
    text: "Every month, we meet to surface new opportunities, tune performance and plan the next sprint, keeping your cloud environment evolving as fast as your business.",
  },
];

const CASES = [
  {
    client: "Challenger",
    image: "/icons/sa-case-challenger.png",
    text: "2 phase AWS infrastructure solution for Singapore’s premier consumer electronics chain.",
    to: "https://www.justaftermidnight247.com/case-study/challenger/",
  },
  {
    client: "Equatorial Marine Fuel Logistics Company (EMF)",
    image: "/icons/sa-case-emf.jpg",
    text: "Infrastructure build, migration, and 24/7 support for major player in the bunkering industry.",
    to: "https://www.justaftermidnight247.com/case-study/equatorial-marine-fuel-logistics-company-emf/",
  },
  {
    client: "ST Telemedia Global Data Centres",
    image: "/icons/sa-case-stt.png",
    text: "Building new AWS infrastructure for Singapore’s fastest-growing data centre provider.",
    to: "https://www.justaftermidnight247.com/case-study/st-telemedia-global-data-centres/",
  },
  {
    client: "HC-One",
    image: "/icons/sa-case-hc.png",
    text: "Keeping a national care provider’s digital services fast, stable and always available",
    to: "https://www.justaftermidnight247.com/case-study/hc-one/",
  },
];

const SERVICES = [
  {
    icon: "/icons/sa-icon-partner.png",
    title: "Cloud Consulting Services",
    text: "Advice on cloud adoption, architecture for an existing app or how to match the cloud service provider to your needs.",
    to: "https://www.justaftermidnight247.com/cloud/cloud-consulting/",
  },
  {
    icon: "/icons/sa-icon-migration.png",
    title: "Cloud Migration Services",
    text: "Moving to the cloud for the first time? Switching providers? We’ll handle the whole journey.",
    to: "/cloud/cloud-migration",
  },
  {
    icon: "/icons/sa-icon-devops-1.png",
    title: "DevOps Services",
    text: "From DaaS to strategic DevOps consulting services, we help you level up release velocity and reliability.",
    to: "https://www.justaftermidnight247.com/devops-consulting-services-solutions/",
  },
];

function DividerUp() {
  return (
    <div className="global-curved-divider sa-divider" aria-hidden="true">
      <svg width="1920" height="73" viewBox="0 0 1920 73" fill="none" preserveAspectRatio="none">
        <path d="M1920 72.9999L0 73.0012L3.42974e-06 33.7695L169.182 16.1465C375.835 -5.37986 584.165 -5.37991 790.818 16.1465L1129.18 51.3927C1335.83 72.9191 1544.16 72.9191 1750.82 51.3928L1920 33.7697L1920 72.9999Z" fill="#12203f" />
      </svg>
    </div>
  );
}

function DividerDown() {
  return (
    <div className="global-curved-divider sa-divider" aria-hidden="true">
      <svg width="1920" height="89" viewBox="0 0 1920 89" fill="none" preserveAspectRatio="none">
        <path d="M0 0H915.5H1920V55L1750.82 72.623C1544.17 94.1494 1335.83 94.1495 1129.18 72.6231L790.818 37.377C584.165 15.8506 375.835 15.8505 169.182 37.3769L0 55V0Z" fill="#12203f" />
      </svg>
    </div>
  );
}

export default function CloudSolutionArchitecture() {
  useTitle("Cloud Architecture Design Services | Just After Midnight");
  const { data: articles } = useApi("/api/articles");

  return (
    <>
      <section className="cloud-hero cloud-hero--photo sa-hero" aria-labelledby="sa-title">
        <div className="cost-container">
          <div className="cloud-hero__text reveal">
            <h1 id="sa-title">Cloud Architecture Design Services</h1>
            <p className="cloud-hero__sub">Cloud build, cloud consulting and cloud support in Singapore – and beyond</p>
            <a href="#site-footer" className="btn btn-primary">Book a free consultation</a>
          </div>
          <div className="sa-hero-logos" aria-hidden="true">
            <div className="sa-hero-track">
              {[0, 1, 2].map((set) => (
                <div className="sa-hero-set" key={set}>
                  {HERO_LOGOS.map((logo) => (
                    <img key={logo} src={logo} alt="" width="92" height="90" loading="lazy" decoding="async" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sa-intro" aria-labelledby="sa-intro-title">
        <div className="cost-container">
          <div className="sa-intro__grid">
            <div className="sa-intro__lead reveal">
              <h2 id="sa-intro-title">Cloud architecture design that grows with you</h2>
              <p>We build scalable, reliable cloud-native infrastructures for enterprises, start-ups and SMEs. Whether you’re aiming to cut costs, integrate AI or accelerate your software development and deployment cycles, our cloud design services are shaped by your business priorities.</p>
              <p>Ready to get started?</p>
            </div>
            <span className="sa-intro__rule" aria-hidden="true" />
            <div className="sa-intro__points reveal">
              <h4>What we provide:</h4>
              <ul className="sa-marked-list">
                {PROVIDES.map((point) => (
                  <li key={point}>
                    <img src="/icons/sa-list-mark.svg" alt="" width="22" height="24" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sa-badges" aria-label="Accreditations">
        <div className="cost-container">
          <h4 className="sa-badges__title reveal">Accredited across all major cloud platforms:</h4>
          <div className="sa-badges__rule" aria-hidden="true" />
          <div className="sa-badges__row reveal">
            {BADGES.map((badge) => (
              <span className="sa-badges__item" key={badge}>
                <img src={badge} alt="" width="170" height="170" loading="lazy" decoding="async" />
              </span>
            ))}
          </div>
        </div>
      </section>

      <DividerUp />

      <section className="sa-challenges" aria-labelledby="sa-challenges-title">
        <div className="cost-container">
          <div className="sa-challenges__intro reveal">
            <h2 id="sa-challenges-title">What cloud challenges<br />are you facing?</h2>
            <p aria-hidden="true">&nbsp;</p>
            <p>We help teams overcome the blockers standing between them and their business goals.</p>
          </div>
          <div className="sa-challenges__grid">
            {CHALLENGES.map((challenge) => (
              <article className="sa-challenge reveal" key={challenge.title}>
                <img src={challenge.icon} alt="" width="80" height="80" loading="lazy" decoding="async" />
                <h3>{challenge.title}</h3>
                <p>{challenge.text}</p>
              </article>
            ))}
            <article className="sa-challenge sa-challenge--cta reveal">
              <img src="/icons/sa-icon-else.png" alt="" width="80" height="80" loading="lazy" decoding="async" />
              <h3>Something else?</h3>
              <p>Tell us what problem you’re trying to solve. Our role is to deliver an architecture that will help your organisation achieve its long-term goals.</p>
              <p aria-hidden="true">&nbsp;</p>
              <Link to="/contact" className="btn btn-navy">Give us a shout</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="sa-different" aria-labelledby="sa-different-title">
        <div className="cost-container">
          <div className="sa-different__head reveal">
            <h2 id="sa-different-title">What makes us different from other cloud design partners?</h2>
            <p>We don’t just build cloud solutions. We build long-term success. That means we take the time to understand where your business is headed, work as an extension of your team, stay hands-on after go-live, and continuously improve your setup as your needs evolve. No quick fixes. No off-the-shelf blueprints. Just smart, scalable cloud architecture designed around you.</p>
            <p aria-hidden="true">&nbsp;</p>
          </div>
          {DIFFERENTIATORS.map((item) => (
            <div className="sa-different__row" key={item.title}>
              <div className="sa-different__copy reveal">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <h4>{item.question}</h4>
              </div>
              <span className="sa-different__rule" aria-hidden="true" />
              <div className="sa-different__media reveal">
                <img src={item.media} alt="" loading="lazy" decoding="async" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sa-cta sa-cta--image" aria-labelledby="sa-cta-title">
        <div className="cost-container">
          <div className="sa-cta__inner reveal">
            <h2 id="sa-cta-title">Book your free cloud design consultation</h2>
            <p>Let’s talk about how we can improve scalability, reduce costs,<br />or modernise your infrastructure – starting with your goals.</p>
            <p aria-hidden="true">&nbsp;</p>
            <Link to="/contact" className="btn btn-navy">Let’s get started ➔</Link>
          </div>
        </div>
      </section>

      <section className="sa-process" aria-labelledby="sa-process-title">
        <div className="cost-container">
          <div className="sa-process__grid">
            <div className="sa-process__copy">
              <h2 id="sa-process-title">Our step-by-step process</h2>
              <p>We have a proven process for aligning stakeholders, prioritising actions and continuing to deliver innovation even after the build is complete.</p>
              <div className="sa-accordion">
                {STEPS.map((step, index) => (
                  <details className="sa-acc" key={step.title} open={index === 0}>
                    <summary>
                      <h3>{step.title}</h3>
                      <span className="sa-acc__icon" aria-hidden="true" />
                    </summary>
                    <div className="sa-acc__body"><p>{step.text}</p></div>
                  </details>
                ))}
              </div>
            </div>
            <div className="sa-process__media reveal">
              <img src="/icons/sa-rocket.webp" alt="" width="658" height="720" loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="sa-process__cta">
            <h3>Any questions?</h3>
            <p>Want to know how we manage hybrid cloud computing environments, network security or how we measure business value? Just <Link to="/contact">get in touch</Link> and one of the team will be right with you.</p>
          </div>
        </div>
      </section>

      <section className="sa-see" aria-labelledby="sa-see-title">
        <div className="cost-container">
          <div className="reveal">
            <h2 id="sa-see-title">See our cloud architecture design services in action</h2>
            <p>Our cloud architects have delivered build services for organisations of all sizes, from ambitious start-ups to global enterprises. Our projects span hybrid cloud architectures, legacy system modernisation, and scalable, cloud-native infrastructure. Each solution is tailored to the client’s priorities, whether that’s accelerating delivery cycles, improving performance, or reducing overheads. Explore our case studies to see how our strategic approach to cloud design helps businesses move faster, scale smarter, and operate with confidence.</p>
          </div>
        </div>
      </section>

      <section className="sa-cases" aria-labelledby="sa-cases-title">
        <div className="cost-container">
          <h2 className="sa-cases__title reveal" id="sa-cases-title">Read about our work with:</h2>
          <div className="sa-cases__grid">
            {CASES.map((study) => (
              <a className="sa-case reveal" key={study.client} href={study.to} target="_blank" rel="noopener noreferrer">
                <img src={study.image} alt={`${study.client} case study`} loading="lazy" decoding="async" />
                <h3>{study.client}</h3>
                <p>{study.text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <DividerUp />

      <section className="sa-cta sa-cta--navy" aria-labelledby="sa-cta-navy-title">
        <div className="cost-container">
          <div className="sa-cta__inner reveal">
            <h2 id="sa-cta-navy-title">Book your free cloud design consultation</h2>
            <p>Let’s talk about how we can improve scalability, reduce costs,<br />or modernise your infrastructure – starting with your goals.</p>
            <Link to="/contact" className="btn sa-cta__btn-pink">Let’s get started ➔</Link>
          </div>
        </div>
      </section>

      <DividerDown />

      <div className="sa-reviews">
        <ReviewsBand />
      </div>

      <section className="sa-emf" aria-labelledby="sa-emf-title">
        <div className="cost-container">
          <div className="sa-emf__grid">
            <div className="sa-emf__badge reveal">
              <img src="/icons/sa-emf.png" alt="" width="810" height="810" loading="lazy" decoding="async" />
            </div>
            <span className="sa-emf__rule" aria-hidden="true" />
            <div className="sa-emf__copy reveal">
              <h2 id="sa-emf-title">Equatorial Marine Fuel (EMF)</h2>
              <h4>AWS rebuild and migration for secure, scalable operations</h4>
              <p>Just After Midnight designed a multi-account, containerised AWS cloud infrastructure, migrated four environments from DigitalOcean, and added Cloudflare and 24/7 support. EMF now benefits from stronger security, lower costs, and effortless scaling at the world’s busiest bunkering port.</p>
              <a className="btn sa-cta__btn-pink" href="https://www.justaftermidnight247.com/case-study/equatorial-marine-fuel-logistics-company-emf/" target="_blank" rel="noopener noreferrer">Read the case study</a>
            </div>
          </div>
        </div>
      </section>

      <section className="sa-more" aria-labelledby="sa-more-title">
        <div className="cost-container">
          <div className="sa-more__intro reveal">
            <h3 id="sa-more-title">Looking for something else?</h3>
            <p>If a new build isn’t the right fit for you at this time, don’t worry, we’ve got you covered.</p>
          </div>
          <div className="sa-more__grid">
            {SERVICES.map((service) => (
              <article className="sa-more__card reveal" key={service.title}>
                <img src={service.icon} alt="" width="80" height="80" loading="lazy" decoding="async" />
                <h3>
                  {/^https?:\/\//i.test(service.to) ? (
                    <a href={service.to} target="_blank" rel="noopener noreferrer">{service.title} <span aria-hidden="true">➔</span></a>
                  ) : (
                    <Link to={service.to}>{service.title} <span aria-hidden="true">➔</span></Link>
                  )}
                </h3>
                <p>{service.text}</p>
                <p aria-hidden="true">&nbsp;</p>
              </article>
            ))}
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
