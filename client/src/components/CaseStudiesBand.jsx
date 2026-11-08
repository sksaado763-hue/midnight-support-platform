import { Link } from "react-router-dom";

export default function CaseStudiesBand({ title, studies, variant = "wide", tightHeader }) {
  return (
    <section
      className={`support-cases${variant === "detail" ? " support-cases--detail" : ""}${
        tightHeader ? " support-cases--tight" : ""
      }`}
    >
      <div className="container">
        <h2 className="section-title reveal">{title}</h2>
        <div className="support-case-grid">
          {(studies || []).slice(0, 4).map((study) => (
            <Link className="support-case reveal" to={`/case-studies/${study.slug}`} key={study.slug}>
              <span className="support-case-art">
                <span className="support-case-word">{study.client}</span>
              </span>
              <h3>{study.client}</h3>
              <p>{study.headline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
