import React, { useState } from "react";
import { setStorage } from "../utils/storage";

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: "Novitha Loganathan",
    email: "novitha@scaleos.com",
    company: "ScaleOS",
    timezone: "Asia/Kolkata",
    currency: "USD",
  });

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const save = (e) => {
    e.preventDefault();

    setStorage("saas_profile", form);
    setSaved(true);
  };

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">CONFIGURATION</span>
          <h1>Settings</h1>
          <p>Manage your SaaS administration preferences.</p>
        </div>
      </div>

      <section className="panel settings-panel">
        <form onSubmit={save} className="form-grid">
          <label>
            Admin Name
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </label>

          <label>
            Company
            <input
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
            />
          </label>

          <label>
            Timezone
            <select
              value={form.timezone}
              onChange={(e) => update("timezone", e.target.value)}
            >
              <option>Asia/Kolkata</option>
              <option>America/New_York</option>
              <option>Europe/London</option>
            </select>
          </label>

          <label>
            Currency
            <select
              value={form.currency}
              onChange={(e) => update("currency", e.target.value)}
            >
              <option>USD</option>
              <option>EUR</option>
              <option>INR</option>
              <option>GBP</option>
            </select>
          </label>

          <div className="full modal-actions">
            <button className="btn primary">
              Save settings
            </button>

            {saved && (
              <span className="saved-message">
                Settings saved successfully.
              </span>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}