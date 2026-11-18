import { useEffect, useRef, useState } from "react";
import { useApi } from "../lib/api";
import { useTitle } from "../lib/useReveal";
import InsightsBand from "../components/InsightsBand";
import ReviewsBand from "../components/ReviewsBand";

const HERO_LOGOS = [
  { src: "/icons/dv-logo-ford.webp", alt: "Ford" },
  { src: "/icons/dv-logo-formica.webp", alt: "Formica" },
  { src: "/icons/dv-logo-dla.svg", alt: "DLA Piper" },
  { src: "/icons/dv-logo-vodafone.webp", alt: "Vodafone" },
  { src: "/icons/dv-logo-emperor.webp", alt: "Emperor" },
];

const TECH_LOGOS = [
  { src: "/icons/dv-tech-drupal.webp", alt: "Drupal" },
  { src: "/icons/dv-tech-azure.webp", alt: "Azure" },
  { src: "/icons/dv-tech-gcp.webp", alt: "Google Cloud" },
  { src: "/icons/dv-tech-alibaba.webp", alt: "Alibaba Cloud" },
  { src: "/icons/dv-tech-aem.webp", alt: "Adobe Experience Manager" },
  { src: "/icons/dv-tech-optimizely.webp", alt: "Optimizely" },
  { src: "/icons/dv-tech-magento.webp", alt: "Magento" },
  { src: "/icons/dv-tech-github.webp", alt: "GitHub" },
  { src: "/icons/dv-tech-kubernetes.webp", alt: "Kubernetes" },
  { src: "/icons/dv-tech-aws.webp", alt: "AWS" },
  { src: "/icons/dv-tech-wordpress.webp", alt: "WordPress" },
];

const SERVICES = [
  {
    icon: "/icons/dv-icon-consulting.webp",
    title: "DevOps consulting services",
    text: "Need expert guidance? Our DevOps consulting services help introduce or optimise DevOps practices to fit your business. From strategy and roadmaps to hands-on implementation, we’ve got you covered.",
  },
  {
    icon: "/icons/dv-icon-247.webp",
    title: "24/7 DevOps support services",
    text: "Don’t let the 9-5 hold up your pipeline. As the go-to 24/7 support people, we supply DevOps engineers 24/7 and OOH to cover nighttime deployments, resolve incidents and monitor system performance.",
  },
  {
    icon: "/icons/dv-icon-devsecops.webp",
    title: "DevSecOps",
    text: "We bring security into your DevOps workflows, enabling you to deliver secure applications quickly. From automated testing to vulnerability checks, we embed security into every development phase.",
  },
  {
    icon: "/icons/dv-icon-daas.webp",
    title: "DevOps as a service",
    text: "If you want to outsource everything, we’re right here. Our DaaS offering sees your software delivery and deployment moved to a cloud-based model managed by us. Efficient, scalable – and flexible.",
  },
  {
    icon: "/icons/dv-icon-tooling.webp",
    title: "DevOps tooling",
    text: "We help select and integrate CI/CD tools, container orchestration, and monitoring. Streamline workflows, automate processes, and speed up development with expert tooling support.",
  },
  {
    icon: "/icons/dv-icon-cicd.webp",
    title: "CI/CD",
    text: "We help select and integrate CI/CD tools, container orchestration, and monitoring. Streamline workflows, automate processes, and speed up development with expert tooling support.",
  },
  {
    icon: "/icons/dv-icon-iac.webp",
    title: "IaC",
    text: "Our IaC services automate provisioning, making environments consistent and scalable. Define infrastructure in code to deploy quickly and manage effortlessly across development stages.",
  },
  {
    icon: "/icons/dv-icon-solution.webp",
    title: "DevOps for solution builds",
    text: "If you’re building a new application, we lay the groundwork for a great one. By building security, automation and velocity from day one, we ensure your new application is ready to stay competitive.",
  },
];

const BENEFITS = [
  {
    icon: "/icons/dv-icon-benefit-speed.webp",
    title: "You reduce time to market; no more bottlenecks or manual delays",
    paragraphs: [
      "Waiting for development bottlenecks to clear before releasing a product can be frustrating and costly. We automate your CI/CD processes, removing the manual steps that slow down releases.",
      "That means faster development cycles, quicker feature delivery, and getting your products to market ahead of the competition.",
    ],
  },
  {
    icon: "/icons/dv-icon-benefit-cost.webp",
    title: "You ensure system stability; focus on innovation, not firefighting",
    paragraphs: [
      "Frequent issues and downtime are a drain on your team’s time and can damage your reputation. Our proactive monitoring and real-time incident management mean your systems stay stable, and potential issues are resolved before they escalate.",
      "You can stop firefighting and start focusing on developing new features that add value.",
    ],
  },
  {
    icon: "/icons/dv-icon-benefit-scale.png",
    title: "You scale without limits; infrastructure grows with your business",
    paragraphs: [
      "Scaling rapidly to meet growing demand is a challenge – especially when infrastructure struggles to keep up. With Infrastructure as Code (IaC) and cloud-native DevOps practices, we build scalable, flexible environments that grow as your business does.",
      "This means you avoid resource bottlenecks and can focus on serving your customers, no matter how quickly you expand.",
    ],
  },
];

const STORIES = [
  {
    client: "Vodafone",
    headline: "Transforming the DevOps approach for Vodafone eCommerce",
    image: "/icons/dv-case-vodafone.webp",
    to: "https://www.justaftermidnight247.com/case-study/vodafone/",
  },
  {
    client: "DLA Piper",
    headline: "Provisioning a new AWS architecture, serverless services and migrating to Sitecore, all with our 24/7 support",
    image: "/icons/dv-case-dla.png",
    to: "https://www.justaftermidnight247.com/case-study/dla-piper/",
  },
  {
    client: "Ford",
    headline: "$40 million in sales protected and 1000’s of hours saved for blue-chip automotive brand",
    image: "/icons/dv-case-ford.webp",
    to: "https://www.justaftermidnight247.com/case-study/ford/",
  },
  {
    client: "Emperor",
    headline: "Migrating and supporting over 130 enterprise sites for a specialist digital agency",
    image: "/icons/dv-case-emperor.png",
    to: "https://www.justaftermidnight247.com/case-study/emperor/",
  },
];

const WHY = [
  {
    icon: "/icons/dv-icon-why-opt.png",
    title: "Accelerate your software development with our expert DevOps services",
    text: "At Just After Midnight, we specialise in transforming your software development lifecycle through cutting-edge DevOps automation and best practices. As a leading DevOps agency and DevOps service provider, we empower your agile teams to deliver high-quality products faster and more efficiently. With our DevOps as a Service offering, your development cycles are streamlined, and your teams can focus on innovation.",
  },
  {
    icon: "/icons/dv-icon-why-web.webp",
    title: "DevOps as a Service (DaaS)",
    text: "With our comprehensive DevOps as a Service (DaaS) solution, we handle the operational complexities, including infrastructure automation, cloud-based deployments, and ongoing monitoring. Whether it’s managing cloud environments or implementing DevOps processes, our services allow your team to focus on what they do best – software development. Our expertise spans across leading platforms like AWS, Azure, and Google Cloud Platform, ensuring your infrastructure is scalable and flexible.",
  },
  {
    icon: "/icons/dv-icon-why-monitor.webp",
    title: "Unlock continuous delivery and improvement",
    text: "Our solutions focus on implementing continuous delivery pipelines, ensuring your DevOps processes are optimised for rapid deployment. With a strong emphasis on continuous improvement, we ensure your pipelines evolve with your business needs. Our DevOps engineers work to reduce bottlenecks and manual steps in your workflows, making your DevOps service more efficient.",
  },
  {
    icon: "/icons/dv-icon-why-cloud.png",
    title: "Leverage the power of leading cloud platforms",
    text: "We have extensive experience working with major cloud platforms such as AWS, Azure, and Google Cloud Platform. Our DevOps engineers integrate these platforms into your workflows, ensuring your infrastructure is optimised for performance, scalability, and cost-efficiency. Our DevOps service approach ensures seamless cloud integration that suits your business needs.",
  },
  {
    icon: "/icons/dv-icon-why-support.webp",
    title: "Expert DevOps engineers at your service",
    text: "Our experienced DevOps engineers are at the core of our offerings. They bring deep expertise in configuration management, site reliability engineering, and using advanced DevOps tools to streamline your processes. Whether you’re looking for expert consulting or full-fledged DevOps as a Service, we tailor solutions that drive collaboration and productivity for your agile teams.",
  },
  {
    icon: "/icons/dv-icon-why-web.webp",
    title: "Adopt DevOps best practices",
    text: "At Just After Midnight, we instil DevOps best practices across your teams and processes, ensuring consistent improvements in speed, efficiency, and collaboration. We ensure that your DevOps automation, configuration management, and site reliability engineering efforts align with your business objectives, driving continuous delivery and continuous improvement. By adopting these DevOps best practices, you stay ahead of the competition and bring better products to market, faster.",
  },
];

const FAQ = [
  {
    q: "What is DevOps?",
    paragraphs: [
      "Simply, DevOps describes the joining of development and operations teams. On the one hand, DevOps is a philosophy and mindset tightly aligned with the principles of agility and innovation. But while we love a good theory (especially those that make people, processes and technology work better) it’s the practical implementation of better developer/operations relationships and collaboration that we prefer to focus on, because when these teams work together, they build better products.",
      "There are lots of things that DevOps improves, but in a nutshell, it really is about better collaboration, agility, automation, integration and using DevOps tooling to accelerate processes that will deliver better quality products and get you to market faster. Oh and let’s not forget the cost optimisation, improved business performance and less stress for all involved.",
    ],
  },
  {
    q: "What are the benefits of working with a DevOps agency?",
    paragraphs: [
      "First and foremost good DevOps practices make for happier teams. Why? Because getting quality results faster is on most people’s agenda. This includes directors, project managers, developers and support teams alike. So the benefits of DevOps are endless – from speed, efficiencies, smarter planning, increased security, increased productivity, agility, increased scalability and reliability, up to delivering better quality products in a cost-effective way – consistently.",
    ],
  },
  {
    q: "What are DevOps tools?",
    paragraphs: [
      "Tools in DevOps help engineers automate processes and work at scale. Some tools are used to orchestrate infrastructure, some to achieve continuous integration and continuous delivery and pipeline management; others are used for testing. Some of the tools we use at Just After Midnight include Ansible, Jenkins, Kubernetes, TeamCity, Octopus Deploy, Terraform and GitLab.",
    ],
  },
  {
    q: "How are DevOps and DevOps as a Service (DaaS) different?",
    paragraphs: [
      "DevOps as a Service (DaaS) focuses on delivering DevOps practices through cloud-based solutions managed by a third-party provider. While traditional DevOps relies on in-house teams to manage CI/CD, infrastructure, and automation, DaaS leverages the cloud for scalability, flexibility, and rapid implementation.",
      "With DaaS, you gain access to a cloud-based, managed service that handles your deployments, infrastructure automation, and monitoring, freeing you from building and maintaining an in-house DevOps team and allowing for quicker cloud integration and faster time to market.",
    ],
  },
];

const REVIEWS = [
  {
    slug: "the-body-coach",
    client: "The Body Coach",
    role: "CEO",
    quote: "We want our users to be able to work out at a time that suits them, day or night. I can sleep easy knowing that Just After Midnight’s team of experts are taking care of any issues with the app, so I can focus on what I do best.",
    companyUrl: "https://www.thebodycoach.com/",
    to: "https://www.justaftermidnight247.com/case-study/the-body-coach-app/",
  },
  {
    slug: "grey",
    client: "Grey",
    role: "CEO",
    quote: "Just After Midnight was recommended to Grey as a potential partner to leverage for an upcoming Super Bowl web activation the team was producing on behalf of Volvo Cars USA. Sam, Arif and team worked diligently on their side to architect a best-in-class AWS solution. The site ran without issue. I would definitely recommend JAM for any managed cloud solution!",
    companyUrl: "https://grey.com/",
    to: "https://www.justaftermidnight247.com/case-study/tums-super-bowl-campaign-2021/",
  },
  {
    slug: "dla-piper",
    client: "DLA Piper",
    role: "CEO",
    quote: "I would not hesitate to recommend JAM based on the service they have provided to us. They have been very responsive and have done so in a positive and professional fashion. The team clearly have a thorough knowledge of Sitecore and AWS and have been able to explain things to us in language we can understand.",
    companyUrl: "https://www.dlapiper.com/",
    to: "https://www.justaftermidnight247.com/case-study/dla-piper/",
  },
  {
    slug: "banyan-tree",
    client: "Banyan Tree",
    role: "Head, Information Technology",
    quote: "Quick and fast support and consulting on the overall web, DevOps and hosting needs. Very helpful as always.",
    companyUrl: "https://www.banyantree.com/",
    to: "https://www.justaftermidnight247.com/case-study/bristol-myers-squibb/",
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
    slug: "emperor",
    client: "Emperor",
    role: "Technical Director",
    quote: "Just After Midnight (JAM) has been providing us with 24/7/365 setup and support services to deliver the many financial reporting websites that we deliver each year. We count them as one of our critical trusted partners.",
    companyUrl: "https://www.emperor.co.uk/",
    to: "https://www.justaftermidnight247.com/case-study/emperor/",
  },
];

function StorySlider({ stories }) {
  const trackRef = useRef(null);
  const [arrows, setArrows] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    function measure() {
      const max = track.scrollWidth - track.clientWidth;
      setArrows({ start: track.scrollLeft <= 2, end: track.scrollLeft >= max - 2 });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [stories]);

  function step(direction) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector(".work-slide");
    const width = slide ? slide.getBoundingClientRect().width + 30 : track.clientWidth;
    track.scrollBy({ left: direction * width, behavior: "smooth" });
  }

  return (
    <div className="work-slider-container">
      <div
        className="work-slider"
        ref={trackRef}
        tabIndex="-1"
        onScroll={(event) => {
          const track = event.currentTarget;
          setArrows({
            start: track.scrollLeft <= 2,
            end: track.scrollLeft >= track.scrollWidth - track.clientWidth - 2,
          });
        }}
      >
        {stories.map((story) => (
          <div className="work-slide" key={story.client}>
            <a className="work-card" href={story.to} target="_blank" rel="noopener noreferrer">
              <div className="work-image">
                <img src={story.image} alt={`${story.client} case study`} width="768" height="320" loading="lazy" decoding="async" />
              </div>
              <div className="work-content">
                <div className="work-text">
                  <h4 className="work-client">{story.client}</h4>
                </div>
                <p className="work-summary">{story.headline}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
      <button
        type="button"
        className={`work-arrow work-arrow-left${arrows.start ? " disabled" : ""}`}
        aria-label="Previous story"
        disabled={arrows.start}
        onClick={() => step(-1)}
      >
        <svg viewBox="0 0 25 50" aria-hidden="true"><path d="M20 3L4 25l16 22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button
        type="button"
        className={`work-arrow work-arrow-right${arrows.end ? " disabled" : ""}`}
        aria-label="Next story"
        disabled={arrows.end}
        onClick={() => step(1)}
      >
        <svg viewBox="0 0 25 50" aria-hidden="true"><path d="M5 3l16 22L5 47" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
  );
}

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

export default function DevOpsConsulting() {
  useTitle("DevOps Consulting Services & Solutions | Just After Midnight");
  const { data: articles } = useApi("/api/articles");

  return (
    <>
      <section className="cloud-hero cloud-hero--photo dv-hero" aria-labelledby="dv-title">
        <div className="cost-container">
          <div className="cloud-hero__text reveal">
            <h1 id="dv-title">DevOps Consulting Services &amp; Solutions</h1>
            <p className="dv-hero__sub">A DevOps company dedicated to you</p>
            <a href="#site-footer" className="btn btn-primary">Get in touch</a>
            <div className="dv-hero__logos">
              <p>We’ve completed DevOps projects for:</p>
              <div className="dv-hero__logoRow">
                {HERO_LOGOS.map((logo) => (
                  <span key={logo.alt}><img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" /></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dv-intro" aria-labelledby="dv-intro-title">
        <div className="cost-container">
          <div className="dv-intro__grid">
            <div className="dv-intro__copy reveal">
              <h2 id="dv-intro-title">Frictionless journeys from development to deployment</h2>
              <p>We’re here to solve your DevOps challenges. Whether you’re a product company, development team, or digital agency, we help you move faster, scale smarter, and stay ahead with our DevOps as a Service offering. We handle the operational complexities, allowing you to:</p>
              <ul>
                <li>Reduce time to market by streamlining your development and deployment processes</li>
                <li>Achieve stability with proactive monitoring and best practices in cloud infrastructure</li>
                <li>Deliver new features faster with continuous integration and automation that keep your pipeline moving</li>
              </ul>
              <h4>Ready to get started?</h4>
              <p className="dv-intro__tech"><strong>Tech we work with:</strong></p>
            </div>
            <div className="dv-intro__art reveal">
              <img src="/icons/dv-rocket.webp" alt="" width="1024" height="1024" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      <section className="dv-logos" aria-label="Technology we work with">
        <div className="dv-logos__viewport">
          <div className="dv-logos__track">
            <div className="dv-logos__group">
              {TECH_LOGOS.map((logo) => (
                <img key={logo.alt} src={logo.src} alt={logo.alt} loading="lazy" decoding="async" />
              ))}
            </div>
            <div className="dv-logos__group" aria-hidden="true">
              {TECH_LOGOS.map((logo) => (
                <img key={`${logo.alt}-copy`} src={logo.src} alt="" loading="lazy" decoding="async" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <DividerUp fill="#121f3f" />

      <section className="dv-services" aria-labelledby="dv-services-title">
        <div className="cost-container">
          <div className="dv-services__intro reveal">
            <h2 id="dv-services-title">Which services can a DevOps company like ours help with?</h2>
            <p>We’re flexible. Whether you need dedicated DevOps as a service, out-of-hours support from our DevOps engineers – or DevOps as part of a broader solution, we’ve got you covered.</p>
          </div>
          <div className="dv-services__grid">
            {SERVICES.map((service) => (
              <article className="dv-services__card reveal" key={service.title}>
                <img src={service.icon} alt="" width="80" height="80" loading="lazy" decoding="async" />
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
            <article className="dv-services__card dv-services__card--cta reveal">
              <img src="/icons/dv-icon-cta.webp" alt="" width="80" height="80" loading="lazy" decoding="async" />
              <h3>Hitting the mark?</h3>
              <p>If you like what you’re hearing, there’s plenty more where that came from. Just get in touch to find out how we could help.</p>
              <a className="dv-services__btn" href="#site-footer">Give us a shout</a>
            </article>
          </div>
        </div>
      </section>

      <section className="dv-benefits" aria-labelledby="dv-benefits-title">
        <div className="cost-container">
          <div className="dv-benefits__intro reveal">
            <h2 id="dv-benefits-title">What can DevOps services do for you?</h2>
            <p>DevOps and DevSecOps allow companies to pursue their objectives quickly and efficiently. Building a robust development and deployment process takes the cap off your potential and ensures you stay competitive.</p>
          </div>
          <div className="dv-benefits__grid">
            {BENEFITS.map((benefit) => (
              <article className="dv-benefit reveal" key={benefit.title}>
                <img src={benefit.icon} alt="" width="80" height="80" loading="lazy" decoding="async" />
                <h3>{benefit.title}</h3>
                {benefit.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </article>
            ))}
          </div>
        </div>
      </section>

      <DividerUp fill="#efefef" />

      <section className="case-study-examples dv-stories" aria-labelledby="dv-stories-title">
        <div className="cost-container">
          <h2 className="dv-stories__title reveal" id="dv-stories-title">Some of our DevOps partnerships</h2>
          <StorySlider stories={STORIES} />
        </div>
      </section>

      <div className="dv-divider--navy"><DividerDown fill="#efefef" /></div>

      <section className="dv-case" aria-labelledby="dv-case-title">
        <div className="cost-container">
          <div className="dv-case__grid">
            <div className="dv-case__media reveal">
              <img src="/icons/dv-quantum.webp" alt="" width="1024" height="1024" loading="lazy" decoding="async" />
            </div>
            <span className="dv-case__sep" aria-hidden="true" />
            <div className="dv-case__copy reveal">
              <h2 id="dv-case-title">Quantum Pigeon</h2>
              <h4>DevOps-led support for a flawless beta launch</h4>
              <p>Just After Midnight provided Quantum Pigeon with 24/7 DevOps support for their AWS infrastructure, enhancing observability with Datadog and setting up real-time alerts. This proactive approach ensured rapid issue resolution, zero downtime, and allowed Quantum Pigeon’s in-house engineers to focus on faster deployments and development during high-traffic periods.</p>
              <a className="btn dv-case__btn" href="https://www.justaftermidnight247.com/case-study/quantum-pigeon/">Read case study</a>
            </div>
          </div>
        </div>
      </section>

      <div className="dv-divider--navy"><DividerUp fill="#ffffff" /></div>

      <section className="dv-why" aria-labelledby="dv-why-title">
        <div className="cost-container">
          <h2 className="dv-why__title reveal" id="dv-why-title">Why you should let us handle DevOps</h2>
          <div className="dv-why__grid">
            {WHY.map((card) => (
              <article className="dv-why__card reveal" key={card.title}>
                <img src={card.icon} alt="" width="80" height="80" loading="lazy" decoding="async" />
                <h3>{card.title}</h3>
                <span className="dv-why__rule" aria-hidden="true" />
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dv-cta" aria-labelledby="dv-cta-title">
        <div className="cost-container">
          <div className="reveal">
            <h2 id="dv-cta-title">Ready to revolutionise your development pipeline with top-tier DevOps automation, continuous delivery and DevOps tools?</h2>
            <p>Let’s work together to optimise your cloud environments, enhance your DevOps processes, and deliver high-quality software with the help of our expert DevOps engineers.</p>
            <a className="btn dv-cta__btn" href="#site-footer">Book a discovery call ➔</a>
          </div>
        </div>
      </section>

      <section className="dv-faq" aria-labelledby="dv-faq-title">
        <div className="cost-container">
          <div className="dv-faq__grid">
            <div className="dv-faq__copy">
              <h2 id="dv-faq-title">Your DevOps questions answered</h2>
              <p className="dv-faq__intro">DevOps covers a multitude of approaches and technologies. Below, we address frequently asked DevOps questions.</p>
              <div className="dv-faq__list">
                {FAQ.map((item, index) => (
                  <details className="dv-faq__item" key={item.q} open={index === 0}>
                    <summary>
                      <h3>{item.q}</h3>
                      <span className="dv-faq__icon" aria-hidden="true" />
                    </summary>
                    <div className="dv-faq__body">
                      {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                  </details>
                ))}
              </div>
            </div>
            <div className="dv-faq__media reveal">
              <img src="/icons/dv-faq-rocket.webp" alt="" width="658" height="720" loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="dv-faq__cta reveal">
            <h3>Any more questions?</h3>
            <p><strong>Want to know how we could manage your CI/CD pipeline in the cloud? Want to know the pricing for just OOH DevOps cover? Just <a href="#site-footer">get in touch</a> and one of the team will be right with you.</strong></p>
          </div>
        </div>
      </section>

      <ReviewsBand reviews={REVIEWS} />

      <InsightsBand
        title="Latest Insights from JAM"
        cta="See more articles"
        to="/insights"
        articles={articles || []}
      />
    </>
  );
}
