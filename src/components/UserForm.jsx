import React, { useState } from "react";

const emptyUser = {
  name: "",
  email: "",
  company: "",
  plan: "Starter",
  status: "Active",
  usage: 0,
  joined: new Date().toISOString().slice(0, 10),
  revenue: 29,
};

export default function UserForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialData || emptyUser);
  const [errors, setErrors] = useState({});

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const submit = (e) => {
    e.preventDefault();

    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(form.email))
      nextErrors.email = "Enter a valid email";
    if (!form.company.trim()) nextErrors.company = "Company is required";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      ...form,
      usage: Number(form.usage),
      revenue:
        form.plan === "Starter"
          ? 29
          : form.plan === "Pro"
          ? 149
          : 399,
    });
  };

  return (
    <form className="form-grid" onSubmit={submit}>
      <label>
        Full Name
        <input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Enter name"
        />
        {errors.name && <small>{errors.name}</small>}
      </label>

      <label>
        Email
        <input
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="name@example.com"
        />
        {errors.email && <small>{errors.email}</small>}
      </label>

      <label>
        Company
        <input
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          placeholder="Company name"
        />
        {errors.company && <small>{errors.company}</small>}
      </label>

      <label>
        Plan
        <select
          value={form.plan}
          onChange={(e) => update("plan", e.target.value)}
        >
          <option>Starter</option>
          <option>Pro</option>
          <option>Enterprise</option>
        </select>
      </label>

      <label>
        Status
        <select
          value={form.status}
          onChange={(e) => update("status", e.target.value)}
        >
          <option>Active</option>
          <option>Trial</option>
          <option>Inactive</option>
        </select>
      </label>

      <label>
        Usage %
        <input
          type="number"
          min="0"
          max="100"
          value={form.usage}
          onChange={(e) => update("usage", e.target.value)}
        />
      </label>

      <div className="modal-actions full">
        <button type="button" className="btn secondary" onClick={onCancel}>
          Cancel
        </button>

        <button type="submit" className="btn primary">
          Save User
        </button>
      </div>
    </form>
  );
}