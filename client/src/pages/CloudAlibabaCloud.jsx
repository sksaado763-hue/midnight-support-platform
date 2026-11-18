import { Link } from "react-router-dom";
import { useApi } from "../lib/api";
import { useTitle } from "../lib/useReveal";
import FaqBand from "../components/FaqBand";
import InsightsBand from "../components/InsightsBand";
import ReviewsBand from "../components/ReviewsBand";

const WHAT_WE_DO = [
  "Modernise and strengthen your Alibaba Cloud architecture",
  "Reduce Alibaba Cloud spend without compromising performance",
  "Run workloads aligned with Alibaba Cloud best practices",
  "Automate manual operations and remove bottlenecks",
  "Improve reliability with 24/7 monitoring and incident response",
  "Access senior Alibaba Cloud, DevOps and SRE expertise whenever you need it",
];

const MANAGING_SERVICES_LIST = [
  "Content Delivery Network (CDN) – accelerating the response to user requests and increasing the response rate in China and beyond.",
  "Cloud Enterprise Network (CEN) – facilitating communication and helping you get beyond the Great Firewall at speed.",
  "Short Message Service (SMS) – messaging service that covers the globe – including all top Asian networks.",
];

const WHY_DIFFERENT_POINTS = [
  "Just After Midnight was born in the cloud era",
  "Expert cloud and DevOps specialists",
  "Working around the clock across all time zones",
  "Dedicated to protecting your revenue and reputation",
];

const ALIBABA_SERVICES = [
  {
    icon: "/icons/why-cloud-strategy.svg",
    title: "Cloud Consulting",
    to: "/cloud",
    text: "We help businesses get to China online. We have a step by step process to help you take the first steps into China with Alibaba Cloud.",
  },
  {
    icon: "/icons/cloud-cost-reducing.svg",
    title: "Cost Optimisation",
    to: "/cloud/cloud-consulting/cost-optimisation",
    text: "Optimisation of performance, operations and cost is essential to effective cloud services. Our team can help you make the most of your Alibaba Cloud investment.",
  },
  {
    icon: "/icons/why-cloud-network.svg",
    title: "Alibaba Monitoring",
    to: "/support/alibaba-cloud-support",
    text: "While some tools offer monitoring as a service – that service is only as good as the team on the other end. That’s where we come in.",
  },
  {
    icon: "/icons/cloud-design.svg",
    title: "Migration",
    to: "/cloud",
    text: "Whether on-premises to cloud or cloud to cloud, we will help with your migration. Combining migration with our support services provides a seamless transition.",
  },
  {
    icon: "/icons/cloud-support.webp",
    title: "24/7 Support",
    to: "/support/alibaba-cloud-support",
    text: "Specialists in application level 24/7 support, a service competitors can’t match, with guaranteed service levels and support for critical and priority incidents.",
  },
  {
    icon: "/icons/cloud-web-application.svg",
    title: "Alibaba DevOps",
    to: "/cloud",
    text: "Proactive and preventative infrastructure management and application deployment management all in one.",
  },
];

const ALIBABA_REVIEWS = [
  {
    slug: "banyan-tree",
    client: "Banyan Tree",
    role: "Head, Information Technology",
    quote: "Quick and fast support and consulting on the overall web, DevOps and hosting needs. Very helpful as always.",
    companyUrl: "https://www.banyantree.com/",
    cta: false,
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
    slug: "the-body-coach",
    client: "The Body Coach",
    role: "CEO",
    quote: "JAM’s excellent first-line service means no more late-night wake-up calls – responding to our clients and resolving issues any hour of the day.",
    companyUrl: "https://www.thebodycoach.com/",
    to: "https://www.justaftermidnight247.com/case-study/the-body-coach-app/",
  },
  {
    slug: "sainsburys-bank",
    client: "Sainsbury's Bank",
    role: "Senior Manager",
    quote: "It makes a massive difference to us to have someone available for all of our global markets. We're really happy to have you on our team.",
    companyUrl: "https://www.sainsburysbank.co.uk/",
    cta: false,
  },
];

const FAQS = [
  {
    q: "How much does Alibaba Cloud cost?",
    a: "Pricing depends on how your workloads are architected. Alibaba Cloud offers pay-as-you-go pricing, reserved instances, pre-emptible instances and enterprise discount programmes. When we manage your environment, we optimise the architecture, right-size resources and identify waste so you only pay for what you actually need.",
  },
  {
    q: "Is Alibaba Cloud suitable for global companies, or only APAC?",
    a: "Alibaba Cloud is strongest in Mainland China and wider APAC, but it operates global regions too. Many global brands use Alibaba Cloud specifically for China delivery, where other providers may face regulatory or performance challenges. If you need reliable access into China, Alibaba Cloud is often the only practical option.",
  },
  {
    q: "Can you help us enter the China market through Alibaba Cloud?",
    a: "Yes. We support ICP licensing guidance, cross-border architecture, CDN strategy, compliance constraints and region routing. While China-entry is complex, we can help you navigate regulations without jeopardising performance or user experience.",
  },
  {
    q: "What does an Alibaba Cloud partner actually do?",
    paragraphs: [
      "Whatever you need! We can build, modernise, migrate or manage your Alibaba Cloud environment. That includes:",
      "• Designing cloud architecture\n• Deploying and optimising workloads\n• Implementing security controls\n• Providing 24/7 monitoring and incident response\n• Supporting dev teams and CI/CD pipelines",
      "We act as your cloud/SRE function, or as an extension of your internal team.",
    ],
  },
  {
    q: "Do I need to re-architect to move to Alibaba Cloud?",
    a: "Not always. Some workloads can be lifted and shifted, others benefit from re-platforming or full modernisation. We help you decide what’s worth changing based on cost, performance, risk and long-term plans (especially if China delivery is a factor).",
  },
  {
    q: "Can you migrate us from AWS/Azure/GCP to Alibaba Cloud?",
    a: "Yes. We regularly handle cross-cloud migrations, including hybrid architectures where Alibaba Cloud is used for China-facing workloads only. We ensure minimal downtime, no data loss and a clean cutover plan.",
  },
  {
    q: "Do you support Kubernetes or container workloads on Alibaba Cloud?",
    a: "Every day. We support ACK (Alibaba Cloud Kubernetes), Serverless Kubernetes, container registries and microservice architectures, along with logging, observability and SRE practices to keep everything stable.",
  },
  {
    q: "How does Alibaba Cloud perform compared to AWS or Azure?",
    a: "For China-based users, it's typically faster and more reliable due to local presence and regulatory alignment. For global workloads, performance varies by region but is more than capable of running enterprise-scale applications. We’ll help you decide the right mix (Alibaba-only vs hybrid vs multi-cloud).",
  },
];

const WHY = [
  {
    icon: "/icons/why-cloud-strategy.svg",
    title: "Get more from your Alibaba Cloud investment",
    text: "We are experts in the field and will provide you with maximum return on your Alibaba Cloud investment. Let us take on the tasks you don’t want to do, so you can focus on things that matter to you.",
  },
  {
    icon: "/icons/cloud-cost-reducing.svg",
    title: "Built for high availability",
    text: "We engineer uptime into your applications and infrastructure from day one.",
  },
  {
    icon: "/icons/cloud-people-consulting.svg",
    title: "Partner with someone you like",
    text: "We pride ourselves in providing gold-standard client servicing, providing superb communication, monitoring and continual improvement.",
  },
  {
    icon: "/icons/cloud-architecture.svg",
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

export default function CloudAlibabaCloud() {
  useTitle("Alibaba Cloud | Just After Midnight");
  const { data: articles } = useApi("/api/articles");

  return (
    <>
      {/* SECTION 1: HERO BANNER */}
      <section className="cloud-hero cloud-hero--photo cp-aws-hero" style={{ background: "#0d1d3d" }} aria-labelledby="cp-ali-title">
        <div className="cost-container">
          <div className="cloud-hero__text reveal">
            <h1 id="cp-ali-title"><strong>Managed Alibaba Cloud</strong></h1>
            <p className="cloud-hero__sub">Grow your business in Asia and beyond</p>
            <div className="buttons">
              <a href="#site-footer" className="btn btn-primary" style={{ backgroundColor: "#fabd14", color: "#12203f" }}>
                Speak to our team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WORKING WITH ALIBABA CLOUD */}
      <section className="cp-aws-intro" aria-labelledby="cp-ali-intro-title">
        <div className="cost-container">
          <div className="cp-aws-intro__grid">
            <div className="cp-aws-intro__lead reveal">
              <h2 id="cp-ali-intro-title" className="section-title intro-title">Working with Alibaba Cloud</h2>
              <p>Just After Midnight is a leading partner of Alibaba Cloud, offering consultancy, implementation and support for their comprehensive suite of cloud computing services.</p>
              <p>With offices in the UK, the US and across Asia Pacific, we’re proud to be one of the first Alibaba Cloud partners in Europe, and perfectly placed to help organisations connect with their users in Asia and China through this powerful platform.</p>
            </div>
            <span className="cp-aws-intro__rule" aria-hidden="true" />
            <div className="cp-aws-intro__points reveal">
              <h3>What we do for you:</h3>
              <ul className="seo-intro-points seo-intro-points--marked cost-moon-list">
                {WHAT_WE_DO.map((point) => (
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

      {/* SECTION 3: CURVED DIVIDER UP */}
      <CurveUp />

      {/* SECTION 4: ALIBABA CLOUD FOR EVERY USE CASE */}
      <section className="cp-aws-columns" style={{ backgroundColor: "rgb(242, 242, 242)" }} aria-labelledby="cp-ali-columns-title">
        <div className="cost-container">
          <div className="cp-aws-columns__head reveal">
            <h2 id="cp-ali-columns-title">Alibaba Cloud for every use case</h2>
            <p>If you’re new to cloud services and cloud hosting, or you’re unsure of whether your business objectives will be best served by choosing Alibaba Cloud, then we’re here to help.</p>
            <p>We manage Alibaba Cloud services for businesses using a wide range of technologies, in countries around the world, to achieve a broad set of objectives. So whether you’re using a .NET, PHP or a custom application, are Europe or Asia-Pacific based, and whatever your business, we’ve got you covered when it comes to breaking China.</p>
            <p aria-hidden="true">&nbsp;</p>
          </div>
          <div className="cp-aws-columns__grid">
            <div className="cp-aws-columns__col reveal">
              <h4>Managing the cost of Alibaba Cloud Platform</h4>
              <p>Alibaba Cloud Platform’s pricing is extremely flexible, allowing you to pay for the resources you use on either a pay-as-you-go or a prepayment model. Each service is also priced individually, allowing complete control over your bill. However, there is a point at which customisation becomes complexity, and as Alibaba Cloud partners, we have the skills and experience to manage and minimise your costs, while ensuring you achieve all your objectives.</p>
              
              <h4>Managing your Alibaba Cloud services</h4>
              <p>Alibaba Cloud provides a comprehensive suite of cloud-based services. In addition, there are a number of turnkey services which will instantly connect you better to the region you’re targeting:</p>
              <ul>
                {MANAGING_SERVICES_LIST.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p>As Alibaba Cloud partners, we’re perfectly placed to consult, design, architect and manage a cutting-edge cloud solution, incorporating any Alibaba Cloud service feature you require.</p>
              
              <h4>Growing with Alibaba Cloud</h4>
              <p>Recently reporting revenue of $3.68 billion, Alibaba is a rapidly growing and truly global cloud service provider. To access this global reach and Alibaba’s broad product offering, you need a partner with an international outlook who’s always upskilling – that’s Just After Midnight.</p>
            </div>
            <span className="cp-aws-columns__rule" aria-hidden="true" />
            <div className="cp-aws-columns__col reveal">
              <h4>Why we’re different</h4>
              <div className="service-overview-text">
                <p>Just After Midnight were born in the cloud era. Always-up and 24/7 support are two values built into everything we do. When you face an issue, you’ll always find a certified engineer on the other end of the phone or Slack channel with an in-depth knowledge of your account, infrastructure and application.</p>
                <p>Our team of experts are spread across three continents, so wherever and whenever the issue, we’ll be on protecting your revenue and reputation.</p>
                
                <h4>Alibaba partners</h4>
                <p>Our partner status means we have the certified resources to manage this powerful platform as you expand into new territory. For information on how we’ve already helped a great company connect with their users in Asia, <Link to="/case-studies">read our Cult Wines case study.</Link></p>
                
                <h4>Agile and forward-thinking</h4>
                <p>Most managed cloud providers are old-guard hosting companies who have been forced to move to the cloud to keep up. These businesses are stuck in the past, with long lead times, faceless ticketing systems and no way of dealing with out-of-hours incidents except waking engineers in the middle of the night. Just After Midnight were built in the constantly shifting world of cloud, and we’re ready for anything.</p>
                
                <h4>An absolute commitment</h4>
                <p>We have an absolute commitment to protecting your revenue and reputation. Your issues are our priority.</p>
              </div>
              <ul>
                {WHY_DIFFERENT_POINTS.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CURVED DIVIDER DOWN */}
      <div className="cp-aws-divider-navy">
        <CurveDown fill="#f2f2f2" />
      </div>

      {/* SECTION 6: OUR ALIBABA SERVICES (ICON GRID ON DARK NAVY) */}
      <section className="cp-aws-icons" style={{ backgroundColor: "rgb(18, 32, 63)" }} aria-labelledby="cp-ali-icons-title">
        <div className="cost-container">
          <div className="cp-aws-icons__head reveal">
            <h2 id="cp-ali-icons-title" style={{ color: "#ffffff", textAlign: "center" }}><strong>Our Alibaba Services</strong></h2>
          </div>
          <div className="cp-aws-icons__grid">
            {ALIBABA_SERVICES.map((service) => <ServiceCard service={service} key={service.title} />)}
          </div>
        </div>
      </section>

      {/* SECTION 7: REVIEWS SLIDER */}
      <div className="cp-aws-reviews">
        <ReviewsBand reviews={ALIBABA_REVIEWS} />
      </div>

      {/* SECTION 8: FAQ */}
      <div className="cp-aws-faq">
        <FaqBand
          variant="detail"
          padded
          title="Alibaba Cloud FAQ"
          faqs={FAQS}
          artwork="/icons/azure-Rocket-stack2.webp"
          panel={{
            title: "More questions?",
            text: "Anything else? We're here to answer your questions about supporting mission-critical digital products on Alibaba Cloud 24/7, 365.",
            cta: "Drop us a line",
            to: "/contact",
            linkFirst: false,
          }}
        />
      </div>

      {/* SECTION 9: WHY JUST AFTER MIDNIGHT? */}
      <section className="cost-why cp-aws-why" aria-labelledby="cp-ali-why-title">
        <div className="cost-why__outer">
          <div className="cost-container">
            <h2 className="cost-why__title" id="cp-ali-why-title">Why Just After Midnight?</h2>
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

      {/* SECTION 10: INSIGHTS */}
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

