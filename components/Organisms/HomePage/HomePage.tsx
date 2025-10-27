import React, { useState } from "react";

import { GroceryItem, SortConfig } from "@/app/types";
import Header from "@/components/Molecules/Header/Header";
import { PaginationNav } from "@/components/Molecules/PaginationNav/PaginationNav";
import TableBody from "@/components/Molecules/TableBody/TableBody";
import TableHead from "@/components/Molecules/TableHead/TableHead";
import TableBodyMobile from "../TableBodyMobile/TableBodyMobile";

const HomePage: React.FC<{ groceryItems: GroceryItem[] }> = ({
  groceryItems,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  // Get unique sections
  const sections = Array.from(
    new Set(groceryItems.map((item) => item.section))
  ).sort();

  // Filter and sort the groceries
  const filteredAndSortedGroceries: GroceryItem[] = [...groceryItems]
    .filter(
      (item: GroceryItem) =>
        !selectedSection || item.section === selectedSection
    )
    .sort((a: GroceryItem, b: GroceryItem) => {
      if (!sortConfig.key || !sortConfig.direction) return 0;

      const sortValue = (item: (typeof groceryItems)[0]) => {
        if (sortConfig.key === null) return 0;
        return item[sortConfig.key];
      };

      const aValue = sortValue(a);
      const bValue = sortValue(b);

      if (sortConfig.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const totalItems = filteredAndSortedGroceries.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the current page items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredAndSortedGroceries.slice(startIndex, endIndex);

  // Handle sort
  const handleSort = (key: "price" | "weight") => {
    setSortConfig((current) => {
      if (current.key === key) {
        if (current.direction === "asc") {
          return { key, direction: "desc" };
        }
        if (current.direction === "desc") {
          return { key: null, direction: "asc" };
        }
      }
      return { key, direction: "asc" };
    });
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };
  return (
    <>
      <Header
        sections={sections}
        onPageChange={handlePageChange}
        onSectionChange={setSelectedSection}
        title="Today's groceries"
        sortConfig={sortConfig} handleSort={handleSort} 
      />
      <div className="overflow-x-auto -mx-4 sm:-mx-6 md:-mx-8">
        <div className="inline-block min-w-full align-middle px-4 sm:px-6 md:px-8">
          {/* Mobile: stacked cards */}
          <TableBodyMobile
            currentItems={currentItems}
            startIndex={startIndex}
          />

          {/* Desktop/tablet: original table, hidden on small screens */}
          <div className="hidden sm:block">
            <div className="relative max-h-[500px] min-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <table
                className="min-w-full table-auto divide-y divide-gray-200 border border-gray-200 "
                aria-labelledby="grocery-list-title"
                role="grid"
              >
                <TableHead sortConfig={sortConfig} handleSort={handleSort} />
                <TableBody
                  currentItems={currentItems}
                  startIndex={startIndex}
                />
              </table>
            </div>
          </div>

          <PaginationNav
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
