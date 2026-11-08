/* The reference's "At a glance" slab: one navy card on the page background, an
   underlined eyebrow, a 27px title and a stack of questions that each hang their
   answer 18px under the question. /support and its sub-pages carry the identical
   block, so the copy is the only thing a page supplies. */
export default function GlanceBand({ eyebrow, title, items = [] }) {
  return (
    <section className="glance-band">
      <div className="container">
        <div className="glance-card reveal">
          <p className="glance-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          {items.map((item) => (
            <div className="glance-item" key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
