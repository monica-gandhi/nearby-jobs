'use client';

import React, { useState, useEffect, useRef } from 'react';
import Table from '@/components/shared/table/page';
import CustomDialog from '@/components/shared/dialog/page';
import JobSeekerForm from './form/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { showError, showSuccess } from '@/common/toast/toastService';
import { motion } from 'framer-motion';

export default function JobSeekerPage() {
    const hasFetchedRef = useRef(false);
    const [jobseekers, setJobseekers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);

    const [selectedJobSeeker, setSelectedJobSeeker] = useState(null);
    const [selectedJobSeekerId, setSelectedJobSeekerId] = useState(null);

    // Fetch jobseekers
    const fetchJobseekers = async () => {
        try {
            const response = await apiRequest(apiRoutes.getJobSeekersList, 'POST');

            if (response?.response && response.data?.docs) {
                setJobseekers(response.data.docs);
            }
        } catch (error) {
            console.error('Error fetching jobseekers:', error);
            showError('Failed to load jobseekers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hasFetchedRef.current) {
            fetchJobseekers();
            hasFetchedRef.current = true;
        }
    }, []);

    // Table headers
    const headers = [
        { key: 'id', label: 'S.No', type: 'text', sortable: true },
        { key: 'name', label: 'Name', type: 'text', sortable: true },
        { key: 'email', label: 'Email', type: 'text', sortable: true },
        { key: 'mobile', label: 'Mobile', type: 'text', sortable: true },
        { key: 'jobType', label: 'Job Type', type: 'text', sortable: true },
        { key: 'lastLogin', label: 'Last Login', type: 'text', sortable: true },
        { key: 'action', label: 'Action', type: 'action' },
    ];

    // Transform table data
    const tableData = jobseekers.map((user, index) => ({
        id: index + 1,
        name: user.name,
        email: user.email,
        mobile: user.mobile || '-',
        jobType: user?.jobTypeDetail?.name || 'Not Selected',
        lastLogin: user.lastLogin || '-',
        action: user.id,
    }));

    // Open Add form
    const handleAdd = () => {
        setSelectedJobSeeker(null);
        setFormDialogOpen(true);
    };

    // Open Edit form
    const handleEdit = (id) => {
        const seeker = jobseekers.find((u) => u.id === id);
        setSelectedJobSeeker(seeker);
        setFormDialogOpen(true);
    };

    // Delete button clicked
    const handleDeleteClick = (id) => {
        setSelectedJobSeekerId(id);
        setDeleteDialogOpen(true);
    };

    // Confirm delete
    const handleConfirmDelete = async () => {
        try {
            const res = await apiRequest(apiRoutes.deleteJobSeeker, 'POST', { id: selectedJobSeekerId });

            setJobseekers((prev) => prev.filter((u) => u.id !== selectedJobSeekerId));
            setDeleteDialogOpen(false);

            showSuccess(res?.message || 'Jobseeker deleted successfully!');
        } catch (error) {
            console.error('Error deleting jobseeker:', error);
            showError('Failed to delete jobseeker.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Table
                    title="Jobseeker List"
                    headers={headers}
                    data={tableData}
                    itemsPerPage={10}
                    // onAdd={handleAdd}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                />
            </motion.div>

            {/* Add / Edit Dialog */}
            <CustomDialog
                open={formDialogOpen}
                onClose={() => setFormDialogOpen(false)}
                title={selectedJobSeeker ? 'Edit Jobseeker' : 'Add Jobseeker'}
                content={
                    <JobSeekerForm
                        open={formDialogOpen}
                        onClose={() => setFormDialogOpen(false)}
                        jobSeeker={selectedJobSeeker}
                        onSaved={fetchJobseekers}
                    />
                }
            />

            {/* Delete Confirm Dialog */}
            <CustomDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                title="Confirm Deletion"
                titleColor="text-red-600"
                content={
                    <p className="text-sm text-gray-600">
                        Are you sure you want to delete this jobseeker? This action cannot be undone.
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
