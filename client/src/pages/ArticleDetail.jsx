import { Link, useParams } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import { useApi } from "../lib/api";
import LatestInsights from "../components/Cards";
import NotFound from "./NotFound";

export default function ArticleDetail() {
  const { slug } = useParams();
  const { data, error } = useApi(`/api/articles/${slug}`);
  const article = data && data.article;
  useTitle(article ? `${article.title} | Just After Midnight` : "Insights | Just After Midnight");

  if (error) return <NotFound />;
  if (!article) {
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
            <Link to="/insights">Insights</Link> <span aria-hidden="true">/</span> {article.tag}
          </p>
          <h1 className="page-hero-title reveal">{article.title}</h1>
          <p className="article-meta reveal">
            <span className={`tag ${article.tagClass}`}>{article.tag}</span>
            <time dateTime={article.date}>{article.dateLabel}</time>
            <span>· 4 min read</span>
          </p>
        </div>
      </section>

      <section className="article-body-section">
        <div className="container article-wrap">
          <article className="prose reveal">
            {article.body.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </article>

          <nav className="article-nav reveal" aria-label="More articles">
            {data.prev ? (
              <Link className="article-nav-link" to={`/insights/${data.prev.slug}`}>
                <span className="article-nav-dir">← Previous</span>
                <span className="article-nav-title">{data.prev.title}</span>
              </Link>
            ) : (
              <span></span>
            )}
            {data.next && (
              <Link className="article-nav-link article-nav-link--next" to={`/insights/${data.next.slug}`}>
                <span className="article-nav-dir">Next →</span>
                <span className="article-nav-title">{data.next.title}</span>
              </Link>
            )}
          </nav>
        </div>
      </section>

      <LatestInsights />
    </>
  );
}
