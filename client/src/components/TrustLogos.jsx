/* Trusted-by lockups: line-art mark + per-brand wordmark treatment.
   Every drawn element carries pathLength="1" so the CSS stroke-in animation
   reads at the same speed regardless of the shape's real perimeter. */
const BRANDS = [
  {
    key: "tessera",
    name: "Tessera",
    mark: (
      <>
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="1" pathLength="1" />
        <rect x="8.25" y="8.25" width="7.5" height="7.5" rx="1" pathLength="1" />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="1" pathLength="1" />
      </>
    ),
    word: "TESSERA",
  },
  {
    key: "helios",
    name: "Helios Bank",
    mark: (
      <>
        <circle cx="12" cy="12" r="4.2" pathLength="1" />
        <path pathLength="1" d="M12 2.6v2.7M12 18.7v2.7M2.6 12h2.7M18.7 12h2.7M5.3 5.3l1.9 1.9M16.8 16.8l1.9 1.9M18.7 5.3l-1.9 1.9M7.2 16.8l-1.9 1.9" />
      </>
    ),
    word: (<>HELIOS<span className="trust-word-light">&nbsp;BANK</span></>),
  },
  {
    key: "northbank",
    name: "Northbank",
    mark: (
      <>
        <circle cx="12" cy="12" r="8.8" pathLength="1" />
        <path pathLength="1" d="M12 6 15.5 16.6 12 14.2 8.5 16.6z" />
      </>
    ),
    word: (<>NORTH<span className="trust-word-light">BANK</span></>),
  },
  {
    key: "arcadia",
    name: "Arcadia",
    mark: (
      <>
        <path pathLength="1" d="M4.6 20.4V12a7.4 7.4 0 0 1 14.8 0v8.4" />
        <path pathLength="1" d="M9.4 20.4V12a2.6 2.6 0 0 1 5.2 0v8.4" />
      </>
    ),
    word: "ARCADIA",
  },
  {
    key: "volta",
    name: "Volta",
    mark: (
      <>
        <path pathLength="1" d="M13 2.5 5.5 13.5h5l-1 8 7.5-11h-5z" />
      </>
    ),
    word: "VOLTA",
  },
  {
    key: "bluepine",
    name: "Bluepine",
    mark: (
      <>
        <path pathLength="1" d="M12 3 7.6 9.6h8.8z" />
        <path pathLength="1" d="M12 8.2 5.9 16.8h12.2z" />
        <path pathLength="1" d="M12 16.8v4.2" />
      </>
    ),
    word: "BLUEPINE",
  },
  {
    key: "meridian",
    name: "Meridian",
    mark: (
      <>
        <circle cx="12" cy="12" r="8.8" pathLength="1" />
        <ellipse cx="12" cy="12" rx="4" ry="8.8" pathLength="1" />
        <path pathLength="1" d="M3.8 8.5h16.4M3.8 15.5h16.4" />
      </>
    ),
    word: "MERIDIAN",
  },
];

/* Renders the brand set twice: the clone is what lets the track scroll
   infinitely and hand off seamlessly. It is aria-hidden so screen readers
   still hear each name exactly once. */
function BrandSet({ hidden }) {
  return (
    <ul className="trust-set" aria-label={hidden ? undefined : "Selected clients"} aria-hidden={hidden || undefined}>
      {BRANDS.map((brand, i) => (
        <li className={`trust-logo trust-${brand.key}`} key={brand.key} style={{ "--i": i }}>
          <svg className="trust-mark" viewBox="0 0 24 24" role="img" aria-label={brand.name}>
            <g className="trust-mark-base">{brand.mark}</g>
            {/* Same geometry redrawn as a short travelling arc — the idle cycle. */}
            <g className="trust-mark-trace" aria-hidden="true">{brand.mark}</g>
          </svg>
          <span className="trust-word">{brand.word}</span>
        </li>
      ))}
    </ul>
  );
}

export function TrustLogos() {
  return (
    <div className="trust-marquee">
      <div className="trust-logos">
        <BrandSet />
        <BrandSet hidden />
      </div>
    </div>
  );
}

export default TrustLogos;
