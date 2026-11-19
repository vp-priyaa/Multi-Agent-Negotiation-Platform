
import { useState } from "react";
import {
  BookOpen, Brain, Target, MessageCircle,
  ChevronDown, CheckCircle, Lightbulb
} from "lucide-react";

const lessons = [
  {
    title: "Fundamentals of Negotiation",
    category: "Basics",
    level: "Beginner",
    duration: "5 min",
    icon: BookOpen,
    content: [
      "Understand the interests of both parties.",
      "Define your goals before entering a negotiation.",
      "Identify your minimum acceptable outcome.",
      "Prepare alternative solutions before making an offer."
    ],
    tip: "Preparation is the foundation of successful negotiation."
  },
  {
    title: "BATNA and ZOPA",
    category: "Strategy",
    level: "Intermediate",
    duration: "7 min",
    icon: Target,
    content: [
      "BATNA means Best Alternative to a Negotiated Agreement.",
      "ZOPA means Zone of Possible Agreement.",
      "Understand your alternatives before accepting an offer.",
      "Look for an overlap between both parties' acceptable ranges."
    ],
    tip: "Never enter a negotiation without understanding your alternatives."
  },
  {
    title: "Effective Communication",
    category: "Communication",
    level: "Beginner",
    duration: "5 min",
    icon: MessageCircle,
    content: [
      "Listen actively without interrupting.",
      "Ask clear and relevant questions.",
      "Use confident and respectful language.",
      "Summarise important points to avoid misunderstandings."
    ],
    tip: "Listening carefully can reveal opportunities for agreement."
  },
  {
    title: "Strategic Decision Making",
    category: "Advanced",
    level: "Advanced",
    duration: "8 min",
    icon: Brain,
    content: [
      "Evaluate the risks of each proposed agreement.",
      "Understand the other party's priorities.",
      "Avoid emotional decision-making.",
      "Use evidence to support your proposals."
    ],
    tip: "A strong negotiator balances short-term gains and long-term relationships."
  },
];

export default function LearningCenter() {
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState(
    () => JSON.parse(localStorage.getItem("completed-lessons") || "[]")
  );

  const lesson = lessons[active];
  const Icon = lesson.icon;

  const markComplete = () => {
    const updated = completed.includes(active)
      ? completed
      : [...completed, active];

    setCompleted(updated);
    localStorage.setItem("completed-lessons", JSON.stringify(updated));
  };

  return (
    <div className="learning-page">
      <header className="learning-heading">
        <div>
          <span className="eyebrow">KNOWLEDGE HUB</span>
          <h1>Learning Center</h1>
          <p>Build your negotiation skills through guided lessons.</p>
        </div>
        <span className="learning-badge">LEARN & PRACTICE</span>
      </header>

      <section className="learning-progress">
        <div>
          <h2>Your Learning Progress</h2>
          <p>{completed.length} of {lessons.length} lessons completed</p>
        </div>
        <strong>{Math.round(completed.length / lessons.length * 100)}%</strong>
        <div className="learning-track">
          <div style={{ width: `${completed.length / lessons.length * 100}%` }} />
        </div>
      </section>

      <div className="learning-layout">
        <aside className="lesson-list">
          <h2>Learning Modules</h2>
          {lessons.map((item, index) => {
            const LessonIcon = item.icon;
            return (
              <button
                key={item.title}
                className={`lesson-item ${active === index ? "active" : ""}`}
                onClick={() => setActive(index)}
              >
                <LessonIcon size={21} />
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.duration} · {item.level}</small>
                </span>
                {completed.includes(index) && (
                  <CheckCircle size={17} />
                )}
              </button>
            );
          })}
        </aside>

        <main className="lesson-content">
          <div className="lesson-content-header">
            <div className="lesson-icon"><Icon size={28} /></div>
            <span>{lesson.category} · {lesson.level}</span>
          </div>

          <h2>{lesson.title}</h2>
          <p className="lesson-duration">Estimated learning time: {lesson.duration}</p>

          <h3>What You Will Learn</h3>
          <div className="lesson-points">
            {lesson.content.map((point, index) => (
              <div key={index}>
                <CheckCircle size={19} />
                <p>{point}</p>
              </div>
            ))}
          </div>

          <div className="learning-tip">
            <Lightbulb size={23} />
            <div>
              <strong>Key Learning Tip</strong>
              <p>{lesson.tip}</p>
            </div>
          </div>

          <button
            className="lesson-complete"
            onClick={markComplete}
            disabled={completed.includes(active)}
          >
            <CheckCircle size={18} />
            {completed.includes(active) ? "Lesson Completed" : "Mark as Completed"}
          </button>

          <div className="lesson-navigation">
            <button
              disabled={active === 0}
              onClick={() => setActive(active - 1)}
            >
              Previous Lesson
            </button>
            <button
              disabled={active === lessons.length - 1}
              onClick={() => setActive(active + 1)}
            >
              Next Lesson <ChevronDown size={16} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
