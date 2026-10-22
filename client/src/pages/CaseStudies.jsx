import { useTitle } from "../lib/useReveal";
import { useApi } from "../lib/api";
import LatestInsights, { CaseCard } from "../components/Cards";

export default function CaseStudies() {
  useTitle("Case Studies | Just After Midnight");
  const { data: studies } = useApi("/api/case-studies");

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title reveal">Case Studies</h1>
          <p className="page-hero-sub reveal">Real platforms, real incidents, real outcomes. A selection of the work we're allowed to talk about.</p>
        </div>
      </section>

      <section className="case-list">
        <div className="container">
          <div className="case-grid">
            {(studies || []).map((study) => (
              <CaseCard key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </section>

      <LatestInsights />
    </>
  );
}
