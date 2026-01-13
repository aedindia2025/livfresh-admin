// StatCard.js
export default function StatCard({ title, value, icon, badge }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <span className="stat-title">{title}</span>
        <h3 className="stat-value">{value}</h3>
      </div>
      {badge && <span className="stat-badge">{badge}</span>}
    </div>
  );
}
