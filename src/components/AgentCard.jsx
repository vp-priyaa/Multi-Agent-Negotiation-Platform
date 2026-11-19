export default function AgentCard({ name, role, personality, color, initials }) {
  return (
    <div className="agent-card">
      <div className={`agent-avatar ${color}`}>{initials}</div>
      <div className="agent-info">
        <h3>{name}</h3>
        <p>{role}</p>
        <span className={`personality ${color}`}>{personality}</span>
      </div>
      <span className="status-dot" title="Sample agent profile" />
    </div>
  );
}
