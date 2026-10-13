import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Mail, Building2, Activity } from "lucide-react";

import { getStorage } from "../utils/storage";
import { initialUsers } from "../data/initialData";
import { formatCurrency, formatDate } from "../utils/helpers";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const users = getStorage("saas_users", initialUsers);
  const user = users.find((item) => String(item.id) === String(id));

  if (!user) {
    return (
      <div className="page">
        <button className="btn secondary" onClick={() => navigate("/users")}>
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="empty-state">
          <h3>User not found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <button className="back-button" onClick={() => navigate("/users")}>
        <ArrowLeft size={18} />
        Back to users
      </button>

      <div className="profile-hero">
        <div className="large-avatar">
          {user.name
            .split(" ")
            .map((x) => x[0])
            .join("")}
        </div>

        <div>
          <span className="eyebrow">CUSTOMER PROFILE</span>
          <h1>{user.name}</h1>
          <p>{user.company}</p>
        </div>

        <span className={`status ${user.status.toLowerCase()}`}>
          {user.status}
        </span>
      </div>

      <div className="detail-grid">
        <div className="panel">
          <h2>Customer information</h2>

          <div className="info-list">
            <div>
              <Mail size={18} />
              <span>{user.email}</span>
            </div>

            <div>
              <Building2 size={18} />
              <span>{user.company}</span>
            </div>

            <div>
              <Activity size={18} />
              <span>{user.usage}% current usage</span>
            </div>
          </div>
        </div>

        <div className="panel">
          <h2>Subscription</h2>

          <div className="detail-stat">
            <span>Current plan</span>
            <strong>{user.plan}</strong>
          </div>

          <div className="detail-stat">
            <span>Monthly revenue</span>
            <strong>{formatCurrency(user.revenue)}</strong>
          </div>

          <div className="detail-stat">
            <span>Joined</span>
            <strong>{formatDate(user.joined)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}