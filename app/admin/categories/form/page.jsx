'use client';

import React, { useEffect, useState } from 'react';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { showError, showSuccess } from '@/common/toast/toastService';

export default function WorkCategoryFormDialog({ open, onClose, workCategory = null, onSaved }) {
    const isEdit = !!workCategory;
    const [formData, setFormData] = useState({ name: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [viewLoading, setViewLoading] = useState(false);

    const fetchWorkCategoryDetails = async (id) => {
        setViewLoading(true);
        try {
            const res = await apiRequest(apiRoutes.viewWorkCategory, 'POST', { id });
            if (res?.response && res.data) {
                setFormData({ name: res.data.name || '' });
            } else {
                showError(res?.message || 'Failed to fetch work category details');
            }
        } catch (err) {
            console.error('Error fetching work category details:', err);
            showError('Something went wrong while fetching work category details');
        } finally {
            setViewLoading(false);
        }
    };

    useEffect(() => {
        if (workCategory?.id) {
            fetchWorkCategoryDetails(workCategory.id);
        } else {
            setFormData({ name: '' });
        }
    }, [workCategory]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (!formData.name.trim()) {
            showError('Please enter work category');
            return;
        }

        setLoading(true);
        try {
            const payload = { name: formData.name };
            let res;

            if (isEdit) {
                res = await apiRequest(apiRoutes.updateWorkCategory, 'POST', { ...payload, id: workCategory.id });
            } else {
                res = await apiRequest(apiRoutes.addWorkCategory, 'POST', payload);
            }

            if (res?.response) {
                showSuccess(res.message || (isEdit ? 'Work category updated' : 'Work category added'));
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
                <p className="text-gray-500 text-sm">Loading work category details...</p>
            ) : (
                <>
                    <Input
                        label="Work Category"
                        name="name"
                        placeholder="Enter work category"
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
                            {loading ? 'Saving...' : workCategory?.id ? 'Update' : 'Add'}
                        </Button>
                    </div>
                </>
            )}
        </form>
    );
}
