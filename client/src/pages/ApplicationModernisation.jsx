import { useEffect, useRef, useState } from "react";
import { useApi } from "../lib/api";
import { useTitle } from "../lib/useReveal";
import InsightsBand from "../components/InsightsBand";
import ReviewsBand from "../components/ReviewsBand";

const SLOW = [
  {
    title: "A lift-and-shift mindset doesn't solve root issues",
    text: "Red light modernisation partners simply lift and shift applications without refactoring them to harness their new infrastructure. If you move a solution from EC2 to Lambda without realigning the codebase – you have the same application. But more complicated.",
  },
  {
    title: "Tech-for-tech's-sake",
    text: "You’ll hear promises like “we’ll move you to serverless” or “we’ll modernise your security model”, but unless these changes reduce cost, improve performance or strengthen compliance, they deliver little long-term value.",
  },
  {
    title: "Non-iterative, short-term wins",
    text: "The job ends when the project ends. Red light modernisation partner aims to deliver on a few simple KPIs, mark the project as complete and declare it a success. This means cutting corners to reduce cost and declaring the project a success.",
  },
];

const DIFFERENT = [
  {
    title: "A cloud-native, application-first mindset",
    text: "Green light modernisation partners modernise the architecture and application in unison. That means converting workflows to event-driven patterns, refactoring for microservices where it brings value and implementing modern CI/CD and deployment governance. We ensure the platform is built for scale, observability and importantly, future enhancements.",
  },
  {
    title: "Modernisation tied directly to business outcomes",
    text: "Every recommendation is linked to hard metrics. Green light modernisation take your security needs. Your cost concerns. Your targets for releasing new features. Then deliver an application that meets your requirements.",
  },
  {
    title: "An ongoing roadmap, not one-and-done",
    text: "Green light modernisation partners keep moving you forward. After delivering a solution that meets your long-term business objectives, we continually iterate and improve your solution at the pace of industry innovation.",
  },
];

const STEPS = [
  {
    n: 1,
    lead: "Define a destination:",
    sub: "Set core business deliverables",
    body: [
      "The first step in any journey is defining a destination. That means collaborating with you to define core business outcomes. This could be a reduction in security breaches, gaining the agility to release features within a defined schedule or a percentage reduction in TCO.",
    ],
    example: {
      tone: "blue",
      label: "Example:",
      text: "The first step in any journey is defining a destination. That means collaborating with you to define core business outcomes. This could be a reduction in security breaches, gaining the agility to release features within a defined schedule or a percentage reduction in TCO.",
    },
  },
  {
    n: 2,
    lead: "Map the journey:",
    sub: "Application portfolio assessment",
    body: [
      "Next, we carry out a thorough assessment of your application portfolio, analysing each element through the lens of your desired outcomes. This includes:",
    ],
    list: [
      {
        title: "Inventory & Classification",
        text: "Catalogue all applications and classify them by their importance to business operations and future goals",
      },
      {
        title: "Technical Evaluation",
        text: "Assess the underlying technology, integration complexity, and technical debt to identify outdated systems or inefficiencies",
      },
      {
        title: "Business Value Analysis",
        text: "Determine the criticality of each application, ensuring alignment with business goals and identifying those that no longer provide value",
      },
      {
        title: "Performance & Risk",
        text: "Evaluate performance metrics, security vulnerabilities, and compliance risks to ensure stability and security",
      },
      {
        title: "Modernisation Strategy",
        text: "Categorise applications for retention, retirement, rehosting, refactoring, or replacement based on their evaluation",
      },
    ],
    example: {
      tone: "white",
      label: "Example:",
      text: "We assess your EC2 workloads with a view to migrating to serverless. By analysing the business pattern of demand of your web server, we determine the best course of action is to refactor to microservices to cut costs while retaining EC2 to host your web app. However, in the case of your scheduled security audits and data processing tasks, we migrate to Lambda.",
    },
  },
  {
    n: 3,
    lead: "Define a route:",
    sub: "Strategic modernisation blueprint",
    body: [
      "Third, we define a clear path to your business deliverables. Detailing how each element of your portfolio will be refactored, replatformed, migrated or transformed.",
    ],
  },
  {
    n: 4,
    lead: "Assembling the journeyers:",
    sub: "Establishing governance and cross-functional teams",
    body: [
      "In this step, we establish clear governance and decision-making frameworks for effective change management. This prevents stalling based on organisational blockers and guards against the security and compliance risks that may occur when adopting new technologies.",
    ],
  },
  {
    n: 5,
    lead: "Building the right vehicle:",
    sub: "Establishing the new infrastructure and automation methods",
    body: [
      "Here we lay the foundations of your new solution, often combining IaC with DevSecOps processes to build a secure, high-velocity deployment process.",
    ],
  },
  {
    n: 6,
    lead: "Road testing our journey craft:",
    sub: "Pilot migration and validation",
    body: ["Here we begin to move low-risk workloads to the new infrastructure. We then monitor and iterate based on observation."],
    example: {
      tone: "blue",
      text: "We move your data processing workloads to Lambda. While successful, we noticed some lag in performance. We review CloudWatch logs and adjust memory allocation to the Lambda function. As a result of this test, we make a permanent change to this setting.",
    },
  },
  {
    n: 7,
    lead: "On the road:",
    sub: "Refactoring your application",
    body: [
      "We now have a solid foundation. We have established observability, monitoring and security processes both in the application functionality and within our governance framework.",
      "We have established a robust deployment process and tested multiple workloads within your new infrastructure.",
      "We are now ready to perform a staggered rollout. Testing and validating each iteration against application KPIs and the business objectives set out at the beginning of our project.",
    ],
    example: {
      tone: "blue",
      label: "Example",
      text: "After the pilot migration, the team begins a staggered rollout of the remaining services.",
    },
  },
  {
    n: 8,
    lead: "You’ve reached your destination:",
    sub: "Achieving key project targets",
    body: ["You’ve now achieved the business objectives set out at the beginning of our project."],
    example: {
      tone: "blue",
      label: "Example",
      text: "Your TCO has been reduced by 40% through the use of microservices and serverless architecture. In addition, your application is more fault-tolerant with greatly reduced deployment times.",
    },
  },
  {
    n: 9,
    lead: "Where to next?",
    sub: "Iterative, strategic improvements",
    body: [
      "Unlike some managed service providers, we’re proactive. We work with you to identify continuous improvements in line with your business objectives. We also work to keep your application future-proof as the technology landscape evolves. This includes:",
    ],
    list: [
      {
        title: "Performance Tuning",
        text: "Continuously optimise resources, adjust auto-scaling, and fine-tune cloud services based on monitoring data to resolve bottlenecks.",
      },
      {
        title: "Automation Expansion",
        text: "Introduce more automation in areas like backups, and security updates, and further deploy Infrastructure as Code (IaC) to streamline operations.",
      },
      {
        title: "Adopting New Technologies",
        text: "Gradually integrate AI/ML, edge computing, or Kubernetes for enhanced scalability and advanced functionality.",
      },
      {
        title: "Security Enhancements",
        text: "Strengthen security with ongoing reviews, implementing zero trust, and expanding automated security testing in CI/CD pipelines.",
      },
      {
        title: "Cost Optimisation",
        text: "Regularly review cloud expenses and apply further savings through right-sizing instances, using spot instances, or adopting new cloud pricing models.",
      },
    ],
  },
];

const STORIES = [
  {
    client: "Cartier",
    image: "/icons/am-logo-cartier.png",
    headline: "Cloud migration and 24/7 AWS infrastructure support for the luxury retail giant",
    to: "https://www.justaftermidnight247.com/case-study/cartier/",
  },
  {
    client: "FortyTwo",
    image: "/icons/am-logo-fortytwo.png",
    headline: "A seamless AWS migration and ongoing 24/7 support for Singapores most popular online furniture store",
    to: "https://www.justaftermidnight247.com/case-study/fortytwo/",
  },
  {
    client: "MashrMail",
    image: "/icons/am-logo-mashrmail.png",
    headline: "Optimising MashrMail's tech stack with AWS, automated deployments, and fortified security.",
    to: "https://www.justaftermidnight247.com/case-study/mashrmail/",
  },
  {
    client: "Grab",
    image: "/icons/am-logo-grab.png",
    headline: "Provisioned cost-effective AWS infrastructure build for a multinational technology company.",
    to: "https://www.justaftermidnight247.com/case-study/grab/",
  },
];

const TECH = [
  {
    icon: "/icons/am-tech-microservices.svg",
    title: "Microservices",
    text: "Microservice-based architectures are inherently scalable, fault-tolerant, and flexible, allowing services to be independently developed, deployed, and scaled.",
  },
  {
    icon: "/icons/am-tech-containerisation.svg",
    title: "Containerisation",
    text: "Containerisation packages applications with their dependencies into isolated units, ensuring consistency across environments. Containers are lightweight and portable, allowing for easy scaling and efficient resource utilisation across cloud-native environments.",
  },
  {
    icon: "/icons/am-tech-devsecops.svg",
    title: "DevSecOps",
    text: "DevSecOps integrates security into the entire software development lifecycle, automating security checks and ensuring that code is secure from development to deployment, enabling faster and safer releases.",
  },
  {
    icon: "/icons/am-tech-iac.svg",
    title: "IaC",
    text: "IaC automates the management of infrastructure through code, enabling consistent and repeatable configurations. This reduces human error and allows for quicker deployment and scaling of cloud environments.",
  },
  {
    icon: "/icons/am-tech-cicd.svg",
    title: "CI/CD",
    text: "CI/CD automates the integration of code changes and their deployment to production, enabling faster, more reliable releases with automated testing and minimal manual intervention.",
  },
  {
    icon: "/icons/am-tech-serverless.svg",
    title: "Serverless computing",
    text: "Serverless computing allows developers to focus on code while the cloud provider manages infrastructure. It automatically scales resources based on demand and only charges for actual usage, reducing operational overhead.",
  },
  {
    icon: "/icons/am-tech-observability.svg",
    title: "Observability",
    text: "Observability provides deep insights into the performance and health of cloud-native applications through metrics, logs, and traces, enabling faster detection and resolution of issues.",
  },
  {
    icon: "/icons/am-tech-cloudnative-security.svg",
    title: "Cloud-native security",
    text: "Cloud-native security involves integrating security practices throughout the lifecycle of applications, using automated tools and practices to secure workloads across distributed cloud environments.",
  },
];

const FAQ = [
  {
    q: "What are the benefits of monolith to microservices migration?",
    intro: "Monolith to microservices migration involves decomposing large, single-codebase applications (monolithic applications) into smaller, independently deployable services (microservices). Each microservice typically handles a single business function and communicates with other services via APIs.",
    lead: "Monolith to microservices migration and benefits:",
    items: [
      ["Scalability", "microservices can be scaled independently, allowing for more efficient use of resources and improved handling of varying loads"],
      ["Flexibility", "teams can develop, deploy, and update different parts of the application without impacting others, accelerating time to market and leading to enhanced customer experience"],
      ["Resilience", "a distributed system leads to better fault isolation and greater overall reliability"],
      ["Composability", "a microservice architecture enables a modern, composable approach"],
    ],
  },
  {
    q: "What are the benefits of containerisation and container orchestration?",
    intro: "Containerisation involves packaging an existing application and its dependencies into a group of containers. These lighter forms of virtualisation run consistently across any environment. Orchestration tools like Kubernetes manage containers’ deployment, scaling, and networking in line with user-defined parameters",
    lead: "Containerisation and orchestration benefits:",
    items: [
      ["Consistency", "cloud applications packaged as containers are highly environment-agnostic"],
      ["Efficiency", "containers consume fewer resources than traditional VMs"],
      ["Scalability and management", "orchestration tools automate many operational tasks, making it easier to scale applications up or down as needed and reduce overhead"],
      ["Faster development cycles", "containers align well with DevOps and CI/CD practices, speeding up development and deployment"],
    ],
  },
  {
    q: "What are the benefits of cloud adoption and migration?",
    intro: "Cloud adoption and migration involve moving applications, data, and other components from on-premise data centres to cloud platforms. This can include re-hosting, re-platforming, or re-architecting to leverage cloud-native services",
    lead: "Cloud adoption and migration benefits:",
    items: [
      ["Cost efficiency", "cloud services are generally more cost-effective and scalable than bare metal servers; accelerated adoption of serverless practices can further optimise costs"],
      ["Innovation", "a new cloud environment offers easy access to advanced services and technologies such as machine learning, analytics, and IoT"],
      ["Competitive advantage", "most mission-critical applications leverage the cloud, allowing you to stay competitive"],
      ["Security and compliance", "take advantage of built-in security and compliance features provided by cloud platforms"],
    ],
  },
  {
    q: "What are the benefits of serverless computing?",
    intro: "Serverless computing involves building a cloud platform where elements are spun up per request. This leads to highly scalable, cost-effective solutions that don’t require ongoing provisioning and maintenance",
    lead: "Serverless computing benefits:",
    items: [
      ["Cost optimisation", "serverless elements maximise efficiency and consume no resources when not in use"],
      ["Scalability", "serverless applications are inherently scalable, adjusting to meet demand seamlessly"],
      ["Developer productivity", "offloading maintenance and provisioning enables teams to focus on core application development"],
      ["Faster time to market", "writing applications as functions reduces provisioning time and speeds up development and deployment"],
    ],
  },
  {
    q: "What are the benefits of legacy system integration and refactoring?",
    intro: "Legacy system integration and refactoring involve modernising legacy systems either by integrating them with newer applications via APIs or incrementally refactoring parts of the system to improve performance and scalability",
    lead: "Legacy system integration/refactoring benefits:",
    items: [
      ["Extended life", "prolong the useful life of existing applications while incorporating modern features"],
      ["Reduced risk", "incremental improvements reduce the risks associated with large-scale migrations"],
      ["Improved performance and scalability", "targeted improvements enhance the system’s ability to handle increased loads"],
      ["Scope for experimentation", "the integration allows teams to experiment with cloud-native adoption without disrupting existing systems"],
    ],
  },
  {
    q: "What are the benefits of DevOps adoption?",
    intro: "DevOps adoption is a cultural and procedural shift promoting collaboration between development and operations teams, integrating and automating software development processes, and moving towards continuous integration and continuous delivery (CI/CD)",
    lead: "DevOps adoption benefits:",
    items: [
      ["Increased efficiency", "automate and streamline workflows to drastically reduce development time and operational costs"],
      ["Improved collaboration", "foster a culture of shared responsibility, improving product quality and time to market"],
      ["Enhanced reliability", "continuous integration and delivery leverage automation in the testing and delivery pipeline"],
      ["More granular deployments", "release features quickly and iterate rapidly to maintain a competitive advantage and meet customer demand"],
    ],
  },
];

const STATS = [
  {
    icon: "/icons/am-icon-love.png",
    title: "2555% faster lead times from commitment to deployment",
    text: "Modernise your application to scale. Companies on legacy or poorly modernised architecture struggle to meet their scaling needs. They sacrifice quality to release new features quickly. They spend too much to maintain performance. And they still experience downtime in heavy traffic conditions. Modernising your application means embracing technologies like DevOps and microservices to turbocharge feature releases.",
  },
  {
    icon: "/icons/am-icon-partner.png",
    title: "Reduce your total cost of ownership by 40%",
    text: "Modernise your application to save. Companies on legacy architectures pay more for less. Their applications don’t scale down when they’re not in demand. Their resource usage is inefficient. Slow feature releases, security breaches and downtime all add to TCO. Modernising your application means implementing event-driven architectures, containerisation and scalable, secure platforms.",
  },
  {
    icon: "/icons/am-icon-cog-arrow.png",
    title: "Reduce security breaches by 60%",
    text: "Companies on legacy architectures struggle to implement correct IAM policy. They have a large attack surface. They rely on non-automated security procedures that are prone to human error. Modernising your application means adopting zero-trust architecture and automating key security processes through DevSecOps.",
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
    companyUrl: "https://www.dlapiper.com/",
    to: "https://www.justaftermidnight247.com/case-study/dla-piper/",
  },
  {
    slug: "emperor",
    client: "Emperor",
    role: "Technical Director",
    quote: "Just After Midnight (JAM) has been providing us with 24/7/365 setup and support services to deliver the many financial reporting websites that we deliver each year. We count them as one of our critical trusted partners.",
    companyUrl: "https://www.emperor.co.uk/",
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

export default function ApplicationModernisation() {
  useTitle("Application Modernisation | Just After Midnight");
  const { data: articles } = useApi("/api/articles");

  return (
    <>
      <section className="cloud-hero cloud-hero--photo am-hero" aria-labelledby="am-title">
        <div className="cost-container">
          <div className="cloud-hero__text reveal">
            <h1 id="am-title">Legacy Application Modernisation Services</h1>
            <p className="cloud-hero__sub">Modernise your legacy application for cost efficiency and agility</p>
            <a href="#site-footer" className="btn btn-primary">Get in touch</a>
          </div>
        </div>
      </section>

      <section className="am-intro" aria-labelledby="am-intro-title">
        <div className="cost-container">
          <div className="am-prose reveal">
            <h2 id="am-intro-title">What is an application modernisation strategy?</h2>
            <p>A good application modernisation strategy is downstream of core business objectives.</p>
            <ul>
              <li>We work with key stakeholders</li>
              <li>We identify business deliverables in cost, security and release velocity</li>
              <li>We deliver your app modernisation project and we proactively iterate so that your solution stays future-proof</li>
            </ul>
            <p>Sounds like the value proposition of every other application modernisation partner?</p>
            <p>Here’s why we’re different:</p>
          </div>
        </div>
      </section>

      <section className="am-compare" aria-label="How we compare with other modernisation partners">
        <div className="cost-container">
          <div className="am-compare__grid">
            <div className="am-compare__col reveal">
              <h2>Why many partners slow you down</h2>
              <span className="am-compare__line am-compare__line--red" aria-hidden="true" />
              <p className="am-compare__lead">Not all application modernisation deliver meaningful transformation. Many replace one set of problems with another because they focus on finishing a project rather than improving the business.</p>
              {SLOW.map((item) => (
                <div className="am-compare__item" key={item.title}>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <span className="am-compare__sep" aria-hidden="true" />
            <div className="am-compare__col reveal">
              <h2>How we modernise differently</h2>
              <span className="am-compare__line am-compare__line--green" aria-hidden="true" />
              <p className="am-compare__lead">Green light application modernisation partners drive you forward:</p>
              {DIFFERENT.map((item) => (
                <div className="am-compare__item" key={item.title}>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DividerUp fill="#12203f" />

      <section className="am-timeline" aria-labelledby="am-timeline-title">
        <h2 className="sr-only" id="am-timeline-title">Our application modernisation process</h2>
        <div className="cost-container">
          <div className="am-steps">
            {STEPS.map((step) => (
              <div className={`am-step${step.n === STEPS.length ? " am-step--last" : ""}`} key={step.n}>
                <div className="am-step__aside reveal">
                  {step.example ? (
                    <div className={`am-example am-example--${step.example.tone}`}>
                      {step.example.label ? <h4>{step.example.label}</h4> : null}
                      <p>{step.example.text}</p>
                    </div>
                  ) : null}
                </div>
                <div className="am-step__road" aria-hidden="true"><span className="am-step__dot" /></div>
                <div className="am-step__main reveal">
                  {step.n === 1 ? (
                    <img className="am-step__art" src="/icons/am-icon-hand-drawing.svg" alt="" width="200" height="200" loading="lazy" decoding="async" />
                  ) : null}
                  <div className="am-step__box">
                    <div className="am-step__index">{step.n}</div>
                    <h3><strong>{step.lead}</strong><br />{step.sub}</h3>
                    <span className="am-step__tick" aria-hidden="true" />
                    {step.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {step.list ? (
                      <div className="am-step__list">
                        {step.list.map((item) => (
                          <div className="am-step__list-item" key={item.title}>
                            <h4>{item.title}</h4>
                            <p>{item.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="am-divider--navy"><DividerUp fill="#efefef" /></div>

      <section className="case-study-examples am-stories" aria-labelledby="am-stories-title">
        <div className="cost-container">
          <h2 className="am-stories__title reveal" id="am-stories-title">Read our real-world application transformation stories</h2>
          <StorySlider stories={STORIES} />
        </div>
      </section>

      <DividerDown fill="#efefef" />

      <section className="am-tech" aria-labelledby="am-tech-title">
        <div className="cost-container">
          <div className="am-tech__intro reveal">
            <h2 id="am-tech-title">Legacy application modernisation technologies</h2>
            <p>When we devise your application modernisation strategy, we start with your business objectives. Once we understand your requirements, we migrate and modernise, implementing a range of cloud-native technologies.</p>
          </div>
          <div className="am-tech__grid">
            {TECH.map((card) => (
              <article className="am-tech__cell reveal" key={card.title}>
                <img src={card.icon} alt="" width="80" height="80" loading="lazy" decoding="async" />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
            <article className="am-tech__cell reveal">
              <a className="am-tech__cta" href="#site-footer">
                <img src="/icons/am-tech-cta-hands.svg" alt="" width="80" height="80" loading="lazy" decoding="async" />
                <h3>Get started ➔</h3>
                <p>Whatever shape your modernisation journey takes, we’re along for the ride. Take the first step by getting in touch today.</p>
              </a>
            </article>
          </div>
        </div>
      </section>

      <DividerUp fill="#12203f" />

      <section className="am-faq" aria-labelledby="am-faq-title">
        <div className="am-faq__outer">
          <div className="cost-container">
          <div className="am-faq__grid">
            <div className="am-faq__copy">
              <h2 id="am-faq-title">Application Modernisation FAQ</h2>
              <div className="am-faq__list">
                {FAQ.map((item, index) => (
                  <details className="am-faq__item" key={item.q} open={index === 0}>
                    <summary>
                      <h3>{item.q}</h3>
                      <span className="am-faq__icon" aria-hidden="true" />
                    </summary>
                    <div className="am-faq__body">
                      <p>{item.intro}</p>
                      <p>{item.lead}</p>
                      <ul>
                        {item.items.map(([lead, text]) => (
                          <li key={lead}><strong>{lead}:</strong> {text}</li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            </div>
            <div className="am-faq__media reveal">
              <img src="/icons/am-rocket.webp" alt="" width="658" height="720" loading="lazy" decoding="async" />
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="am-stats" aria-labelledby="am-stats-title">
        <div className="am-stats__outer">
          <div className="cost-container">
            <h2 className="am-stats__title reveal" id="am-stats-title">What are the benefits of application modernisation?</h2>
            <div className="am-stats__grid">
              {STATS.map((card) => (
                <article className="am-stat reveal" key={card.title}>
                  <img src={card.icon} alt="" width="80" height="80" loading="lazy" decoding="async" />
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ReviewsBand reviews={REVIEWS} />

      <InsightsBand
        title="You may also be interested in"
        cta="See more articles"
        to="/insights"
        articles={articles || []}
      />
    </>
  );
}
