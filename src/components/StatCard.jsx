import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  icon,
  positive = true,
}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon">{icon}</div>

        <span className={positive ? "trend up" : "trend down"}>
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </span>
      </div>

      <span className="stat-label">{title}</span>
      <strong className="stat-value">{value}</strong>
      <span className="stat-period">vs. previous period</span>
    </div>
  );
}