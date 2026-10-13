import React from "react";
import { LoaderCircle } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="loading-state">
      <LoaderCircle className="loading-spinner" size={36} />
      <p>Loading data...</p>
    </div>
  );
}