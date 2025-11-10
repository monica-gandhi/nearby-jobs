'use client';
import React, { useState, useEffect, useRef } from 'react';
import Table from '@/components/shared/table/page';
import CustomDialog from '@/components/shared/dialog/page';
import CountriesFormDialog from './form/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { showError, showSuccess } from '@/common/toast/toastService';
import { motion } from 'framer-motion';

export default function CountriesPage() {
    const hasFetchedRef = useRef(false);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCountryId, setSelectedCountryId] = useState(null);

    // Fetch countries
    const fetchCountries = async () => {
        try {
            const response = await apiRequest(apiRoutes.getCountry, 'POST');
            if (response?.response && response.data?.docs) {
                setCountries(response.data.docs);
            }
        } catch (error) {
            console.error('Error fetching coutries:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hasFetchedRef.current) {
            fetchCountries();
            hasFetchedRef.current = true;
        }
    }, []);

    // Table headers
    const headers = [
        { key: 'id', label: 'S.No', type: 'text', sortable: true },
        { key: 'name', label: 'Country Name', type: 'text', sortable: true },
        { key: 'code', label: 'Country Code', type: 'text', sortable: false },
        { key: 'status', label: 'Status', type: 'status', sortable: true },
        { key: 'action', label: 'Action', type: 'action' },
    ];

    // Transform data for table
    const tableData = countries.map((country, index) => ({
        id: index + 1,
        name: country.name,
        code: country.code,
        status: country.status,
        action: country.id,
    }));

    // Handlers
    const handleAdd = () => {
        setSelectedCountry(null);
        setFormDialogOpen(true);
    };

    const handleEdit = (id) => {
        const country = countries.find((t) => t.id === id);
        setSelectedCountry(country);
        setFormDialogOpen(true);
    };

    const handleDeleteClick = (id) => {
        setSelectedCountryId(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const res = await apiRequest(apiRoutes.deleteCountry, 'POST', { id: selectedCountryId });
            setCountries((prev) => prev.filter((country) => country.id !== selectedCountryId));
            setDeleteDialogOpen(false);
            showSuccess(res?.message || 'Country deleted successfully!');
        } catch (error) {
            console.error('Error deleting country:', error);
            showError(error?.message || 'Failed to delete country.');
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
                    title="Country List"
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
                title={selectedCountry ? 'Edit Country' : 'Add Country'}
                content={
                    <CountriesFormDialog
                        open={formDialogOpen}
                        onClose={() => setFormDialogOpen(false)}
                        country={selectedCountry}
                        onSaved={fetchCountries}
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
                        Are you sure you want to delete this country? This action cannot be undone.
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
