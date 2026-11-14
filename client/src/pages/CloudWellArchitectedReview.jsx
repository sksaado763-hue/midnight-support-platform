import { useApi } from "../lib/api";
import { useTitle } from "../lib/useReveal";
import InsightsBand from "../components/InsightsBand";
import { ContactPageForm } from "../components/Forms";

const GAINS = [
  "Maximise cloud value",
  "Boost security and reliability",
  "Innovate and deploy faster",
  "Walk away with clear, actionable fixes",
];

const BENEFITS = [
  {
    title: "Want to maximise value for money on your AWS stack",
    text: "This highlights exactly where you’re overspending, under-utilising or missing out on newer, more efficient services.",
  },
  {
    title: "Want to get your deployment times down so you can get your customers what they need quicker",
    text: "By improving how your workloads are architected, automated and monitored, you can reduce bottlenecks and shorten the path from idea to production.",
  },
  {
    title: "Want to be able to innovate faster and with less risk",
    text: "The review surfaces hidden weaknesses and provides clear fixes, giving your team the confidence to experiment, iterate and adopt new capabilities without compromising stability.",
  },
  {
    title: "Want your solution to be more reliable and more secure overall",
    text: "Security and reliability are two core pillars of the framework. You’ll receive concrete recommendations that strengthen your posture and make outages, vulnerabilities and incidents far less likely.",
  },
  {
    title: "Want to find out where you could go if you unlocked your solution’s true potential",
    text: "Many teams build only a fraction of what their architecture can support. A review shows you what’s possible if your workloads are aligned with AWS best practices.",
  },
];

const STEPS = [
  {
    icon: "/icons/war-book.svg",
    title: "1. Book your review and choose your attendees",
    text: "Book your free review and choose who’s going. We’ll bring our expert team of Well-Architected certified engineers and cloud consultants. You bring whoever needs to be there from both a technical and business perspective. This is not just a technical meeting so bring people from the business.",
  },
  {
    icon: "/icons/cloud-people-consulting.svg",
    title: "2. Attend your workshop online or in person",
    text: "We run the review as a workshop. This is where we’ll discover everything we need to know about your AWS solution and workload.",
  },
  {
    icon: "/icons/war-findings.svg",
    title: "3. Get your findings",
    text: "After we’ve got the right information, we’ll carry out your review and feedback. This takes the form of a single comprehensive document including costings of remediation work.",
  },
  {
    icon: "/icons/war-remediation.svg",
    title: "4. Execute your recommendations",
    text: "Working with us, you can then go on to make the changes that will bring you up to AWS best practices. These can be carried out by our team or yours, depending on what you decide.",
  },
];

const PILLARS = [
  {
    icon: "/icons/monitoring.webp",
    title: "The Operational Excellence Pillar",
    text: "Building for operational excellence means monitoring and developing your systems to deliver increased value and innovation. Key areas of development include automation, defining standards and practices and gaining insight.",
  },
  {
    icon: "/icons/security.png",
    title: "The Security Pillar",
    text: "Building securely means protecting your information and systems. Key areas of development include establishing ways of tracking and responding to security events, data confidentiality and integrity and using automation to tackle security issues.",
  },
  {
    icon: "/icons/war-reliability.webp",
    title: "The Reliability Pillar",
    text: "Building reliably means making sure a workload performs its intended function correctly and consistently. A reliable workload will be able to recover quickly and meet unexpected spikes in demand without issue. Key areas of development include distributed system design, recovery, and how to stay resilient in the face of change.",
  },
  {
    icon: "/icons/aws-cp-cog-arrow.png",
    title: "The Performance Efficiency Pillar",
    text: "Building with performance efficiency in mind means using resources right. Key areas of development include matching the tools and sizings to the use case and ensuring the workload is being properly monitored.",
  },
  {
    icon: "/icons/love.png",
    title: "The Cost Optimisation Pillar",
    text: "Building to optimise costs means meeting the same goals for less. Common areas of development include right-sizing, consumption models, optimising resources and building up a clear picture of where overspend is occurring.",
  },
  {
    icon: "/icons/war-sustainability.svg",
    title: "The Sustainability Pillar",
    text: "Building sustainably means reducing the environmental impact of your workloads. Key areas of development include maximising utilisation, adopting more efficient hardware and managed services, and cutting the energy and resources each workload consumes.",
  },
];

export default function CloudWellArchitectedReview() {
  useTitle("AWS Well-Architected Review | Just After Midnight");
  const { data: articles } = useApi("/api/articles");

  return (
    <>
      <section className="cloud-hero cloud-hero--photo war-hero" aria-labelledby="war-title">
        <div className="cost-container">
          <div className="cloud-hero__text reveal">
            <h1 id="war-title">AWS Well-Architected Review</h1>
            <p className="cloud-hero__sub">A roadmap to increased efficiency, lower costs and more</p>
            <a href="#war-form" className="btn btn-primary">Get in touch</a>
          </div>
        </div>
      </section>

      <section className="cost-intro war-intro" aria-labelledby="war-intro-title">
        <div className="cost-container">
          <div className="cost-intro__split">
            <div className="cost-intro__lead reveal">
              <h2 id="war-intro-title">Save up to 50% on AWS costs</h2>
              <p>As an official AWS Well-Architected Partner, we can compare your infrastructure with AWS best practices to cut costs and increase efficiency. You’ll get a report with simple actions to reduce your AWS spend, accelerate your deployments, reduce risk and bring your solution up to best-practice standards – so book your review today and start your journey.</p>
            </div>
            <span className="seo-intro-rule cost-intro__rule" aria-hidden="true" />
            <div className="cost-intro__points reveal">
              <h3 className="war-intro__points-title">Get more from your AWS environment:</h3>
              <ul className="seo-intro-points seo-intro-points--marked cost-moon-list">
                {GAINS.map((point) => (
                  <li key={point}>
                    <img className="seo-intro-mark" src="/icons/moon-list.svg" alt="" width="25" height="27" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="war-why reveal">
            <h3>Why should you consider a Well-Architected Review?</h3>
            <p>A Well-Architected Review is designed to help you get the best out of your AWS environment. Not only in the short term, but as your solution grows and evolves.</p>
            <p><strong>If you:</strong></p>
            <ul className="war-why__list">
              {BENEFITS.map((benefit) => (
                <li key={benefit.title}>
                  <strong>{benefit.title}</strong>
                  <span>{benefit.text}</span>
                </li>
              ))}
            </ul>
            <p>If any of that resonates, a Well-Architected Review is one of the most effective ways to improve your AWS environment.</p>
          </div>
        </div>
      </section>

      <div className="cost-container war-break" aria-hidden="true">
        <hr />
      </div>

      <section className="war-framework" aria-labelledby="war-framework-title">
        <div className="cost-container">
          <div className="war-framework__grid">
            <div className="war-framework__copy reveal">
              <h2 id="war-framework-title">What is the AWS Well-Architected Framework?</h2>
              <p>The Well-Architected Framework was developed by AWS to help guide customers through their cloud journey. Reviews are carried out by certified Well-Architected Partners and can focus on single or multiple workloads.</p>
              <p>Each review considers the six pillars of the Well-Architected Framework – operational excellence, security, reliability, performance efficiency, cost optimisation and sustainability – which in turn break down further into a set of design principles.</p>
              <p>From these principles, we generate actionable recommendations. No single action is pie-in-the-sky or idealistic, but together, they act as stepping stones to a complete and long-lasting transformation of your solution and the way you work.</p>
              <p>Ready to get started? Submit your details using this form to discover where you can save and improve.</p>
            </div>
            <span className="war-framework__rule" aria-hidden="true" />
            <div className="war-framework__form">
              <ContactPageForm
                formId="war-form"
                heading="Book your free review"
                intro="Tell us which AWS workloads you’d like reviewed. A Well-Architected certified engineer will reply within one working day to arrange your workshop."
                messageLabel="Which AWS workloads should we review?"
                placeholder="For example: our customer-facing API on ECS and its RDS database. We’d like to cut costs and deploy faster."
                topic="aws-well-architected-review"
                submitLabel="Book my review"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="war-steps" aria-labelledby="war-steps-title">
        <div className="cost-container">
          <h2 className="war-steps__title" id="war-steps-title">How it works</h2>
          <ol className="war-steps__grid">
            {STEPS.map((step) => (
              <li className="war-steps__item reveal" key={step.title}>
                <img src={step.icon} width="80" height="80" alt="" loading="lazy" decoding="async" />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="war-pillars" aria-labelledby="war-pillars-title">
        <div className="war-pillars__field">
          <div className="cost-container">
            <h2 className="war-pillars__title" id="war-pillars-title">The Six Pillars of AWS Well-Architected</h2>
            <div className="war-pillars__grid">
              {PILLARS.map((pillar) => (
                <article className="war-pillar reveal" key={pillar.title}>
                  <img src={pillar.icon} width="80" height="80" alt="" loading="lazy" decoding="async" />
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </article>
              ))}
              <article className="war-pillar war-pillar--jam reveal">
                <img src="/icons/aws-cp-target.png" width="80" height="80" alt="" loading="lazy" decoding="async" />
                <div>
                  <h3>The Just After Midnight Difference</h3>
                  <p>Working with us is a great foundation to build from. Because we’re both application and infrastructure specialists, and because we’re experts on all things AWS, we’re able to provide reviews that make building for better simple.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <InsightsBand title="You may also be interested in" articles={articles || []} />
    </>
  );
}
