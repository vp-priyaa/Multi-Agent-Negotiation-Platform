
import {
  Activity,
  Handshake,
  Bot,
  Clock3,
  ArrowUpRight,
  Plus,
  Play,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import StatCard from "../components/StatCard";
import AgentCard from "../components/AgentCard";
import ScenarioCard from "../components/ScenarioCard";

const stats = [
  { title: "Total Simulations", value: "24", change: "+12%", icon: Activity, color: "blue" },
  { title: "Successful Agreements", value: "18", change: "75% rate", icon: Handshake, color: "green" },
  { title: "Configured Agents", value: "03", change: "3 personas", icon: Bot, color: "purple" },
  { title: "Avg. Duration", value: "02:35", change: "Target: under 5 min", icon: Clock3, color: "orange" },
];

const agents = [
  { name: "Alex Morgan", role: "Business Negotiator", personality: "Aggressive", initials: "AM", color: "blue" },
  { name: "Sarah Chen", role: "HR Negotiator", personality: "Collaborative", initials: "SC", color: "green" },
  { name: "James Wilson", role: "Financial Advisor", personality: "Risk-Averse", initials: "JW", color: "purple" },
];

const scenarios = [
  {
    title: "Salary Negotiation",
    description: "Practise negotiating compensation, benefits and joining terms.",
    category: "CAREER",
    icon: "💼",
    difficulty: "Intermediate",
  },
  {
    title: "Vendor Agreement",
    description: "Negotiate pricing, delivery schedules and contract conditions.",
    category: "BUSINESS",
    icon: "🤝",
    difficulty: "Advanced",
  },
  {
    title: "Workplace Conflict",
    description: "Resolve disagreements through effective communication.",
    category: "WORKPLACE",
    icon: "💬",
    difficulty: "Beginner",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* Welcome Section */}
      <section className="welcome-row">
        <div>
          <div className="eyebrow">
            <Sparkles size={14} /> AI-POWERED TRAINING
          </div>

          <h1>Welcome to your workspace</h1>

          <p>
            Build stronger negotiation skills through intelligent simulations.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/simulation")}
        >
          <Plus size={18} /> New Simulation
        </button>
      </section>

      {/* Statistics */}
      <section className="stats-grid">
        {stats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </section>

      {/* Negotiation Scenarios */}
      <section className="section-block">

        <div className="section-heading">
          <div>
            <h2>Negotiation Scenarios</h2>
            <p>Choose a real-world situation to practise.</p>
          </div>

          <button
            className="view-link"
            onClick={() => navigate("/scenarios")}
          >
            View all <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="scenario-grid">
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.title}
              {...scenario}
            />
          ))}
        </div>

      </section>

      {/* Agents and Quick Start */}
      <section className="bottom-grid">

        <div className="panel">

          <div className="section-heading">
            <div>
              <h2>AI Agent Profiles</h2>
              <p>Your configured negotiation personas.</p>
            </div>

            <button
              className="view-link"
              onClick={() => navigate("/agents")}
            >
              Manage <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="agent-list">
            {agents.map((agent) => (
              <AgentCard
                key={agent.name}
                {...agent}
              />
            ))}
          </div>

        </div>

        {/* Quick Start */}
        <div className="panel quick-panel">

          <div className="section-heading">
            <div>
              <h2>Quick Start</h2>
              <p>Start practising your skills.</p>
            </div>
          </div>

          <div className="quick-icon">
            <Play size={23} />
          </div>

          <h3>Ready to negotiate?</h3>

          <p>
            Set up your scenario, configure participants and begin a new simulation.
          </p>

          <button
            className="primary-button full-button"
            onClick={() => navigate("/simulation")}
          >
            <Play size={16} /> Start Practice
          </button>

        </div>

      </section>

      <p className="demo-note">
        Demo workspace — Statistics and agent profiles are sample data.
      </p>

    </div>
  );
}
