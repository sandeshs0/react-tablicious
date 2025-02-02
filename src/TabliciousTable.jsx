import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import React, { useMemo, useState } from "react";

const SortButton = ({ active, ascending, onClick }) => (
  <button
    onClick={onClick}
    className={`ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
      active ? "text-blue-600 dark:text-blue-400" : "text-gray-400"
    }`}
  >
    <ArrowUpDown size={16} />
  </button>
);

const TableHeader = ({ columns, sortConfig, onSort }) => (
  <thead className="bg-gray-100 dark:bg-gray-800">
    <tr>
      {columns.map((column) => (
        <th
          key={column.field}
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
        >
          <div className="flex items-center">
            {column.headerName}
            {column.sortable && (
              <SortButton
                active={sortConfig.field === column.field}
                ascending={sortConfig.direction === "asc"}
                onClick={() => onSort(column.field)}
              />
            )}
          </div>
        </th>
      ))}
    </tr>
  </thead>
);

const TableRow = ({ row, columns }) => (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
    {columns.map((column) => (
      <td
        key={column.field}
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
      >
        <p
          className={`${
            column.field ===
            "text-center rounded-lg py-1 px- border-2 font-bold dark:bg-green-900/30 text-gray-900 dark:text-gray-100"
          } transition-colors duration-200`}
        >
          {row[column.field]}
        </p>
      </td>
    ))}
  </tr>
);

const Tablicious = ({ data, columns, pageSize = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: "asc",
  });

  // Sorting logic
  const handleSort = (field) => {
    setSortConfig((prevSort) => ({
      field,
      direction:
        prevSort.field === field && prevSort.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let processedData = [...data];

    // Filter
    if (searchQuery) {
      processedData = processedData.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Sort
    if (sortConfig.field) {
      processedData.sort((a, b) => {
        const aValue = a[sortConfig.field];
        const bValue = b[sortConfig.field];

        // Handle numeric values (including those with "Rs. " prefix)
        const aNum = parseFloat(aValue.toString().replace(/[^0-9.-]+/g, ""));
        const bNum = parseFloat(bValue.toString().replace(/[^0-9.-]+/g, ""));

        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum;
        }

        // Handle string values
        return sortConfig.direction === "asc"
          ? aValue.toString().localeCompare(bValue.toString())
          : bValue.toString().localeCompare(aValue.toString());
      });
    }

    return processedData;
  }, [data, searchQuery, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  // Reset to first page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow ring-1 ring-black ring-opacity-5">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <TableHeader
            columns={columns.map((col) => ({ ...col, sortable: true }))}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {currentData.map((row, index) => (
              <TableRow key={index} row={row} columns={columns} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing {startIndex + 1} to{" "}
          {Math.min(endIndex, filteredAndSortedData.length)} of{" "}
          {filteredAndSortedData.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                       disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700
                       transition-colors duration-150"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                Math.abs(currentPage - page) <= 1
            )
            .map((page, index, array) => (
              <React.Fragment key={page}>
                {index > 0 && array[index - 1] !== page - 1 && (
                  <span className="text-gray-500 dark:text-gray-400">...</span>
                )}
                <button
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md transition-colors duration-150 ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {page}
                </button>
              </React.Fragment>
            ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                       disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700
                       transition-colors duration-150"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tablicious;
