import React from "react";
import { useNavigate } from "react-router-dom";
import { initialUsers } from "../data/initialData";
import { getStorage } from "../utils/storage";
import { getInitials } from "../utils/helpers";

export default function Customers() {
  const navigate = useNavigate();

  const users = getStorage("saas_users", initialUsers);

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">CUSTOMER SUCCESS</span>
          <h1>Customers</h1>
          <p>Customer accounts and subscription health.</p>
        </div>
      </div>

      <div className="customer-grid">
        {users.map((user) => (
          <button
            className="customer-card"
            key={user.id}
            onClick={() => navigate(`/users/${user.id}`)}
          >
            <div className="avatar">
              {getInitials(user.name)}
            </div>

            <div>
              <strong>{user.name}</strong>
              <span>{user.company}</span>
              <small>{user.plan} plan</small>
            </div>

            <div className="customer-usage">
              <span>{user.usage}%</span>
              <small>usage</small>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}