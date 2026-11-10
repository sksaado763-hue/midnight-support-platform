import { Link } from "react-router-dom";

/* The reference's packages block is three sections that read as one: a centred
   title over a narrower copy column, a borderless-gap table of four equal
   columns, and a closing line. What the pasted capture shows as a highlighted
   first column is not a featured tier — it is the theme's `:hover` state on a
   card, which drops a 30px sky tab above the box, tints the column and turns its
   border sky. The button carries the same trick: a "Contact" panel parked at
   translateY(-102%) slides down over the label on hover. Both are reproduced
   here rather than baked into one column.

   The two sub-pages that carry this block differ in one place each: the SaaS
   page's prose section declares pt-md-4 on top of its mt-md-4, so it opens 20px
   below where the agencies page does, and it finishes its copy with an accent
   link the agencies page leaves as plain text. Both come in as props so the
   geometry stays one component. */
export default function PackageBand({ id, title, intro, introTail, introGap, tiers, note }) {
  return (
    <section className="pkg-band" id={id}>
      <div className={`pkg-intro${introGap ? " pkg-intro--gap" : ""}`}>
        <div className="container">
          <div className="pkg-intro-copy reveal">
            <h2>{title}</h2>
            <p>
              {intro}
              {introTail && (
                <> {introTail.lead} <Link className="pkg-intro-cta" to={introTail.to}>{introTail.link}</Link>.</>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="pkg-table">
        <div className="container">
          <div className="pkg-grid">
            {tiers.map((tier) => (
              <article className="pkg-col reveal" key={tier.name}>
                <span className="pkg-tab">{tier.tab}</span>
                <h3 className="pkg-name">{tier.name}</h3>
                <ul className="pkg-list">
                  {tier.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <Link to={tier.to} className="btn btn-primary pkg-cta">
                  <span className="pkg-cta-hover">{tier.hover}</span>
                  <span className="pkg-cta-text">{tier.cta}</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>

      {note && (
        <div className="pkg-note">
          <div className="container">
            <p className="reveal">
              <strong>{note.lead}</strong>{" "}
              {note.text}{" "}
              <Link to={note.to}>{note.link}</Link>.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
