
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Play, Users, User, Clock, Bot,
  Sparkles, CheckCircle2, Target, ArrowRight
} from "lucide-react";
import "./SimulationMode.css";

export default function SimulationMode() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("human");
  const [scenario, setScenario] = useState("Salary Negotiation");
  const [rounds, setRounds] = useState(5);
  const [agents, setAgents] = useState(["Alex Morgan", "Sarah Chen"]);
  const [started, setStarted] = useState(false);

  const availableScenarios = [
    "Salary Negotiation",
    "Vendor Agreement",
    "Workplace Conflict",
  ];

  const availableAgents = [
    "Alex Morgan",
    "Sarah Chen",
    "James Wilson",
  ];

  const toggleAgent = (name) => {
    setAgents((current) =>
      current.includes(name)
        ? current.filter((agent) => agent !== name)
        : [...current, name]
    );
    setStarted(false);
  };

  const startSimulation = () => {
    if (mode === "ai" && agents.length < 2) {
      alert("Select at least two AI agents.");
      return;
    }

    const simulation = {
      mode,
      scenario,
      rounds: Number(rounds),
      agents,
      status: "running",
      startedAt: new Date().toISOString(),
      demo: true,
    };

    sessionStorage.setItem(
      "active-negotiation-simulation",
      JSON.stringify(simulation)
    );

    setStarted(true);
  };

  return (
    <div className="simulation-page peach-simulation">

      <div className="simulation-heading">
        <div>
          <span className="eyebrow">
            <Sparkles size={14} /> TRAINING WORKSPACE
          </span>
          <h1>Simulation Mode</h1>
          <p>Design your session and experience intelligent negotiation practice.</p>
        </div>

        <span className="demo-badge">
          <span className="demo-dot" />
          DEMO ENGINE
        </span>
      </div>

      <div className="simulation-intro">
        <div className="simulation-intro-icon">
          <Sparkles size={25} />
        </div>
        <div>
          <h3>Your negotiation laboratory</h3>
          <p>
            Choose your simulation style, select participants, and
            configure the session before entering the arena.
          </p>
        </div>
      </div>

      <section className="simulation-panel">
        <div className="simulation-section-title">
          <span className="step-number">01</span>
          <div>
            <h2>Choose Simulation Type</h2>
            <p>How would you like to experience negotiation?</p>
          </div>
        </div>

        <div className="simulation-modes">

          <button
            className={`mode-card peach-mode ${mode === "human" ? "selected" : ""}`}
            onClick={() => {
              setMode("human");
              setStarted(false);
            }}
          >
            <div className="mode-icon human-icon">
              <User size={25} />
            </div>

            <span className="mode-tag">INTERACTIVE</span>
            <h3>Human vs AI</h3>
            <p>
              Take the negotiator's seat and practise your skills
              against AI-powered agents.
            </p>

            <div className="mode-footer">
              <span>{mode === "human" ? "Selected" : "Choose mode"}</span>
              {mode === "human" && <CheckCircle2 size={19} />}
            </div>
          </button>

          <button
            className={`mode-card lavender-mode ${mode === "ai" ? "selected" : ""}`}
            onClick={() => {
              setMode("ai");
              setStarted(false);
            }}
          >
            <div className="mode-icon ai-icon">
              <Users size={25} />
            </div>

            <span className="mode-tag">OBSERVATION</span>
            <h3>AI vs AI</h3>
            <p>
              Watch multiple AI agents exchange offers,
              counteroffers, and negotiation strategies.
            </p>

            <div className="mode-footer">
              <span>{mode === "ai" ? "Selected" : "Choose mode"}</span>
              {mode === "ai" && <CheckCircle2 size={19} />}
            </div>
          </button>

        </div>
      </section>

      <section className="simulation-panel">
        <div className="simulation-section-title">
          <span className="step-number blue-step">02</span>
          <div>
            <h2>Select Negotiation Scenario</h2>
            <p>Choose a real-world situation to practise.</p>
          </div>
        </div>

        <label className="simulation-label" htmlFor="scenario-select">
          Negotiation scenario
        </label>

        <select
          id="scenario-select"
          className="peach-select"
          value={scenario}
          onChange={(e) => {
            setScenario(e.target.value);
            setStarted(false);
          }}
        >
          {availableScenarios.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </section>

      <section className="simulation-panel">
        <div className="simulation-section-title">
          <span className="step-number green-step">03</span>
          <div>
            <h2>Select AI Agents</h2>
            <p>Choose the participants for your simulation.</p>
          </div>
        </div>

        <div className="agent-selection">
          {availableAgents.map((agent, index) => (
            <label
              className={`agent-option peach-agent ${
                agents.includes(agent) ? "agent-selected" : ""
              }`}
              key={agent}
            >
              <input
                type="checkbox"
                checked={agents.includes(agent)}
                onChange={() => toggleAgent(agent)}
              />

              <div className={`agent-option-icon agent-color-${index}`}>
                <Bot size={20} />
              </div>

              <span>{agent}</span>

              {agents.includes(agent) && (
                <CheckCircle2 className="agent-check" size={18} />
              )}
            </label>
          ))}
        </div>

        {mode === "human" && (
          <div className="simulation-hint">
            <User size={17} />
            You will participate as the human negotiator.
          </div>
        )}

        {mode === "ai" && agents.length < 2 && (
          <div className="simulation-validation">
            Please select at least two AI agents for AI vs AI mode.
          </div>
        )}
      </section>

      <section className="simulation-panel">
        <div className="simulation-section-title">
          <span className="step-number peach-step">04</span>
          <div>
            <h2>Maximum Negotiation Rounds</h2>
            <p>Set the maximum number of exchanges.</p>
          </div>
        </div>

        <div className="round-control peach-round-control">
          <div className="round-icon">
            <Clock size={22} />
          </div>

          <input
            type="number"
            min="1"
            max="15"
            value={rounds}
            onChange={(e) => {
              const value = Number(e.target.value);
              setRounds(value === 0 ? 1 : Math.max(1, Math.min(15, value)));
              setStarted(false);
            }}
          />

          <span>Rounds (1–15)</span>
        </div>
      </section>

      <section className="simulation-panel simulation-summary peach-summary">
        <div className="simulation-section-title">
          <span className="summary-icon">
            <Target size={21} />
          </span>
          <div>
            <h2>Simulation Summary</h2>
            <p>Review your configuration before starting.</p>
          </div>
        </div>

        <div className="summary-grid">
          <div className="summary-item">
            <span>SIMULATION MODE</span>
            <strong>{mode === "human" ? "Human vs AI" : "AI vs AI"}</strong>
          </div>

          <div className="summary-item">
            <span>SELECTED SCENARIO</span>
            <strong>{scenario}</strong>
          </div>

          <div className="summary-item">
            <span>AI PARTICIPANTS</span>
            <strong>{agents.length} Agents</strong>
          </div>

          <div className="summary-item">
            <span>MAXIMUM ROUNDS</span>
            <strong>{rounds} Rounds</strong>
          </div>
        </div>

        <button
          className="start-simulation peach-start-button"
          onClick={startSimulation}
        >
          <Play size={19} />
          Start Simulation
          <ArrowRight size={18} />
        </button>

        {started && (
          <div className="simulation-success peach-success">
            <CheckCircle2 size={24} />
            <div>
              <h3>Configuration saved successfully!</h3>
              <p>
                This is a demo configuration. The live AI negotiation
                engine will be connected in a later phase.
              </p>
              <button onClick={() => navigate("/arena")}>
                Continue to Negotiation Arena
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        )}
      </section>

      <p className="simulation-footer-note">
        <Sparkles size={13} />
        Every negotiation is an opportunity to learn, adapt, and improve.
      </p>

    </div>
  );
}
