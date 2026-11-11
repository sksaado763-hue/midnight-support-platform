import { useState } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import TrustLogos from "../components/TrustLogos";
import CaseFeature from "../components/CaseFeature";
import CaseStudiesBand from "../components/CaseStudiesBand";
import ReviewsBand from "../components/ReviewsBand";
import GlanceBand from "../components/GlanceBand";
import ImpactBand from "../components/ImpactBand";

/* =========================================================================
   DIVIDER SVGS (Matching Live Reference)
   ========================================================================= */
function CurvedDividerDown({ fill = "#ffffff", bg = "transparent" }) {
  return (
    <div className="global-curved-divider global-curved-divider__down" style={{ background: bg, lineHeight: 0 }} aria-hidden="true">
      <svg width="1920" height="89" viewBox="0 0 1920 89" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "clamp(46px, 4.67vw, 89px)" }}>
        <path d="M0 0H915.5H1920V55L1750.82 72.623C1544.17 94.1494 1335.83 94.1495 1129.18 72.6231L790.818 37.377C584.165 15.8506 375.835 15.8505 169.182 37.3769L0 55V0Z" fill={fill} />
      </svg>
    </div>
  );
}

function CurvedDividerUp({ fill = "#ffffff", bg = "transparent" }) {
  return (
    <div className="global-curved-divider global-curved-divider__up" style={{ background: bg, lineHeight: 0 }} aria-hidden="true">
      <svg width="1920" height="73" viewBox="0 0 1920 73" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "clamp(38px, 3.8vw, 73px)" }}>
        <path d="M1920 72.9999L0 73.0012L3.42974e-06 33.7695L169.182 16.1465C375.835 -5.37986 584.165 -5.37991 790.818 16.1465L1129.18 51.3927C1335.83 72.9191 1544.16 72.9191 1750.82 51.3928L1920 33.7697L1920 72.9999Z" fill={fill} />
      </svg>
    </div>
  );
}

/* =========================================================================
   PAGE CONSTANTS & DATA (Exact 1:1 match with Live Reference)
   ========================================================================= */

const MEANS = [
  "Your uptime is protected around the clock",
  "Your in-house team is free to focus on development instead of firefighting",
  "Your customers get faster, smoother experiences – and they stick around",
  "You get proactive monitoring, clear communication and a support model that fits your business",
];

const SERVICES = [
  {
    title: "24/7 Application Support Services",
    icon: (
      <svg viewBox="0 0 80 80" width="80" height="80" fill="none" aria-hidden="true">
        <rect x="8" y="12" width="64" height="42" rx="6" stroke="#fabd14" strokeWidth="3" />
        <path d="M28 68h24M40 54v14" stroke="#fabd14" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M24 33l10 10 22-20" stroke="#fabd14" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    paras: [
      "When your application is the face of your business, you need a support team who understands the technology behind it.",
      "We provide application performance monitoring, bug triage, optimisation and incident management for custom applications, SaaS products, CMS platforms and more.",
      "We manage complex dependencies, like APIs, queues, databases and integrations, with full transparency and real-time communication with named engineers during critical events.",
    ],
  },
  {
    title: "24/7 Cloud Support Services",
    icon: (
      <svg viewBox="0 0 80 80" width="80" height="80" fill="none" aria-hidden="true">
        <path d="M22 56h36a14 14 0 0 0 2-27.8A18 18 0 0 0 24 24a14 14 0 0 0-2 32z" stroke="#fabd14" strokeWidth="3" strokeLinejoin="round" />
        <path d="M30 42l8 8 14-14" stroke="#fabd14" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    paras: [
      "We manage and monitor cloud infrastructure across AWS, Azure and GCP including hosting, networking, scaling, performance optimisation and cloud operations.",
      "Our cloud support services include infrastructure monitoring, platform performance alerts, security checks, cost and resource optimisation, incident response and recovery and a whole lot more.",
      "Your infrastructure stays secure, fast and operational. No matter the time of day.",
    ],
  },
  {
    title: "24/7 Website Support Services",
    icon: (
      <svg viewBox="0 0 80 80" width="80" height="80" fill="none" aria-hidden="true">
        <rect x="8" y="14" width="64" height="48" rx="6" stroke="#fabd14" strokeWidth="3" />
        <path d="M8 28h64" stroke="#fabd14" strokeWidth="3" />
        <circle cx="20" cy="21" r="2.5" fill="#fabd14" />
        <circle cx="28" cy="21" r="2.5" fill="#fabd14" />
        <path d="M22 40h20M22 48h32" stroke="#fabd14" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    ),
    paras: [
      "We have a speciality for keeping mission-critical websites stable, fast and secure around the clock.",
      "We monitor uptime, performance, hosting platforms, third-party tools, CDN activity, caching layers and everything else that keeps your site live.",
      "Our 24/7 website support helps businesses improve customer satisfaction, reduce downtime costs and meet the ever-rising expectations for always-online digital experiences. Perfect for WordPress, Drupal, Sitecore, headless sites, eCommerce platforms, APIs, marketing sites and high-traffic global websites.",
    ],
  },
  {
    title: "24/7 Full-Stack Support Services",
    icon: (
      <svg viewBox="0 0 80 80" width="80" height="80" fill="none" aria-hidden="true">
        <path d="M40 12l26 13-26 13-26-13 26-13z" stroke="#fabd14" strokeWidth="3" strokeLinejoin="round" />
        <path d="M14 42l26 13 26-13M14 55l26 13 26-13" stroke="#fabd14" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    ),
    paras: [
      "Full-stack support means everything: one team managing your entire digital ecosystem.",
      "Applications, websites, cloud hosting, integrations, DevOps pipelines, APIs, security, performance and everything in between.",
      "We offer support, monitoring, incident management and proactive improvements under a single SLA. We handle even the most complex multi-service environments, keeping every layer aligned, visible and supported around the clock.",
      "You name it. We watch it. If it breaks. We fix it.",
    ],
  },
];

const CASE_STUDIES = [
  {
    client: "The Body Coach",
    headline: "Protecting the biggest health app launch of the year 24/7 – without breaking a sweat",
    to: "https://www.justaftermidnight247.com/case-study/the-body-coach-app/",
    image: "/icons/gcp-Body-Coach-V2.png",
  },
  {
    client: "TUMS® Super Bowl Campaign",
    headline: "Ensuring 100% success for a major Super Bowl campaign.",
    to: "https://www.justaftermidnight247.com/case-study/tums-super-bowl-campaign-2021/",
    image: "/icons/azure-JAM-City-BG-1.webp",
  },
  {
    client: "Emperor",
    headline: "Migrating and supporting over 130 enterprise sites for a specialist digital agency",
    to: "https://www.justaftermidnight247.com/case-study/emperor/",
    image: "/icons/azure-Emperor.webp",
  },
  {
    client: "Guide Dogs",
    headline: "Working together with Guide Dogs to support their application and infrastructure",
    to: "https://www.justaftermidnight247.com/case-study/guide-dogs/",
    image: "/icons/azure-Guide-Dogs-V2.png",
  },
];

const WHY_CARDS = [
  {
    title: "Because you don’t worry about out-of-hours incidents, ever",
    text: "We follow the sun. That means teams of .NET devs and cloud engineers in every timezone. Whenever your issue, we have the right person on the job in minutes.",
  },
  {
    title: "Because you don’t worry about that API",
    text: "Or this third-party shopping cart. We’re full-stack. That means we monitor and triage anything and everything.",
  },
  {
    title: "Because you taught us",
    text: "We build intelligent runbooks based on in-depth knowledge of your technology stack. We’re tech-enabled and person-led.",
  },
  {
    title: "Because your internal team can finally focus",
    text: "Our partners love their dev teams. When you offload support, they get back to what they signed up for.",
  },
  {
    title: "Because you stay compliant and regulation-ready",
    text: "HIPAA compliance in healthcare. Data protection in legal tech. Our partners are supported to meet their industry challenges.",
  },
  {
    title: "Because your architecture is supported end-to-end",
    text: "With us leading the charge. With us holding the rear. We support complex, event-driven architectures. We also build and migrate them.",
  },
  {
    title: "Because now your DevOps pipeline stays healthy",
    text: "Our 24/7 support service extends to DevOps. We support and monitor existing pipelines, supply DevOps engineers out of hours or take the lead with DevOps as a service.",
  },
  {
    title: "Because you’ve stopped Googling",
    text: "DevOps partner. Microservices observability. Disaster recovery planning. We’re a one-and-done, buck-stopping partner.",
  },
  {
    title: "Because you have great taste in support providers",
    text: "If you like what you’re hearing, there’s plenty more where that came from. Whatever your support gap, we close it.",
  },
];

const CAPABILITIES = [
  {
    title: "Incident and response management",
    items: [
      "Incident management (IM)",
      "Root cause analysis (RCA)",
      "Incident response management",
      "Incident triage",
      "Security incident response",
    ],
  },
  {
    title: "Service continuity and recovery",
    items: [
      "Application rollbacks",
      "Restarting services",
      "Backup and restore procedures",
      "Manual scaling of resources",
    ],
  },
  {
    title: "Access and security management",
    items: [
      "IP whitelisting",
      "Access management",
      "Password resets",
      "User account provisioning",
      "User removal",
      "Access control",
    ],
  },
  {
    title: "Quality and process improvement",
    items: [
      "Service validation and testing",
      "Knowledge base management",
      "Post-incident review (PIR)",
      "Vendor liaison",
      "Third-party escalation",
    ],
  },
  {
    title: "Observability and performance",
    items: [
      "System health checks",
      "Monitoring, alerts and telemetry",
      "Performance monitoring",
      "Network diagnostics and flow analysis",
      "End-to-end latency analysis",
      "Capacity monitoring and forecasting",
    ],
  },
  {
    title: "Service management and operations",
    items: [
      "SLA management",
      "Change management",
      "Patch management",
      "Downtime reporting",
      "Outage communication",
      "Configuration management",
      "Service request management",
      "Escalation management",
    ],
  },
];

const FORD_CASE = {
  client: "Ford",
  headline: "Around-the-clock support for 40+ websites",
  paragraphs: [
    "Saving Ford a cool $40 million by consulting on platform stability and then supplying our own team to watch out for any additional issues 24/7, 365.",
  ],
  to: "https://www.justaftermidnight247.com/case-study/ford/",
  image: "/icons/gcp-Ford-V2-2.webp",
  cta: "Read case study",
};

const PACKAGES = [
  {
    tab: "Simple Reassurance",
    name: "FIRST-LINE SUPPORT",
    items: [
      "Monitoring",
      "L1 Communications",
      "<30 Minute Response Time",
    ],
    ctaText: "Select package",
    ctaHover: "Contact",
    to: "/contact?package=First-Line%20Support",
  },
  {
    tab: "Overnight & weekends",
    name: "OUT-OF-HOURS SUPPORT",
    items: [
      "Monitoring",
      "L1 Communications",
      "L2 Resolution",
      "Incident Reporting",
      "Recommendations",
      "<30 Minute Response Time",
    ],
    ctaText: "Select package",
    ctaHover: "Contact",
    to: "/contact?package=Out-of-Hours%20Support",
  },
  {
    tab: "Complete cover",
    name: "24/7 SUPPORT",
    items: [
      "Monitoring",
      "L1 Communications",
      "L2 Resolution",
      "Incident Reporting",
      "Recommendations",
      "<30 Minute Response Time",
    ],
    ctaText: "Select package",
    ctaHover: "Contact",
    to: "/contact?package=24%2F7%20Support",
    featured: true,
  },
  {
    tab: "A tailored service",
    name: "CUSTOM & ADD-ONS",
    items: [
      "Infrastructure or Application Only",
      "Faster SLA Response Times",
      "Custom Code",
      "Custom Applications",
      "DevOps Support",
      "Ticket Caps",
      "Anything else? Just ask",
    ],
    ctaText: "Get in touch",
    ctaHover: "Contact",
    to: "/contact?package=Custom",
  },
];

const FAQS = [
  {
    q: "What is application support?",
    paragraphs: [
      "Application support means supporting everything in the application layer. App support engineers will be au fait with a wide array of languages, experience platforms as well as other dev-y stuff.",
      "When we provide app support, we make sure your app stays up, performs well and keeps delivering value to your customers.",
    ],
  },
  {
    q: "What is infrastructure support?",
    paragraphs: [
      "Same deal, but for your cloud. When we take care of your infrastructure, we monitor and triage for any hiccups or service disruptions, ensuring it runs smoothly, cheaply, or however you like it. Cloud support services means everything from incident management to routine maintenance, ensuring your cloud infrastructure is always optimised.",
      "However, we also build, review, and optimise cloud infrastructure.",
      "So if you’re in the market for more than support, check out some of our other cloud services. Whether it’s integrating cloud-native services or modernising a cloud-based application, we’ve got you covered. And if you’re unsure about where to start, we offer a free consultation to help assess your needs.",
    ],
  },
  {
    q: "What is full-stack support?",
    paragraphs: [
      "Full-stack support is just the two above services combined. Although, with applications growing increasingly distributed, full-stack often means supporting 3rd-party integrations, too. That’s why Mission Control (our bespoke full-stack solution) is indispensable.",
    ],
  },
  {
    q: "Aren’t cloud support and DevOps the same thing?",
    paragraphs: [
      "Cloud/infrastructure support has some crossover with both DevOps and CloudOps. Essentially, if you’re looking to fine-tune your deployments, performance or cloud processes, we’ll be able to help; what you call it is up to you!",
    ],
  },
  {
    q: "How does it work?",
    paragraphs: [
      "Our process is simple, just get in touch and we’ll take it from there. We work out what our support team will cover and when.",
      "Your business needs set the scope of the project. Maybe you need application support and incident resolution. Maybe you only need proactive monitoring so your own support teams can pick up tickets.",
      "It’s up to you. From website security to app support, from website maintenance to the ongoing monitoring of your cloud services – our mission is to fit like a glove.",
    ],
  },
  {
    q: "Need a glossary for our packages terms?",
    terms: [
      {
        term: "Monitoring",
        definition: "Continuous tracking of your systems, applications, or cloud infrastructure to ensure optimal performance, uptime, and security. Monitoring includes real-time alerts for anomalies, potential bottlenecks, or system failures that may require immediate attention.",
      },
      {
        term: "L1 Communications",
        definition: "This refers to the first line of communication in support, dealing with basic technical issues. L1 support typically handles tasks such as troubleshooting simple problems, resetting passwords, and answering general user queries, before escalating more complex issues to higher levels.",
      },
      {
        term: "<30 Minute Response Time",
        definition: "A commitment to acknowledge and respond to any support request or issue within 30 minutes, ensuring that problems are addressed swiftly to minimise downtime and potential impact on business operations.",
      },
      {
        term: "L2 Resolution",
        definition: "Level 2 (L2) support involves more advanced troubleshooting and technical expertise, often dealing with more complex issues that L1 cannot resolve. This could include in-depth application debugging, database issues, or network performance problems.",
      },
      {
        term: "Incident Reporting",
        definition: "After resolving an issue, we provide a detailed report outlining what happened, how it was addressed, and any preventive actions that should be taken in the future. This helps in improving processes and avoiding recurring incidents.",
      },
      {
        term: "Recommendations",
        definition: "Alongside solving problems, we offer expert suggestions to optimise your infrastructure or applications. These could range from security improvements to performance enhancements, based on our analysis of your systems and their behaviour during incidents.",
      },
      {
        term: "Infrastructure or Application Only",
        definition: "You can choose to limit our support to just your cloud infrastructure or specific applications. For example, we can focus solely on maintaining your AWS environment or handle only your custom eCommerce platform, based on your needs.",
      },
      {
        term: "Faster SLA Response Times",
        definition: "If the standard <30 minute response time isn’t enough for your business, we offer customisable Service Level Agreements (SLAs) with even quicker response times to ensure issues are handled with the utmost urgency.",
      },
      {
        term: "Custom Code",
        definition: "We provide support for custom-built applications or software. This means our team is skilled in understanding, troubleshooting, and optimising code that isn’t part of off-the-shelf solutions, ensuring your unique systems run smoothly.",
      },
      {
        term: "Custom Applications",
        definition: "Beyond just supporting standard platforms, we specialise in supporting fully bespoke applications. Whether your app is designed in-house or by a third-party developer, we ensure it’s maintained and optimised according to your specific needs.",
      },
      {
        term: "DevOps Support",
        definition: "Our DevOps support focuses on managing and automating your software development pipelines and infrastructure. This includes Continuous Integration/Continuous Deployment (CI/CD), infrastructure as code (IaC), and other tools that streamline operations and enable faster, more reliable releases.",
      },
      {
        term: "Ticket Cap",
        definition: "If you want to manage the number of support requests, we can set a cap on how many tickets we’ll handle within a given time frame. This allows you to control costs and prioritise critical issues while leaving routine tasks to your in-house team.",
      },
    ],
  },
  {
    q: "More questions?",
    paragraphs: [
      "Just drop us a line to see how we can help. A member of our team will be right with you.",
    ],
  },
];

const VALUE_CARDS = [
  {
    title: "Protect your revenue and reputation; say goodbye to downtime",
    icon: (
      <svg viewBox="0 0 64 64" width="64" height="64" fill="none" aria-hidden="true">
        <path d="M32 6L52 14v16c0 14-8 24-20 28C20 54 12 44 12 30V14l20-8z" stroke="#fabd14" strokeWidth="3" strokeLinejoin="round" />
        <path d="M22 30l8 8 14-14" stroke="#fabd14" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "The average cost of downtime is $5,600 per minute. We’re not a budget option. But we’re cheaper than that. For less than a rough quarter million per hour, you could invest in a full-stack support service to ensure smooth delivery.",
  },
  {
    title: "Innovate with confidence; take the leash off your team",
    icon: (
      <svg viewBox="0 0 64 64" width="64" height="64" fill="none" aria-hidden="true">
        <path d="M32 54s-18-11-18-24a12 12 0 0 1 24-4 12 12 0 0 1 24 4c0 13-18 24-18 24z" stroke="#fabd14" strokeWidth="3" strokeLinejoin="round" />
        <path d="M24 30l6 6 12-12" stroke="#fabd14" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: "When your team aren’t dealing with patching, bugs, incidents, rollbacks, 5 am meltdowns and general chaos – they can make some pretty neat stuff. Whether you’re a SaaS product or an eCommerce brand. Whether it’s about new features or fabulous dynamic content. You didn’t hire a team to down tools and fix bugs. We did. And they’re great at it.",
  },
  {
    title: "Lower your costs; boost your performance",
    icon: (
      <svg viewBox="0 0 64 64" width="64" height="64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="24" stroke="#fabd14" strokeWidth="3" />
        <path d="M32 18v28M39 24c-2-2.5-5.5-3-8.5-2-3.5 1.3-4.5 5.5-1.3 7.5 3.5 2.2 9.5 1.8 9.5 6 0 3.3-4 5-8 4-2.2-.5-3.8-1.8-4.7-3.3" stroke="#fabd14" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    text: "Everyone’s favourite oxymoron. Pay less, get better stuff. The fact is few have really embraced cloud native. And there’s a very real possibility that there are cost savings to be had. Alongside a boost in performance. If you’re not a fully modularised, microservice serverless wonder – you could be. And if you already are, you need someone like us to support you, anyway.",
  },
];

const INDUSTRIES = [
  {
    title: "SaaS & Digital Products",
    paragraphs: [
      "For SaaS platforms, performance and uptime are the product. Users expect instant response times, seamless onboarding and zero disruption. If they don’t get it, churn follows fast. But you know all this.",
      "We provide always-on monitoring, real-time incident response and full-stack visibility across your application, APIs, integrations and cloud infrastructure.",
      "With tight SLAs, global coverage and deep support for modern architectures (microservices, serverless, containers), we keep your platform reliable while your team focuses on shipping new features, not firefighting.",
    ],
  },
  {
    title: "Healthcare & HealthTech",
    paragraphs: [
      "If you’re operating in healthcare, you’re operating in one of the most regulated spaces in the world. Healthcare and HealthTech organisations must balance availability, security and regulatory compliance, all while supporting critical patient-facing and clinician-facing systems.",
      "We provide round-the-clock support designed for sensitive, highly audited environments. Our team delivers real-time monitoring, rapid incident response, rigorous access control and infrastructure management that supports HIPAA, GDPR and local regulatory frameworks.",
      "Whether you’re scaling a telemedicine product, securing patient portals or maintaining hospital-grade integrations, we keep your digital services reliable, resilient and compliant 24/7.",
    ],
  },
  {
    title: "Legal & LegalTech",
    paragraphs: [
      "Legal platforms operate in one of the tightest regulatory environments, where uptime, data integrity and confidentiality are non-negotiable.",
      "We deliver 24/7 monitoring, incident management, infrastructure support and secure operational processes across case-management systems, client portals, document platforms and custom LegalTech applications.",
      "With experience supporting organisations handling sensitive, jurisdiction-specific data, we help maintain availability, compliance and trust. Even as your systems evolve.",
    ],
  },
  {
    title: "Retail & eCommerce",
    paragraphs: [
      "High-traffic trading windows, flash sales and unpredictable demand mean uptime isn’t negotiable. Every second of slow performance affects conversions, customer satisfaction and revenue.",
      "We provide always-on monitoring, rapid incident management and full-stack visibility across your storefront, APIs, payments and inventory integrations.",
      "Whether you’re running a modern composable stack or a legacy platform with multiple moving parts, we keep your customer experience fast, stable and secure, day, night and peak season.",
    ],
  },
  {
    title: "Agencies",
    paragraphs: [
      "Agencies love bold ideas. Your clients love reliability. Your team can’t be awake 24/7. And that’s where we come in.",
      "We provide around-the-clock cover for complex client websites, campaigns, apps and cloud platforms. From high-traffic campaigns to enterprise CMS builds, we monitor, triage and resolve issues while you sleep, pitch or deliver the next sprint.",
      "We integrate smoothly with your in-house developers and workflows, giving your clients uptime insurance and giving your team the breathing room they need.",
    ],
  },
  {
    title: "Financial Services & FinTech",
    paragraphs: [
      "In financial services, downtime isn’t just inconvenient. It damages trust. Platforms must be stable, fast and secure while meeting strict regulatory requirements and handling sensitive customer data.",
      "We deliver round-the-clock support built for high-stakes environments. That includes advanced monitoring, rapid incident triage, tight SLAs, secure operational practices and support for identity, payment and fraud-prevention integrations.",
      "Whether you’re powering transactions, customer portals or mobile banking apps, we help ensure reliability and compliance go hand in hand.",
    ],
  },
  {
    title: "Government & Public Sector",
    paragraphs: [
      "Government platforms face unique pressures: high visibility, strict compliance, legacy systems, multi-vendor environments and unpredictable spikes in citizen demand.",
      "We provide full-stack monitoring, rapid response and support tailored to public-sector operations. Our engineers understand the importance of transparency, system resilience and secure access controls.",
      "From public-facing portals to critical internal systems, we help government teams maintain reliable digital services without adding pressure to in-house staff.",
    ],
  },
  {
    title: "Manufacturing & Logistics",
    paragraphs: [
      "Manufacturing and supply-chain operations depend on platforms that can’t go offline. Warehouse management systems to tracking portals, ordering interfaces and internal applications… to name a few.",
      "We support the digital backbone that keeps products moving. With proactive monitoring, 24/7 incident response and deep support for complex integrations (ERP, IoT feeds, APIs, data pipelines), we help ensure continuity, accuracy and real-time visibility. You stay efficient, even when demand spikes or systems evolve.",
    ],
  },
];

const GLANCE = [
  {
    q: "What technologies do you support?",
    a: (
      <>
        We support cloud platforms (<strong>AWS, Azure, GCP, Alibaba Cloud</strong>), CMS and DXP platforms (<strong>Sitecore, Kentico, Umbraco, AEM, Optimizely, WordPress, Drupal, Magento</strong>), custom-built applications, edge/CDN networks, and third-party integrations including APIs.
      </>
    ),
  },
  {
    q: "What support windows are available?",
    a: (
      <>
        <strong>24/7/365</strong> support, out-of-hours support and overnight support, weekends-only support, or a custom schedule built around your needs.
      </>
    ),
  },
  {
    q: "What functions does your support team cover?",
    a: "Our support covers monitoring and alerting, incident management and triage, root cause analysis (RCA), SRE and DevOps support, observability, security incident response, backup and recovery, change and patch management, and third-party vendor escalation.",
  },
  {
    q: "What industries do you support?",
    a: "We work with businesses and organisations in SaaS, eCommerce, healthtech, legaltech, fintech, government, manufacturing, logistics, and digital agencies – and many more.",
  },
  {
    q: "What security accreditations do you hold?",
    a: (
      <>
        We are <strong>ISO 27001</strong> certified, <strong>Cyber Essentials Plus</strong> verified, and <strong>PCI DSS</strong> compliant.
      </>
    ),
  },
];

const IMPACT = {
  q: "What are the impacts of incidents on teams and revenue?",
  a: "According to industry sources, downtime costs businesses between $540,000 (Splunk, The Hidden Costs of Downtime) and $2 million (New Relic, Observability Forecast 2025) per hour for many high-impact outages. Incidents also consume significant engineering capacity: the median engineering team spends 30% of its time addressing disruptions (New Relic, Observability Forecast 2024).",
  sourcesHead: "Sources",
  sources: [
    "Splunk, The Hidden Costs of Downtime (2000 Global Executives surveyed)",
    "New Relic, Observability Forecast 2025 (1,700 global technology professionals surveyed)",
    "New Relic Observability Forecast 2024 (1,700 global technology professionals surveyed)",
  ],
};

/* =========================================================================
   SUPPORT PAGE COMPONENT
   ========================================================================= */

export default function Support() {
  useTitle("24/7 Support Services for Applications, Websites & Cloud | Just After Midnight");
  const [openIndustry, setOpenIndustry] = useState(0);

  return (
    <>
      {/* SECTION 1: HERO BANNER */}
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
          <h1 className="page-hero-title support-hero-title reveal">24/7 Support Services for Applications, Websites &amp; Cloud</h1>
          <p className="page-hero-sub support-hero-sub reveal">Around-the-clock reliability for brands, agencies and digital products</p>
          <div className="hero-actions reveal">
            <a href="#packages" className="btn btn-primary support-hero-cta">View packages <span aria-hidden="true">➔</span></a>
          </div>
          <div className="support-hero-trust reveal">
            <p className="trust-label">Trusted by:</p>
            <TrustLogos />
          </div>
        </div>
      </section>

      {/* SECTION 2 & 3: INTRO (SEO TEXT BLOCK) & DIVIDER */}
      <CurvedDividerDown fill="#ffffff" bg="#12203f" />

      <section className="support-intro" style={{ background: "#ffffff", padding: "80px 0" }}>
        <div className="container support-intro-grid">
          <div className="support-intro-copy reveal">
            <h2>Always-on support for mission-critical digital platforms</h2>
            <p>We’re Just After Midnight, specialists in 24/7 website support, application support and cloud support for teams that can’t afford downtime.</p>
            <p>Our job is simple: we provide tech-enabled, 24/7 support for mission-critical, customer-facing digital platforms. Our support team monitors, manages and resolves technical issues across every layer of your stack: the website, the app, the cloud infrastructure and every third-party integration in between.</p>
            <p>With full transparency, real engineers and industry-leading response times, we keep your platforms online, fast, secure and performing.</p>
          </div>
          <div className="means-card reveal">
            <h3>That means:</h3>
            <ul>
              {MEANS.map((line) => (
                <li key={line}>
                  <svg className="means-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <circle cx="16" cy="16" r="14.6" stroke="var(--amber)" strokeWidth="2.4" />
                    <path d="M9.5 17l4.5 4.5L28 6" stroke="var(--amber)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4 & 5: OUR SUPPORT SERVICES & DIVIDER */}
      <CurvedDividerDown fill="#12203f" bg="#ffffff" />

      <section className="svc-band" style={{ background: "#12203f", padding: "80px 0 100px" }}>
        <div className="container">
          <div className="svc-head" style={{ paddingInline: 0, marginBottom: "40px" }}>
            <h2 className="band-title reveal" style={{ color: "#ffffff", fontSize: "32px", fontWeight: 900 }}>Our support services</h2>
            <div style={{ width: "56px", height: "4px", background: "#fabd14", borderRadius: "2px", margin: "0 0 22px" }} />
            <p className="band-sub reveal" style={{ color: "#c2ccde" }}>Pick your stack. Pick your coverage.</p>
            <p className="band-sub reveal" style={{ color: "#c2ccde" }}>Just overnights? Weekends? 24 hours a day, 7 days a week? We can do it all.</p>
            <p className="band-sub band-sub--last reveal" style={{ color: "#c2ccde" }}>Each service is delivered by our global support team, following a proven incident management process and using industry-leading monitoring technologies.</p>
          </div>
          <div className="svc-grid">
            {SERVICES.map((service) => (
              <article className="svc-card reveal" key={service.title} style={{ background: "#1a2b4e", border: "1px solid #e7e7e4", borderRadius: "14px", padding: "30px" }}>
                <span className="svc-icon" style={{ display: "block", marginBottom: "16px" }}>{service.icon}</span>
                <h3 style={{ color: "#ffffff", fontSize: "20px", fontWeight: 800, margin: "0 0 12px" }}>{service.title}</h3>
                <span className="svc-rule" aria-hidden="true" style={{ width: "44px", height: "3px", background: "#fabd14", borderRadius: "2px", margin: "0 0 22px" }} />
                {service.paras.map((para, idx) => (
                  <p key={idx} style={{ color: "#ffffff", lineHeight: 1.6, marginBottom: idx === service.paras.length - 1 ? "24px" : "15px" }}>{para}</p>
                ))}
                <a href="#packages" className="btn btn-primary svc-cta" style={{ marginTop: "auto", background: "#fabd14", color: "#12203f", fontWeight: 800, borderRadius: "8px", padding: "11px 22px" }}>
                  View packages <span aria-hidden="true">➔</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 & 7: NEED ONGOING MAINTENANCE, TOO? & DIVIDER */}
      <CurvedDividerDown fill="#ffffff" bg="#12203f" />

      <section className="small-cta" style={{ background: "#ffffff", padding: "70px 0" }}>
        <div className="container" style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          <h2 className="reveal" style={{ color: "#12203f", fontSize: "32px", fontWeight: 800, marginBottom: "20px" }}>Need ongoing maintenance, too?</h2>
          <p className="reveal" style={{ color: "#334155", fontSize: "16px", lineHeight: "28px", marginBottom: "32px" }}>
            We’re proactive about performance. Our 24/7 application support, website support and cloud support can be paired with ongoing managed services, ensuring your cloud environment is optimised, keeping your site up-to-date and delivering high performance.
          </p>
          <div className="reveal">
            <Link to="/cloud" className="btn" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#132140", color: "#ffffff", fontFamily: "Montserrat, sans-serif", fontWeight: 900, fontSize: "15px", padding: "16px 28px", borderRadius: "6px", textDecoration: "none" }}>
              Learn about Managed Services <span aria-hidden="true">➔</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8 & 9: READ OUR CASE STUDIES & DIVIDER */}
      <CurvedDividerDown fill="#f8fafd" bg="#ffffff" />

      <div style={{ background: "#f8fafd", padding: "40px 0 20px" }}>
        <CaseStudiesBand title="Read our case studies" studies={CASE_STUDIES} />
      </div>

      {/* SECTION 10: WHY WE'RE THE BEST (9 CARDS ON DARK NAVY, CARD 9 CANARY YELLOW) */}
      <CurvedDividerDown fill="#111a2b" bg="#f8fafd" />

      <section className="aws-why-section" style={{ background: "#111a2b", padding: "90px 0 110px" }}>
        <div className="container">
          <div className="why-intro reveal" style={{ maxWidth: "820px", margin: "0 auto 54px", textAlign: "center" }}>
            <h2 style={{ color: "#fabd14", fontSize: "36px", fontWeight: 800, marginBottom: "20px" }}>Why we’re the best</h2>
            <p style={{ color: "#ffffff", fontSize: "16px", lineHeight: "28px", fontWeight: 300 }}>
              A bold claim. But not a baseless one. We were founded to do 24/7 support. And we’ve done it pretty successfully for the past near-decade. We’ve worked with global brands on mission-critical sites. We’ve supported hyperscale SaaS products. We’ve helped major software companies deploy and deliver their products. This is why we’re the best:
            </p>
          </div>
          <div className="aws-why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {WHY_CARDS.map((card, idx) => {
              const isLast = idx === WHY_CARDS.length - 1;
              if (isLast) {
                return (
                  <article
                    className="aws-why-card reveal"
                    key={idx}
                    style={{
                      background: "#fabd14",
                      borderRadius: "12px",
                      padding: "32px",
                      border: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <h4 style={{ color: "#12203f", fontSize: "18px", fontWeight: 800, lineHeight: 1.35, marginBottom: "14px" }}>
                      {card.title}
                    </h4>
                    <p style={{ color: "#12203f", fontSize: "15px", lineHeight: "24px", fontWeight: 400, margin: "0 0 28px" }}>
                      {card.text}
                    </p>
                    <a
                      href="#packages"
                      className="btn"
                      style={{
                        marginTop: "auto",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "#12203f",
                        color: "#ffffff",
                        padding: "12px 24px",
                        borderRadius: "6px",
                        fontWeight: 700,
                        fontSize: "14px",
                        textDecoration: "none",
                      }}
                    >
                      View packages <span aria-hidden="true">➔</span>
                    </a>
                  </article>
                );
              }

              return (
                <article
                  className="aws-why-card reveal"
                  key={idx}
                  style={{
                    background: "#122140",
                    borderRadius: "12px",
                    padding: "32px",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <h4 style={{ color: "#fabd14", fontSize: "18px", fontWeight: 700, lineHeight: 1.35, marginBottom: "14px" }}>
                    {card.title}
                  </h4>
                  <p style={{ color: "#ffffff", fontSize: "15px", lineHeight: "24px", fontWeight: 300, margin: 0 }}>
                    {card.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 11 & 12: 24/7 SUPPORT SERVICE CAPABILITIES & DIVIDER */}
      <CurvedDividerDown fill="#ffffff" bg="#111a2b" />

      <section className="cap-band" style={{ background: "#ffffff", padding: "80px 0 90px" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
            <h2 style={{ fontWeight: 900, fontSize: "34px", lineHeight: 1.15, color: "#16264a", margin: "0 0 14px" }}>
              24/7 support service capabilities
            </h2>
            <div style={{ width: "64px", height: "4px", background: "#fabd14", borderRadius: "2px", margin: "0 auto 16px" }} />
            <p style={{ fontSize: "17px", lineHeight: 1.6, color: "#42506b", margin: 0 }}>
              If your team can’t be everywhere at once, that’s where we step in.
            </p>
          </div>
          <div className="cap-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {CAPABILITIES.map((group) => (
              <article className="cap-card reveal" key={group.title} style={{ background: "#f7f6f3", border: "1px solid #ececea", borderRadius: "14px", padding: "30px 32px" }}>
                <h3 style={{ fontWeight: 800, fontSize: "18px", lineHeight: 1.3, color: "#16264a", margin: "0 0 12px" }}>{group.title}</h3>
                <div style={{ width: "40px", height: "3px", background: "#fabd14", borderRadius: "2px", margin: "0 0 20px" }} />
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {group.items.map((item) => (
                    <li key={item} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "13px" }}>
                      <span style={{ color: "#e0a200", fontWeight: 900, fontSize: "15px", lineHeight: 1.5, flex: "none" }}>✓</span>
                      <span style={{ fontSize: "15px", lineHeight: 1.5, color: "#42506b" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13 & 14: CASE STUDY FORD & DIVIDER */}
      <CurvedDividerDown fill="#12203f" bg="#ffffff" />

      <CaseFeature study={FORD_CASE} variant="wide" />

      {/* SECTION 15, 16 & 17: PACKAGES & PRICING */}
      <CurvedDividerDown fill="#ffffff" bg="#12203f" />

      <section className="pkg-intro" id="packages" style={{ background: "#ffffff", padding: "70px 0 20px" }}>
        <div className="container">
          <div className="pkg-intro-copy reveal" style={{ maxWidth: "840px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "36px", fontWeight: 800, color: "#12203f", marginBottom: "18px" }}>Our service packages</h2>
            <p style={{ fontSize: "16px", lineHeight: "28px", color: "#475569" }}>
              All plans include monitoring, alerting, incident response and support from senior engineers. Select the tier that matches your requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="pkg-table" style={{ background: "#ffffff", padding: "20px 0 60px" }}>
        <div className="container">
          <div className="pkg-grid">
            {PACKAGES.map((pkg) => (
              <div className={`pkg-col${pkg.featured ? " is-featured" : ""}`} key={pkg.name}>
                <div className="pkg-tab">{pkg.tab}</div>
                <h2 className="pkg-name">{pkg.name}</h2>
                <ul className="pkg-list">
                  {pkg.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link to={pkg.to} className="btn btn-primary pkg-cta">
                  <span className="pkg-cta-hover">{pkg.ctaHover}</span>
                  <span className="pkg-cta-text">{pkg.ctaText}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pkg-note" style={{ background: "#ffffff", padding: "0 0 60px" }}>
        <div className="container" style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#12203f", marginBottom: "16px" }}>Pricing</h3>
          <p style={{ color: "#334155", fontSize: "15px", lineHeight: "26px", marginBottom: "14px" }}>
            You only pay for what you actually need. No generic pricing. Tell us a bit about your environment and we’ll send a personalised quote within 24 hours.
          </p>
          <p style={{ color: "#334155", fontSize: "15px", lineHeight: "26px", marginBottom: "14px" }}>
            Our four tiers of support can fit any brand, agency or enterprise like a glove. Need first-line support for a hundred sites or a custom solution for one piece of your stack? We can make it work.
          </p>
          <p style={{ color: "#334155", fontSize: "15px", lineHeight: "26px", marginBottom: "14px" }}>
            We’re the go-to support people for brands and their agencies – and you don’t earn a moniker like that without a little flexibility. Whether you need weekly or monthly reporting, a DevOps engineer to supervise out-of-hours deployments or 24/7 service desk cover for a custom digital product, chances are, we’ve been there, done that and worn the proverbial T-shirt.
          </p>
          <p style={{ color: "#334155", fontSize: "15px", lineHeight: "26px", margin: 0 }}>
            <strong>Need build solutions, not support?</strong> If you’re more interested in refactoring or modernising your infrastructure, check out <Link to="/cloud" style={{ color: "#fabd14", fontWeight: 700, textDecoration: "underline" }}>our solutions page</Link>.
          </p>
        </div>
      </section>

      {/* SECTION 18 & 19: FAQ & DIVIDER */}
      <section className="support-faq" style={{ background: "#f8fafd", padding: "80px 0" }}>
        <div className="container support-faq-grid">
          <div className="support-faq-col">
            <h2 className="reveal" style={{ fontSize: "36px", fontWeight: 800, color: "#12203f", marginBottom: "18px" }}>24/7 Support FAQ</h2>
            <p className="support-faq-intro reveal" style={{ fontSize: "16px", lineHeight: "26px", color: "#475569", marginBottom: "36px" }}>
              For a no-nonsense look at what we support, take a look at our packages. Still have questions? Here are the answers to our most common ones:
            </p>
            <div className="faq-list reveal">
              {FAQS.map((faq, i) => (
                <details className="faq-item" key={faq.q} open={i === 0}>
                  <summary>
                    {faq.q}
                    <span className="faq-plus" aria-hidden="true" />
                  </summary>
                  <div className="faq-answer">
                    {faq.paragraphs?.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                    {faq.terms && (
                      <dl>
                        {faq.terms.map(({ term, definition }) => (
                          <div key={term} style={{ marginBottom: "16px" }}>
                            <dt style={{ fontWeight: 700, color: "#12203f", marginBottom: "4px" }}>{term}:</dt>
                            <dd style={{ margin: 0, color: "#475569", lineHeight: 1.6 }}>{definition}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
          <div className="support-faq-art reveal" aria-hidden="true">
            <svg viewBox="0 0 727 620" role="presentation" focusable="false">
              <defs>
                <mask id="faq-moon">
                  <rect x="0" y="0" width="727" height="620" fill="#ffffff" />
                  <circle cx="203" cy="130" r="48" fill="#000000" />
                </mask>
              </defs>
              <ellipse cx="235" cy="612" rx="186" ry="16" fill="rgba(19,33,64,0.10)" />
              <ellipse cx="582" cy="572" rx="130" ry="15" fill="rgba(19,33,64,0.10)" />
              <path d="M582 470V330" stroke="var(--sky)" strokeWidth="34" strokeLinecap="round" />
              <rect x="470" y="470" width="224" height="96" rx="14" fill="#132140" />
              <ellipse cx="582" cy="470" rx="112" ry="22" fill="var(--navy-soft)" />
              <g className="faq-lift">
                <circle cx="235" cy="150" r="78" fill="rgba(250,189,20,0.14)" />
                <circle cx="235" cy="150" r="58" fill="var(--amber)" mask="url(#faq-moon)" />
                <path d="M582 330 346 178" stroke="var(--sky)" strokeWidth="28" strokeLinecap="round" />
                <circle cx="346" cy="178" r="15" fill="#132140" />
                <path d="M346 178C336 152 318 128 286 118" stroke="#132140" strokeWidth="14" fill="none" strokeLinecap="round" />
                <path d="M346 178c-16 18-40 22-66 12" stroke="#132140" strokeWidth="14" fill="none" strokeLinecap="round" />
              </g>
              <circle cx="582" cy="330" r="21" fill="#132140" />
            </svg>
          </div>
        </div>
      </section>

      {/* SECTION 20 & 21: VALUE PROPOSITIONS & DIVIDER */}
      <CurvedDividerDown fill="#12203f" bg="#f8fafd" />

      <section className="support-value-section" style={{ background: "#12203f", padding: "80px 0 100px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2 className="reveal" style={{ color: "#fabd14", fontSize: "32px", fontWeight: 800 }}>
              Protect, innovate and perform with our 24/7 support service
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {VALUE_CARDS.map((card, idx) => (
              <article className="reveal" key={idx} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "34px 28px" }}>
                <div style={{ marginBottom: "20px" }}>{card.icon}</div>
                <h3 style={{ color: "#fabd14", fontSize: "19px", fontWeight: 700, lineHeight: 1.35, marginBottom: "16px" }}>
                  {card.title}
                </h3>
                <p style={{ color: "#ffffff", fontSize: "15px", lineHeight: "25px", fontWeight: 300, margin: 0 }}>
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 22 & 23: REVIEWS & DIVIDER */}
      <CurvedDividerDown fill="#ffffff" bg="#12203f" />

      <div style={{ background: "#ffffff", padding: "40px 0" }}>
        <ReviewsBand />
      </div>

      {/* SECTION 24 & 25: INDUSTRIES WE SUPPORT & DIVIDER */}
      <CurvedDividerDown fill="#12203f" bg="#ffffff" />

      <section className="ind-band" id="industries" style={{ background: "#12203f", padding: "80px 0" }}>
        <div className="container ind-band-grid">
          <div className="ind-band-copy reveal">
            <h1 style={{ color: "#ffffff", fontSize: "36px", fontWeight: 800, marginBottom: "16px" }}>Industries we support</h1>
            <p style={{ color: "#ffffff", fontSize: "16px", lineHeight: "26px", marginBottom: "32px" }}>
              Every organisation is different. And that’s exactly why we build support around you.
            </p>
            <div className="ind-acc">
              {INDUSTRIES.map((industry, index) => {
                const open = openIndustry === index;
                return (
                  <div className={`ind-item${open ? " is-open" : ""}`} key={industry.title}>
                    <button
                      type="button"
                      className="ind-head"
                      aria-expanded={open}
                      aria-controls={`industry-${index}`}
                      onClick={() => setOpenIndustry(open ? -1 : index)}
                    >
                      <h3 style={{ color: "#e34168", fontSize: "18px", fontWeight: 700 }}>{industry.title}</h3>
                      <span className="ind-plus" aria-hidden="true" style={{ color: "#e34168" }} />
                    </button>
                    <div className="ind-body" id={`industry-${index}`} role="region">
                      <div className="ind-body-inner">
                        {industry.paragraphs.map((text, pidx) => (
                          <p key={pidx} style={{ color: "#ffffff", fontSize: "15px", lineHeight: "24px", marginBottom: "12px" }}>{text}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="ind-art reveal" aria-hidden="true" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/icons/azure-Rocket-stack2.webp" alt="Rocket" style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }} />
          </div>
        </div>
        <div className="container how-it-works-cta reveal" style={{ marginTop: "48px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "28px 36px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "24px" }}>
            <h3 style={{ color: "#ffffff", fontSize: "20px", fontWeight: 800, margin: 0, minWidth: "180px" }}>Not listed here?</h3>
            <p style={{ color: "#ffffff", fontSize: "15px", lineHeight: "24px", margin: 0, flex: 1 }}>
              Don’t fit neatly into a category? That’s normal. We’ve supported hundreds of unique platforms.{" "}
              <Link to="/contact" style={{ color: "#fabd14", fontWeight: 700, textDecoration: "underline" }}>
                Reach out
              </Link>{" "}
              and we’ll show you how we can support yours.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 26: GLANCE BAND */}
      <CurvedDividerDown fill="#ffffff" bg="#12203f" />

      <GlanceBand eyebrow="At a glance" title="Just After Midnight’s support offering" items={GLANCE} />

      {/* SECTION 27: IMPACTS BAND */}
      <ImpactBand
        question={IMPACT.q}
        answer={IMPACT.a}
        sourcesHead={IMPACT.sourcesHead}
        sources={IMPACT.sources}
      />
    </>
  );
}
