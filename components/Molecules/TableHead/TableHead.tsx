import React from "react";
import SortButton from "../SortButton/SortButton";
import { SortConfig } from "@/app/types";

interface TableHeadProps {
  sortConfig: SortConfig;
  handleSort: (key: "price" | "weight") => void;
}

const TableHead: React.FC<TableHeadProps> = ({ sortConfig, handleSort }) => {
  return (
   
      <thead className="sticky top-0 bg-white z-10 border-b border-gray-200">
        <tr>
          <th
            scope="col"
            className="bg-gray-50 w-[30%] py-3 pl-4 pr-3 text-left text-xs sm:text-sm font-medium text-gray-500 border-r border-gray-200 last:border-r-0"
          >
            Name
          </th>
          <th
            scope="col"
            className="bg-gray-50 w-[30%] px-3 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 border-r border-gray-200 last:border-r-0"
          >
            Section
          </th>
          <th
            scope="col"
            className="bg-gray-50 w-[20%] px-3 py-3 whitespace-nowrap text-left text-xs sm:text-sm font-medium text-gray-500 border-r border-gray-200 last:border-r-0"
          >
            <SortButton
              sortConfig={sortConfig}
              onSort={handleSort}
              sortKey="price"
              label="Price (€)"
            />
          </th>
          <th
            scope="col"
            className="bg-gray-50 w-[20%] pl-3 pr-4 py-3 whitespace-nowrap text-left text-xs sm:text-sm font-medium text-gray-500 last:border-r-0"
          >
            <SortButton
              sortConfig={sortConfig}
              onSort={handleSort}
              sortKey="weight"
              label="Price / 100g (€)"
            />
          </th>
        </tr>
      </thead>
  );
};

export default TableHead;
