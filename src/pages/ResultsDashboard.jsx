
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Target, Clock, RotateCcw, ArrowLeft } from "lucide-react";

export default function ResultsDashboard() {
  const navigate = useNavigate();

  const result = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("negotiation-result"));
    } catch {
      return null;
    }
  }, []);

  const simulation = useMemo(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("active-negotiation-simulation")
      );
    } catch {
      return null;
    }
  }, []);

  const scenario = result?.scenario || simulation?.scenario || "Salary Negotiation";
  const outcome = result?.outcome || "Demo report";
  const score = result?.score ?? 82;
  const rounds = result?.rounds ?? simulation?.rounds ?? 5;
  const agreement = outcome === "Agreement reached";

  const metrics = [
    { label: "Performance Score", value: `${score}/100`, icon: Target },
    { label: "Rounds Used", value: rounds, icon: RotateCcw },
    { label: "Outcome", value: agreement ? "Agreement" : "Demo", icon: Trophy },
    { label: "Session Duration", value: "Demo", icon: Clock },
  ];

  return (
    <div className="results-page">
      <header className="results-heading">
        <div>
          <span className="eyebrow">PERFORMANCE ANALYTICS</span>
          <h1>Results Dashboard</h1>
          <p>Review your negotiation performance and learning progress.</p>
        </div>
        <span className="results-demo">DEMO REPORT</span>
      </header>

      <section className="results-summary">
        <div>
          <span>Scenario</span>
          <h2>{scenario}</h2>
        </div>
        <div>
          <span>Negotiation Outcome</span>
          <h2>{outcome}</h2>
        </div>
        <div>
          <span>Session Type</span>
          <h2>
            {simulation?.mode === "ai" ? "AI vs AI" : "Human vs AI"}
          </h2>
        </div>
      </section>

      <section className="results-metrics">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div className="result-metric" key={metric.label}>
              <Icon size={23} />
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          );
        })}
      </section>

      <div className="results-grid">
        <section className="results-card">
          <h2>Performance Overview</h2>
          <div className="score-circle">
            <strong>{score}</strong>
            <span>out of 100</span>
          </div>
          <p className="results-note">
            {score >= 80
              ? "Good performance! You demonstrated promising negotiation skills."
              : "Keep practising to improve your negotiation approach."}
          </p>
        </section>

        <section className="results-card">
          <h2>Skill Evaluation</h2>
          {[
            ["Communication", 88],
            ["Strategic Thinking", 80],
            ["Flexibility", 75],
            ["Problem Solving", 85],
          ].map(([name, value]) => (
            <div className="skill-row" key={name}>
              <div><span>{name}</span><strong>{value}%</strong></div>
              <div className="skill-track">
                <div style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </section>
      </div>

      <section className="results-card feedback-card">
        <h2>Personalised Learning Feedback</h2>
        <ul>
          <li>Communicate your expectations clearly.</li>
          <li>Understand the other party's interests before responding.</li>
          <li>Explore multiple options instead of focusing on one offer.</li>
          <li>Use evidence and reasoning to support your proposals.</li>
        </ul>
      </section>

      <div className="results-actions">
        <button onClick={() => navigate("/arena")}>
          <ArrowLeft size={17} /> Back to Arena
        </button>
        <button onClick={() => navigate("/simulation")}>
          <RotateCcw size={17} /> New Simulation
        </button>
      </div>

      <p className="results-disclaimer">
        These are demonstration analytics, not scores calculated from a real AI evaluation engine.
      </p>
    </div>
  );
}
