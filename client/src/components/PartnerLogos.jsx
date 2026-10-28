/* The partner wall. Each brand here is one of Midnight's own invented names —
   the marks are original drawings, not any real company's logo. `word` carries
   the typographic treatment (two-tone halves, letter-spaced or lowercase names)
   so the grid reads as a set of lockups instead of a list of words. */
/* The wbr is what lets a fused name like SIGNALWORKS break into two lines
   inside a 90px tile instead of running past its edges on mobile. */
const L = (text) => <><wbr /><span className="pn-light">{text}</span></>;

export const PARTNER_BRANDS = {
  /* ---- Brands ---- */
  tessera: {
    name: "Tessera",
    mark: (
      <g fill="#243F88">
        <rect x="3" y="17" width="9" height="9" rx="2" />
        <rect x="11.5" y="11.5" width="9" height="9" rx="2" opacity="0.72" />
        <rect x="20" y="3" width="9" height="9" rx="2" opacity="0.45" />
      </g>
    ),
    word: "TESSERA",
  },
  northbank: {
    name: "Northbank",
    mark: (
      <>
        <circle cx="16" cy="16" r="12.5" fill="#004242" />
        <path d="M16 6.5 20.5 24 16 20 11.5 24z" fill="#ffffff" />
      </>
    ),
    word: <>NORTH{L("BANK")}</>,
  },
  arcadia: {
    name: "Arcadia",
    mark: (
      <>
        <path d="M4.5 26V15a11.5 11.5 0 0 1 23 0v11" stroke="#C2453A" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        <path d="M11.5 26v-9.5a4.5 4.5 0 0 1 9 0V26" stroke="#E08A00" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      </>
    ),
    word: "ARCADIA",
  },
  volta: {
    name: "Volta",
    mark: (
      <>
        <circle cx="16" cy="16" r="13" fill="#132140" />
        <path d="M18 6.5 10.5 17.5h4.2l-1 8 7.3-11h-4.2z" fill="#FABD14" />
      </>
    ),
    word: "VOLTA",
  },
  meridian: {
    name: "Meridian",
    mark: (
      <>
        <circle cx="16" cy="16" r="12.5" fill="#1D6FA5" />
        <ellipse cx="16" cy="16" rx="5.6" ry="12.5" fill="none" stroke="#ffffff" strokeWidth="1.7" />
        <path d="M3.5 16h25M4.6 10.6h22.8M4.6 21.4h22.8" stroke="#ffffff" strokeWidth="1.5" />
      </>
    ),
    word: "MERIDIAN",
    wide: true,
  },
  halcyon: {
    name: "Halcyon",
    mark: (
      <>
        <path d="M3 19.5c4.5-7 9-7 13 0 3.4-7 8.4-7 13.5 0" stroke="#6C4FA1" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        <circle cx="16" cy="8.6" r="2.8" fill="#E08A00" />
      </>
    ),
    word: "halcyon",
    wide: true,
  },
  orchardco: {
    name: "Orchard & Co",
    mark: (
      <>
        <circle cx="14.5" cy="19" r="9" fill="#3E7C34" />
        <path d="M15 9.5c0-3.6 2.9-6.4 6.6-6.7.3 3.7-2.6 6.7-6.6 6.7z" fill="#7CB342" />
      </>
    ),
    word: <>ORCHARD{L("&CO")}</>,
  },
  bluepine: {
    name: "Bluepine",
    mark: (
      <>
        <path d="M16 3.5 10.5 12h11z" fill="#1F5C77" />
        <path d="M16 9.5 7.5 21.5h17z" fill="#1F5C77" opacity="0.78" />
        <path d="M16 21.5v7" stroke="#8B5E34" strokeWidth="2.6" strokeLinecap="round" />
      </>
    ),
    word: "BLUEPINE",
  },

  /* ---- Technology ---- */
  cloudveil: {
    name: "Cloudveil",
    mark: (
      <>
        <g fill="#5B7FBF">
          <circle cx="12" cy="17" r="6.5" />
          <circle cx="20" cy="14.5" r="8" />
          <rect x="8" y="16" width="18" height="8.5" rx="4.25" />
        </g>
        <rect x="4.5" y="19" width="23" height="2.6" rx="1.3" fill="#ffffff" opacity="0.55" />
      </>
    ),
    word: "cloudveil",
  },
  stackforge: {
    name: "Stackforge",
    mark: (
      <g fill="#8A5A2B">
        <rect x="4" y="21" width="24" height="6" rx="3" />
        <rect x="7.5" y="13.5" width="17" height="6" rx="3" opacity="0.78" />
        <rect x="11" y="6" width="10" height="6" rx="3" opacity="0.56" />
      </g>
    ),
    word: <>STACK{L("FORGE")}</>,
  },
  quanta: {
    name: "Quanta",
    mark: (
      <>
        <path d="M16 6 26 16 16 26 6 16z" fill="none" stroke="#C4B5FD" strokeWidth="1.8" />
        <g fill="#7A5AF8">
          <circle cx="16" cy="6" r="4" />
          <circle cx="26" cy="16" r="4" />
          <circle cx="16" cy="26" r="4" />
          <circle cx="6" cy="16" r="4" />
        </g>
      </>
    ),
    word: "QUANTA",
  },
  nimbus9: {
    name: "Nimbus9",
    mark: (
      <>
        <circle cx="16" cy="16" r="12.5" fill="#38A3D9" />
        <g fill="#0B4E73">
          <circle cx="12.5" cy="17.5" r="4.2" />
          <circle cx="18.5" cy="15.5" r="5.8" />
          <rect x="8.5" y="16.5" width="15" height="5.6" rx="2.8" />
        </g>
      </>
    ),
    word: <>NIMBUS{L("9")}</>,
  },
  corewire: {
    name: "Corewire",
    mark: (
      <>
        <circle cx="16" cy="16" r="11.5" stroke="#C2415A" strokeWidth="3.2" fill="none" />
        <circle cx="16" cy="16" r="5.4" stroke="#C2415A" strokeWidth="3" fill="none" opacity="0.62" />
        <circle cx="16" cy="16" r="1.8" fill="#C2415A" />
      </>
    ),
    word: <>CORE{L("WIRE")}</>,
  },
  byteharbor: {
    name: "Byte Harbor",
    mark: (
      <>
        <circle cx="16" cy="7.5" r="3.4" fill="none" stroke="#1B6B5A" strokeWidth="2.8" />
        <path d="M16 11.5v15M10.5 16h11" stroke="#1B6B5A" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M6 18c0 6.5 4.5 10 10 10s10-3.5 10-10" stroke="#1B6B5A" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      </>
    ),
    word: <>BYTE{L("HARBOR")}</>,
  },
  lattice: {
    name: "Lattice",
    mark: (
      <>
        <path d="M7 6v20M16 6v20M25 6v20M6 7h20M6 16h20M6 25h20" stroke="#4F46E5" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="16" cy="16" r="3.6" fill="#FABD14" />
      </>
    ),
    word: "lattice",
  },
  signalworks: {
    name: "Signalworks",
    mark: (
      <>
        <circle cx="16" cy="21" r="3.6" fill="#2F9E44" />
        <path d="M10.2 15.6a8.2 8.2 0 0 1 11.6 0" stroke="#2F9E44" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M5.6 10.6a14.8 14.8 0 0 1 20.8 0" stroke="#2F9E44" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      </>
    ),
    word: <>SIGNAL{L("WORKS")}</>,
  },

  /* ---- Agencies ---- */
  pixelmore: {
    name: "Pixel & More",
    mark: (
      <g fill="#E8590C">
        <rect x="4" y="4" width="10" height="10" rx="2.5" />
        <rect x="18" y="4" width="10" height="10" rx="2.5" opacity="0.6" />
        <rect x="4" y="18" width="10" height="10" rx="2.5" opacity="0.6" />
        <rect x="18" y="18" width="10" height="10" rx="2.5" />
      </g>
    ),
    word: <>PIXEL{L("&MORE")}</>,
  },
  studionorth: {
    name: "Studio North",
    mark: (
      <>
        <circle cx="16" cy="16" r="12.5" fill="none" stroke="#132140" strokeWidth="2.4" />
        <path d="M16 7 20 16 16 25 12 16z" fill="#132140" />
        <path d="M16 7 20 16h-8z" fill="#C2453A" />
      </>
    ),
    word: <>STUDIO{L(" NORTH")}</>,
  },
  framecraft: {
    name: "Framecraft",
    mark: (
      <>
        <path d="M5 12V5h7M20 5h7v7M27 20v7h-7M12 27H5v-7" stroke="#8B5E34" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="16" r="3.4" fill="#FABD14" />
      </>
    ),
    word: <>FRAME{L("CRAFT")}</>,
  },
  atelier: {
    name: "The Atelier",
    mark: (
      <>
        <path fillRule="evenodd" d="M16 3 30 27H2zM16 13.5 22.5 25h-13z" fill="#A61C60" />
        <circle cx="16" cy="20.6" r="2.2" fill="#FABD14" />
      </>
    ),
    word: <>THE{L(" ATELIER")}</>,
  },
  mosaicco: {
    name: "Mosaic Co",
    mark: (
      <g transform="rotate(45 16 16)">
        <rect x="6.5" y="6.5" width="8.5" height="8.5" rx="2" fill="#0091EA" />
        <rect x="17" y="6.5" width="8.5" height="8.5" rx="2" fill="#0091EA" opacity="0.6" />
        <rect x="6.5" y="17" width="8.5" height="8.5" rx="2" fill="#0091EA" opacity="0.6" />
        <rect x="17" y="17" width="8.5" height="8.5" rx="2" fill="#FABD14" />
      </g>
    ),
    word: <>MOSAIC{L(" CO")}</>,
  },
  boldtype: {
    name: "Boldtype",
    mark: (
      <g fill="#4A4E69">
        <rect x="6" y="4.5" width="6" height="23" rx="2" />
        <rect x="12" y="4.5" width="11" height="10.5" rx="5.25" />
        <rect x="12" y="17" width="13.5" height="10.5" rx="5.25" opacity="0.72" />
      </g>
    ),
    word: <>BOLD{L("TYPE")}</>,
  },
  fieldnotes: {
    name: "Fieldnotes",
    mark: (
      <>
        <rect x="6" y="4" width="20" height="24" rx="3" fill="#6B8E23" />
        <path d="M10.5 11h11M10.5 16h11M10.5 21h7" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
      </>
    ),
    word: <>FIELD{L("NOTES")}</>,
  },
  harlow: {
    name: "Harlow",
    mark: (
      <g fill="#3F3D56">
        <rect x="5" y="6" width="5.5" height="20" rx="1.5" />
        <rect x="21.5" y="6" width="5.5" height="20" rx="1.5" />
        <rect x="10.5" y="13.2" width="11" height="5.6" rx="1.5" />
      </g>
    ),
    word: "HARLOW",
    wide: true,
  },
};

export function PartnerLogo({ slug }) {
  const brand = PARTNER_BRANDS[slug];
  return (
    <div className={`partner-logo partner-logo--${slug}`}>
      <svg className="partner-mark" viewBox="0 0 32 32" aria-hidden="true">{brand.mark}</svg>
      <span className={`partner-name${brand.wide ? " is-wide" : ""}`} title={brand.name}>{brand.word}</span>
    </div>
  );
}

export default PartnerLogo;
