import Icon from '@/components/Atoms/Icon/Icon';
import IconButton from '@/components/Atoms/IconButton/IconButton';
import React from 'react';
interface PaginationNavProps {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
}

export const PaginationNav: React.FC<PaginationNavProps> = ({
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    onPageChange,
    onItemsPerPageChange,
}) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
        <nav
            className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-gray-500"
            aria-label="Table navigation"
        >
            <div className="flex items-center gap-4">
                <label htmlFor="rows-per-page" className="font-medium">
                    Rows per page:
                </label>
                <select
                    id="rows-per-page"
                    className="bg-transparent text-gray-600 border border-gray-200 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500"
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                    aria-label="Select number of rows per page"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:block" aria-live="polite">
                    {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems}
                </div>
                <div className="flex gap-1">
                    <IconButton
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                    >
                        <Icon src="/Left.svg" alt="Left arrow" priority ariaHidden />
                    </IconButton>
                    <IconButton
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                    >
                        <Icon src="/Right.svg" alt="Right arrow" priority ariaHidden />
                    </IconButton>
                </div>
            </div>
        </nav>
    );
};