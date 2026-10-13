import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { revenueData } from "../data/initialData";

export default function Revenue() {
  const [range, setRange] = useState("7");

  const data = useMemo(() => {
    if (range === "3") return revenueData.slice(-3);
    if (range === "5") return revenueData.slice(-5);
    return revenueData;
  }, [range]);

  const total = data.reduce((sum, item) => sum + item.revenue, 0);
  const subscriptions = data.reduce(
    (sum, item) => sum + item.subscriptions,
    0
  );

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">FINANCE</span>
          <h1>Revenue analytics</h1>
          <p>Track revenue and subscription growth.</p>
        </div>

        <select
          className="date-select"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="3">Last 3 months</option>
          <option value="5">Last 5 months</option>
          <option value="7">Last 7 months</option>
        </select>
      </div>

      <div className="stats-grid">
        <div className="mini-detail-card">
          <span>Total revenue</span>
          <strong>${total.toLocaleString()}</strong>
          <small className="positive-text">+18.4% vs previous period</small>
        </div>

        <div className="mini-detail-card">
          <span>Total subscriptions</span>
          <strong>{subscriptions}</strong>
          <small className="positive-text">+12.7% growth</small>
        </div>

        <div className="mini-detail-card">
          <span>Average revenue</span>
          <strong>
            ${Math.round(total / data.length).toLocaleString()}
          </strong>
          <small className="positive-text">Healthy performance</small>
        </div>
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Revenue vs subscriptions</h2>
            <p>Comparison analytics</p>
          </div>
        </div>

        <div className="chart-box">
          <ResponsiveContainer width="100%" height={390}>
            <LineChart data={data}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />

              <XAxis dataKey="month" axisLine={false} tickLine={false} />

              <YAxis yAxisId="left" axisLine={false} tickLine={false} />

              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Legend />

              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

              <Line
                yAxisId="right"
                type="monotone"
                dataKey="subscriptions"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}