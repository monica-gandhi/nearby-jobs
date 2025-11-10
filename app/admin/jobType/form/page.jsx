'use client';

import React, { useEffect, useState } from 'react';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { showError, showSuccess } from '@/common/toast/toastService';

export default function JobTypeFormDialog({ open, onClose, jobType = null, onSaved }) {
    const isEdit = !!jobType;
    const [formData, setFormData] = useState({ name: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [viewLoading, setViewLoading] = useState(false);

    const fetchJobTypeDetails = async (id) => {
        setViewLoading(true);
        try {
            const res = await apiRequest(apiRoutes.viewJobType, 'POST', { id });
            if (res?.response && res.data) {
                setFormData({ name: res.data.name || '' });
            } else {
                showError(res?.message || 'Failed to fetch job type details');
            }
        } catch (err) {
            console.error('Error fetching job type details:', err);
            showError('Something went wrong while fetching job type details');
        } finally {
            setViewLoading(false);
        }
    };

    useEffect(() => {
        if (jobType?.id) {
            fetchJobTypeDetails(jobType.id);
        } else {
            setFormData({ name: '' });
        }
    }, [jobType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (!formData.name.trim()) {
            showError('Please enter job type');
            return;
        }

        setLoading(true);
        try {
            const payload = { name: formData.name };
            let res;

            if (isEdit) {
                res = await apiRequest(apiRoutes.updateJobType, 'POST', { ...payload, id: jobType.id });
            } else {
                res = await apiRequest(apiRoutes.addJobType, 'POST', payload);
            }

            if (res?.response) {
                showSuccess(res.message || (isEdit ? 'Job type updated' : 'Job type added'));
                onSaved?.();
                onClose?.();
            } else {
                showError(res?.message || 'Something went wrong');
            }
        } catch (err) {
            console.error(err);
            showError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {viewLoading ? (
                <p className="text-gray-500 text-sm">Loading job type details...</p>
            ) : (
                <>
                    <Input
                        label="Job Type"
                        name="name"
                        placeholder="Enter job type"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="default"
                            loading={loading}
                            onClick={handleSubmit}
                        >
                            {loading ? 'Saving...' : jobType?.id ? 'Update' : 'Add'}
                        </Button>
                    </div>
                </>
            )}
        </form>
    );
}
