import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Layers,
  Activity,
  DollarSign,
  UserRound,
  Settings,
  X,
} from "lucide-react";

const items = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/users", label: "Users", icon: Users },
  { path: "/customers", label: "Customers", icon: UserRound },
  { path: "/subscriptions", label: "Subscriptions", icon: CreditCard },
  { path: "/plans", label: "Pricing Plans", icon: Layers },
  { path: "/usage", label: "Usage Analytics", icon: Activity },
  { path: "/revenue", label: "Revenue", icon: DollarSign },
  { path: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="mobile-overlay" onClick={onClose} />}
<br></br>
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <br></br>
        <div className="sidebar-logo">
          <div className="logo-box">N</div>
          <div>
            
            <strong>Novitha</strong>
            <span>SaaS Management</span>
          </div>

          <button className="mobile-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-section">
          <span>MANAGEMENT</span>

          <nav>
            {items.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={19} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">✦</div>
            <strong>Upgrade to Scale</strong>
            <p>Unlock advanced analytics and automation.</p>
            <button>View plans</button>
          </div>
        </div>
      </aside>
    </>
  );
}