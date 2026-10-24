import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "./Icons";
import { getJson } from "../lib/api";

const SUBMENUS = {
  support: {
    label: "24/7 Support",
    key: "support",
    heading: "Our Support Services",
    groups: [
      { label: "What we offer", links: [["Support Packages", "/support", "layers"], ["Compare Packages", "/support#compare", "sliders"]] },
      { label: "By industry", links: [["Agencies", "/support#industries", "building"], ["SaaS Platforms", "/support#industries", "window"], ["eCommerce", "/support#industries", "cart"]] },
      { label: "By cloud provider", links: [["24/7 Support for AWS", "/cloud#aws", "aws"], ["24/7 Support for Azure", "/cloud#azure", "azure"], ["24/7 Support for GCP", "/cloud#gcp", "gcp"]] },
    ],
  },
  cloud: {
    label: "Cloud & DevOps",
    key: "cloud",
    heading: "Cloud Services",
    groups: [
      { label: "Managed Cloud", links: [["AWS", "/cloud#aws", "aws"], ["Azure", "/cloud#azure", "azure"], ["GCP", "/cloud#gcp", "gcp"]] },
      { label: "Cloud consulting", links: [["Cost Optimisation", "/cloud#consulting", "cost"], ["Well-Architected Review", "/cloud#consulting", "shield-check"], ["Solution Architecture", "/cloud#consulting", "nodes"], ["Cloud Migration", "/cloud#consulting", "migration"]] },
      { label: "DevOps", links: [["DevOps Consulting", "/cloud#devops", "cycle"], ["Delivery & Automation", "/cloud#devops", "bolt"], ["Application Modernisation", "/cloud#devops", "code"]] },
    ],
  },
  platforms: {
    label: "Platforms",
    key: "platforms",
    heading: "Support for Platforms & Tools",
    groups: [
      { label: "Experience platforms", links: [["Sitecore", "/platforms/sitecore", "sitemap"], ["Kentico", "/platforms/kentico", "blocks"], ["Umbraco", "/platforms/umbraco", "cube"], ["AEM", "/platforms/aem", "spark"]] },
      { label: "Commerce & content", links: [["Magento", "/platforms/magento", "bag"], ["Optimizely", "/platforms/optimizely", "flask"], ["WordPress", "/platforms/wordpress", "doc"]] },
      { label: "Everything else", links: [["Cloudflare", "/platforms/cloudflare", "globe"], ["Custom Applications", "/platforms/custom-applications", "terminal"], ["All platforms", "/platforms", "grid"]] },
    ],
  },
};

const FLAT_LINKS = [
  ["Case Studies", "/case-studies", "case-studies"],
  ["About Us", "/about", "about"],
  ["Insights", "/insights", "insights"],
];

const SOURCES = [
  { url: "/api/articles", kind: "Insight", to: (x) => `/insights/${x.slug}`, title: (x) => x.title, meta: (x) => x.tag, text: (x) => `${x.title} ${x.tag} ${x.excerpt}` },
  { url: "/api/platforms", kind: "Platform", to: (x) => `/platforms/${x.slug}`, title: (x) => x.name, meta: () => "Platform support", text: (x) => `${x.name} ${x.tagline} ${x.intro}` },
  { url: "/api/case-studies", kind: "Case study", to: (x) => `/case-studies/${x.slug}`, title: (x) => x.client, meta: (x) => x.industry, text: (x) => `${x.client} ${x.industry} ${x.headline}` },
];

function buildIndex(lists) {
  return lists.flatMap((list, i) =>
    (Array.isArray(list) ? list : []).map((item) => ({
      kind: SOURCES[i].kind,
      to: SOURCES[i].to(item),
      title: SOURCES[i].title(item),
      meta: SOURCES[i].meta(item),
      text: SOURCES[i].text(item).toLowerCase(),
    })),
  );
}

function navActiveFor(pathname) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/support")) return "support";
  if (pathname.startsWith("/cloud")) return "cloud";
  if (pathname.startsWith("/platforms")) return "platforms";
  if (pathname.startsWith("/case-studies")) return "case-studies";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/insights")) return "insights";
  if (pathname.startsWith("/contact")) return "contact";
  return "";
}

export default function Header() {
  const { pathname } = useLocation();
  const navActive = navActiveFor(pathname);
  const [openMenus, setOpenMenus] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(null);
  const searchInput = useRef(null);

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  useEffect(() => {
    if (!searchOpen || index) return undefined;
    let active = true;
    Promise.all(SOURCES.map((s) => getJson(s.url).catch(() => [])))
      .then((lists) => { if (active) setIndex(buildIndex(lists)); });
    return () => { active = false; };
  }, [searchOpen, index]);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return undefined;
    function onKey(event) { if (event.key === "Escape") closeSearch(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  useEffect(closeSearch, [pathname]);

  const needle = query.trim().toLowerCase();
  const results = index && needle.length > 1
    ? index.filter((entry) => entry.text.includes(needle)).slice(0, 8)
    : [];

  function toggleMenu(key) {
    setOpenMenus((current) => ({ ...current, [key]: !current[key] }));
  }

  function closeMobile() {
    setMobileOpen(false);
    setOpenMenus({});
  }

  return (
    <header className="site-header" id="masthead">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Just After Midnight — home" onClick={closeMobile}>
          <span className="brand-name">
            <span className="brand-top">JUST AFTER</span>
            <span className="brand-main">
              MIDNI
              <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M19 3a13.5 13.5 0 1 0 8.5 24A14.8 14.8 0 0 1 19 3z" fill="#FABD14" />
              </svg>
              HT
            </span>
          </span>
        </Link>

        <nav className={`main-navigation${mobileOpen ? " is-open" : ""}`} id="site-navigation" aria-label="Main navigation">
          <ul className="nav-list">
            {Object.values(SUBMENUS).map((menu) => (
              <li key={menu.key} className={`nav-item has-sub${openMenus[menu.key] ? " is-open" : ""}`}>
                <button
                  className={`nav-link${navActive === menu.key ? " is-current" : ""}`}
                  aria-expanded={String(Boolean(openMenus[menu.key]))}
                  aria-controls={`sub-${menu.key}`}
                  onClick={() => toggleMenu(menu.key)}
                >
                  {menu.label}
                </button>
                <div className="sub-menu" id={`sub-${menu.key}`}>
                  <p className="sub-heading">{menu.heading}</p>
                  <div className="sub-groups">
                    {menu.groups.map((group) => (
                      <div className="sub-group" key={group.label}>
                        <p className="sub-label">{group.label}</p>
                        <ul className="sub-items">
                          {group.links.map(([label, to, icon]) => (
                            <li key={`${to}-${label}`}>
                              <Link className="sub-item" to={to} onClick={closeMobile}>
                                <span className="sub-icon"><Icon name={icon} /></span>
                                <span className="sub-item-label">{label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
            {FLAT_LINKS.map(([label, to, key]) => (
              <li key={key} className={`nav-item${navActive === key ? " is-current" : ""}`}>
                <Link className="nav-link" to={to} onClick={closeMobile}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-search">
          <button
            type="button"
            className="search-toggle"
            aria-expanded={String(searchOpen)}
            aria-controls="site-search"
            onClick={() => { setMobileOpen(false); setSearchOpen((open) => !open); }}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M13.6 13.6 18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="search-toggle-label">Search</span>
          </button>

          {searchOpen && (
            <div className="search-panel" id="site-search" role="dialog" aria-label="Search this site">
              <div className="search-field">
                <input
                  ref={searchInput}
                  type="search"
                  className="search-input"
                  placeholder="Search insights, platforms, case studies"
                  aria-label="Search insights, platforms, case studies"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <svg className="search-field-icon" viewBox="0 0 20 20" aria-hidden="true">
                  <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M13.6 13.6 18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              {index === null ? (
                <p className="search-note">Loading&hellip;</p>
              ) : needle.length < 2 ? (
                <p className="search-note">Type at least two characters.</p>
              ) : results.length === 0 ? (
                <p className="search-note">Nothing matched &ldquo;{query}&rdquo;.</p>
              ) : (
                <ul className="search-results">
                  {results.map((entry) => (
                    <li key={entry.to}>
                      <Link to={entry.to} onClick={closeSearch}>
                        <span className="search-kind">{entry.kind}</span>
                        <span className="search-title">{entry.title}</span>
                        <span className="search-meta">{entry.meta}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <Link
          to="/contact"
          className={`btn btn-primary header-cta${navActive === "contact" ? " is-current" : ""}`}
          onClick={closeMobile}
        >
          Get in touch <span aria-hidden="true">➔</span>
        </Link>

        <button
          className="nav-toggle"
          id="nav-toggle"
          aria-expanded={String(mobileOpen)}
          aria-controls="site-navigation"
          aria-label="Toggle menu"
          onClick={() => { closeSearch(); setMobileOpen((open) => !open); }}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
