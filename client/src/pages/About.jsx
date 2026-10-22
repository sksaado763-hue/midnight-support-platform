import { Link } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import { useApi } from "../lib/api";
import LatestInsights from "../components/Cards";
import StatsStrip from "../components/StatsStrip";

const VALUES = [
  ["Uptime is a promise", "Support isn't a ticket queue — it's the promise your product makes at 3am. We take that promise personally, which is why our engineers own incidents end to end."],
  ["Boring is beautiful", "The best infrastructure work is uneventful. We optimise for quiet weeks and predictable releases, and we get suspicious when a system is only held together by heroics."],
  ["Share what we learn", "Every incident makes us smarter, and that knowledge shouldn't stay in a private channel. We write things down — honestly — and publish what we can."],
  ["Humans first", "Sustainable on-call, blameless reviews and no hero culture. Systems don't burn out; people do, and burned-out people miss things."],
];

export default function About() {
  useTitle("About Us | Just After Midnight");
  const { data: team } = useApi("/api/team");

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title reveal">About Us</h1>
          <p className="page-hero-sub reveal">We're a support-first engineering company. That order matters: everything we build — tooling, rotations, runbooks — exists so that when things break, someone calm and competent is already on it.</p>
        </div>
      </section>

      <StatsStrip alt />

      <section className="about-values">
        <div className="container">
          <h2 className="section-title reveal">What we believe</h2>
          <div className="value-grid">
            {VALUES.map(([title, text]) => (
              <article className="value-card reveal" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="team-section" id="team">
        <div className="container">
          <h2 className="section-title reveal">The people on the other end of the phone</h2>
          <div className="team-grid">
            {(team || []).map((member) => (
              <article className="team-card reveal" key={member.name}>
                <div className={`team-avatar team-avatar--${member.tint}`} aria-hidden="true">{member.initials}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="statement">
        <div className="container statement-inner">
          <h2 className="statement-title reveal">Sound like your kind of team?</h2>
          <p className="statement-text reveal">Whether you need cover for your platform or want to join ours — we'd love to hear from you.</p>
          <div className="hero-actions reveal" style={{ justifyContent: "center" }}>
            <Link to="/contact" className="btn btn-primary">Get in touch <span aria-hidden="true">➔</span></Link>
          </div>
        </div>
      </section>

      <LatestInsights />
    </>
  );
}
