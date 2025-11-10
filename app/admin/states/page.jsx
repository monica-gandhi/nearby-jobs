'use client';
import React, { useState, useEffect, useRef } from 'react';
import Table from '@/components/shared/table/page';
import CustomDialog from '@/components/shared/dialog/page';
import StatesFormDialog from './form/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { showError, showSuccess } from '@/common/toast/toastService';
import { motion } from 'framer-motion';

export default function StatesPage() {
    const hasFetchedRef = useRef(false);
    const [state, setState] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [selectedStates, setSelectedStates] = useState(null);
    const [selectedStateId, setSelectedStateId] = useState(null);

    // Fetch job types
    const fetchState = async () => {
        try {
            const response = await apiRequest(apiRoutes.getStates, 'POST');
            if (response?.response && response.data?.docs) {
                setState(response.data.docs);
            }
        } catch (error) {
            console.error('Error fetching state:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hasFetchedRef.current) {
            fetchState();
            hasFetchedRef.current = true;
        }
    }, []);

    // Table headers
    const headers = [
        { key: 'id', label: 'S.No', type: 'text', sortable: true },
        { key: 'name', label: 'State Name', type: 'text', sortable: true },
        { key: 'status', label: 'Status', type: 'status', sortable: true },
        { key: 'action', label: 'Action', type: 'action' },
    ];

    // Transform data for table
    const tableData = state.map((stat, index) => ({
        id: index + 1,
        name: stat.name,
        status: stat.status,
        action: stat.id,
    }));

    // Handlers
    const handleAdd = () => {
        setSelectedStates(null);
        setFormDialogOpen(true);
    };

    const handleEdit = (id) => {
        const stat = state.find((t) => t.id === id);
        setSelectedStates(stat);
        setFormDialogOpen(true);
    };

    const handleDeleteClick = (id) => {
        setSelectedStateId(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const res = await apiRequest(apiRoutes.deleteStates, 'POST', { id: selectedStateId });
            setState((prev) => prev.filter((cat) => cat.id !== selectedStateId));
            setDeleteDialogOpen(false);
            showSuccess(res?.message || 'State deleted successfully!');
        } catch (error) {
            console.error('Error deleting state:', error);
            showError(error?.message || 'Failed to delete state.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Table */}
                <Table
                    title="States List"
                    headers={headers}
                    data={tableData}
                    itemsPerPage={5}
                    onAdd={handleAdd}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                />
            </motion.div>

            {/* Add / Edit Dialog */}
            <CustomDialog
                open={formDialogOpen}
                onClose={() => setFormDialogOpen(false)}
                title={selectedStates ? 'Edit States' : 'Add State'}
                content={
                    <StatesFormDialog
                        open={formDialogOpen}
                        onClose={() => setFormDialogOpen(false)}
                        state={selectedStates}
                        onSaved={fetchState}
                    />
                }
            />

            {/* Delete Confirmation Dialog */}
            <CustomDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                title="Confirm Deletion"
                titleColor="text-red-600"
                content={
                    <p className="text-sm text-gray-600">
                        Are you sure you want to delete this state? This action cannot be undone.
                    </p>
                }
                actions={
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setDeleteDialogOpen(false)}
                            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90 transition"
                        >
                            Delete
                        </button>
                    </div>
                }
            />
        </div>
    );
}
