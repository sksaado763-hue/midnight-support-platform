/* Stroke icons drawn on a 24x24 grid, used by the navigation menus.
   Glyphs are abstract marks, not vendor logos. */

const ICONS = {
  layers: (
    <>
      <path d="M12 3 3.2 7.4 12 11.8l8.8-4.4z" />
      <path d="M3.2 12.2 12 16.6l8.8-4.4" />
      <path d="M3.2 16.4 12 20.8l8.8-4.4" />
    </>
  ),
  sliders: (
    <>
      <path d="M3 8h9M16.5 8h4.5M3 16h4.5M12 16h9" />
      <circle cx="14.2" cy="8" r="2.2" />
      <circle cx="9.5" cy="16" r="2.2" />
    </>
  ),
  building: (
    <>
      <path d="M3.2 21h17.6" />
      <path d="M6 21V4.2h8.6V21" />
      <path d="M14.6 9.4h3.6V21" />
      <path d="M8.4 8h3M8.4 12h3M8.4 16h3" />
    </>
  ),
  window: (
    <>
      <rect x="3" y="4.4" width="18" height="15.2" rx="2.4" />
      <path d="M3 9.4h18" />
      <path d="M6.2 6.9h3.2" />
      <path d="M7 12.8h6M7 16h4" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4.6h2.3l2.3 9.1a1.7 1.7 0 0 0 1.7 1.3h7.2a1.7 1.7 0 0 0 1.7-1.3L20.4 8.2H6.4" />
      <circle cx="10.2" cy="19.4" r="1.5" />
      <circle cx="17.2" cy="19.4" r="1.5" />
    </>
  ),
  aws: (
    <>
      <path d="M12.2 3.2 20.4 7.9v9.4l-8.2 4.7L4 17.3V7.9z" />
      <path d="M12.2 8.3 16.3 10.6v4.6l-4.1 2.3-4.1-2.3v-4.6z" />
    </>
  ),
  azure: (
    <>
      <path d="M12 3.6 3.4 19.6h17.2z" />
      <path d="M8.4 14.4h7.2" />
    </>
  ),
  gcp: (
    <>
      <path d="M12 3.6 19.4 7.9v8.2L12 20.4 4.6 16.1V7.9z" />
      <circle cx="12" cy="12" r="3.2" />
    </>
  ),
  cost: (
    <>
      <path d="M3.6 3.6h6.6L20.4 13.8a1.7 1.7 0 0 1 0 2.4l-4.6 4.6a1.7 1.7 0 0 1-2.4 0L3.6 10.2z" />
      <circle cx="8" cy="8" r="1.5" />
    </>
  ),
  "shield-check": (
    <>
      <path d="M12 3.2 5.4 5.7v5.6c0 4 2.7 7.2 6.6 8.7 3.9-1.5 6.6-4.7 6.6-8.7V5.7z" />
      <path d="M9.2 11.6l2.1 2.2 4-4.4" />
    </>
  ),
  nodes: (
    <>
      <circle cx="6.2" cy="6.4" r="2.4" />
      <circle cx="17.8" cy="6.4" r="2.4" />
      <circle cx="12" cy="17.6" r="2.4" />
      <path d="M8.6 6.4h6.8" />
      <path d="M7.4 8.6 10.7 15.4" />
      <path d="M16.6 8.6 13.3 15.4" />
    </>
  ),
  migration: (
    <>
      <rect x="2.6" y="8.6" width="4.6" height="6.8" rx="1.4" />
      <rect x="16.8" y="8.6" width="4.6" height="6.8" rx="1.4" />
      <path d="M8.4 12h6.4" />
      <path d="M12.6 9.6 14.8 12l-2.2 2.4" />
    </>
  ),
  cycle: (
    <>
      <path d="M4.6 12a7.4 7.4 0 0 1 12.6-5.3l2 2" />
      <path d="M19.4 12a7.4 7.4 0 0 1-12.6 5.3l-2-2" />
      <path d="M19.4 4.6v4.1h-4.1" />
      <path d="M4.6 19.4v-4.1h4.1" />
    </>
  ),
  bolt: <path d="M13.4 2.8 5.2 13.9h5.6l-1.2 7.3 8.4-11.5h-5.8z" />,
  code: (
    <>
      <path d="M8.6 8.2 3.4 12.2l5.2 4" />
      <path d="M15.4 8.2l5.2 4-5.2 4" />
      <path d="M13.4 5.4 10.6 19" />
    </>
  ),
  sitemap: (
    <>
      <rect x="9.6" y="2.8" width="4.8" height="4.4" rx="1.3" />
      <rect x="2.6" y="16.8" width="4.8" height="4.4" rx="1.3" />
      <rect x="16.6" y="16.8" width="4.8" height="4.4" rx="1.3" />
      <path d="M12 7.2v6.2" />
      <path d="M5 16.8v-3.4h14v3.4" />
    </>
  ),
  blocks: (
    <>
      <rect x="3.4" y="3.4" width="7.4" height="7.4" rx="1.7" />
      <rect x="13.2" y="13.2" width="7.4" height="7.4" rx="1.7" />
      <path d="M10.8 7.1h2.6a1.8 1.8 0 0 1 1.8 1.8v2.5" />
    </>
  ),
  cube: (
    <>
      <path d="M12 2.8 19.8 7v10L12 21.2 4.2 17V7z" />
      <path d="M4.2 7 12 11.4 19.8 7" />
      <path d="M12 11.4v9.8" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.6l2.1 5.3 5.3 2.1-5.3 2.1L12 18.4l-2.1-5.3-5.3-2.1 5.3-2.1z" />
      <path d="M19.4 3.6v3" />
      <path d="M17.9 5.1h3" />
    </>
  ),
  bag: (
    <>
      <path d="M4.4 8.2h15.2l-1.2 11.2a1.8 1.8 0 0 1-1.8 1.6H7.4a1.8 1.8 0 0 1-1.8-1.6z" />
      <path d="M8.6 8.2V6a3.4 3.4 0 0 1 6.8 0v2.2" />
    </>
  ),
  flask: (
    <>
      <path d="M9.4 3.2h5.2" />
      <path d="M10.4 3.2v5.6l-5.6 9.6a1.7 1.7 0 0 0 1.5 2.5h11.4a1.7 1.7 0 0 0 1.5-2.5l-5.6-9.6V3.2" />
      <path d="M7.4 14.6h9.2" />
    </>
  ),
  doc: (
    <>
      <path d="M6.2 3.4h7l4.6 4.6v12.6H6.2z" />
      <path d="M13.2 3.4V8h4.6" />
      <path d="M9 12.6h6M9 16.2h6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.2 12h17.6" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
    </>
  ),
  terminal: (
    <>
      <rect x="2.8" y="4.2" width="18.4" height="15.6" rx="2.6" />
      <path d="M6.6 10.4 9 12.8l-2.4 2.4" />
      <path d="M11.6 15.2h5.2" />
    </>
  ),
  grid: (
    <>
      <rect x="3.4" y="3.4" width="7" height="7" rx="1.6" />
      <rect x="13.6" y="3.4" width="7" height="7" rx="1.6" />
      <rect x="3.4" y="13.6" width="7" height="7" rx="1.6" />
      <rect x="13.6" y="13.6" width="7" height="7" rx="1.6" />
    </>
  ),
  search: (
    <>
      <circle cx="10.6" cy="10.6" r="6.6" />
      <path d="m15.4 15.4 5 5" />
    </>
  ),
};

/* strokeWidth is a prop because the same glyph is drawn at very different sizes:
   the nav renders it near 20px, the cloud tiles near 52px, and a fixed 1.7 in
   viewBox units turns into a 3px+ line once scaled up. */
export default function Icon({ name, strokeWidth = 1.7 }) {
  const glyph = ICONS[name];
  if (!glyph) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyph}
    </svg>
  );
}
