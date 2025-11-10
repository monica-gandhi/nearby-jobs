'use client';
import React, { useState, useEffect, useRef } from 'react';
import Table from '@/components/shared/table/page';
import CustomDialog from '@/components/shared/dialog/page';
import WorkCategoryFormDialog from './form/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { showError, showSuccess } from '@/common/toast/toastService';
import { motion } from 'framer-motion';

export default function WorkCategoryPage() {
    const hasFetchedRef = useRef(false);
    const [workCategory, setWorkCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [selectedWorkCategory, setSelectedWorkCategory] = useState(null);
    const [selectedWorkCategoryId, setSelectedWorkCategoryId] = useState(null);

    // Fetch job types
    const fetchWorkCategory = async () => {
        try {
            const response = await apiRequest(apiRoutes.getWorkCategory, 'POST');
            if (response?.response && response.data?.docs) {
                setWorkCategory(response.data.docs);
            }
        } catch (error) {
            console.error('Error fetching work category:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hasFetchedRef.current) {
            fetchWorkCategory();
            hasFetchedRef.current = true;
        }
    }, []);

    // Table headers
    const headers = [
        { key: 'id', label: 'S.No', type: 'text', sortable: true },
        { key: 'name', label: 'Work Category Name', type: 'text', sortable: true },
        { key: 'status', label: 'Status', type: 'status', sortable: true },
        { key: 'action', label: 'Action', type: 'action' },
    ];

    // Transform data for table
    const tableData = workCategory.map((work, index) => ({
        id: index + 1,
        name: work.name,
        status: work.status,
        action: work.id,
    }));

    // Handlers
    const handleAdd = () => {
        setSelectedWorkCategory(null);
        setFormDialogOpen(true);
    };

    const handleEdit = (id) => {
        const workCat = workCategory.find((t) => t.id === id);
        setSelectedWorkCategory(workCat);
        setFormDialogOpen(true);
    };

    const handleDeleteClick = (id) => {
        setSelectedWorkCategoryId(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const res = await apiRequest(apiRoutes.deleteWorkCategory, 'POST', { id: selectedWorkCategoryId });
            setWorkCategory((prev) => prev.filter((cat) => cat.id !== selectedWorkCategoryId));
            setDeleteDialogOpen(false);
            showSuccess(res?.message || 'Work Category deleted successfully!');
        } catch (error) {
            console.error('Error deleting work category:', error);
            showError(error?.message || 'Failed to delete work category.');
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
                    title="Work Category List"
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
                title={selectedWorkCategory ? 'Edit Work Category' : 'Add Work Category'}
                content={
                    <WorkCategoryFormDialog
                        open={formDialogOpen}
                        onClose={() => setFormDialogOpen(false)}
                        workCategory={selectedWorkCategory}
                        onSaved={fetchWorkCategory}
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
                        Are you sure you want to delete this work category? This action cannot be undone.
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
