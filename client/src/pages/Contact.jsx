import { useSearchParams } from "react-router-dom";
import { useTitle } from "../lib/useReveal";
import { ContactForm } from "../components/Forms";
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
                <rect width="400" height="220" fill="#1E3E55" />
                <g stroke="#3E5C78" strokeWidth="8" strokeLinecap="round">
                  <path d="M0 60h400M0 150h400M90 0v220M260 0v220" />
                </g>
                <g stroke="#1E3E55" strokeWidth="5" strokeLinecap="round">
                  <path d="M0 60h400M0 150h400M90 0v220M260 0v220" />
                </g>
                <path d="M-10 200 L180 60" stroke="#00A6B8" strokeWidth="7" strokeLinecap="round" />
                <circle cx="175" cy="105" r="20" fill="#00E8F0" />
                <path d="M175 87a9 9 0 0 1 9 9c0 6-9 17-9 17s-9-11-9-17a9 9 0 0 1 9-9z" fill="#3E5C78" />
                <circle cx="175" cy="96" r="3.4" fill="#00E8F0" />
              </svg>
            </div>
          </div>

          <ContactForm withTopic presetPackage={presetPackage} />
        </div>
      </section>

      <LatestInsights />
    </>
  );
}
