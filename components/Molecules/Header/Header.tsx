import React, { useEffect, useRef, useState } from "react";

type HeaderProps = {
  sections?: string[];
  title?: string;
  initialSection?: string | null;
  onSectionChange?: (section: string | null) => void;
  onPageChange?: (page: number) => void;
  sortConfig?: {
    key: "price" | "weight" | null;
    direction: "asc" | "desc";
  };
  handleSort?: (key: "price" | "weight") => void;
};

import Icon from "../../Atoms/Icon/Icon";
import SortDropDown from "../SortDropDown/SortDropDown";

export default function Header({
  sections = [],
  title = "Today's groceries",
  initialSection = null,
  onSectionChange,
  onPageChange,
  sortConfig,
  handleSort,
}: HeaderProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(
    initialSection
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onSectionChange?.(selectedSection);
  }, [selectedSection, onSectionChange]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        isFilterOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsFilterOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isFilterOpen]);

  const handleSelectSection = (section: string | null) => {
    setSelectedSection(section);
    setIsFilterOpen(false);
    onPageChange?.(1);
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
      <h1
        className="text-lg sm:text-xl font-semibold text-gray-900 w-full"
        id="grocery-list-title"
      >
        {title}
      </h1>
      <div className="flex items-center  justify-between sm:justify-end w-full gap-2">
        <div className="relative" ref={containerRef}>
          <button
            className="flex w-full sm:w-auto items-center justify-between gap-2 px-4 py-3 sm:py-2 text-sm text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Filter groceries by section"
            aria-expanded={isFilterOpen}
            aria-controls="section-filter"
            aria-haspopup="menu"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <span className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center">
                <Icon src="/Filter.svg" alt="Filter icon" />
              </span>
              <span className="truncate">
                {selectedSection
                  ? `${selectedSection}`
                  : "Filter by section"}
              </span>
            </span>
            <span className="ml-2 text-gray-400" aria-hidden>
              ▾
            </span>
          </button>

          {isFilterOpen && (
            <div
              id="section-filter"
              className="absolute left-0 right-0 sm:right-0 mt-2 sm:mt-2 w-full   bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 transition ease-out"
              role="menu"
              aria-labelledby="grocery-list-title"
            >
              <div className="py-1" role="none">
                <button
                  className={`w-full text-left px-4 py-3 text-sm ${
                    !selectedSection
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => handleSelectSection(null)}
                  role="menuitem"
                >
                  All Sections
                </button>
                {sections.map((section) => (
                  <button
                    key={section}
                    className={`w-full text-left px-4 py-3 text-sm ${
                      selectedSection === section
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => handleSelectSection(section)}
                    role="menuitem"
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        {sortConfig && (
          <SortDropDown  handleSort={handleSort} />
        )}
      </div>
    </header>
  );
}
