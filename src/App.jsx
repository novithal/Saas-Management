import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import Customers from "./pages/Customers";
import Subscriptions from "./pages/Subscriptions";
import Plans from "./pages/Plans";
import PlanDetails from "./pages/PlanDetails";
import Usage from "./pages/Usage";
import Revenue from "./pages/Revenue";
import Settings from "./pages/Settings";

import { getStorage } from "./utils/storage";

function Notifications() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">ACTIVITY</span>
          <h1>Notifications</h1>
          <p>Recent SaaS account notifications.</p>
        </div>
      </div>

      <section className="panel">
        <div className="notification-item">
          <span className="notification-icon">✓</span>
          <div>
            <strong>New Enterprise subscription</strong>
            <p>Priya Sharma subscribed to Enterprise.</p>
          </div>
          <small>10 min ago</small>
        </div>

        <div className="notification-item">
          <span className="notification-icon">↑</span>
          <div>
            <strong>Revenue milestone</strong>
            <p>Monthly revenue crossed $20,000.</p>
          </div>
          <small>2 hours ago</small>
        </div>

        <div className="notification-item">
          <span className="notification-icon">!</span>
          <div>
            <strong>High usage detected</strong>
            <p>Several customers are above 80% usage.</p>
          </div>
          <small>Yesterday</small>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const profile = getStorage("saas_profile", {
    name: "Novitha Loganathan",
  });

  return (
    <div className="app-shell">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-area">
        <Topbar
          onMenu={() => setSidebarOpen(true)}
          user={profile}
        />

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetails />} />

            <Route path="/customers" element={<Customers />} />

            <Route
              path="/subscriptions"
              element={<Subscriptions />}
            />

            <Route path="/plans" element={<Plans />} />
            <Route path="/plans/:id" element={<PlanDetails />} />

            <Route path="/usage" element={<Usage />} />

            <Route path="/revenue" element={<Revenue />} />

            <Route path="/notifications" element={<Notifications />} />

            <Route path="/settings" element={<Settings />} />

            <Route
              path="*"
              element={
                <div className="empty-state">
                  <h2>404</h2>
                  <p>Page not found.</p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}