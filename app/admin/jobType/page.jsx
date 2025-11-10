'use client';
import React, { useState, useEffect, useRef } from 'react';
import Table from '@/components/shared/table/page';
import CustomDialog from '@/components/shared/dialog/page';
import JobTypeFormDialog from './form/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { showError, showSuccess } from '@/common/toast/toastService';
import { motion } from 'framer-motion';

export default function JobTypePage() {
    const hasFetchedRef = useRef(false);
    const [jobTypes, setJobTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [selectedJobType, setSelectedJobType] = useState(null);
    const [selectedJobTypeId, setSelectedJobTypeId] = useState(null);

    // Fetch job types
    const fetchJobTypes = async () => {
        try {
            const response = await apiRequest(apiRoutes.getJobType, 'POST');
            if (response?.response && response.data?.docs) {
                setJobTypes(response.data.docs);
            }
        } catch (error) {
            console.error('Error fetching job types:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hasFetchedRef.current) {
            fetchJobTypes();
            hasFetchedRef.current = true;
        }
    }, []);

    // Table headers
    const headers = [
        { key: 'id', label: 'S.No', type: 'text', sortable: true },
        { key: 'name', label: 'Job Type Name', type: 'text', sortable: true },
        { key: 'status', label: 'Status', type: 'status', sortable: true },
        { key: 'action', label: 'Action', type: 'action' },
    ];

    // Transform data for table
    const tableData = jobTypes.map((type, index) => ({
        id: index + 1,
        name: type.name,
        category: type.category || '-',
        status: type.status,
        action: type.id,
    }));

    // Handlers
    const handleAdd = () => {
        setSelectedJobType(null);
        setFormDialogOpen(true);
    };

    const handleEdit = (id) => {
        const jobType = jobTypes.find((t) => t.id === id);
        setSelectedJobType(jobType);
        setFormDialogOpen(true);
    };

    const handleDeleteClick = (id) => {
        setSelectedJobTypeId(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const res = await apiRequest(apiRoutes.deleteJobType, 'POST', { id: selectedJobTypeId });
            setJobTypes((prev) => prev.filter((type) => type.id !== selectedJobTypeId));
            setDeleteDialogOpen(false);
            showSuccess(res?.message || 'Job Type deleted successfully!');
        } catch (error) {
            console.error('Error deleting job type:', error);
            showError(error?.message || 'Failed to delete job type.');
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
                    title="Job Type List"
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
                title={selectedJobType ? 'Edit Job Type' : 'Add Job Type'}
                content={
                    <JobTypeFormDialog
                        open={formDialogOpen}
                        onClose={() => setFormDialogOpen(false)}
                        jobType={selectedJobType}
                        onSaved={fetchJobTypes}
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
                        Are you sure you want to delete this job type? This action cannot be undone.
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
