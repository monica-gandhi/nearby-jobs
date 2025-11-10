'use client';
import React, { useState, useEffect, useRef } from 'react';
import Table from '@/components/shared/table/page';
import CustomDialog from '@/components/shared/dialog/page';
import JobDomainFormDialog from './form/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { showError, showSuccess } from '@/common/toast/toastService';
import { motion } from 'framer-motion';

export default function JobDomainPage() {
    const hasFetchedRef = useRef(false);
    const [jobDomain, setJobDomain] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [selectedJobDomain, setSelectedJobDomain] = useState(null);
    const [selectedJobDomainId, setSelectedJobDomainId] = useState(null);

    // Fetch job types
    const fetchJobDomain = async () => {
        try {
            const response = await apiRequest(apiRoutes.getJobDomain, 'POST');
            if (response?.response && response.data?.docs) {
                setJobDomain(response.data.docs);
            }
        } catch (error) {
            console.error('Error fetching job domain:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hasFetchedRef.current) {
            fetchJobDomain();
            hasFetchedRef.current = true;
        }
    }, []);

    // Table headers
    const headers = [
        { key: 'id', label: 'S.No', type: 'text', sortable: true },
        { key: 'name', label: 'Job Domain Name', type: 'text', sortable: true },
        { key: 'status', label: 'Status', type: 'status', sortable: true },
        { key: 'action', label: 'Action', type: 'action' },
    ];

    // Transform data for table
    const tableData = jobDomain.map((domain, index) => ({
        id: index + 1,
        name: domain.name,
        status: domain.status,
        action: domain.id,
    }));

    // Handlers
    const handleAdd = () => {
        setSelectedJobDomain(null);
        setFormDialogOpen(true);
    };

    const handleEdit = (id) => {
        const jobDom = jobDomain.find((t) => t.id === id);
        setSelectedJobDomain(jobDom);
        setFormDialogOpen(true);
    };

    const handleDeleteClick = (id) => {
        setSelectedJobDomainId(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const res = await apiRequest(apiRoutes.deleteJobDomain, 'POST', { id: selectedJobDomainId });
            setJobDomain((prev) => prev.filter((cat) => cat.id !== selectedJobDomainId));
            setDeleteDialogOpen(false);
            showSuccess(res?.message || 'Job Domain deleted successfully!');
        } catch (error) {
            console.error('Error deleting job domain:', error);
            showError(error?.message || 'Failed to delete job domain.');
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
                    title="Job Domain List"
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
                title={selectedJobDomain ? 'Edit Job Domain' : 'Add Job Domain'}
                content={
                    <JobDomainFormDialog
                        open={formDialogOpen}
                        onClose={() => setFormDialogOpen(false)}
                        jobDomain={selectedJobDomain}
                        onSaved={fetchJobDomain}
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
                        Are you sure you want to delete this job domain? This action cannot be undone.
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
