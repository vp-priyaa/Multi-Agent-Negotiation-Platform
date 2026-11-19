export default function StatCard({ title, value, change, icon: Icon, color }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span>{title}</span>
        <div className={`stat-icon ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <h2>{value}</h2>
      <p><span className="positive">{change}</span> sample dashboard metric</p>
    </article>
  );
}
