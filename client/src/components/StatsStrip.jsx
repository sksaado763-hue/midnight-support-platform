import { useApi } from "../lib/api";

export default function StatsStrip({ alt = false }) {
  const { data: stats } = useApi("/api/stats");
  if (!stats) return null;
  return (
    <section className={`stats-strip${alt ? " stats-strip--alt" : ""}`} aria-label="Key numbers">
      <div className="container stats-grid">
        {stats.map((stat) => (
          <div className="stat reveal" key={stat.label}>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
