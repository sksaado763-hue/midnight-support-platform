import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactForm, NewsletterForm } from "./Forms";

const COLUMNS = [
  {
    label: "Our services",
    title: "Our Services",
    links: [
      ["Support Packages", "/support"],
      ["Managed Cloud & DevOps", "/cloud"],
      ["Platform Support", "/platforms"],
      ["Case Studies", "/case-studies"],
      ["Service Terms and Conditions", "/contact"],
    ],
  },
  {
    label: "Our company",
    title: "Our Company",
    links: [
      ["About Us", "/about"],
      ["Our Team", "/about#team"],
      ["Insights", "/insights"],
      ["FAQ", "/contact"],
    ],
  },
  {
    label: "Our partners",
    title: "Our Partners",
    links: [
      ["Deal Registration", "/contact"],
      ["Partner Programme", "/contact"],
    ],
  },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    path: "M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4.5v13.5H.5V8zm7.5 0h4.3v1.8h.06c.6-1.1 2.07-2.3 4.26-2.3 4.56 0 5.4 3 5.4 6.9v7.1h-4.5v-6.3c0-1.5-.03-3.44-2.1-3.44-2.1 0-2.42 1.64-2.42 3.33v6.41H8V8z",
  },
  {
    label: "X",
    path: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93zm-1.3 19.5h2.04L6.49 3.24H4.3l13.3 17.4z",
  },
  {
    label: "Instagram",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
  },
];

/* Assurance tiles for the legal band. Each line restates something the site
   already claims about how the studio works — none of them is a third-party
   certificate, and they must not be swapped for real accreditation marks
   (ISO, Cyber Essentials, a partner badge) unless the business holds them. */
const ASSURANCES = [
  {
    key: "ism",
    title: "Midnight Assured",
    sub: "Information security management",
    mark: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7.5 12.3l3 3 6-6.6" stroke="#FABD14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "cover",
    title: "24·7·365",
    sub: "On-call cover, every day",
    mark: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 6.5V12l4 2.4" stroke="#FABD14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "ladder",
    title: "Escalation ladder",
    sub: "Four tiers, named owners",
    mark: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 20h4v-5h4v-5h4V5h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="20" r="1.8" fill="#FABD14" />
      </svg>
    ),
  },
  {
    key: "handover",
    title: "Handover logged",
    sub: "Every shift, every queue",
    mark: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 6h14M5 12h14M5 18h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="18.5" cy="18" r="2" fill="#FABD14" />
      </svg>
    ),
  },
  {
    key: "cloud",
    title: "Cloud & DevOps",
    sub: "Managed cover across stacks",
    mark: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6.5 18h11a3.5 3.5 0 0 0 .3-6.98A5 5 0 0 0 8.2 9.4 3.8 3.8 0 0 0 6.5 18z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="12" cy="14" r="1.7" fill="#FABD14" />
      </svg>
    ),
  },
  {
    key: "whitelabel",
    title: "White-label cover",
    sub: "Invisible behind your brand",
    mark: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l7.5 3.4v5.2c0 4.3-3.1 7.9-7.5 9-4.4-1.1-7.5-4.7-7.5-9V6.4L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 12.2l2.2 2.2 4.3-4.6" stroke="#FABD14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* Coverage clocks, not office claims: the studio works follow-the-sun from
   Lahore, so the strip names the regions a shift is awake in rather than
   inventing premises abroad. */
const CLOCKS = [
  { label: "Lahore HQ", timeZone: "Asia/Karachi" },
  { label: "UK & Ireland", timeZone: "Europe/London" },
  { label: "North America", timeZone: "America/New_York" },
  { label: "Australia & NZ", timeZone: "Australia/Sydney" },
];

const ZONE_FORMATTERS = new Map();
const OFFSET_FORMATTERS = new Map();

/* Small-ICU browsers only offer "GMT+5" style names, so the strip spells the
   familiar abbreviations itself and flips them with each zone's DST offset. */
const ZONE_ABBREVIATIONS = {
  "Asia/Karachi": ["PKT", "PKT"],
  "Europe/London": ["GMT", "BST"],
  "America/New_York": ["EST", "EDT"],
  "Australia/Sydney": ["AEST", "AEDT"],
};

function zoneParts(date, timeZone) {
  let formatter = ZONE_FORMATTERS.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hourCycle: "h23",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    ZONE_FORMATTERS.set(timeZone, formatter);
  }
  const parts = formatter.formatToParts(date);
  const pick = (type) => parts.find((part) => part.type === type)?.value ?? "00";
  return { hour: pick("hour"), minute: pick("minute"), second: pick("second") };
}

function zoneOffsetHours(date, timeZone) {
  let formatter = OFFSET_FORMATTERS.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-GB", { timeZone, timeZoneName: "shortOffset" });
    OFFSET_FORMATTERS.set(timeZone, formatter);
  }
  const name = formatter.formatToParts(date).find((part) => part.type === "timeZoneName")?.value ?? "GMT";
  const match = /([+-])(\d{1,2})(?::(\d{2}))?/.exec(name);
  if (!match) return 0;
  const magnitude = Number(match[2]) + Number(match[3] ?? 0) / 60;
  return match[1] === "-" ? -magnitude : magnitude;
}

function zoneAbbreviation(date, timeZone) {
  const [standard, daylight] = ZONE_ABBREVIATIONS[timeZone] ?? ["", ""];
  if (standard === daylight) return standard;
  const year = date.getFullYear();
  const standardOffset = Math.min(
    zoneOffsetHours(new Date(year, 0, 1), timeZone),
    zoneOffsetHours(new Date(year, 6, 1), timeZone),
  );
  return zoneOffsetHours(date, timeZone) <= standardOffset ? standard : daylight;
}

function WorldClocks() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="world-clocks" aria-label="Current time across our coverage regions">
      {CLOCKS.map((zone) => {
        const t = zoneParts(now, zone.timeZone);
        const h = Number(t.hour) % 12;
        const m = Number(t.minute);
        const s = Number(t.second);
        return (
          <div className="world-clock" key={zone.timeZone}>
            <svg className="clock-face" viewBox="0 0 96 96" aria-hidden="true">
              <circle className="clock-dial" cx="48" cy="48" r="45.5" />
              <path className="clock-ticks" d="M48 7v7M89 48h-7M48 89v-7M7 48h7" />
              <line className="clock-hand clock-hand--hour" x1="48" y1="48" x2="48" y2="28" transform={`rotate(${(h + m / 60) * 30} 48 48)`} />
              <line className="clock-hand clock-hand--minute" x1="48" y1="48" x2="48" y2="20" transform={`rotate(${(m + s / 60) * 6} 48 48)`} />
              <line className="clock-hand clock-hand--second" x1="48" y1="53" x2="48" y2="16" transform={`rotate(${s * 6} 48 48)`} />
              <circle className="clock-pin" cx="48" cy="48" r="2.8" />
            </svg>
            <p className="clock-name">{zone.label}</p>
            <p className="clock-time">{t.hour}:{t.minute}:{t.second} {zoneAbbreviation(now, zone.timeZone)}</p>
          </div>
        );
      })}
    </div>
  );
}

function FooterColumn({ column }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className={`footer-col${open ? " is-open" : ""}`} aria-label={column.label}>
      <button className="footer-col-toggle" aria-expanded={String(open)} onClick={() => setOpen((v) => !v)}>
        {column.title}
      </button>
      <ul className="footer-col-list">
        {column.links.map(([label, to]) => (
          <li key={`${to}-${label}`}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer" id="site-footer">
      <div className="container">
        <div className="footer-contact" id="contact">
          <div className="footer-contact-copy">
            <h2>Have a question or need a hand?</h2>
            <p>Get in touch and we'll point you in the right direction.</p>
          </div>
          <ContactForm />

          <div className="footer-ways">
            <p className="footer-ways-label">Other ways to contact us:</p>
            <p className="footer-way">
              <span>Email us:</span> <a className="contact-chip" href="mailto:havitgrowth@gmail.com">havitgrowth@gmail.com</a>
            </p>
            <p className="footer-way">
              <span>Call us:</span> <a className="contact-chip" href="tel:+923000000000">+92 300 0000000</a>
            </p>
          </div>
        </div>

        <div className="footer-columns">
          {COLUMNS.map((column) => (
            <FooterColumn key={column.title} column={column} />
          ))}
          <div className="footer-col footer-col--contact">
            <p className="footer-col-heading">Stay in the loop</p>
            <NewsletterForm />
            <ul className="social-links" aria-label="Social media">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a href="#" aria-label={social.label}>
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <path fill="currentColor" d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <WorldClocks />
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-row">
          <p className="footer-legal">© {new Date().getFullYear()} JUST AFTER MIDNIGHT. All rights reserved.</p>
          <ul className="footer-assurances" aria-label="How we work">
            {ASSURANCES.map((item) => (
              <li className={`assurance assurance--${item.key}`} key={item.key}>
                {item.mark}
                <span className="assurance-title">{item.title}</span>
                <span className="assurance-sub">{item.sub}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
