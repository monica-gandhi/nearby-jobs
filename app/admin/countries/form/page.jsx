'use client';

import React, { useEffect, useState } from 'react';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { showError, showSuccess } from '@/common/toast/toastService';

export default function CountriesFormDialog({ open, onClose, country = null, onSaved }) {
    const isEdit = !!country;
    const [formData, setFormData] = useState({ name: '', code: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [viewLoading, setViewLoading] = useState(false);

    const fetchCountryDetails = async (id) => {
        setViewLoading(true);
        try {
            const res = await apiRequest(apiRoutes.viewCountry, 'POST', { id });
            if (res?.response && res.data) {
                setFormData({ name: res.data.name || '', code: res.data.code || '' });
            } else {
                showError(res?.message || 'Failed to fetch country details');
            }
        } catch (err) {
            console.error('Error fetching country details:', err);
            showError('Something went wrong while fetching country details');
        } finally {
            setViewLoading(false);
        }
    };

    useEffect(() => {
        if (country?.id) {
            fetchCountryDetails(country.id);
        } else {
            setFormData({ name: '', code: '' });
        }
    }, [country]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (!formData.name.trim()) {
            showError('Please enter country');
            return;
        }

         if (!formData.code.trim()) {
            showError('Please enter code');
            return;
        }


        setLoading(true);
        try {
            const payload = { name: formData.name, code: formData.code };
            let res;

            if (isEdit) {
                res = await apiRequest(apiRoutes.updateCountry, 'POST', { ...payload, id: country.id });
            } else {
                res = await apiRequest(apiRoutes.addCountry, 'POST', payload);
            }

            if (res?.response) {
                showSuccess(res.message || (isEdit ? 'Country updated' : 'Country added'));
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
                <p className="text-gray-500 text-sm">Loading country details...</p>
            ) : (
                <>
                    <Input
                        label="Country"
                        name="name"
                        placeholder="Enter country"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Country Code"
                        name="code"
                        placeholder="Enter country code"
                        value={formData.code}
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
                            {loading ? 'Saving...' : country?.id ? 'Update' : 'Add'}
                        </Button>
                    </div>
                </>
            )}
        </form>
    );
}
