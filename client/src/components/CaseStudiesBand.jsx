import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ARROW = (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="50" viewBox="0 0 25 50" fill="none" aria-hidden="true" focusable="false">
    <path d="M25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0V50Z" fill="white" />
    <path d="M11.8233 20.0002C11.6628 19.9966 11.5052 20.0437 11.3724 20.1351C11.2396 20.2264 11.1382 20.3575 11.0823 20.5099C11.0264 20.6624 11.0187 20.8287 11.0604 20.9857C11.1021 21.1427 11.1911 21.2826 11.315 21.3861L16.041 25.4873L11.315 29.5872C11.2293 29.651 11.1575 29.732 11.1042 29.8251C11.0509 29.9183 11.0171 30.0217 11.005 30.1287C10.9929 30.2357 11.0028 30.3441 11.034 30.4471C11.0651 30.55 11.117 30.6454 11.1862 30.7272C11.2555 30.8089 11.3406 30.8752 11.4364 30.9221C11.5321 30.9689 11.6364 30.9953 11.7426 30.9994C11.8489 31.0036 11.9548 30.9855 12.0539 30.9463C12.1529 30.907 12.2429 30.8475 12.3181 30.7714L17.729 26.0818C17.814 26.0083 17.8822 25.9171 17.929 25.8144C17.9758 25.7116 18 25.5998 18 25.4866C18 25.3735 17.9758 25.2616 17.929 25.1589C17.8822 25.0561 17.814 24.9649 17.729 24.8914L12.3181 20.1973C12.1814 20.0743 12.0061 20.0045 11.8233 20.0002Z" fill="#132140" />
  </svg>
);

export default function CaseStudiesBand({ title, studies, variant = "wide", tightHeader, carousel = false }) {
  const gridRef = useRef(null);
  const [bounds, setBounds] = useState({ prev: false, next: false });

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !carousel) return undefined;
    const update = () => {
      const max = grid.scrollWidth - grid.clientWidth;
      const prev = grid.scrollLeft > 1;
      const next = grid.scrollLeft < max - 1;
      setBounds((b) => (b.prev === prev && b.next === next ? b : { prev, next }));
    };
    update();
    grid.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      grid.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [carousel]);

  function scrollCards(direction) {
    const grid = gridRef.current;
    const card = grid?.firstElementChild;
    if (!card) return;
    const gap = parseFloat(window.getComputedStyle(grid).columnGap) || 0;
    grid.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <section className={`support-cases${variant === "detail" ? " support-cases--detail" : ""}${tightHeader ? " support-cases--tight" : ""}${carousel ? " support-cases--carousel" : ""}`}>
      <div className="container">
        <h2 className="section-title reveal">{title}</h2>
        <div className="support-case-slider">
          <div className="support-case-grid" ref={gridRef}>
            {(studies || []).slice(0, 4).map((study) => {
              const to = study.to || `/case-studies/${study.slug}`;
              const external = /^https?:\/\//i.test(to);
              const Tag = external ? "a" : Link;
              const props = external ? { href: to } : { to };
              return (
                <Tag className="support-case reveal" {...props} key={study.slug}>
                  <span className="support-case-art">
                    {study.image ? <img src={study.image} alt="" loading="lazy" decoding="async" /> : <span className="support-case-word">{study.client}</span>}
                  </span>
                  <h3>{study.client}</h3>
                  <p>{study.headline}</p>
                </Tag>
              );
            })}
          </div>
          {carousel && (
            <>
              <button type="button" className="support-case-arrow support-case-arrow--prev" aria-label="Previous case studies" disabled={!bounds.prev} onClick={() => scrollCards(-1)}>{ARROW}</button>
              <button type="button" className="support-case-arrow support-case-arrow--next" aria-label="Next case studies" disabled={!bounds.next} onClick={() => scrollCards(1)}>{ARROW}</button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}