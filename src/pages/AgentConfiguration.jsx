
import { useState } from "react";
import {
  Bot,
  Plus,
  Save,
  Trash2,
  Target,
  ShieldCheck,
  Brain,
  UserRound,
  CheckCircle2,
} from "lucide-react";

const personalities = [
  {
    name: "Aggressive",
    description: "Strong demands, assertive offers and limited concessions.",
  },
  {
    name: "Collaborative",
    description: "Focuses on mutual benefits and win-win agreements.",
  },
  {
    name: "Risk-Averse",
    description: "Prefers safe outcomes and carefully evaluates risks.",
  },
];

const initialAgents = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Business Negotiator",
    personality: "Aggressive",
    goal: "Secure the highest possible profit.",
    minimum: "75000",
    maximum: "120000",
    information: "Has a strict internal profit target.",
    communication: "Direct and assertive",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "HR Negotiator",
    personality: "Collaborative",
    goal: "Reach a mutually beneficial agreement.",
    minimum: "50000",
    maximum: "85000",
    information: "Can offer additional employee benefits.",
    communication: "Friendly and cooperative",
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Financial Advisor",
    personality: "Risk-Averse",
    goal: "Avoid financial risk and maintain stability.",
    minimum: "60000",
    maximum: "90000",
    information: "Has limited flexibility in the budget.",
    communication: "Analytical and cautious",
  },
];

const emptyAgent = {
  name: "",
  role: "",
  personality: "Collaborative",
  goal: "",
  minimum: "",
  maximum: "",
  information: "",
  communication: "Professional",
};

export default function AgentConfiguration() {
  const [agents, setAgents] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("negotiation-agents") || "null"
      ) || initialAgents;
    } catch {
      return initialAgents;
    }
  });

  const [form, setForm] = useState(emptyAgent);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const update = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
    setMessage("");
  };

  const saveAgents = (updatedAgents) => {
    setAgents(updatedAgents);
    localStorage.setItem(
      "negotiation-agents",
      JSON.stringify(updatedAgents)
    );
    setMessage("Agent configuration saved successfully.");
  };

  const submitAgent = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.role.trim() || !form.goal.trim()) {
      setMessage("Please complete the agent name, role and goal.");
      return;
    }

    const updatedAgents = editingId
      ? agents.map((agent) =>
          agent.id === editingId ? { ...form, id: editingId } : agent
        )
      : [...agents, { ...form, id: Date.now() }];

    saveAgents(updatedAgents);
    setForm(emptyAgent);
    setEditingId(null);
  };

  const editAgent = (agent) => {
    setForm({
      name: agent.name,
      role: agent.role,
      personality: agent.personality,
      goal: agent.goal,
      minimum: agent.minimum,
      maximum: agent.maximum,
      information: agent.information,
      communication: agent.communication,
    });
    setEditingId(agent.id);
    setMessage("");
  };

  const deleteAgent = (id) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;

    saveAgents(agents.filter((agent) => agent.id !== id));

    if (editingId === id) {
      setEditingId(null);
      setForm(emptyAgent);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyAgent);
    setMessage("");
  };

  return (
    <div className="agent-page">
      <div className="agent-page-heading">
        <div>
          <div className="eyebrow">INTELLIGENCE & AGENT MANAGEMENT</div>
          <h1>Agent Configuration</h1>
          <p>Create negotiation agents with individual goals, personalities and strategies.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            cancelEdit();
            document.getElementById("agent-form")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <Plus size={17} /> Create Agent
        </button>
      </div>

      <div className="agent-overview">
        <div className="agent-overview-card">
          <Bot size={21} />
          <div>
            <strong>{agents.length}</strong>
            <span>Total Agents</span>
          </div>
        </div>

        <div className="agent-overview-card">
          <Brain size={21} />
          <div>
            <strong>{new Set(agents.map((a) => a.personality)).size}</strong>
            <span>Personality Types</span>
          </div>
        </div>

        <div className="agent-overview-card">
          <Target size={21} />
          <div>
            <strong>{agents.filter((a) => a.goal.trim()).length}</strong>
            <span>Defined Goals</span>
          </div>
        </div>
      </div>

      <section className="agent-list-section">
        <div className="section-heading">
          <div>
            <h2>Configured Agents</h2>
            <p>Manage your negotiation participants.</p>
          </div>
        </div>

        <div className="configured-agent-grid">
          {agents.map((agent) => (
            <article className="configured-agent-card" key={agent.id}>
              <div className="configured-agent-top">
                <div className="configured-agent-avatar">
                  <UserRound size={23} />
                </div>
                <span className="agent-active-label">Configured</span>
              </div>

              <h3>{agent.name}</h3>
              <p className="configured-agent-role">{agent.role}</p>

              <span className={`agent-personality ${agent.personality.toLowerCase()}`}>
                {agent.personality}
              </span>

              <div className="agent-goal">
                <strong>Primary Goal</strong>
                <p>{agent.goal}</p>
              </div>

              <div className="configured-agent-actions">
                <button className="secondary-button" onClick={() => editAgent(agent)}>
                  Edit Agent
                </button>
                <button
                  className="delete-agent-button"
                  onClick={() => deleteAgent(agent.id)}
                  aria-label={`Delete ${agent.name}`}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </article>
          ))}

          {agents.length === 0 && (
            <div className="empty-agents">
              No agents configured. Create your first negotiation agent.
            </div>
          )}
        </div>
      </section>

      <section className="agent-editor" id="agent-form">
        <div className="section-heading">
          <div>
            <h2>{editingId ? "Edit Agent" : "Create New Agent"}</h2>
            <p>Define the identity, strategy and negotiation boundaries.</p>
          </div>
          <Bot size={25} color="#4966d9" />
        </div>

        <form onSubmit={submitAgent}>
          <div className="agent-form-grid">
            <label className="studio-field">
              Agent Name
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="e.g. Alex Morgan"
              />
            </label>

            <label className="studio-field">
              Agent Role
              <input
                value={form.role}
                onChange={(e) => update("role", e.target.value)}
                placeholder="e.g. Buyer, Seller, HR Manager"
              />
            </label>
          </div>

          <div className="agent-form-grid">
            <label className="studio-field">
              Negotiation Personality
              <select
                value={form.personality}
                onChange={(e) => update("personality", e.target.value)}
              >
                {personalities.map((p) => (
                  <option key={p.name}>{p.name}</option>
                ))}
              </select>
            </label>

            <label className="studio-field">
              Communication Style
              <select
                value={form.communication}
                onChange={(e) => update("communication", e.target.value)}
              >
                <option>Professional</option>
                <option>Direct and assertive</option>
                <option>Friendly and cooperative</option>
                <option>Analytical and cautious</option>
                <option>Persuasive</option>
              </select>
            </label>
          </div>

          <label className="studio-field">
            Primary Negotiation Goal
            <textarea
              rows={3}
              value={form.goal}
              onChange={(e) => update("goal", e.target.value)}
              placeholder="What does this agent want to achieve?"
            />
          </label>

          <div className="agent-form-grid">
            <label className="studio-field">
              Minimum Acceptable Value
              <input
                value={form.minimum}
                onChange={(e) => update("minimum", e.target.value)}
                placeholder="e.g. 50000"
              />
            </label>

            <label className="studio-field">
              Maximum Acceptable Value
              <input
                value={form.maximum}
                onChange={(e) => update("maximum", e.target.value)}
                placeholder="e.g. 100000"
              />
            </label>
          </div>

          <label className="studio-field">
            Private Information
            <textarea
              rows={3}
              value={form.information}
              onChange={(e) => update("information", e.target.value)}
              placeholder="Information visible only to this agent during a simulation..."
            />
          </label>

          <div className="personality-guide">
            <ShieldCheck size={19} />
            <div>
              <strong>{form.personality} Strategy</strong>
              <p>
                {personalities.find((p) => p.name === form.personality)?.description}
              </p>
            </div>
          </div>

          {message && (
            <div className="agent-feedback">
              {message.includes("successfully") && <CheckCircle2 size={16} />}
              {message}
            </div>
          )}

          <div className="studio-actions">
            {editingId && (
              <button type="button" className="secondary-button" onClick={cancelEdit}>
                Cancel Editing
              </button>
            )}
            <button type="submit" className="primary-button">
              <Save size={17} />
              {editingId ? "Update Agent" : "Save Agent"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
