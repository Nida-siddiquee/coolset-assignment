import { SortConfig } from "@/app/types";
import Icon from "@/components/Atoms/Icon/Icon";
import React from "react";




interface SortButtonProps {
  sortConfig: SortConfig;
  onSort: (key: "price" | "weight") => void;
  sortKey?: "price" | "weight";
  label?: string;
  className?: string;
}

export default function SortButton({
  sortConfig,
  onSort,
  sortKey = "weight",
  label = "Price / 100g (€)",
  className = "",
}: SortButtonProps) {
  const handleSort = (key: "price" | "weight") => {
    onSort(key);
  };

  const ariaDirectionHint =
    sortConfig.key === sortKey
      ? sortConfig.direction === "asc"
        ? "descending"
        : "ascending"
      : "";

  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1 hover:text-gray-700 focus:outline-none focus:text-gray-700 ${className}`}
      onClick={() => handleSort(sortKey)}
      aria-label={`Sort by ${label} ${ariaDirectionHint}`}
    >
    {" "}
      {label}{" "}
      {sortConfig.key === sortKey && (
        <span className="text-gray-900">
          {sortConfig.direction === "asc" ? (
            <Icon src="/arrow-long-up.svg" alt="Up arrow" />
          ) : (
            <Icon
              src="/arrow-long-up.svg"
              alt="Down arrow"
              className="rotate-180"
            />
          )}
        </span>
      )}
    </button>
  );
}
