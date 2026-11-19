import {
  LayoutDashboard, BriefcaseBusiness, Bot, Settings2,
  MessagesSquare, ChartNoAxesCombined, GitCompare,
  GraduationCap, ChevronLeft, ChevronRight
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Scenario Studio", path: "/scenarios", icon: BriefcaseBusiness },
  { name: "Agent Configuration", path: "/agents", icon: Bot },
  { name: "Simulation Mode", path: "/simulation", icon: Settings2 },
  { name: "Negotiation Arena", path: "/arena", icon: MessagesSquare },
  { name: "Results Dashboard", path: "/results", icon: ChartNoAxesCombined },
  { name: "Strategy Comparison", path: "/comparison", icon: GitCompare },
  { name: "Learning Center", path: "/learning", icon: GraduationCap },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">N</div>
        <div>
          <h2>Negotiate AI</h2>
          <span>SIMULATION PLATFORM</span>
        </div>
      </div>

      <div className="workspace-label">WORKSPACE</div>

      <nav className="nav-menu">
        {menu.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={19} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card">
          <div className="help-icon">?</div>
          <div>
            <strong>Need assistance?</strong>
            <p>Explore the learning center.</p>
          </div>
        </div>
        <div className="user-mini">
          <div className="avatar">VP</div>
          <div>
            <strong>Platform User</strong>
            <span>Student Workspace</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
