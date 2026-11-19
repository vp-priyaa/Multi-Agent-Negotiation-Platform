
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  Handshake,
  RotateCcw,
  Clock,
  Target,
  Trophy,
} from "lucide-react";

export default function NegotiationArena() {
  const navigate = useNavigate();

  const [simulation] = useState(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("active-negotiation-simulation")
      );
    } catch {
      return null;
    }
  });

  const [round, setRound] = useState(1);
  const [offer, setOffer] = useState(50000);
  const [message, setMessage] = useState("");

  const [history, setHistory] = useState([
    {
      speaker: "AI Negotiator",
      text: "Welcome! Let's discuss a mutually beneficial agreement.",
      type: "ai",
    },
  ]);

  const [status, setStatus] = useState("Negotiation in progress");

  const maxRounds = simulation?.rounds || 5;
  const scenario = simulation?.scenario || "Salary Negotiation";
  const mode = simulation?.mode || "human";

  const sendMessage = () => {
    if (!message.trim()) return;

    if (status !== "Negotiation in progress") return;

    const humanMessage = {
      speaker: mode === "ai" ? "Negotiator A" : "You",
      text: message.trim(),
      type: "human",
    };

    const aiMessage = {
      speaker: "AI Negotiator",
      text:
        Number(offer) >= 55000
          ? "That is a reasonable proposal. Let's work towards an agreement."
          : "Thank you for your proposal. Could you consider improving the offer?",
      type: "ai",
    };

    setHistory((prev) => [...prev, humanMessage, aiMessage]);
    setMessage("");

    setRound((prev) => {
      const next = prev + 1;

      if (next > maxRounds) {
        setStatus("Maximum rounds reached");
      }

      return next;
    });
  };

  const acceptAgreement = () => {
    if (status !== "Negotiation in progress") return;

    const finalResult = {
      scenario,
      outcome: "Agreement reached",
      score: 85,
      rounds: Math.min(round, maxRounds),
      mode,
      completedAt: new Date().toISOString(),
      finalOffer: Number(offer),
      conversation: history,
      demo: true,
    };

    sessionStorage.setItem(
      "negotiation-result",
      JSON.stringify(finalResult)
    );

    setStatus("Agreement reached");

    setHistory((prev) => [
      ...prev,
      {
        speaker: "System",
        text: `Agreement reached at ₹${Number(offer).toLocaleString("en-IN")}.`,
        type: "system",
      },
    ]);
  };

  const reset = () => {
    setRound(1);
    setOffer(50000);
    setMessage("");
    setStatus("Negotiation in progress");

    setHistory([
      {
        speaker: "AI Negotiator",
        text: "Welcome! Let's discuss a mutually beneficial agreement.",
        type: "ai",
      },
    ]);

    sessionStorage.removeItem("negotiation-result");
  };

  const progress = Math.min(
    100,
    (Math.min(round, maxRounds) / maxRounds) * 100
  );

  return (
    <div className="arena-page">

      {/* Header */}
      <header className="arena-header">
        <div>
          <span className="eyebrow">LIVE TRAINING WORKSPACE</span>
          <h1>Negotiation Arena</h1>
          <p>
            Practice negotiation and explore strategic decisions.
          </p>
        </div>

        <span className="arena-demo">MOCK SIMULATION</span>
      </header>

      {/* Overview */}
      <div className="arena-overview">
        <div>
          <span>Scenario</span>
          <strong>{scenario}</strong>
        </div>

        <div>
          <span>Mode</span>
          <strong>
            {mode === "human" ? "Human vs AI" : "AI vs AI demo"}
          </strong>
        </div>

        <div>
          <span>Round</span>
          <strong>
            {Math.min(round, maxRounds)} / {maxRounds}
          </strong>
        </div>

        <div>
          <span>Status</span>
          <strong>{status}</strong>
        </div>
      </div>

      {/* Main Layout */}
      <div className="arena-layout">

        {/* Conversation */}
        <section className="arena-chat">

          <div className="arena-chat-title">
            <h2>Negotiation Conversation</h2>

            <span>
              <Clock size={15} />
              Round {Math.min(round, maxRounds)}
            </span>
          </div>

          <div className="arena-messages">
            {history.map((item, index) => (
              <div
                className={`arena-message ${item.type}`}
                key={index}
              >
                <strong>{item.speaker}</strong>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          {status === "Negotiation in progress" && (
            <div className="arena-input-area">

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Enter your offer or negotiation message..."
              />

              <button
                onClick={sendMessage}
                disabled={!message.trim()}
              >
                <Send size={17} />
                Send
              </button>

            </div>
          )}

          {status === "Agreement reached" && (
            <div className="arena-success">
              <Trophy size={22} />
              <div>
                <strong>Agreement successfully reached!</strong>
                <p>Your negotiation result has been saved.</p>
              </div>
            </div>
          )}

          {status === "Maximum rounds reached" && (
            <div className="arena-warning">
              Maximum rounds reached. Accept an agreement or restart.
            </div>
          )}

        </section>

        {/* Sidebar */}
        <aside className="arena-sidebar">

          {/* Offer Management */}
          <div className="arena-side-card">
            <h3>
              <Target size={18} />
              Offer Management
            </h3>

            <label>Proposed salary / value (₹)</label>

            <input
              type="number"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              min="0"
              disabled={status !== "Negotiation in progress"}
            />

            <p>
              Current offer: ₹
              {Number(offer).toLocaleString("en-IN")}
            </p>
          </div>

          {/* Actions */}
          <div className="arena-side-card">
            <h3>Negotiation Actions</h3>

            <button
              className="arena-accept"
              onClick={acceptAgreement}
              disabled={status !== "Negotiation in progress"}
            >
              <Handshake size={17} />
              Accept Agreement
            </button>

            <button
              className="arena-reset"
              onClick={reset}
            >
              <RotateCcw size={17} />
              Restart
            </button>

            <button
              className="arena-results"
              onClick={() => navigate("/results")}
            >
              View Results
            </button>
          </div>

          {/* Progress */}
          <div className="arena-side-card">
            <h3>Session Progress</h3>

            <div className="arena-progress">
              <div style={{ width: `${progress}%` }} />
            </div>

            <p>
              {Math.min(round, maxRounds)} of {maxRounds} rounds
            </p>
          </div>

        </aside>
      </div>

      <p className="arena-disclaimer">
        Demo mode: responses and performance scores are simulated locally.
        No real AI API is connected yet.
      </p>

    </div>
  );
}
