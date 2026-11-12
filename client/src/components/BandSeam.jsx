/* The sine crest the /support dividers use, cut as a loose overlay so any band
   can wave into the one above it instead of butting against a straight edge.
   `fill` is the colour of the band that owns the seam; the band it sits on top
   of keeps its own background below the trough. */
const CREST =
  "M0 0H1920V50.5C1760 68.1 1600 84 1440 84C1280 84 1120 68.1 960 50.5C800 68.1 640 17 480 17C320 17 160 33 0 50.5Z";

export default function BandSeam({ fill = "var(--bg)" }) {
  return (
    <div className="band-curve" aria-hidden="true">
      <svg viewBox="0 0 1920 89" preserveAspectRatio="none">
        <path d={CREST} fill={fill} />
      </svg>
    </div>
  );
}
