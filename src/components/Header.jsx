import { Search, Bell, ChevronDown, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="topbar">
      <div className="mobile-brand">
        <Menu size={21} />
        <strong>Negotiate AI</strong>
      </div>

      <div className="breadcrumb">
        Workspace <span>/</span> <strong>Dashboard</strong>
      </div>

      <div className="header-actions">
        <label className="search-box">
          <Search size={17} />
          <input placeholder="Search simulations..." />
          <kbd>? K</kbd>
        </label>

        <button className="icon-button" aria-label="Notifications">
          <Bell size={19} />
          <i />
        </button>

        <div className="profile">
          <div className="avatar">VP</div>
          <ChevronDown size={15} />
        </div>
      </div>
    </header>
  );
}
