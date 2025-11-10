'use client';

import React, { useEffect, useState } from 'react';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';
import Select from '@/components/shared/select/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { showError, showSuccess } from '@/common/toast/toastService';

export default function RoleFormDialog({ open, onClose, role = null, onSaved }) {
    const isEdit = !!role;
    const [formData, setFormData] = useState({
        roleName: '',
        status: 'Active',
    });
    const [loading, setLoading] = useState(false);
    const [viewLoading, setViewLoading] = useState(false);

    // 🔹 Fetch role details (View API) when editing
    const fetchRoleDetails = async (id) => {
        setViewLoading(true);
        try {
            const res = await apiRequest(apiRoutes.viewRole, 'POST', { id });
            if (res?.response && res.data) {
                setFormData({
                    roleName: res.data.roleName || '',
                    description: res.data.description || '',
                    status: res.data.status || 'Active',
                });
            } else {
                showError(res?.message || 'Failed to fetch role details');
            }
        } catch (err) {
            console.error('Error fetching role details:', err);
            showError('Something went wrong while fetching role details');
        } finally {
            setViewLoading(false);
        }
    };

    useEffect(() => {
        if (role?.id) {
            fetchRoleDetails(role.id);
        } else {
            setFormData({
                roleName: '',
                description: '',
                status: 'Active',
            });
        }
    }, [role]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.roleName.trim()) {
            showError('Please enter role name');
            return;
        }

        setLoading(true);
        try {
            const payload = { ...formData };
            let res;

            if (isEdit) {
                res = await apiRequest(apiRoutes.updateRole, 'POST', { id: role.id, ...payload });
            } else {
                res = await apiRequest(apiRoutes.addRole, 'POST', payload);
            }

            if (res?.response) {
                showSuccess(res.message || (isEdit ? 'Role updated successfully!' : 'Role added successfully!'));
                onSaved?.();
                onClose?.();
            } else {
                showError(res?.message || 'Something went wrong');
            }
        } catch (err) {
            console.error('Error saving role:', err);
            showError('Something went wrong while saving');
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {viewLoading ? (
                <p className="text-gray-500 text-sm">Loading role details...</p>
            ) : (
                <>
                    <Input
                        label="Role Name"
                        name="roleName"
                        placeholder="Enter role name"
                        value={formData.roleName}
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
                            {loading ? 'Saving...' : role?.id ? 'Update Role' : 'Add Role'}
                        </Button>
                    </div>
                </>
            )}
        </form>
    );
}
