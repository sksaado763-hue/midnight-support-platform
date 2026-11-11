import { useApi } from "../lib/api";
import { useTitle } from "../lib/useReveal";
import PackageBand from "../components/PackageBand";
import InsightsBand from "../components/InsightsBand";

const TIERS = [
  {
    tab: "Simple Reassurance",
    name: "FIRST-LINE SUPPORT",
    items: ["Monitoring", "L1 Communications", "<30 Minute Response Time", "", "", ""],
    cta: "Select package",
    hover: "Contact",
    to: "/contact?package=first-line",
  },
  {
    tab: "Overnight & weekends",
    name: "OUT-OF-HOURS SUPPORT",
    items: ["Monitoring", "L1 Communications", "L2 Resolution", "Incident Reporting", "Recommendations", "<30 Minute Response Time"],
    cta: "Select package",
    hover: "Contact",
    to: "/contact?package=out-of-hours",
  },
  {
    tab: "Complete cover",
    name: "24/7 SUPPORT",
    items: ["Monitoring", "L1 Communications", "L2 Resolution", "Incident Reporting", "Recommendations", "<30 Minute Response Time"],
    cta: "Select package",
    hover: "Contact",
    to: "/contact?package=24-7",
  },
  {
    tab: "A tailored service",
    name: "CUSTOM & ADD-ONS",
    items: ["Infrastructure or Application Only", "Faster SLA Response Times", "Custom Code", "Custom Applications", "DevOps Support", "Ticket Cap"],
    cta: "Select add-ons",
    hover: "Contact",
    to: "/contact?package=add-ons",
  },
];

const PRICING = [
  "You only pay for what you actually need. No generic pricing. Tell us about your environment, and we’ll send a personalised quote within 24 hours.",
  "Our four tiers of support can fit any brand, agency or enterprise like a glove. Need first-line support for a hundred sites or a custom solution for one piece of your stack? We can make it work.",
  "We’re the go-to support people for brands and their agencies – and you don’t earn a moniker like that without a little flexibility. Whether you need weekly or monthly reporting, a DevOps engineer to supervise out-of-hours deployments or 24/7 service desk cover for a custom digital product, chances are, we’ve been there, done that and worn the proverbial T-shirt.",
];

export default function SupportPackages() {
  useTitle("Our Support Packages | Just After Midnight");
  const { data: articles } = useApi("/api/articles");

  return (
    <>
      <section className="pkg-page-hero">
        <div className="pkg-page-shell">
          <h1>
            A few examples of our support &amp; monitoring packages
            <br />
            <span>____</span>
          </h1>
          <p>We want our partnership with you to be long-term and mutually beneficial. It starts with us giving you choices you understand.</p>
        </div>
      </section>

      <section className="pkg-page-intro" id="packages">
        <div className="pkg-page-intro__copy">
          <h1>Our service packages</h1>
          <p>
            All plans include monitoring, alerting, incident response and support from senior engineers. It’s simple – you pick the level of coverage that fits your business and we provide it. If you’re in need of something bespoke, just <a href="#site-footer">get in touch ➔</a>
          </p>
        </div>
      </section>

      <PackageBand withIntro={false} tiers={TIERS} />

      <section className="pkg-page-pricing">
        <div className="pkg-page-shell">
          <h3>Our pricing</h3>
          {PRICING.map((text) => <p key={text}>{text}</p>)}
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
