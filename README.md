# 🤝 Multi-Agent Negotiation Training & Simulation Platform

**An interactive platform for learning, practising, and analysing real-world negotiation strategies through configurable negotiation scenarios and AI-agent simulation concepts.**

<p align="center">
  <strong>Practice Negotiation. Explore Strategies. Improve Decisions.</strong>
</p>

---

## 📌 Project Overview

The **Multi-Agent Negotiation Training & Simulation Platform** is a web-based application designed to help students, job seekers, and professionals develop practical negotiation skills in realistic simulated environments.

The platform provides an interactive space where users can explore negotiation scenarios, configure agent profiles, practise negotiation strategies, manage offers and counteroffers, and evaluate negotiation outcomes.

It aims to make negotiation training more accessible through structured simulations, performance analysis, and interactive learning resources.

> **Current implementation:** This version provides the frontend experience with demonstration data and simulated negotiation interactions. Live LLM-powered autonomous agents and backend integrations are planned for future development.

## 🎯 Project Objectives

- Provide an interactive environment for negotiation practice.
- Demonstrate different negotiation strategies and approaches.
- Allow users to explore configurable negotiation scenarios.
- Simulate offer, counteroffer, and agreement workflows.
- Evaluate negotiation performance through result dashboards.
- Support continuous learning through structured lessons.

## ✨ Key Features

### 1. 📊 Interactive Dashboard
- Overview of negotiation activities.
- Simulation statistics and performance indicators.
- Quick access to scenarios and agent profiles.
- Recent activity and recommended actions.

### 2. 📝 Scenario Studio
- Explore and create negotiation scenarios.
- Configure scenario descriptions and objectives.
- Define negotiation issues and constraints.
- Select scenarios for simulation.

### 3. 🤖 Agent Configuration
- Create and manage negotiation agent profiles.
- Explore agent characteristics and negotiation styles.
- Configure profiles for different negotiation situations.

### 4. 🎮 Simulation Mode
- Select negotiation scenarios.
- Configure participating agents.
- Choose Human-vs-AI or AI-vs-AI demonstration modes.
- Set the maximum number of negotiation rounds.

### 5. 💬 Negotiation Arena
- Interactive negotiation conversation interface.
- Manage offers and counteroffers.
- Track negotiation rounds.
- Accept agreements and view outcomes.

### 6. 📈 Results Dashboard
- View negotiation outcomes.
- Analyse performance scores.
- Review negotiation progress and evaluation metrics.
- Understand areas for improvement.

### 7. ⚖️ Strategy Comparison
- Compare different negotiation strategies.
- Explore communication and flexibility metrics.
- Understand the differences between collaborative, aggressive, and risk-averse approaches.

### 8. 📚 Learning Center
- Access negotiation learning materials.
- Track lesson completion.
- Develop negotiation knowledge through structured lessons.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application logic |
| Vite | Development server and build tool |
| Tailwind CSS | Styling and responsive UI |
| CSS3 | Custom styling and animations |
| React Router | Application navigation |
| Lucide React | Icons |
| Recharts | Data visualization |
| Framer Motion | UI animations |
| Browser Storage | Demo data and session persistence |

## 🏗️ Project Architecture

```text
Multi-Agent-Negotiation-Platform/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── AgentCard.jsx
│   │   ├── Header.jsx
│   │   ├── ScenarioCard.jsx
│   │   ├── Sidebar.jsx
│   │   └── StatCard.jsx
│   │
│   ├── data/
│   │   ├── agents.js
│   │   ├── mockResults.js
│   │   └── scenarios.js
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── ScenarioStudio.jsx
│   │   ├── AgentConfiguration.jsx
│   │   ├── SimulationMode.jsx
│   │   ├── NegotiationArena.jsx
│   │   ├── ResultsDashboard.jsx
│   │   ├── StrategyComparison.jsx
│   │   └── LearningCenter.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

*The architecture above highlights the main application modules; additional supporting components and utilities are also included in the repository.*

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

**1. Clone the repository**

```bash
git clone https://github.com/vp-priyaa/Multi-Agent-Negotiation-Platform.git
```

**2. Navigate to the project directory**

```bash
cd Multi-Agent-Negotiation-Platform
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Visit:

```text
http://localhost:5173/
```

## 🔄 Application Workflow

```text
Dashboard
    ↓
Scenario Studio
    ↓
Agent Configuration
    ↓
Simulation Mode
    ↓
Negotiation Arena
    ↓
Results Dashboard
    ↓
Strategy Comparison
    ↓
Learning Center
```

## 🚀 Future Enhancements

- Integration of LLM-powered autonomous negotiation agents.
- Real-time multi-agent communication.
- Advanced agent personas, goals, and constraints.
- Human-vs-AI and AI-vs-AI live simulations.
- Multi-issue negotiation and hidden-information scenarios.
- Negotiation replay and strategy analysis.
- Explainable decision summaries.
- Deadlock detection and recovery mechanisms.
- Personalised negotiation coaching.
- Backend integration and persistent database storage.
- Simulation performance monitoring and optimisation.

## 🎓 Project Significance

This project explores the intersection of **Artificial Intelligence, Multi-Agent Systems, Human-Computer Interaction, and Decision Support Systems**.

It provides a foundation for understanding negotiation processes, strategic decision-making, agent interactions, and performance evaluation through an interactive software platform.

## 👩‍💻 Developer

**Vishnu Priya V**

Computer Science and Engineering

GitHub: [@vp-priyaa](https://github.com/vp-priyaa)

Project Repository: [Multi-Agent Negotiation Platform](https://github.com/vp-priyaa/Multi-Agent-Negotiation-Platform)

---

<p align="center">
  <strong>Built with curiosity, creativity, and a passion for AI-powered solutions. 🚀</strong>
</p>
