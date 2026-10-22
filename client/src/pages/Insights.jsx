import { Link, useSearchParams } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import { useApi } from "../lib/api";
import { InsightCard } from "../components/Cards";

export default function Insights() {
  useTitle("Insights | Just After Midnight");
  const [params] = useSearchParams();
  const activeTag = params.get("tag");
  const { data: articles } = useApi(`/api/articles${activeTag ? `?tag=${encodeURIComponent(activeTag)}` : ""}`);
  const { data: tags } = useApi("/api/articles/tags");

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title reveal">Insights</h1>
          <p className="page-hero-sub reveal">Field notes from the night shift — on incident response, observability, cost discipline and the human side of keeping systems up.</p>
        </div>
      </section>

      <section className="insights insights--page">
        <div className="container">
          <div className="tag-filter reveal" role="group" aria-label="Filter articles by topic">
            <Link className={`filter-chip${!activeTag ? " is-active" : ""}`} to="/insights">All</Link>
            {(tags || []).map((tag) => (
              <Link
                key={tag}
                className={`filter-chip${activeTag === tag ? " is-active" : ""}`}
                to={`/insights?tag=${encodeURIComponent(tag)}`}
              >
                {tag}
              </Link>
            ))}
          </div>

          <div className="insights-grid">
            {(articles || []).map((article) => (
              <InsightCard key={article.slug} article={article} />
            ))}
          </div>

          {articles && articles.length === 0 && (
            <p className="empty-note">No articles under this topic yet — check back soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
