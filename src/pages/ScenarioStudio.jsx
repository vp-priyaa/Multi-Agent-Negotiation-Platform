
import { useState } from "react";
import {
  BriefcaseBusiness,
  Handshake,
  Users,
  Plus,
  Save,
  Play,
  Trash2,
  CheckCircle2,
} from "lucide-react";

const templates = [
  {
    id: "salary",
    title: "Salary Negotiation",
    category: "Career",
    description: "Negotiate salary, benefits and joining conditions.",
    context:
      "A candidate has received a job offer and wants to negotiate a better compensation package with the HR representative.",
    objectives: ["Increase salary", "Negotiate benefits", "Agree on joining date"],
    issues: ["Base salary", "Bonus", "Benefits", "Joining date"],
    constraints: "The company has a fixed recruitment budget.",
    difficulty: "Intermediate",
    Icon: BriefcaseBusiness,
  },
  {
    id: "vendor",
    title: "Vendor Agreement",
    category: "Business",
    description: "Negotiate pricing, delivery and contract terms.",
    context:
      "A business is negotiating a supply agreement with a vendor to obtain favourable pricing and reliable delivery.",
    objectives: ["Reduce costs", "Ensure timely delivery", "Agree on contract terms"],
    issues: ["Price", "Delivery schedule", "Payment terms", "Contract duration"],
    constraints: "The vendor cannot reduce the price below its minimum acceptable margin.",
    difficulty: "Advanced",
    Icon: Handshake,
  },
  {
    id: "workplace",
    title: "Workplace Conflict",
    category: "Workplace",
    description: "Resolve a disagreement through constructive discussion.",
    context:
      "Two colleagues disagree about project responsibilities and deadlines. They must reach a workable agreement.",
    objectives: ["Resolve disagreement", "Clarify responsibilities", "Set deadlines"],
    issues: ["Task ownership", "Deadlines", "Workload", "Communication"],
    constraints: "Both participants must maintain a professional relationship.",
    difficulty: "Beginner",
    Icon: Users,
  },
];

const emptyScenario = {
  title: "",
  category: "Career",
  description: "",
  context: "",
  objectives: [],
  issues: [],
  constraints: "",
  difficulty: "Beginner",
};

export default function ScenarioStudio() {
  const [scenario, setScenario] = useState(emptyScenario);
  const [objectiveInput, setObjectiveInput] = useState("");
  const [issueInput, setIssueInput] = useState("");
  const [saved, setSaved] = useState(false);

  const update = (field, value) => {
    setScenario((previous) => ({ ...previous, [field]: value }));
    setSaved(false);
  };

  const loadTemplate = (template) => {
    const { Icon, id, ...data } = template;
    setScenario(data);
    setSaved(false);
  };

  const addItem = (field, value, clear) => {
    const item = value.trim();
    if (!item) return;

    update(field, [...scenario[field], item]);
    clear("");
  };

  const removeItem = (field, index) => {
    update(
      field,
      scenario[field].filter((_, i) => i !== index)
    );
  };

  const saveScenario = () => {
    if (!scenario.title.trim() || !scenario.context.trim()) {
      alert("Please enter a scenario title and context.");
      return;
    }

    const existing = JSON.parse(
      localStorage.getItem("negotiation-scenarios") || "[]"
    );

    const record = {
      ...scenario,
      id: `scenario-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "negotiation-scenarios",
      JSON.stringify([...existing, record])
    );

    setSaved(true);
  };

  const startSimulation = () => {
    if (!scenario.title.trim() || !scenario.context.trim()) {
      alert("Please complete the scenario title and context first.");
      return;
    }

    sessionStorage.setItem(
      "active-negotiation-scenario",
      JSON.stringify(scenario)
    );

    window.location.href = "/simulation";
  };

  return (
    <div className="studio-page">
      <div className="studio-heading">
        <div>
          <div className="eyebrow">SCENARIO MANAGEMENT</div>
          <h1>Scenario Studio</h1>
          <p>Create realistic negotiation scenarios or start with a template.</p>
        </div>
        <button className="primary-button" onClick={() => {
          setScenario(emptyScenario);
          setSaved(false);
        }}>
          <Plus size={17} /> New Scenario
        </button>
      </div>

      <section className="studio-section">
        <div className="section-heading">
          <div>
            <h2>Start with a template</h2>
            <p>Select a scenario to automatically populate the editor.</p>
          </div>
        </div>

        <div className="template-grid">
          {templates.map(({ id, title, category, description, Icon, difficulty }) => (
            <button
              className={`template-card ${scenario.title === title ? "selected" : ""}`}
              key={id}
              onClick={() => loadTemplate(templates.find((item) => item.id === id))}
            >
              <div className="template-icon"><Icon size={22} /></div>
              <span className="category">{category}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="difficulty">{difficulty}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="studio-editor">
        <div className="section-heading">
          <div>
            <h2>Scenario Configuration</h2>
            <p>Define the situation and the desired negotiation outcome.</p>
          </div>
          {saved && (
            <span className="saved-indicator">
              <CheckCircle2 size={16} /> Saved
            </span>
          )}
        </div>

        <div className="studio-form-grid">
          <label className="studio-field">
            Scenario Title
            <input
              value={scenario.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Enter scenario title"
            />
          </label>

          <label className="studio-field">
            Category
            <select
              value={scenario.category}
              onChange={(e) => update("category", e.target.value)}
            >
              <option>Career</option>
              <option>Business</option>
              <option>Workplace</option>
              <option>Personal</option>
            </select>
          </label>
        </div>

        <label className="studio-field">
          Description
          <input
            value={scenario.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Briefly describe the negotiation"
          />
        </label>

        <label className="studio-field">
          Scenario Context
          <textarea
            rows={4}
            value={scenario.context}
            onChange={(e) => update("context", e.target.value)}
            placeholder="Explain the situation, participants and background..."
          />
        </label>

        <div className="studio-form-grid">
          <label className="studio-field">
            Difficulty
            <select
              value={scenario.difficulty}
              onChange={(e) => update("difficulty", e.target.value)}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
            </select>
          </label>

          <label className="studio-field">
            Constraints
            <input
              value={scenario.constraints}
              onChange={(e) => update("constraints", e.target.value)}
              placeholder="Budget limits, deadlines, rules..."
            />
          </label>
        </div>

        <div className="studio-form-grid">
          <div className="studio-field">
            Negotiation Objectives
            <div className="add-item">
              <input
                value={objectiveInput}
                onChange={(e) => setObjectiveInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addItem("objectives", objectiveInput, setObjectiveInput)}
                placeholder="Add an objective"
              />
              <button onClick={() => addItem("objectives", objectiveInput, setObjectiveInput)}>
                <Plus size={17} />
              </button>
            </div>
            <div className="item-list">
              {scenario.objectives.map((item, index) => (
                <div className="editable-item" key={`${item}-${index}`}>
                  <span>{item}</span>
                  <button onClick={() => removeItem("objectives", index)} aria-label="Remove objective">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="studio-field">
            Negotiation Issues
            <div className="add-item">
              <input
                value={issueInput}
                onChange={(e) => setIssueInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addItem("issues", issueInput, setIssueInput)}
                placeholder="Add an issue"
              />
              <button onClick={() => addItem("issues", issueInput, setIssueInput)}>
                <Plus size={17} />
              </button>
            </div>
            <div className="item-list">
              {scenario.issues.map((item, index) => (
                <div className="editable-item" key={`${item}-${index}`}>
                  <span>{item}</span>
                  <button onClick={() => removeItem("issues", index)} aria-label="Remove issue">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="studio-actions">
          <button className="secondary-button" onClick={saveScenario}>
            <Save size={17} /> Save Scenario
          </button>
          <button className="primary-button" onClick={startSimulation}>
            <Play size={17} /> Start Simulation
          </button>
        </div>
      </section>
    </div>
  );
}
