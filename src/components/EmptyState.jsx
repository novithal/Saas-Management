import React from "react";
import { SearchX } from "lucide-react";

export default function EmptyState({
  title = "No data found",
  description = "Try changing your search or filters.",
}) {
  return (
    <div className="empty-state">
      <SearchX size={42} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}