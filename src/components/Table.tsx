import { useEffect } from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Table<T>({
  columns,
  data,
  currentPage,
  totalPages,
  onPageChange,
}: TableProps<T>) {
  useEffect(() => {
    if (currentPage >= totalPages) {
      onPageChange(totalPages - 1);
    }
  }, [totalPages, currentPage, onPageChange]);

  return (
    <div className="w-full bg-white rounded-md shadow">
      <table className="w-full table-fixed text-sm text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="px-3 py-2 text-left font-semibold break-words"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((col) => {
                const content = col.render
                  ? col.render(row[col.accessor], row)
                  : String(row[col.accessor]);

                return (
                  <td
                    key={String(col.accessor)}
                    className="px-3 py-2 break-words align-top"
                  >
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-4 py-3 border-t bg-gray-50">
        <span className="text-xs text-gray-600">
          Page{" "}
          <span className="text-blue-600 font-semibold">{currentPage + 1}</span>{" "}
          of <span className="text-gray-800 font-semibold">{totalPages}</span>
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className={`px-3 py-1.5 rounded-md transition text-xs md:text-sm
              ${
                currentPage === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            Previous
          </button>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage + 1 >= totalPages}
            className={`px-3 py-1.5 rounded-md transition text-xs md:text-sm
              ${
                currentPage + 1 >= totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;
