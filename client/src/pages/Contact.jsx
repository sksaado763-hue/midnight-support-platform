import { useSearchParams } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import { ContactPageForm } from "../components/Forms";
import LatestInsights from "../components/Cards";

export default function Contact() {
  useTitle("Contact Us | Just After Midnight");
  const [params] = useSearchParams();
  const presetPackage = params.get("package") || "";

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero-title reveal">Contact Us</h1>
          <p className="page-hero-sub reveal">Whether it's a 3am incident, a migration plan or a quick question — we're around. Messages land straight in our (working, actually-used) inbox.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container contact-grid">
          <div className="contact-info reveal">
            <h2>Direct lines</h2>
            <ul className="contact-list">
              <li>
                <span className="contact-label">Email us</span>
                <a href="mailto:havitgrowth@gmail.com">havitgrowth@gmail.com</a>
              </li>
              <li>
                <span className="contact-label">Call us (24/7)</span>
                <a href="tel:+923000000000">+92 300 0000000</a>
              </li>
              <li>
                <span className="contact-label">Existing client, live incident?</span>
                <a href="tel:+923000000000">Use the emergency line — it pages a human</a>
              </li>
            </ul>
            <h2>Office</h2>
            <p className="contact-address">
              Lahore, Punjab<br />
              Pakistan
            </p>
            <div className="contact-map" aria-hidden="true">
              <svg viewBox="0 0 400 220">
                <defs>
                  <linearGradient id="mapGround" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#152742" />
                    <stop offset="1" stopColor="#0a1320" />
                  </linearGradient>
                  <radialGradient id="pinGlow">
                    <stop offset="0" stopColor="#fabd14" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#fabd14" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect width="400" height="220" fill="url(#mapGround)" />

                <g fill="#1d3354">
                  <rect x="16" y="66" width="54" height="36" rx="5" />
                  <rect x="18" y="176" width="46" height="30" rx="5" />
                  <rect x="156" y="140" width="48" height="32" rx="5" />
                  <rect x="212" y="76" width="42" height="30" rx="5" />
                  <rect x="330" y="42" width="54" height="34" rx="5" />
                  <rect x="352" y="150" width="40" height="36" rx="5" />
                </g>

                <g stroke="#ffffff" strokeWidth="2" opacity="0.07">
                  <path d="M0 82h400M0 116h400M0 152h400M0 186h400" />
                  <path d="M96 0v220M172 0v220M252 0v220M324 0v220" />
                </g>

                <path d="M-10 30C70 14 130 44 200 28s130-16 210 2" fill="none" stroke="#3d8bfd" strokeWidth="16" strokeLinecap="round" opacity="0.85" />
                <path d="M-10 30C70 14 130 44 200 28s130-16 210 2" fill="none" stroke="#8ec2ff" strokeWidth="4" strokeLinecap="round" opacity="0.9" />

                <path d="M-10 152C80 122 150 172 232 152 300 136 342 164 410 142" fill="none" stroke="#ff6f91" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
                <path d="M46 214 150 56" fill="none" stroke="#ffb547" strokeWidth="7" strokeLinecap="round" />
                <path d="M46 214 150 56" fill="none" stroke="#fff6e6" strokeWidth="1.4" strokeDasharray="7 9" opacity="0.65" />
                <path d="M236 216 206 66" fill="none" stroke="#34e39f" strokeWidth="6" strokeLinecap="round" />
                <path d="M262 44 340 152" fill="none" stroke="#b57cff" strokeWidth="6" strokeLinecap="round" />
                <path d="M292 40 356 126" fill="none" stroke="#fabd14" strokeWidth="4" strokeLinecap="round" opacity="0.85" />

                <path d="M162 52 214 46 228 82 196 100 160 88Z" fill="#f2c14e" fillOpacity="0.16" stroke="#f2c14e" strokeWidth="1.6" strokeDasharray="5 4" strokeOpacity="0.75" />

                <g fill="#1f9c63" opacity="0.9">
                  <rect x="300" y="58" width="44" height="26" rx="6" />
                  <rect x="96" y="150" width="40" height="26" rx="6" />
                </g>

                <circle cx="250" cy="138" r="34" fill="url(#pinGlow)" />
                <circle cx="250" cy="138" r="13" fill="none" stroke="#fabd14" strokeWidth="2" opacity="0.75" />
                <path d="M250 121a11.5 11.5 0 0 1 11.5 11.5c0 8-11.5 18-11.5 18s-11.5-10-11.5-18A11.5 11.5 0 0 1 250 121z" fill="#fabd14" />
                <circle cx="250" cy="132.5" r="4.2" fill="#06222b" />

                <g fill="#A2CCE4" fontFamily="Montserrat, sans-serif" fontSize="9" fontWeight="600" letterSpacing="1.4">
                  <text x="16" y="48">RAVI</text>
                  <text x="150" y="118">OLD CITY</text>
                  <text x="104" y="200">MALL RD</text>
                  <text x="298" y="176">GULBERG</text>
                </g>
              </svg>
            </div>
          </div>

          <ContactPageForm presetPackage={presetPackage} />
        </div>
      </section>

      <LatestInsights />
    </>
  );
}
