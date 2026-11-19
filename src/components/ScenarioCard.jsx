import { ArrowUpRight } from "lucide-react";

export default function ScenarioCard({ title, description, category, icon, difficulty }) {
  return (
    <article className="scenario-card">
      <div className="scenario-top">
        <div className="scenario-icon">{icon}</div>
        <span className="difficulty">{difficulty}</span>
      </div>
      <span className="category">{category}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="text-action">
        Explore scenario <ArrowUpRight size={16} />
      </button>
    </article>
  );
}
