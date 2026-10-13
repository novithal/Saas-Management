import React, { useState } from "react";

export default function PlanForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initialData || {
      name: "",
      price: "",
      billing: "Monthly",
      users: 0,
      features: ["", "", ""],
      status: "Active",
    }
  );

  const [error, setError] = useState("");

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const updateFeature = (index, value) => {
    setForm((prev) => {
      const features = [...prev.features];
      features[index] = value;

      return { ...prev, features };
    });
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Plan name is required");
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    const features = form.features.filter(Boolean);

    if (!features.length) {
      setError("Add at least one feature");
      return;
    }

    onSubmit({
      ...form,
      price: Number(form.price),
      users: Number(form.users),
      features,
    });
  };

  return (
    <form className="form-grid" onSubmit={submit}>
      {error && <div className="form-error full">{error}</div>}

      <label>
        Plan Name
        <input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="e.g. Business"
        />
      </label>

      <label>
        Price
        <input
          type="number"
          value={form.price}
          onChange={(e) => update("price", e.target.value)}
          placeholder="99"
        />
      </label>

      <label>
        Billing
        <select
          value={form.billing}
          onChange={(e) => update("billing", e.target.value)}
        >
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </label>

      <label>
        Status
        <select
          value={form.status}
          onChange={(e) => update("status", e.target.value)}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </label>

      <label className="full">
        Features
        {form.features.map((feature, index) => (
          <input
            key={index}
            className="feature-input"
            value={feature}
            onChange={(e) => updateFeature(index, e.target.value)}
            placeholder={`Feature ${index + 1}`}
          />
        ))}
      </label>

      <div className="modal-actions full">
        <button type="button" className="btn secondary" onClick={onCancel}>
          Cancel
        </button>

        <button className="btn primary" type="submit">
          Save Plan
        </button>
      </div>
    </form>
  );
}