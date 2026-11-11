import { Link } from "react-router-dom";
import { useTitle } from "../lib/useReveal";

const TILES = [
  {
    icon: "/icons/cloud-people-consulting.svg",
    title: "Cloud Strategy Consultancy Services",
    to: "/contact",
    text: "We start from what you are trying to ship and work backwards to the parts of cloud that earn their keep. You get a sequenced plan with costs, risks and owners attached.",
  },
  {
    icon: "/icons/cloud-design.svg",
    title: "Cloud Design and Solution Architecture",
    to: "/contact",
    text: "Landing zones, network topology and the failover story — drawn properly and pressure-tested before anyone writes a line of Terraform.",
  },
  {
    icon: "/icons/cloud-web-application.svg",
    title: "Application Modernisation",
    to: "/contact",
    tone: "deep",
    text: "Moving a working product onto containers and smaller services without a big-bang rewrite or a feature freeze.",
  },
  {
    icon: "/icons/cloud-architecture.svg",
    title: "Managed Cloud",
    to: "/support",
    text: "We run your AWS, Azure or GCP estate end to end — monitoring, patching, capacity and the on-call rota — so your engineers spend the week building.",
  },
  {
    icon: "/icons/cloud-cost-reducing.svg",
    title: "Cloud Cost Optimisation",
    to: "/contact",
    text: "Right-sizing, commitment strategy and the guardrails that stop next quarter's bill quietly drifting back up again.",
  },
  {
    icon: "/icons/cloud-search.svg",
    title: "Didn't find what you were looking for here?",
    to: "#site-footer",
    accent: true,
    text: "If your problem does not have a tidy name, it is usually the interesting one. Tell us what is going wrong and we will say honestly whether we can help.",
  },
];

export default function Cloud() {
  useTitle("Cloud Services | Just After Midnight");
  return (
    <>
      <section className="cloud-hero" aria-labelledby="cloud-title">
        <div className="container">
          <div className="cloud-hero__text reveal">
            <h1 id="cloud-title">Our Cloud Services</h1>
            <p className="cloud-hero__sub">Every stage of your cloud, covered.</p>
            <a href="#site-footer" className="btn btn-primary btn-lg">Get in touch</a>
          </div>
        </div>
      </section>

      <section className="cloud-grid" aria-labelledby="cloud-grid-title">
        <div className="container">
          <div className="cloud-grid__intro reveal">
            <h2 id="cloud-grid-title">Every cloud challenge, one team who owns it</h2>
            <p>Wherever you are in the journey, we pick it up from there.</p>
          </div>
          <div className="cloud-grid__cards">
            {TILES.map((tile) => (
              <article
                className={`cloud-tile reveal${tile.accent ? " cloud-tile--cta" : ""}${tile.tone ? ` cloud-tile--${tile.tone}` : ""}`}
                key={tile.title}
              >
                <img className="cloud-tile__icon" src={tile.icon} alt="" width="80" height="80" loading="lazy" />
                <h3>
                  {tile.to.startsWith("#") ? (
                    <a href={tile.to}>{tile.title} <span aria-hidden="true">➔</span></a>
                  ) : (
                    <Link to={tile.to}>{tile.title} <span aria-hidden="true">➔</span></Link>
                  )}
                </h3>
                <p>{tile.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
