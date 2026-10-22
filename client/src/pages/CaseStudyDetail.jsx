import { Link, useParams } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import { useApi } from "../lib/api";
import LatestInsights, { CaseCard } from "../components/Cards";
import NotFound from "./NotFound";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const { data, error } = useApi(`/api/case-studies/${slug}`);
  const study = data && data.study;
  useTitle(study ? `${study.client} Case Study | Just After Midnight` : "Case Studies | Just After Midnight");

  if (error) return <NotFound />;
  if (!study) {
    return (
      <section className="page-hero">
        <div className="container">
          <p className="empty-note">Loading…</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link to="/case-studies">Case Studies</Link> <span aria-hidden="true">/</span> {study.client}
          </p>
          <h1 className="page-hero-title reveal">{study.headline}</h1>
          <p className="page-hero-sub reveal">{study.challenge}</p>
        </div>
      </section>

      <section className="case-detail">
        <div className="container case-detail-grid">
          <div className="case-detail-main">
            <div className="prose reveal">
              <h2>The challenge</h2>
              <p>{study.challenge}</p>
              <h2>What we did</h2>
              <ul className="approach-list">
                {study.approach.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="case-detail-side">
            <div className="outcome-card reveal">
              <h2>Outcomes</h2>
              <ul>
                {study.outcomes.map((outcome) => (
                  <li key={outcome}><span className="tick" aria-hidden="true">✓</span>{outcome}</li>
                ))}
              </ul>
            </div>
            <div className="outcome-card outcome-card--navy reveal">
              <h2>Want results like these?</h2>
              <p>Tell us what keeps paging your team — we'll map it to the lightest package that genuinely covers you.</p>
              <Link to="/contact" className="btn btn-primary">Start the conversation <span aria-hidden="true">➔</span></Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="case-more">
        <div className="container">
          <h2 className="section-title reveal">More of our work</h2>
          <div className="case-grid">
            {data.others.map((other) => (
              <CaseCard key={other.slug} study={other} compact />
            ))}
          </div>
        </div>
      </section>

      <LatestInsights />
    </>
  );
}
