import React from "react";

interface TableItem {
  name: string;
  section: string;
  price: number;
  weight: number;
}

interface TableBodyProps {
  currentItems: TableItem[];
  startIndex: number;
}

const TableBodyMobile: React.FC<TableBodyProps> = ({ currentItems, startIndex }) => {
  return (
     <div className="block sm:hidden space-y-3">
            {currentItems.map((item, idx) => (
              <div
                key={startIndex + idx}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                role="listitem"
                aria-label={`${item.name}, ${item.section}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                    <div className="mt-1 text-xs text-gray-600">
                      {item.section}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm font-semibold text-gray-900">
                      €{item.price.toFixed(2)}
                    </div>
                    <div className="mt-1 text-xs text-gray-600">
                      €{item.weight.toFixed(2)} /100g
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
  );
};

export default TableBodyMobile;
