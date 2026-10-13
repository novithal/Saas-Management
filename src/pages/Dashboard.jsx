import React, { useMemo } from "react";
import {
  Users,
  DollarSign,
  CreditCard,
  Activity,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import { getStorage } from "../utils/storage";
import {
  initialUsers,
  initialPlans,
  initialSubscriptions,
  revenueData,
} from "../data/initialData";
import { formatCurrency } from "../utils/helpers";

export default function Dashboard() {
  const navigate = useNavigate();

  const users = getStorage("saas_users", initialUsers);
  const plans = getStorage("saas_plans", initialPlans);
  const subscriptions = getStorage(
    "saas_subscriptions",
    initialSubscriptions
  );

  const stats = useMemo(() => {
    const revenue = users.reduce((sum, user) => sum + user.revenue, 0);

    const active = subscriptions.filter(
      (item) => item.status === "Active"
    ).length;

    const avgUsage =
      users.length > 0
        ? Math.round(
            users.reduce((sum, user) => sum + user.usage, 0) / users.length
          )
        : 0;

    return {
      users: users.length,
      revenue,
      subscriptions: active,
      usage: avgUsage,
    };
  }, [users, subscriptions]);

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">OVERVIEW</span>
          <h1> Dashboard </h1>
          <p>Monitor customers, subscriptions, usage and revenue.</p>
        </div>

        <button className="btn primary" onClick={() => navigate("/users")}>
          Manage users
          <ArrowRight size={17} />
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Customers"
          value={stats.users}
          change="+12.8%"
          icon={<Users size={21} />}
        />

        <StatCard
          title="Monthly Revenue"
          value={formatCurrency(stats.revenue)}
          change="+18.4%"
          icon={<DollarSign size={21} />}
        />

        <StatCard
          title="Active Subscriptions"
          value={stats.subscriptions}
          change="+9.6%"
          icon={<CreditCard size={21} />}
        />

        <StatCard
          title="Average Usage"
          value={`${stats.usage}%`}
          change="+5.2%"
          icon={<Activity size={21} />}
        />
      </div>

      <div className="dashboard-grid">
        <section className="panel large-panel">
          <div className="panel-heading">
            <div>
              <h2>Revenue overview</h2>
              <p>Revenue performance over the last 7 months</p>
            </div>

            <select defaultValue="7">
              <option value="7">Last 7 months</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>

          <RevenueChart data={revenueData} />
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Plans</h2>
              <p>Customers by plan</p>
            </div>
          </div>

          <div className="plan-summary">
            {plans.map((plan) => (
              <div className="plan-summary-row" key={plan.id}>
                <div>
                  <strong>{plan.name}</strong>
                  <span>{plan.users} customers</span>
                </div>

                <strong>${plan.price}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Recent subscriptions</h2>
            <p>Latest customer subscription activity</p>
          </div>

          <button
            className="text-button"
            onClick={() => navigate("/subscriptions")}
          >
            View all
          </button>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Renewal</th>
              </tr>
            </thead>

            <tbody>
              {subscriptions.slice(0, 5).map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.customer}</strong>
                    <span className="table-secondary">{item.email}</span>
                  </td>

                  <td>{item.plan}</td>

                  <td>${item.amount}</td>

                  <td>
                    <span
                      className={`status ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>{item.renewal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}