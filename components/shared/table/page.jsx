'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Table({
    title = '',
    headers = [],
    data = [],
    itemsPerPage = 5,
    onAdd,
    onEdit,
    onDelete,
}) {
    const [page, setPage] = useState(1);
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortKey) return 0;
        const valA = a[sortKey]?.toString().toLowerCase();
        const valB = b[sortKey]?.toString().toLowerCase();
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = sortedData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
    };

    return (
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                {onAdd && (
                    <button
                        onClick={onAdd}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium rounded-lg shadow hover:opacity-90 transition"
                    >
                        + Add
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
                            {headers.map((header) => (
                                <th
                                    key={header.key}
                                    onClick={() => header.sortable && handleSort(header.key)}
                                    className={`px-5 py-3 font-semibold text-left ${header.sortable ? 'cursor-pointer hover:text-indigo-600' : ''
                                        }`}
                                >
                                    {header.label}
                                    {header.sortable && sortKey === header.key && (
                                        <span className="ml-1 text-indigo-500">
                                            {sortOrder === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    {headers.map((header) => (
                                        <td key={header.key} className="px-5 py-4 text-gray-700">
                                            {header.type === 'text' && (
                                                <span>{row[header.key]}</span>
                                            )}
                                            {header.type === 'status' && (
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${row[header.key] === 'Active'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                        }`}
                                                >
                                                    {row[header.key]}
                                                </span>
                                            )}
                                            {header.type === 'action' && (
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => onEdit?.(row.action)}
                                                        className="text-indigo-500 hover:scale-110 transition"
                                                    >
                                                        <Image
                                                            src="/assets/icons/edit-icon.svg"
                                                            alt="edit"
                                                            width={15}
                                                            height={15}
                                                        />
                                                    </button>
                                                    <button
                                                        onClick={() => onDelete?.(row.action)}
                                                        className="text-red-500 hover:scale-110 transition"
                                                    >
                                                        <Image
                                                            src="/assets/icons/delete-icon.svg"
                                                            alt="delete"
                                                            width={15}
                                                            height={15}
                                                        />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={headers.length} className="text-center py-10 text-gray-400">
                                    No records found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-500">
                    Showing {(page - 1) * itemsPerPage + 1}–
                    {Math.min(page * itemsPerPage, data.length)} of {data.length}
                </p>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="px-3 py-1 border rounded disabled:opacity-40"
                    >
                        Prev
                    </button>
                    <span className="px-3 text-sm">
                        Page {page} / {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
