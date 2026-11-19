
import { useState } from "react";
import { BarChart3, TrendingUp, Target, Award } from "lucide-react";

const strategies = [
  {
    name: "Collaborative",
    success: 88,
    communication: 92,
    flexibility: 90,
    satisfaction: 91,
    description: "Focuses on mutual benefits and win-win agreements.",
  },
  {
    name: "Aggressive",
    success: 65,
    communication: 68,
    flexibility: 45,
    satisfaction: 58,
    description: "Focuses on achieving maximum individual benefits.",
  },
  {
    name: "Risk-Averse",
    success: 74,
    communication: 78,
    flexibility: 62,
    satisfaction: 80,
    description: "Prioritises stability and minimising potential losses.",
  },
];

export default function StrategyComparison() {
  const [selected, setSelected] = useState("success");

  const metrics = [
    { value: "success", label: "Agreement Rate" },
    { value: "communication", label: "Communication" },
    { value: "flexibility", label: "Flexibility" },
    { value: "satisfaction", label: "Satisfaction" },
  ];

  const winner = [...strategies].sort(
    (a, b) => b[selected] - a[selected]
  )[0];

  return (
    <div className="comparison-page">
      <header className="comparison-heading">
        <div>
          <span className="eyebrow">STRATEGY ANALYTICS</span>
          <h1>Strategy Comparison</h1>
          <p>Analyse negotiation approaches and compare agent performance.</p>
        </div>
        <span className="comparison-demo">DEMO DATA</span>
      </header>

      <section className="comparison-winner">
        <Award size={30} />
        <div>
          <span>Top performing strategy</span>
          <h2>{winner.name}</h2>
          <p>{winner[selected]}% in {metrics.find(m => m.value === selected)?.label}</p>
        </div>
      </section>

      <section className="comparison-card">
        <div className="comparison-title">
          <div>
            <h2>Performance Comparison</h2>
            <p>Choose a metric to compare strategies.</p>
          </div>
          <BarChart3 size={24} />
        </div>

        <div className="comparison-tabs">
          {metrics.map((metric) => (
            <button
              key={metric.value}
              className={selected === metric.value ? "active" : ""}
              onClick={() => setSelected(metric.value)}
            >
              {metric.label}
            </button>
          ))}
        </div>

        <div className="comparison-bars">
          {strategies.map((strategy) => (
            <div className="comparison-bar-item" key={strategy.name}>
              <div className="comparison-bar-label">
                <strong>{strategy.name}</strong>
                <strong>{strategy[selected]}%</strong>
              </div>
              <div className="comparison-track">
                <div
                  className="comparison-fill"
                  style={{ width: `${strategy[selected]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="strategy-cards">
        {strategies.map((strategy) => (
          <article className="strategy-card" key={strategy.name}>
            <div className="strategy-icon">
              <TrendingUp size={23} />
            </div>
            <h3>{strategy.name}</h3>
            <p>{strategy.description}</p>

            <div className="strategy-stat">
              <span>Agreement Rate</span>
              <strong>{strategy.success}%</strong>
            </div>
            <div className="strategy-stat">
              <span>Communication</span>
              <strong>{strategy.communication}%</strong>
            </div>
            <div className="strategy-stat">
              <span>Flexibility</span>
              <strong>{strategy.flexibility}%</strong>
            </div>
            <div className="strategy-stat">
              <span>Satisfaction</span>
              <strong>{strategy.satisfaction}%</strong>
            </div>
          </article>
        ))}
      </section>

      <section className="comparison-insight">
        <Target size={24} />
        <div>
          <h3>Strategy Insight</h3>
          <p>
            Collaborative negotiation performs best in this sample dataset.
            It balances communication, flexibility and mutual satisfaction.
            The best approach may vary depending on the negotiation scenario.
          </p>
        </div>
      </section>

      <p className="comparison-disclaimer">
        These are illustrative sample scores, not results from actual completed simulations.
      </p>
    </div>
  );
}
