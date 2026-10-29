import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getJson } from "../lib/api";

const SUBMENUS = {
  support: {
    label: "24/7 Support",
    key: "support",
    heading: "Our Support Services",
    to: "/support",
    blurb: "Monitoring, triage and resolution for your full stack, every hour of every day.",
    rows: [
      { label: "Support Packages", to: "/support", links: [["Compare Packages", "/support#compare"]] },
      { label: "By industry", to: "/support#industries", links: [["Agencies", "/support#industries"], ["SaaS Platforms", "/support#industries"], ["eCommerce", "/support#industries"]] },
      { label: "By cloud provider", to: "/cloud#aws", links: [["24/7 Support for AWS", "/cloud#aws"], ["24/7 Support for Azure", "/cloud#azure"], ["24/7 Support for GCP", "/cloud#gcp"]] },
    ],
  },
  cloud: {
    label: "Cloud & DevOps",
    key: "cloud",
    heading: "Cloud Services",
    to: "/cloud",
    blurb: "Managed cloud, consulting and DevOps delivery that scales with your team.",
    rows: [
      { label: "Managed Cloud", to: "/cloud", links: [["AWS", "/cloud#aws"], ["Azure", "/cloud#azure"], ["GCP", "/cloud#gcp"]] },
      { label: "Cloud consulting", to: "/cloud#consulting", links: [["Cost Optimisation", "/cloud#consulting"], ["Well-Architected Review", "/cloud#consulting"], ["Solution Architecture", "/cloud#consulting"], ["Cloud Migration", "/cloud#consulting"]] },
      { label: "DevOps", to: "/cloud#devops", links: [["DevOps Consulting", "/cloud#devops"], ["Delivery & Automation", "/cloud#devops"], ["Application Modernisation", "/cloud#devops"]] },
    ],
  },
  platforms: {
    label: "Platforms",
    key: "platforms",
    heading: "Support for Platforms & Tools",
    to: "/platforms",
    blurb: "Care and maintenance for the CMS, commerce and experience platforms behind your product.",
    rows: [
      { label: "Experience platforms", to: "/platforms", links: [["Sitecore", "/platforms/sitecore"], ["Kentico", "/platforms/kentico"], ["Umbraco", "/platforms/umbraco"], ["AEM", "/platforms/aem"]] },
      { label: "Commerce & content", to: "/platforms", links: [["Magento", "/platforms/magento"], ["Optimizely", "/platforms/optimizely"], ["WordPress", "/platforms/wordpress"]] },
      { label: "Everything else", to: "/platforms", links: [["Cloudflare", "/platforms/cloudflare"], ["Custom Applications", "/platforms/custom-applications"], ["All platforms", "/platforms"]] },
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
  const [activeRows, setActiveRows] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(null);
  const [caretX, setCaretX] = useState({});
  const searchInput = useRef(null);
  const headerInner = useRef(null);
  const menuLinks = useRef({});
  const canHover = useRef(typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches);

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

  /* The caret rides the panel, so its x has to be measured off the open
     link rather than guessed per menu. */
  function openMenu(key) {
    setOpenMenus((current) => (current[key] ? current : { ...current, [key]: true }));
    const link = menuLinks.current[key];
    const bar = headerInner.current;
    if (!link || !bar) return;
    const lr = link.getBoundingClientRect();
    const br = bar.getBoundingClientRect();
    setCaretX((current) => ({ ...current, [key]: lr.left - br.left + lr.width / 2 }));
  }

  function closeMenu(key) {
    setOpenMenus((current) => (current[key] ? { ...current, [key]: false } : current));
  }

  function activateRow(menuKey, label) {
    setActiveRows((current) => (current[menuKey] === label ? current : { ...current, [menuKey]: label }));
  }

  function activeRowFor(menu) {
    return menu.rows.find((row) => row.label === activeRows[menu.key])
      ?? menu.rows.find((row) => row.links.length > 0)
      ?? menu.rows[0];
  }

  function closeMobile() {
    setMobileOpen(false);
    setOpenMenus({});
  }

  return (
    <header className="site-header" id="masthead">
      <div className="header-inner" ref={headerInner}>
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
          <ul className="nav-list" onKeyDown={(event) => { if (event.key === "Escape") setOpenMenus({}); }}>
            {Object.values(SUBMENUS).map((menu) => (
              <li
                key={menu.key}
                className={`nav-item has-sub${openMenus[menu.key] ? " is-open" : ""}`}
                onMouseEnter={() => { if (canHover.current) openMenu(menu.key); }}
                onMouseLeave={() => { if (canHover.current) closeMenu(menu.key); }}
              >
                <button
                  ref={(el) => { menuLinks.current[menu.key] = el; }}
                  className={`nav-link${navActive === menu.key ? " is-current" : ""}`}
                  aria-expanded={String(Boolean(openMenus[menu.key]))}
                  aria-controls={`sub-${menu.key}`}
                  onClick={() => (openMenus[menu.key] ? closeMenu(menu.key) : openMenu(menu.key))}
                  onFocus={() => openMenu(menu.key)}
                >
                  {menu.label}
                </button>
                <div className="mega-menu" id={`sub-${menu.key}`}>
                  <span className="mega-caret" style={{ left: caretX[menu.key] ?? 48 }} aria-hidden="true" />
                  <div className="mega-feature">
                    <svg className="mega-stars" viewBox="0 0 320 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                      <circle cx="252" cy="64" r="2.6" fill="#ffffff" opacity="0.85" />
                      <circle cx="288" cy="126" r="2" fill="#ffffff" opacity="0.5" />
                      <circle cx="238" cy="186" r="1.8" fill="#ffffff" opacity="0.6" />
                      <circle cx="298" cy="228" r="2.2" fill="#ffffff" opacity="0.4" />
                      <circle cx="206" cy="252" r="1.6" fill="#ffffff" opacity="0.5" />
                      <path d="M84 52l2.6 7.4 7.4 2.6-7.4 2.6-2.6 7.4-2.6-7.4-7.4-2.6 7.4-2.6z" fill="#ffffff" opacity="0.9" />
                      <path d="M150 118l2 5.6 5.6 2-5.6 2-2 5.6-2-5.6-5.6-2 5.6-2z" fill="#ffffff" opacity="0.55" />
                      <path d="M112 210l1.8 5 5 1.8-5 1.8-1.8 5-1.8-5-5-1.8 5-1.8z" fill="#ffffff" opacity="0.45" />
                    </svg>
                    <svg className="mega-cloud" viewBox="0 0 72 44" aria-hidden="true">
                      <path d="M16 36a11 11 0 0 1 1.2-21.9A15 15 0 0 1 46 18.6 10 10 0 0 1 44.6 36z" fill="#ffffff" />
                    </svg>
                    <div className="mega-feature-copy">
                      <h3>{menu.label}</h3>
                      <p>{menu.blurb}</p>
                    </div>
                    <Link className="mega-cta" to={menu.to} onClick={closeMobile}>{menu.heading}</Link>
                    <svg className="mega-rocket" viewBox="0 0 120 72" aria-hidden="true">
                      <g transform="rotate(-14 60 36)">
                        <path d="M18 36c-7-3.4-13-3.4-20 0 7 3.4 13 3.4 20 0z" fill="#f5a11d" opacity="0.9" />
                        <path d="M36 29l-12-9 4.5 13z" fill="#fabd14" />
                        <path d="M36 43l-12 9 4.5-13z" fill="#fabd14" />
                        <path d="M28 36c15-11 37-11 52 0-15 11-37 11-52 0z" fill="#ffffff" />
                        <circle cx="54" cy="36" r="5.4" fill="#101828" stroke="#fabd14" strokeWidth="2" />
                        <path d="M80 36c7-4.6 13-4.6 18 0-5 4.6-11 4.6-18 0z" fill="#fabd14" />
                      </g>
                    </svg>
                  </div>
                  <div className="mega-links">
                    <div className="mega-links-main">
                      <p className="mega-offer">What we offer</p>
                      <ul className="mega-rows">
                        {menu.rows.map((row) => (
                          <li
                            className="mega-row"
                            key={row.label}
                            onMouseEnter={() => { if (canHover.current) activateRow(menu.key, row.label); }}
                          >
                            <Link
                              className="mega-row-link"
                              to={row.to}
                              onClick={closeMobile}
                              onFocus={() => activateRow(menu.key, row.label)}
                            >
                              {row.label}
                            </Link>
                            {row.links.length > 0 && (
                              <ul className="mega-flyout">
                                {row.links.map(([label, to]) => (
                                  <li key={`${to}-${label}`}>
                                    <Link className="mega-flyout-link" to={to} onClick={closeMobile}>{label}</Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mega-links-sub">
                      <ul className="mega-sub-list">
                        {activeRowFor(menu).links.map(([label, to]) => (
                          <li key={`${to}-${label}`}>
                            <Link className="mega-sub-link" to={to} onClick={closeMobile}>{label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
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
