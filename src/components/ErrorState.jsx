import React from "react";
import { AlertTriangle } from "lucide-react";

export default function ErrorState({ onRetry }) {
  return (
    <div className="empty-state error-state">
      <AlertTriangle size={42} />
      <h3>Something went wrong</h3>
      <p>We couldn't load this data.</p>
      <button className="btn primary" onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}