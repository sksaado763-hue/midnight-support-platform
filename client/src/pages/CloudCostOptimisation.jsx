import { useApi } from "../lib/api";
import { useTitle } from "../lib/useReveal";
import InsightsBand from "../components/InsightsBand";

const REASONS = [
  {
    icon: "/icons/why-money-saving.svg",
    title: "Reduce your TCO",
    text: "Reducing the cost of your cloud environment can lead to huge savings, enabling you to channel revenue to new fronts and grow your business.",
  },
  {
    icon: "/icons/why-cloud-network.svg",
    title: "Unlock efficiency",
    text: "Cost optimisation can unlock related efficiencies and enhance the overall functionality of your cloud environment.",
  },
  {
    icon: "/icons/why-cloud-strategy.svg",
    title: "Get started on the path to cloud-native",
    text: "Finding cloud-native, cost-efficient alternatives sets you on the path to a modern infrastructure, future-proofing your cloud environment.",
  },
  {
    icon: "/icons/why-people-partner.svg",
    title: "Work with the experts",
    text: "With a global team of cloud and application experts, we look at cost optimisation from a three-hundred-and-sixty degree perspective.",
  },
];

const PROVIDERS = [
  {
    logo: "/icons/cloud-cost-aws.webp",
    title: "AWS Cost Optimisation",
    text: "As AWS Advanced Consulting and Well-Architected Review Partners, we’re perfectly placed to help you get the most out of your AWS infrastructure.",
  },
  {
    logo: "/icons/cloud-cost-azure.webp",
    title: "Azure Cost Optimisation",
    text: "As a certified Microsoft Partner with a great track record optimising Azure cloud environments, we’ve got you covered.",
  },
  {
    logo: "/icons/cloud-cost-gcp.webp",
    title: "GCP Cost Optimisation",
    text: "With a team of certified Google Cloud engineers and a wealth of experience optimising this unique platform, we’ll be able to drive down costs.",
  },
  {
    logo: "/icons/cloud-cost-alibaba.webp",
    title: "Alibaba Cloud Cost Optimisation",
    text: "Want to break into new markets without breaking the bank? Work with a unique partner with real-world experience optimising Alibaba Cloud infrastructure.",
  },
];

const LIST_POINTS = [
  "Cloud-native expertise",
  "No legacy incentives",
  "Savings-first mindset",
  "Proven optimisation track record",
];

const PROSE_LEFT = [
  "As a cloud-native MSP working at the cutting edge of technology, we tackle costs from a future-proof perspective. That means we use the latest tools and approaches to reduce your TCO and allow you to focus on what you do best – delivering for your customers.",
  "We:",
];

const PROSE_BULLETS = [
  "Right size instances",
  "Monitor to uncover unused resources and cost anomalies",
  "Implement cloud-native services like serverless, where appropriate",
  "Focus on elasticity",
  "Review pricing and billing agreements",
];

function ProviderCard({ provider }) {
  return (
    <article className="cost-provider">
      <img className="cost-provider__logo" src={provider.logo} alt={`${provider.title} logo`} width="200" height="200" loading="lazy" />
      <h3>{provider.title}</h3>
      <p>{provider.text}</p>
    </article>
  );
}

function DividerUp() {
  return (
    <div className="global-curved-divider" aria-hidden="true">
      <svg width="1920" height="73" viewBox="0 0 1920 73" fill="none" preserveAspectRatio="none">
        <path d="M1920 72.9999L0 73.0012L3.42974e-06 33.7695L169.182 16.1465C375.835 -5.37986 584.165 -5.37991 790.818 16.1465L1129.18 51.3927C1335.83 72.9191 1544.16 72.9191 1750.82 51.3928L1920 33.7697L1920 72.9999Z" fill="#12203f" />
      </svg>
    </div>
  );
}

function DividerDown() {
  return (
    <div className="global-curved-divider" aria-hidden="true">
      <svg width="1920" height="89" viewBox="0 0 1920 89" fill="none" preserveAspectRatio="none">
        <path d="M0 0H915.5H1920V55L1750.82 72.623C1544.17 94.1494 1335.83 94.1495 1129.18 72.6231L790.818 37.377C584.165 15.8506 375.835 15.8505 169.182 37.3769L0 55V0Z" fill="#12203f" />
      </svg>
    </div>
  );
}

export default function CloudCostOptimisation() {
  useTitle("Cloud Cost Optimisation Services | Just After Midnight");
  const { data: articles } = useApi("/api/articles");

  return (
    <>
      <section className="cloud-hero cloud-hero--photo" aria-labelledby="cost-title">
        <div className="cost-container">
          <div className="cloud-hero__text reveal">
            <h1 id="cost-title">Cloud Cost Optimisation Services</h1>
            <p className="cloud-hero__sub">Reduce your TCO and focus on what you do best</p>
            <a href="#site-footer" className="btn btn-primary">Get in touch</a>
          </div>
        </div>
      </section>

      <section className="cost-intro" aria-labelledby="cost-intro-title">
        <div className="cost-container">
          <div className="cost-intro__split">
            <div className="cost-intro__lead reveal">
              <h2 id="cost-intro-title">Starting cutting your cloud costs today</h2>
              <p>We partner with enterprises and start-ups to optimise cloud environments and drive down costs. Whether through right sizing, automation or finding new efficiencies, we ensure your cloud environment delivers the same (or more) value for less. And with experts in AWS, Azure, GCP and Alibaba Cloud, whatever your set-up – we’ve got you covered.</p>
            </div>
            <span className="seo-intro-rule cost-intro__rule" aria-hidden="true" />
            <div className="cost-intro__points reveal">
              <h4>Why teams choose us</h4>
              <ul className="seo-intro-points seo-intro-points--marked cost-moon-list">
                {LIST_POINTS.map((point) => (
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

      <section className="cost-prose" aria-label="What we do">
        <div className="cost-container">
          <div className="cost-prose__grid">
            <div className="reveal">
              <h4>What we do</h4>
              {PROSE_LEFT.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <ul>
                {PROSE_BULLETS.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p>And a whole lot more.</p>
              <p>Plus, if you’re an AWS customer, why not explore how much you could save through an AWS Well-Architected Review?</p>
            </div>
            <div className="reveal">
              <h4>How it works</h4>
              <p>We work with you to understand your solution’s goals and where you’d like to save, from there, we develop a cost optimisation strategy that fits you and your business.</p>
              <p>This includes a big-picture audit, leveraging our application expertise to look at your solution from a holistic perspective.</p>
              <h4>Why we’re different</h4>
              <p>Many legacy hosting providers don’t have the skills (or incentive) to tackle cloud costs from all angles. In some cases, they profit from large monthly spends, and in many more, they simply lack the know-how to optimise modern infrastructures.</p>
              <p>Just After Midnight is a cloud-native MSP with a great tracked record optimising, building and supporting cutting-edge solutions, so wherever you are, we’ve got you covered.</p>
            </div>
          </div>
        </div>
      </section>

      <DividerUp />

      <section className="cost-providers" aria-labelledby="cost-providers-title">
        <div className="cost-container">
          <div className="cost-providers__head">
            <h2 id="cost-providers-title">OTHER CLOUD SERVICES</h2>
            <p aria-hidden="true">&nbsp;</p>
          </div>
          <div className="cost-providers__rows">
            <div className="cost-providers__row">
              <ProviderCard provider={PROVIDERS[0]} />
              <span className="cost-providers__rule" aria-hidden="true" />
              <ProviderCard provider={PROVIDERS[1]} />
            </div>
            <div className="cost-providers__row">
              <ProviderCard provider={PROVIDERS[2]} />
              <span className="cost-providers__rule" aria-hidden="true" />
              <ProviderCard provider={PROVIDERS[3]} />
            </div>
          </div>
        </div>
      </section>

      <DividerDown />

      <section className="cost-why" aria-labelledby="cost-why-title">
        <div className="cost-why__outer">
          <div className="cost-container">
            <h2 className="cost-why__title" id="cost-why-title">Why choose our cloud cost optimisation services?</h2>
            <div className="cost-why__grid">
              {REASONS.map((reason) => (
                <article className="cost-why__card reveal" key={reason.title}>
                  <img src={reason.icon} width="80" height="80" alt="" loading="lazy" />
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
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
