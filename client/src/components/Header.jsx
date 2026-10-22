import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "./Icons";

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
