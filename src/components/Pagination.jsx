import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  onChange,
  totalItems,
  pageSize,
}) {
  if (totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="pagination">
      <span>
        Showing {start}-{end} of {totalItems}
      </span>

      <div className="pagination-buttons">
        <button
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
        >
          <ChevronLeft size={17} />
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={page === index + 1 ? "current" : ""}
            onClick={() => onChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}