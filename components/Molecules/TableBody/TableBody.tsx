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

const TableBody: React.FC<TableBodyProps> = ({ currentItems, startIndex }) => {
  return (
    <tbody className="divide-y divide-gray-100 bg-white">
      {currentItems.map((item, index) => (
        <tr
          key={startIndex + index}
          className="hover:bg-gray-50 focus-within:bg-gray-50 transition-colors"
          role="row"
        >
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 border-r border-gray-200 last:border-r-0">
            <div className="font-medium">{item.name}</div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 border-r border-gray-200 last:border-r-0">
            {item.section}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900 border-r border-gray-200 last:border-r-0">
            {item.price.toFixed(2)}
          </td>
          <td className="whitespace-nowrap pl-3 pr-4 py-4 text-sm text-right text-gray-900">
            {item.weight.toFixed(2)}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
