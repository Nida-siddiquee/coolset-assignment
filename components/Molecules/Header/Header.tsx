import React, { useEffect, useRef, useState } from "react";

type HeaderProps = {
    sections?: string[];
    title?: string;
    initialSection?: string | null;
    onSectionChange?: (section: string | null) => void;
    onPageChange?: (page: number) => void;
};

import Icon from "../../Atoms/Icon/Icon";

export default function Header({
    sections = [],
    title = "Today's groceries",
    initialSection = null,
    onSectionChange,
    onPageChange,
}: HeaderProps) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState<string | null>(
        initialSection
    );
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        onSectionChange?.(selectedSection);
    }, [selectedSection, onSectionChange]);

    // useEffect(() => {
    //     onPageChange?.(currentPage);
    // }, [currentPage]);

    // close when clicking outside
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
        setCurrentPage(1);
          onPageChange?.(currentPage)
    };

    return (
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <h1
                className="text-lg sm:text-xl font-semibold text-gray-900"
                id="grocery-list-title"
            >
                {title}
            </h1>

            <div className="relative" ref={containerRef}>
                <button
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-label="Filter groceries by section"
                    aria-expanded={isFilterOpen}
                    aria-controls="section-filter"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                    <Icon src="/Filter.svg" alt="Filter icon" />
                    <span>
                        {selectedSection ? `Section: ${selectedSection}` : "Filter by section"}
                    </span>
                </button>

                {isFilterOpen && (
                    <div
                        id="section-filter"
                        className="absolute right-0 mt-2 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                        role="menu"
                        aria-labelledby="grocery-list-title"
                    >
                        <div className="py-1" role="none">
                            <button
                                className={`w-full text-left px-4 py-2 text-sm ${
                                    !selectedSection ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                                }`}
                                onClick={() => handleSelectSection(null)}
                                role="menuitem"
                            >
                                All Sections
                            </button>
                            {sections.map((section) => (
                                <button
                                    key={section}
                                    className={`w-full text-left px-4 py-2 text-sm ${
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
        </header>
    );
}