import { Link } from "react-router-dom";
import { useApi } from "../lib/api";
import { useTitle } from "../lib/useReveal";
import FaqBand from "../components/FaqBand";
import InsightsBand from "../components/InsightsBand";
import ReviewsBand from "../components/ReviewsBand";

const WHAT_WE_DO = [
  "Modernise and strengthen your AWS architecture",
  "Cut cloud costs while boosting key performance",
  "Run workloads aligned with AWS best practice",
  "Automate manual tasks to free your team",
  "Secure your environment with 24/7 monitoring",
  "Provide senior, certified AWS expertise on demand",
];

const SUPPORT_POINTS = [
  "Monitoring and incident response for infrastructure, applications and everything in between",
  "A single partner for all AWS operational support",
  "Global follow-the-sun teams of app and cloud engineers",
  "SLAs measured in minutes",
];

const ARCHITECTURE_POINTS = [
  "Build the cloud environment you’ve always wanted",
  "Put next-gen cloud technology at your fingertips",
  "Access the scalability, reliability and agility you need to compete",
  "Leave your legacy application (and competition) in the dust by migrating, refactoring or rehosting your AWS solution",
];

const PARTNER_POINTS = [
  "An AWS hosting partner for a cloud-native world",
  "Experts in cloud, DevOps and applications",
  "Working around the clock across all time zones",
  "Dedicated to protecting your revenue and reputation",
];

const AWS_SERVICES = [
  {
    icon: "/icons/why-cloud-strategy.svg",
    title: "AWS EC2 Delivery",
    to: "https://www.justaftermidnight247.com/ec2/",
    text: "As experienced EC2 delivery partners, we can consult on or implement any EC2 project.",
  },
  {
    icon: "/icons/aws-cp-cloud-infrastructure.svg",
    title: "AWS RDS Delivery",
    to: "https://www.justaftermidnight247.com/amazon-rds/",
    text: "As experienced RDS delivery partners, we can implement or advise on any project featuring RDS.",
  },
  {
    icon: "/icons/cloud-cost-reducing.svg",
    title: "Cost Optimisation",
    to: "/cloud/cloud-consulting/cost-optimisation",
    text: "Optimisation of performance, operations and cost is essential to effective cloud services. Our team can help you make the most of your AWS investment.",
  },
  {
    icon: "/icons/migration.webp",
    title: "Migration",
    to: "https://www.justaftermidnight247.com/cloud/solution-architecture/cloud-migration/",
    text: "Whether on-premise to Cloud or Cloud to Cloud, we will help with your migration. Combining migration with our support services provides a seamless transition.",
  },
  {
    icon: "/icons/aws-cp-consulting-puzzle.svg",
    title: "AWS Well Architected Review",
    to: "https://www.justaftermidnight247.com/cloud/cloud-consulting/aws-well-architected-review/",
    text: "We take you through an AWS Well Architected Review. This is a simple road map to lower costs, faster deployments and a better and more optimised solution.",
  },
  {
    icon: "/icons/aws-cp-round-the-clock.svg",
    title: "24/7 Support for AWS",
    to: "/support/aws-support",
    text: "Specialists in application level 24/7 support, a service competitors can’t match, with guaranteed service levels and support for critical and priority incidents.",
  },
  {
    icon: "/icons/aws-cp-cog-arrow.png",
    title: "AWS DCX",
    to: "https://www.justaftermidnight247.com/aws-dcx/",
    text: "The Digital Customer Experience Competency means we deliver the infrastructure great experiences are built on.",
  },
  {
    icon: "/icons/love.png",
    title: "AWS DevOps",
    to: "https://www.justaftermidnight247.com/devops/",
    text: "As a next-gen MSP, we can fill any DevOps gap. From building a full CI/CD pipeline to providing DevOps engineers out of hours.",
  },
  {
    icon: "/icons/aws-cp-target.png",
    title: "Something else?",
    to: "#site-footer",
    text: "If it’s AWS, we can help. Just ask.",
  },
];

const AWS_REVIEWS = [
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
    quote: "We want our users to be able to work out at a time that suits them, day or night. I can sleep easy knowing that Just After Midnight’s team of experts are taking care of any issues with the app, so I can focus on what I do best",
    companyUrl: "https://www.thebodycoach.com/",
    to: "https://www.justaftermidnight247.com/case-study/the-body-coach-app/",
  },
];

const FAQS = [
  {
    q: "How much does AWS hosting cost?",
    paragraphs: [
      "AWS has a number of pricing options. You can pay for what you use, reserve instances or access discounts through volume. It all depends on your application and needs. AWS gives you enormous flexibility to optimise cost if you know how to design for it. When you work with us, we analyse your environment, identify waste, right-size resources and make architectural recommendations so that you’re paying the absolute minimum for the performance and resilience you need.",
    ],
  },
  {
    q: "How do I move to AWS web hosting?",
    paragraphs: [
      "Migrating to AWS can be simple or incredibly complex depending on your stack. Whether you’re moving from cloud to cloud, from an on-premise app, or re-architecting an existing AWS setup, we can plan and execute a migration that fits your overall objectives.",
      "We typically begin with an assessment of your current environment, dependencies, compliance requirements and availability goals. From there, we create a step-by-step migration or modernisation plan, to be delivered without disrupting your users or revenue.",
    ],
  },
  {
    q: "What does an AWS hosting partner do?",
    a: "That’s really up to you. We can take on as big or little a role as you like. Some teams want us to build and architect their entire AWS environment. Others want day-to-day management, monitoring and 24/7 incident response. And some just need senior AWS engineering support for more complex projects. We plug in where you need us most, whether that’s design, optimisation, DevOps, security, out-of-hours coverage or being your full-stack reliability partner.",
  },
  {
    q: "Do I need to re-architect my application to move to AWS?",
    a: "Not always. Some workloads can be lifted and shifted. Others benefit from re-platforming or modernising at the same time. We help you decide what’s worth changing (and what isn’t) based on performance, cost and risk.",
  },
  {
    q: "Can you manage my AWS environment after the migration?",
    a: "Yes. Many teams ask us to run their environment post-migration, be it for monitoring, patching, optimising or responding to incidents 24/7. You can treat us as your cloud operations team or as an extension of your existing one.",
  },
  {
    q: "Do you work with containerised or serverless AWS environments?",
    a: "Every day! We support Lambda-heavy workloads, EKS/ECS clusters, event-driven architectures and microservices with distributed observability and deep SRE experience.",
  },
  {
    q: "Can you work alongside our internal dev team or existing MSP?",
    a: "Absolutely. We’re often the cloud/SRE layer that sits beneath an internal development team or partner agency. No turf wars.",
  },
];

const WHY = [
  {
    icon: "/icons/aws-cp-phishing.svg",
    title: "Get more from your AWS investment",
    text: "We optimise your AWS environment for performance, cost and resilience, so you pay only for what you need and get more out of every service you run.",
  },
  {
    icon: "/icons/aws-cp-round-the-clock-why.svg",
    title: "Built for high availability",
    text: "We engineer uptime into your applications and infrastructure from day one.",
  },
  {
    icon: "/icons/aws-cp-agree-hands.svg",
    title: "Partner with someone you like",
    text: "We pride ourselves in providing gold standard client servicing; providing superb communication, monitoring and continual improvement.",
  },
  {
    icon: "/icons/aws-cp-devops-woman.svg",
    title: "Sleep easy",
    text: "You get a dedicated team 24/7 with real people at the end of the phone. We are always on, so you can switch off!",
  },
];

function CurveUp() {
  return (
    <div className="global-curved-divider" aria-hidden="true">
      <svg width="1920" height="73" viewBox="0 0 1920 73" fill="none" preserveAspectRatio="none">
        <path d="M1920 72.9999L0 73.0012L3.42974e-06 33.7695L169.182 16.1465C375.835 -5.37986 584.165 -5.37991 790.818 16.1465L1129.18 51.3927C1335.83 72.9191 1544.16 72.9191 1750.82 51.3928L1920 33.7697L1920 72.9999Z" fill="#f2f2f2" />
      </svg>
    </div>
  );
}

function CurveDown({ fill }) {
  return (
    <div className="global-curved-divider" aria-hidden="true">
      <svg width="1920" height="89" viewBox="0 0 1920 89" fill="none" preserveAspectRatio="none">
        <path d="M0 0H915.5H1920V55L1750.82 72.623C1544.17 94.1494 1335.83 94.1495 1129.18 72.6231L790.818 37.377C584.165 15.8506 375.835 15.8505 169.182 37.3769L0 55V0Z" fill={fill} />
      </svg>
    </div>
  );
}

function ServiceCard({ service }) {
  const external = /^https?:\/\//i.test(service.to);
  const anchor = service.to.startsWith("#");
  const title = (
    <>
      {service.title} <span aria-hidden="true">➔</span>
    </>
  );
  return (
    <article className="cp-aws-icons__card reveal">
      <img src={service.icon} width="80" height="80" alt="" loading="lazy" decoding="async" />
      <h3>
        {external || anchor ? <a href={service.to}>{title}</a> : <Link to={service.to}>{title}</Link>}
      </h3>
      <p>{service.text}</p>
    </article>
  );
}

function PointList({ points, marked = false }) {
  if (!marked) {
    return <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>;
  }
  return (
    <ul className="seo-intro-points seo-intro-points--marked cost-moon-list">
      {points.map((point) => (
        <li key={point}>
          <img className="seo-intro-mark" src="/icons/moon-list.svg" alt="" width="25" height="27" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CloudPartnersAws() {
  useTitle("Managed AWS Hosting & Cloud Services | Just After Midnight");
  const { data: articles } = useApi("/api/articles");

  return (
    <>
      <section className="cloud-hero cloud-hero--photo cp-aws-hero" aria-labelledby="cp-aws-title">
        <div className="cost-container">
          <div className="cloud-hero__text reveal">
            <h1 id="cp-aws-title">Managed AWS Hosting &amp; Cloud Services</h1>
            <p className="cloud-hero__sub">Your one-stop AWS partner for modernisation, optimisation and 24/7 reliability</p>
            <a href="#site-footer" className="btn btn-primary">Speak to our team</a>
          </div>
        </div>
      </section>

      <section className="cp-aws-intro" aria-labelledby="cp-aws-intro-title">
        <div className="cost-container">
          <div className="cp-aws-intro__grid">
            <div className="cp-aws-intro__lead reveal">
              <h2 id="cp-aws-intro-title">An Advanced AWS Partner with a difference</h2>
              <p>Well, we like to think so. If you’re looking for round-the-clock support, meaningful cost reductions, or simply a smoother way to get started on AWS, we can help.</p>
              <p>We design, build, migrate, optimise and consult on all things AWS for the world’s biggest brands (as well as some little and medium-sized ones). Whether you’re running at enterprise scale or just hitting your stride on AWS, we’ll help you get more out of the platform.</p>
              <p>As an AWS Advanced Consulting Partner, we bring the certified expertise you’d expect, plus a practical, down-to-earth approach that helps our partners cut, on average, around 30% off their AWS bill.</p>
            </div>
            <span className="cp-aws-intro__rule" aria-hidden="true" />
            <div className="cp-aws-intro__points reveal">
              <h3>What we do for you:</h3>
              <PointList points={WHAT_WE_DO} marked />
            </div>
          </div>
        </div>
      </section>

      <CurveUp />

      <section className="cp-aws-columns" aria-labelledby="cp-aws-columns-title">
        <div className="cost-container">
          <div className="cp-aws-columns__head reveal">
            <h2 id="cp-aws-columns-title">Our Managed AWS Services</h2>
            <p>Just After Midnight is a leading AWS provider for household brands including Vodafone, Volvo and Everton Football Club. AWS modernisation and expert management can help you tackle long-running issues and hit day-one goals, whether through reducing costs, implementing next-gen services or securing your application against attacks.</p>
            <p aria-hidden="true">&nbsp;</p>
          </div>
          <div className="cp-aws-columns__grid">
            <div className="cp-aws-columns__col reveal">
              <h4>24/7 full-stack support for AWS</h4>
              <PointList points={SUPPORT_POINTS} />
              <p><a href="https://www.justaftermidnight247.com/24-7-support-services-application-website-cloud/">Our 24/7 full-stack support service</a> is an industry trailblazer, combining monitoring and tech-enabled support with a handpicked team of app and cloud experts spread across the globe – that’s why we’re the go-to support people for AWS users.</p>
              <h4>Solution architecture &amp; cloud modernisation</h4>
              <PointList points={ARCHITECTURE_POINTS} />
              <p><a href="https://www.justaftermidnight247.com/cloud/solution-architecture/">We build next-gen cloud environments</a> to help our partners innovate and evolve on the level of global competition. From hyper-scale infrastructures for brands serving international markets to bespoke environments powering augmented reality.</p>
              <p><img src="/icons/aws-cp-badge.webp" width="150" height="150" alt="AWS Advanced Tier Services Partner" loading="lazy" decoding="async" /></p>
            </div>
            <span className="cp-aws-columns__rule" aria-hidden="true" />
            <div className="cp-aws-columns__col reveal">
              <h4>Why we’re different</h4>
              <p>Most managed hosting partners are old-guard infrastructure businesses who’ve rebranded to keep up with the times. But a fresh lick of paint does not a next-gen partner make.</p>
              <p>Instead of slow, one-size-fits-all solutions, we take the time to build and manage a cloud environment that supports your application’s key objectives.</p>
              <p>We react, evolve and innovate at the pace of technology. And you will too.</p>
              <h4>Not just AWS experts</h4>
              <p>Listing every AWS accreditation we hold would make for a lengthy read.</p>
              <p>We’ve managed, built and supported countless AWS cloud environments for global brands and we’re constantly upskilling as the world of AWS cloud expands. But there’s more. With a healthy splash of DevOps engineers and application experts in the mix, we work with your solution from a 360-degree perspective.</p>
              <h4>A partner you actually want on your team</h4>
              <p>We pride ourselves on being someone you want to work with. We have an absolute commitment to your revenue and reputation, so when you tag in Just After Midnight, you get a partner who’ll really fight your corner.</p>
              <PointList points={PARTNER_POINTS} />
            </div>
          </div>
        </div>
      </section>

      <div className="cp-aws-divider-navy">
        <CurveDown fill="#f2f2f2" />
      </div>

      <section className="cp-aws-icons" aria-labelledby="cp-aws-icons-title">
        <div className="cost-container">
          <div className="cp-aws-icons__head reveal">
            <h2 id="cp-aws-icons-title">Our AWS Services</h2>
          </div>
          <div className="cp-aws-icons__grid">
            {AWS_SERVICES.map((service) => <ServiceCard service={service} key={service.title} />)}
          </div>
        </div>
      </section>

      <div className="cp-aws-reviews">
        <ReviewsBand reviews={AWS_REVIEWS} />
      </div>

      <div className="cp-aws-faq">
        <FaqBand
          variant="detail"
          padded
          title="AWS Managed Hosting FAQ"
          faqs={FAQS}
          artwork="/icons/azure-Rocket-stack2.webp"
          panel={{
            title: "More questions?",
            text: "and we’ll be in touch to answer any questions about how we can support your AWS environment 24/7, 365.",
            cta: "Drop us a line",
            to: "/contact",
            linkFirst: true,
          }}
        />
      </div>

      <section className="cost-why cp-aws-why" aria-labelledby="cp-aws-why-title">
        <div className="cost-why__outer">
          <div className="cost-container">
            <h2 className="cost-why__title" id="cp-aws-why-title">Why Just After Midnight?</h2>
            <div className="cost-why__grid">
              {WHY.map((reason) => (
                <article className="cost-why__card reveal" key={reason.title}>
                  <img src={reason.icon} width="200" height="200" alt="" loading="lazy" decoding="async" />
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="cp-aws-insights">
        <InsightsBand
          title="You may also be interested in"
          articles={articles || []}
          variant="navy"
        />
      </div>

      <CurveDown fill="#f0f0f0" />
    </>
  );
}
