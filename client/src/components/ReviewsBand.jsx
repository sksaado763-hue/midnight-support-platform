import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* The reference ships this `.reviews` block site-wide — the support hub and every
   support sub-page run the same section at the same scale, so there is one
   variant here and page position is handled in CSS, not props. */
const REVIEWS = [
  {
    slug: "gosalary",
    client: "GoSalary",
    role: "Head of Engineering",
    quote: "Payroll cannot wait for morning. The queue backed up at two in the morning, someone on their desk rang us instead of opening a ticket, and the whole run cleared before our payday window opened the next day. Nobody in finance has had to explain a late salary since, and we stopped keeping our own overnight rota as insurance.",
  },
  {
    slug: "hilton-premium-club-japan",
    client: "Hilton Premium Club Japan",
    role: "Director of Digital Operations",
    quote: "Overnight belongs to them now. Every morning there is a written handover on the desk: what broke, what they changed, and what is still waiting on a decision from us. Our engineers stopped dreading Monday, and the on-call rotation stopped being a reason to lose sleep over a platform we had already paid to have covered.",
  },
  {
    slug: "structureflow",
    client: "StructureFlow",
    role: "Chief Technology Officer",
    quote: "They read our code before they quoted us a plan, and it showed in the first month. The fixes hold because nobody is guessing at a stack trace from a screenshot — the person who picks it up has already seen the service, the last deploy and the alert that fired before anyone noticed. That is a different kind of quiet.",
  },
  {
    slug: "dexerto",
    client: "Dexerto",
    role: "Head of Platform",
    quote: "Event days put ten times the traffic on one page. They scaled it ahead of the broadcast, sat with us on the call while it happened, and sent a written summary afterwards covering what held, what nearly did not, and what they would change next time. We got our evening back, and we got a plan we could actually argue with.",
  },
  {
    slug: "third-space",
    client: "Third Space",
    role: "VP Product",
    quote: "A failed booking feels like a lost member, so speed matters more than ceremony. Their escalation paths are written down, which means the first person to pick something up is usually the one who can genuinely fix it. Queue time dropped within a quarter and has stayed down through two peak seasons since.",
  },
  {
    slug: "paylocity",
    client: "Paylocity",
    role: "Security Lead",
    quote: "Our auditors wanted evidence rather than assurances. Every change is logged, peer-reviewed and reversible, so the answer arrives in the same week it is asked instead of after the next quarter. That alone changed how our security reviews run — we spend the time on the findings rather than on chasing the trail.",
  },
];

export default function ReviewsBand({ reviews = REVIEWS }) {
  const trackRef = useRef(null);
  const [perView, setPerView] = useState(2);
  const [page, setPage] = useState(0);
  const pages = Math.ceil(reviews.length / perView);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const apply = () => {
      setPerView(wide.matches ? 2 : 1);
      setPage(0);
      trackRef.current?.scrollTo({ left: 0 });
    };
    apply();
    wide.addEventListener("change", apply);
    return () => wide.removeEventListener("change", apply);
  }, []);

  function pageStep(track) {
    // One page is perView cards plus the gaps between them, not the visible width:
    // the track's gap makes the step 20px wider than the pair on screen.
    const cards = track.children;
    if (cards.length > perView) return cards[perView].offsetLeft - cards[0].offsetLeft;
    return track.clientWidth;
  }

  function showPage(index) {
    const track = trackRef.current;
    if (track) track.scrollTo({ left: index * pageStep(track), behavior: "smooth" });
  }

  return (
    <section className="reviews" aria-label="What the teams we support tell us">
      <div className="container">
        <div className="reviews-slider reveal">
          <div
            className="reviews-track"
            ref={trackRef}
            onScroll={(event) => {
              const track = event.currentTarget;
              setPage(Math.round(track.scrollLeft / Math.max(pageStep(track), 1)));
            }}
          >
            {reviews.map((review) => {
              const companyTo = review.companyUrl || review.to || `/case-studies/${review.slug}`;
              const ctaTo = review.to || `/case-studies/${review.slug}`;
              const companyExternal = /^https?:\/\//i.test(companyTo);
              const ctaExternal = /^https?:\/\//i.test(ctaTo);
              return (
              <article className="review" key={review.slug}>
                <div className="review-wrap">
                  <div className="review-top">
                    <svg width="34" height="25" viewBox="0 0 34 25" fill="none" aria-hidden="true">
                      <path d="M8.02277 0C12.681 0 16.0436 3.84569 16.0435 9.53988C16.0137 17.8132 9.79418 23.6627 0.821682 24.786C-0.0107499 24.8902 -0.331725 23.7371 0.434839 23.3962C3.87766 21.8654 5.61646 19.9228 5.84105 18C6.00885 16.5634 5.22792 15.305 4.24733 15.0694C1.70519 14.4585 0.0019321 11.2927 0.0019321 8.02083C0.0019321 3.59105 3.59298 0 8.02277 0Z" fill="var(--amber)" />
                      <path d="M25.5228 0C30.181 0 33.5436 3.84569 33.5435 9.53988C33.5137 17.8132 27.2942 23.6627 18.3217 24.786C17.4893 24.8902 17.1683 23.7371 17.9348 23.3962C21.3777 21.8654 23.1165 19.9228 23.3411 18C23.5089 16.5634 22.7279 15.305 21.7473 15.0694C19.2052 14.4585 17.5019 11.2927 17.5019 8.02083C17.5019 3.59105 21.093 0 25.5228 0Z" fill="var(--amber)" />
                    </svg>
                    <p className="review-quote">{review.quote}</p>
                  </div>
                  <div className="review-bottom">
                    {companyExternal ? (
                      <a className="review-company" href={companyTo} target="_blank" rel="noopener noreferrer">{review.client}</a>
                    ) : (
                      <Link className="review-company" to={companyTo}>{review.client}</Link>
                    )}
                    <p className="review-position">{review.role}</p>
                    {review.cta !== false && (ctaExternal ? (
                      <a className="btn review-cta" href={ctaTo}>Read the case study</a>
                    ) : (
                      <Link className="btn review-cta" to={ctaTo}>Read the case study</Link>
                    ))}
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        </div>
        <ul className="review-dots">
          {Array.from({ length: pages }, (_, index) => (
            <li key={index}>
              <button
                type="button"
                className={`review-dot${page === index ? " is-active" : ""}`}
                aria-label={`Show testimonials ${index * perView + 1} to ${Math.min((index + 1) * perView, reviews.length)}`}
                aria-current={page === index || undefined}
                onClick={() => showPage(index)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
