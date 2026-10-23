import { Link } from "react-router-dom";
import { useApi } from "../lib/api";

export function ArticleArt({ theme }) {
  if (theme === "spotlight") {
    return (
      <svg viewBox="0 0 320 170">
        <circle cx="160" cy="150" r="46" fill="#FABD14" />
        <circle cx="160" cy="86" r="30" fill="#FABD14" />
        <g stroke="#BFBFBF" strokeWidth="3" strokeLinecap="round">
          <path d="M118 158h84M126 176h68" />
        </g>
        <circle cx="228" cy="40" r="3" fill="#A2CCE4" />
        <circle cx="64" cy="52" r="2.4" fill="#A2CCE4" />
        <path d="M84 30l8 8m0-8l-8 8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (theme === "incident") {
    return (
      <svg viewBox="0 0 320 170">
        <rect x="140" y="88" width="40" height="52" rx="10" fill="#1F2C49" />
        <rect x="132" y="72" width="56" height="22" rx="8" fill="#243F88" />
        <path d="M160 56a26 26 0 0 1 26 26h-14a12 12 0 0 0-24 0h-14a26 26 0 0 1 26-26z" fill="#FABD14" />
        <g fill="#A2CCE4">
          <rect x="86" y="96" width="6" height="26" rx="3" />
          <rect x="100" y="86" width="6" height="46" rx="3" />
          <rect x="114" y="100" width="6" height="18" rx="3" />
          <rect x="200" y="92" width="6" height="34" rx="3" />
          <rect x="214" y="100" width="6" height="18" rx="3" />
          <rect x="228" y="86" width="6" height="46" rx="3" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 320 170">
      <ellipse cx="160" cy="105" rx="52" ry="30" fill="none" stroke="#FABD14" strokeWidth="3" />
      <ellipse cx="160" cy="105" rx="52" ry="30" fill="none" stroke="#FABD14" strokeWidth="3" transform="rotate(60 160 105)" />
      <ellipse cx="160" cy="105" rx="52" ry="30" fill="none" stroke="#FABD14" strokeWidth="3" transform="rotate(-60 160 105)" />
      <circle cx="160" cy="105" r="14" fill="#A2CCE4" />
      <circle cx="252" cy="46" r="3" fill="#A2CCE4" />
      <circle cx="70" cy="140" r="2.4" fill="#FABD14" />
    </svg>
  );
}

export function InsightCard({ article, withBadge = false }) {
  return (
    <article className="insight-card reveal">
      <Link className="insight-card-link" to={`/insights/${article.slug}`}>
        <div className={`insight-media insight-media--${article.theme}`} aria-hidden="true">
          {withBadge && article.newBadge && <span className="new-badge">New</span>}
          <ArticleArt theme={article.theme} />
        </div>
        <div className="insight-body">
          <p className="insight-meta">
            <span className={`tag ${article.tagClass}`}>{article.tag}</span>
            <time dateTime={article.date}>{article.dateLabel}</time>
          </p>
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
          <span className="text-link">Read more <span aria-hidden="true">➔</span></span>
        </div>
      </Link>
    </article>
  );
}

export function CaseArt({ theme }) {
  if (theme === "spotlight") {
    return (
      <svg viewBox="0 0 200 100">
        <circle cx="100" cy="38" r="20" fill="#FABD14" />
        <path d="M68 96a34 34 0 0 1 64 0" fill="none" stroke="#FABD14" strokeWidth="10" strokeLinecap="round" />
      </svg>
    );
  }
  if (theme === "incident") {
    return (
      <svg viewBox="0 0 200 100">
        <rect x="88" y="34" width="24" height="34" rx="6" fill="#1F2C49" />
        <path d="M100 18a18 18 0 0 1 18 18h-36a18 18 0 0 1 18-18z" fill="#FABD14" />
        <rect x="64" y="44" width="5" height="18" rx="2.5" fill="#A2CCE4" />
        <rect x="132" y="44" width="5" height="18" rx="2.5" fill="#A2CCE4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 100">
      <circle cx="100" cy="50" r="26" fill="none" stroke="#FABD14" strokeWidth="3" />
      <ellipse cx="100" cy="50" rx="44" ry="16" fill="none" stroke="#A2CCE4" strokeWidth="2.5" />
    </svg>
  );
}

export function CaseCard({ study, compact = false }) {
  const tagColor = study.theme === "spotlight" ? "orange" : study.theme === "incident" ? "purple" : "navy";
  return (
    <article className="case-card reveal">
      <div className={`case-art case-art--${study.theme}`} aria-hidden="true">
        <CaseArt theme={study.theme} />
      </div>
      <div className="case-body">
        <p className="case-meta">
          <span className={`tag tag-${tagColor}`}>{study.industry}</span>
        </p>
        <h2>{study.headline}</h2>
        {!compact && <p>{`${study.challenge.slice(0, 130)}…`}</p>}
        <Link className="text-link" to={`/case-studies/${study.slug}`}>
          Read the case study <span aria-hidden="true">➔</span>
        </Link>
      </div>
    </article>
  );
}

export default function LatestInsights() {
  const { data: articles } = useApi("/api/articles/latest");
  if (!articles) return null;
  return (
    <section className="insights insights--shared" aria-label="Latest insights">
      <div className="container">
        <div className="insights-head reveal">
          <h2 className="section-title">Latest Insights from JAM</h2>
          <Link to="/insights" className="text-link">See more articles <span aria-hidden="true">➔</span></Link>
        </div>
        <div className="insights-grid">
          {articles.map((article) => (
            <InsightCard key={article.slug} article={article} withBadge />
          ))}
        </div>
      </div>
    </section>
  );
}
