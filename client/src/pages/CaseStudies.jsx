import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import { useApi } from "../lib/api";
import { CaseStudyCard } from "../components/Cards";

/* The reference's archive shows twenty studies a page across three columns. */
const PER_PAGE = 20;

const HERO_STARS = Array.from({ length: 96 }, (_, i) => {
  const rnd = (n) => { const s = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453; return s - Math.floor(s); };
  return {
    cx: rnd(1) * 1911,
    cy: Math.pow(rnd(2), 1.1) * 420,
    r: 2.2 + Math.pow(rnd(3), 2.2) * 6.8,
    o: 0.22 + rnd(4) * 0.2,
  };
});

const tagHref = (tag) => `/case-studies${tag ? `?tag=${encodeURIComponent(tag)}` : ""}`;

/* Round-robin keeps the columns balanced without measuring the cards. */
function toColumns(items, count) {
  const columns = Array.from({ length: count }, () => []);
  items.forEach((item, i) => columns[i % count].push({ item, i }));
  return columns;
}

export default function CaseStudies() {
  useTitle("Case Studies | Just After Midnight");
  const { data: studies } = useApi("/api/case-studies");
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [applied, setApplied] = useState("");

  const activeTag = params.get("tag") || "";
  const page = Math.max(1, Number(params.get("page")) || 1);

  const allTags = useMemo(() => {
    const seen = new Set();
    (studies || []).forEach((study) => (study.tags || []).forEach((tag) => seen.add(tag)));
    return [...seen].sort((a, b) => a.localeCompare(b));
  }, [studies]);

  const matches = (studies || []).filter((study) => {
    if (activeTag && !(study.tags || []).includes(activeTag)) return false;
    if (!applied) return true;
    const needle = applied.toLowerCase();
    return [study.client, study.headline, study.challenge, study.industry]
      .some((field) => String(field).toLowerCase().includes(needle));
  });

  const totalPages = Math.max(1, Math.ceil(matches.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = matches.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const columns = toColumns(visible, 3);

  function go(next) {
    const paramsOut = new URLSearchParams();
    if (next.tag) paramsOut.set("tag", next.tag);
    if (next.page && next.page > 1) paramsOut.set("page", String(next.page));
    setParams(paramsOut, { replace: false });
  }

  return (
    <main className="case-study-archive">
      <section className="archive-hero cutout-bottom">
        <div className="hero-stars" aria-hidden="true">
          <svg viewBox="0 0 1911 520" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="archiveStarGlow">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <g fill="url(#archiveStarGlow)">
              {HERO_STARS.map((star, i) => (
                <circle key={i} cx={star.cx.toFixed(1)} cy={star.cy.toFixed(1)} r={star.r.toFixed(2)} fillOpacity={star.o.toFixed(2)} />
              ))}
            </g>
          </svg>
        </div>
        <svg className="archive-moon" viewBox="0 0 96 96" aria-hidden="true">
          <path d="M58 6a42 42 0 1 0 27 75A46 46 0 0 1 58 6z" fill="var(--amber)" />
        </svg>
        <svg className="archive-cloud archive-cloud--right" viewBox="0 0 200 90" aria-hidden="true">
          <path d="M40 88c-22 0-38-14-38-32S20 22 40 24C46 8 64 0 82 6c14-16 40-14 52 4 24-2 42 12 42 30s-18 30-42 30z" />
        </svg>
        <svg className="archive-cloud archive-cloud--left" viewBox="0 0 200 90" aria-hidden="true">
          <path d="M40 88c-22 0-38-14-38-32S20 22 40 24C46 8 64 0 82 6c14-16 40-14 52 4 24-2 42 12 42 30s-18 30-42 30z" />
        </svg>
        <div className="container">
          <div className="archive-header">
            <h1 className="archive-title reveal">The platforms we keep awake, and what happened next</h1>
            <p className="archive-description reveal">Real incidents, real outcomes. A selection of the work we're allowed to talk about.</p>
          </div>
        </div>
      </section>

      <div className="archive-search">
        <div className="container">
          <form
            className="archive-search-form"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              setApplied(search.trim());
              go({ tag: activeTag, page: 1 });
            }}
          >
            <div className="case-study-search">
              <label htmlFor="cs-search" className="form-label">Find a case study</label>
              <input
                id="cs-search"
                type="text"
                className="archive-search-input"
                placeholder="Search by client, sector or outcome…"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  if (event.target.value === "") setApplied("");
                }}
              />
            </div>
            <div className="case-study-tag-filter">
              <label htmlFor="cs-tag" className="form-label">Filter by tag</label>
              <div className="select-wrap">
                <select
                  id="cs-tag"
                  className="archive-tag-select"
                  value={activeTag}
                  onChange={(event) => go({ tag: event.target.value, page: 1 })}
                >
                  <option value="">All tags</option>
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="case-study-submit">
              <button type="submit" className="btn btn-primary">
                Search
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M14 14L11.6667 11.6667M13.3333 7.66667C13.3333 10.7963 10.7963 13.3333 7.66667 13.3333C4.53705 13.3333 2 10.7963 2 7.66667C2 4.53705 4.53705 2 7.66667 2C10.7963 2 13.3333 4.53705 13.3333 7.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="archive-content">
        <div className="container">
          <div className="case-study-masonry-grid">
            {columns.map((column, i) => (
              <div className="case-study-column" key={i}>
                {column.map(({ item: study, i: position }) => (
                  /* `order` is what the flattened single-column view reads: the
                     grid hands the items back in list order below 1200px. */
                  <div className="case-study-masonry-item" key={study.slug} style={{ order: position }}>
                    <CaseStudyCard study={study} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {matches.length === 0 && (
            <div className="no-results">
              <h2>Nothing matches that.</h2>
              <p>Try another tag, or clear the search to see all of it.</p>
              <Link to="/case-studies" className="btn btn-primary">Show everything</Link>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination-wrapper">
              <nav className="pagination" aria-label="Case studies">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`page-numbers${n === currentPage ? " current" : ""}`}
                    aria-current={n === currentPage ? "page" : undefined}
                    onClick={() => go({ tag: activeTag, page: n })}
                  >
                    {n}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
