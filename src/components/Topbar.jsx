import React from "react";
import { Bell, Menu, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../utils/helpers";

export default function Topbar({ onMenu, user }) {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-btn" onClick={onMenu}>
          <Menu size={22} />
        </button>

       <div>
        <h2>SaaS Management</h2>
       </div>
      </div>

      <div className="topbar-actions">
        <button
          className="icon-btn"
          onClick={() => navigate("/notifications")}
          title="Notifications"
        >
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        <button
          className="profile-button"
          onClick={() => navigate("/settings")}
        >
          <div className="avatar">
            {getInitials(user?.name || "Admin User")}
          </div>

          <div className="profile-text">
<strong>{user?.name || "SaaS Admin"}</strong>
            <span>Administrator</span>
          </div>
        </button>
      </div>
    </header>
  );
}