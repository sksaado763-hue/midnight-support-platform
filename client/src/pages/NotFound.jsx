import { Link } from "react-router-dom";
import { useTitle } from "../lib/useReveal";

export default function NotFound() {
  useTitle("Page Not Found | Just After Midnight");
  return (
    <section className="page-hero">
      <div className="container notfound">
        <svg className="notfound-art" viewBox="0 0 200 160" aria-hidden="true">
          <circle cx="100" cy="80" r="56" fill="none" stroke="#FABD14" strokeWidth="5" />
          <path d="M100 44v40" stroke="#A2CCE4" strokeWidth="6" strokeLinecap="round" />
          <circle cx="100" cy="108" r="4.5" fill="#A2CCE4" />
          <circle cx="30" cy="30" r="2.5" fill="#A2CCE4" />
          <circle cx="178" cy="126" r="3" fill="#FABD14" />
        </svg>
        <h1 className="page-hero-title reveal">404 — this page is having a lie-down</h1>
        <p className="page-hero-sub reveal">The page you're after doesn't exist (or got moved while nobody was watching). Unlike your infrastructure, we let this one go down.</p>
        <div className="hero-actions reveal" style={{ justifyContent: "center" }}>
          <Link to="/" className="btn btn-primary">Back to homepage <span aria-hidden="true">➔</span></Link>
          <Link to="/contact" className="btn btn-outline">Report a problem <span aria-hidden="true">➔</span></Link>
        </div>
      </div>
    </section>
  );
}
