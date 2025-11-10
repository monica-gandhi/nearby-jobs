'use client';
import React, { useState, useEffect, useRef } from 'react';
import Table from '@/components/shared/table/page';
import CustomDialog from '@/components/shared/dialog/page';
// import Preloader from '@/components/ui/Preloader';
import RoleFormDialog from './form/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { showError, showSuccess } from '@/common/toast/toastService';
import { motion } from 'framer-motion';

export default function RolesPage() {
    const hasFetchedRef = useRef(false);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedRoleId, setSelectedRoleId] = useState(null);

    // Fetch roles
    const fetchRoles = async () => {
        try {
            const response = await apiRequest(apiRoutes.getRoles, 'POST');
            if (response?.response && response.data?.docs) {
                setRoles(response.data.docs);
            }
        } catch (error) {
            console.error('Error fetching roles:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hasFetchedRef.current) {
            fetchRoles();
            hasFetchedRef.current = true;
        }
    }, []);

    // Table header structure
    const headers = [
        { key: 'id', label: 'S.No', type: 'text', sortable: true },
        { key: 'roleName', label: 'Name', type: 'text', sortable: true },
        { key: 'status', label: 'Status', type: 'status', sortable: true },
        { key: 'action', label: 'Action', type: 'action' },
    ];

    // Transform data for the table
    const tableData = roles.map((role, index) => ({
        id: index + 1,
        roleName: role.roleName,
        status: role.status,
        action: role.id,
    }));

    // Handlers
    const handleAdd = () => {
        setSelectedRole(null);
        setFormDialogOpen(true);
    };

    const handleEdit = (id) => {
        const role = roles.find((r) => r.id === id);
        setSelectedRole(role);
        setFormDialogOpen(true);
    };

    const handleDeleteClick = (id) => {
        setSelectedRoleId(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const res = await apiRequest(apiRoutes.deleteRole, 'POST', { id: selectedRoleId });
            setRoles((prev) => prev.filter((role) => role.id !== selectedRoleId));
            setDeleteDialogOpen(false);
            showSuccess(res?.message || 'Role deleted successfully!');
        } catch (error) {
            console.error('Error deleting role:', error);
            showError(error?.message || 'Failed to delete role.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Table */}
                <Table
                    title="Role List"
                    headers={headers}
                    data={tableData}
                    itemsPerPage={5}
                    onAdd={handleAdd}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                />
            </motion.div>


            {/* Add / Edit Form Dialog */}
            <CustomDialog
                open={formDialogOpen}
                onClose={() => setFormDialogOpen(false)}
                title={selectedRole ? 'Edit Role' : 'Add Role'}
                content={
                    <RoleFormDialog
                        open={formDialogOpen}
                        onClose={() => setFormDialogOpen(false)}
                        role={selectedRole}
                        onSaved={fetchRoles}
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
                        Are you sure you want to delete this role? This action cannot be undone.
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
