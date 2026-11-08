/* The row that closes the reference's support pages: the cost of an incident on
   one side and the list of where the numbers came from on the other, two cards
   stretched level. Shared by /support and the sub-pages, which run the same
   geometry and only swap the copy. */
export default function ImpactBand({ question, answer, sourcesHead, sources = [] }) {
  return (
    <section className="impact-band">
      <div className="container">
        <div className="impact-grid">
          <div className="impact-card reveal">
            <h3>{question}</h3>
            <p>{answer}</p>
          </div>
          <div className="impact-sources reveal">
            <h3>{sourcesHead}</h3>
            <ul>
              {sources.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
