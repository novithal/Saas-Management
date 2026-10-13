import React from "react";
import { ArrowLeft, Check, Users, DollarSign } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { getStorage } from "../utils/storage";
import { initialPlans } from "../data/initialData";

export default function PlanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const plans = getStorage("saas_plans", initialPlans);
  const plan = plans.find((item) => String(item.id) === String(id));

  if (!plan) {
    return (
      <div className="page">
        <div className="empty-state">
          <h3>Plan not found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <button className="back-button" onClick={() => navigate("/plans")}>
        <ArrowLeft size={18} />
        Back to plans
      </button>

      <div className="plan-detail-hero">
        <div>
          <span className="eyebrow">PLAN DETAILS</span>
          <h1>{plan.name}</h1>
          <p>Detailed configuration and customer metrics.</p>
        </div>

        <div className="detail-price">${plan.price}/month</div>
      </div>

      <div className="stats-grid">
        <div className="mini-detail-card">
          <Users size={21} />
          <span>Customers</span>
          <strong>{plan.users}</strong>
        </div>

        <div className="mini-detail-card">
          <DollarSign size={21} />
          <span>Plan Revenue</span>
          <strong>${plan.users * plan.price}</strong>
        </div>
      </div>

      <section className="panel">
        <h2>Included features</h2>

        <div className="feature-detail-grid">
          {plan.features.map((feature) => (
            <div key={feature}>
              <Check size={18} />
              {feature}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}