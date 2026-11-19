
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import ScenarioStudio from "./pages/ScenarioStudio";
import AgentConfiguration from "./pages/AgentConfiguration";
import NegotiationArena from "./pages/NegotiationArena";
import ResultsDashboard from "./pages/ResultsDashboard";
import StrategyComparison from "./pages/StrategyComparison";
import LearningCenter from "./pages/LearningCenter";
import SimulationMode from "./pages/SimulationMode";

import "./index.css";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

          <Route path="/" element={<Dashboard />} />

          <Route
            path="/scenarios"
            element={<ScenarioStudio />}
          />

          <Route
            path="/agents"
            element={<AgentConfiguration />}
          />

          <Route
            path="/simulation"
            element={<SimulationMode />}
          />

          <Route
            path="/arena"
            element={<NegotiationArena />}
          />

          <Route
            path="/results"
            element={<ResultsDashboard />}
          />

          <Route
            path="/comparison"
            element={<StrategyComparison />}
          />

          <Route
            path="/learning"
            element={<LearningCenter />}
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
