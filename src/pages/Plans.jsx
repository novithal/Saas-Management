import React, { useState } from "react";
import { Edit3, Plus, Trash2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Modal from "../components/Modal";
import PlanForm from "../components/PlanForm";
import ConfirmDialog from "../components/ConfirmDialog";
import { initialPlans } from "../data/initialData";
import { getStorage, setStorage } from "../utils/storage";

export default function Plans() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState(() =>
    getStorage("saas_plans", initialPlans)
  );

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const savePlan = (data) => {
    let updated;

    if (editing) {
      updated = plans.map((plan) =>
        plan.id === editing.id ? { ...plan, ...data } : plan
      );
    } else {
      updated = [
        ...plans,
        {
          ...data,
          id: Date.now(),
        },
      ];
    }

    setPlans(updated);
    setStorage("saas_plans", updated);

    setModal(false);
    setEditing(null);
  };

  const deletePlan = () => {
    const updated = plans.filter((plan) => plan.id !== deleting.id);

    setPlans(updated);
    setStorage("saas_plans", updated);

    setDeleting(null);
  };

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">MONETIZATION</span>
          <h1>Pricing plans</h1>
          <p>Create and manage your SaaS pricing structure.</p>
        </div>

        <button
          className="btn primary"
          onClick={() => {
            setEditing(null);
            setModal(true);
          }}
        >
          <Plus size={18} />
          Add plan
        </button>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div className="pricing-card" key={plan.id}>
            <div className="pricing-top">
              <span className="plan-badge">{plan.name}</span>

              <span className={`status ${plan.status.toLowerCase()}`}>
                {plan.status}
              </span>
            </div>

            <div className="price">
              ${plan.price}
              <span>/{plan.billing.toLowerCase().replace("ly", "")}</span>
            </div>

            <p className="pricing-users">{plan.users} customers</p>

            <div className="feature-list">
              {plan.features.map((feature) => (
                <div key={feature}>✓ {feature}</div>
              ))}
            </div>

            <div className="pricing-actions">
              <button
                className="btn secondary"
                onClick={() => navigate(`/plans/${plan.id}`)}
              >
                Details
                <ArrowRight size={16} />
              </button>

              <button
                className="square-btn"
                onClick={() => {
                  setEditing(plan);
                  setModal(true);
                }}
              >
                <Edit3 size={16} />
              </button>

              <button
                className="square-btn danger-action"
                onClick={() => setDeleting(plan)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={modal}
        title={editing ? "Edit pricing plan" : "Create pricing plan"}
        onClose={() => setModal(false)}
        width={650}
      >
        <PlanForm
          initialData={editing}
          onSubmit={savePlan}
          onCancel={() => setModal(false)}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onCancel={() => setDeleting(null)}
        onConfirm={deletePlan}
        title="Delete plan?"
        message={`Delete ${deleting?.name}? Existing customer records will remain.`}
      />
    </div>
  );
}