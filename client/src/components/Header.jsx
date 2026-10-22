import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SUBMENUS = {
  support: {
    label: "24/7 Support",
    key: "support",
    heading: "Our Support Services",
    cols: [
      { label: "What we offer", links: [["Support Packages", "/support"], ["Compare Packages", "/support#compare"]] },
      { label: "By industry", links: [["Agencies", "/support#industries"], ["SaaS Platforms", "/support#industries"], ["eCommerce", "/support#industries"]] },
      { label: "By cloud provider", links: [["24/7 Support for AWS", "/cloud#aws"], ["24/7 Support for Azure", "/cloud#azure"], ["24/7 Support for GCP", "/cloud#gcp"]] },
    ],
  },
  cloud: {
    label: "Cloud & DevOps",
    key: "cloud",
    heading: "Cloud Services",
    cols: [
      { label: "Managed Cloud", links: [["AWS", "/cloud#aws"], ["Azure", "/cloud#azure"], ["GCP", "/cloud#gcp"]] },
      { label: "Cloud consulting", links: [["Cost Optimisation", "/cloud#consulting"], ["Well-Architected Review", "/cloud#consulting"], ["Solution Architecture", "/cloud#consulting"], ["Cloud Migration", "/cloud#consulting"]] },
      { label: "DevOps", links: [["DevOps Consulting", "/cloud#devops"], ["Delivery & Automation", "/cloud#devops"], ["Application Modernisation", "/cloud#devops"]] },
    ],
  },
  platforms: {
    label: "Platforms",
    key: "platforms",
    heading: "Support for Platforms & Tools",
    wide: true,
    cols: [
      { label: "Experience platforms", links: [["Sitecore", "/platforms/sitecore"], ["Kentico", "/platforms/kentico"], ["Umbraco", "/platforms/umbraco"], ["AEM", "/platforms/aem"]] },
      { label: "Commerce & content", links: [["Magento", "/platforms/magento"], ["Optimizely", "/platforms/optimizely"], ["WordPress", "/platforms/wordpress"]] },
      { label: "Everything else", links: [["Cloudflare", "/platforms/cloudflare"], ["Custom Applications", "/platforms/custom-applications"], ["All platforms", "/platforms"]] },
    ],
  },
};

const FLAT_LINKS = [
  ["Case Studies", "/case-studies", "case-studies"],
  ["About Us", "/about", "about"],
  ["Insights", "/insights", "insights"],
];

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
          <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="16" fill="#00E8F0" />
            <path d="M20 5a11.5 11.5 0 1 0 7 20.5A12.6 12.6 0 0 1 20 5z" fill="#04222A" />
          </svg>
          <span className="brand-name">JUST<br />AFTER<br />MIDNIGHT</span>
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
                <div className={`sub-menu${menu.wide ? " sub-menu--wide" : ""}`} id={`sub-${menu.key}`}>
                  <p className="sub-heading">{menu.heading}</p>
                  <div className={`sub-cols${menu.wide ? " sub-cols--platforms" : ""}`}>
                    {menu.cols.map((col) => (
                      <div className="sub-col" key={col.label}>
                        <p className="sub-label">{col.label}</p>
                        {col.links.map(([label, to]) => (
                          <Link key={`${to}-${label}`} to={to} onClick={closeMobile}>
                            {label}
                          </Link>
                        ))}
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

        <Link
          to="/contact"
          className={`btn btn-primary header-cta${navActive === "contact" ? " is-current" : ""}`}
          onClick={closeMobile}
        >
          Contact Us
        </Link>

        <button
          className="nav-toggle"
          id="nav-toggle"
          aria-expanded={String(mobileOpen)}
          aria-controls="site-navigation"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
