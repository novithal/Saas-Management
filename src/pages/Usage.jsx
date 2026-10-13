import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { usageData } from "../data/initialData";

export default function Usage() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">PRODUCT ANALYTICS</span>
          <h1>Usage analytics</h1>
          <p>Understand how customers consume your platform.</p>
        </div>

        <select className="date-select" defaultValue="30">
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <div className="stats-grid">
        {usageData.map((item) => (
          <div className="mini-detail-card" key={item.name}>
            <span>{item.name}</span>
            <strong>{item.value}%</strong>

            <div className="progress">
              <span style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Resource consumption</h2>
            <p>Average customer usage by resource.</p>
          </div>
        </div>

        <div className="chart-box">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={usageData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />

              <XAxis dataKey="name" axisLine={false} tickLine={false} />

              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
                barSize={55}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}