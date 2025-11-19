'use client';

import React, { useEffect, useState } from 'react';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';
import Select from '@/components/shared/select/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { showError, showSuccess } from '@/common/toast/toastService';

export default function JobSeekerForm({ open, onClose, jobSeeker = null, onSaved }) {
    const isEdit = !!jobSeeker;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        jobType: '',
    });

    const [jobTypes, setJobTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [viewLoading, setViewLoading] = useState(false);

    // Fetch Job Types for dropdown
    const fetchJobTypes = async () => {
        try {
            const res = await apiRequest(apiRoutes.getJobType, 'POST');
            if (res?.response) {
                setJobTypes(res.data.docs || []);
            }
        } catch (err) {
            console.error(err);
            showError("Failed to load job types");
        }
    };

    // Load jobseeker details when editing
    const fetchJobSeekerDetails = async (id) => {
        setViewLoading(true);
        try {
            const res = await apiRequest(apiRoutes.viewJobSeeker, 'POST', { id });

            if (res?.response && res.data) {
                const d = res.data;
                setFormData({
                    name: d.name || '',
                    email: d.email || '',
                    mobile: d.mobile || '',
                    jobType: d.jobType || '',
                });
            } else {
                showError(res?.message || 'Failed to fetch details');
            }
        } catch (err) {
            console.error(err);
            showError("Something went wrong while fetching details");
        } finally {
            setViewLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchJobTypes();

        if (jobSeeker?.id) {
            fetchJobSeekerDetails(jobSeeker.id);
        } else {
            setFormData({
                name: '',
                email: '',
                mobile: '',
                jobType: '',
                status: 'active',
            });
        }
    }, [jobSeeker]);

    // Input Change Handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) return showError("Enter name");
        if (!formData.email.trim()) return showError("Enter email");
        if (!formData.mobile.trim()) return showError("Enter mobile");
        if (!formData.jobType) return showError("Select job type");

        setLoading(true);

        try {
            let res;

            if (isEdit) {
                res = await apiRequest(apiRoutes.updateJobSeeker, 'POST', {
                    ...formData,
                    id: jobSeeker.id,
                });
            } else {
                res = await apiRequest(apiRoutes.addJobSeeker, 'POST', formData);
            }

            if (res?.response) {
                showSuccess(res.message || (isEdit ? "Updated successfully" : "Added successfully"));
                onSaved?.();
                onClose?.();
            } else {
                showError(res?.message || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            showError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            {viewLoading ? (
                <p className="text-gray-500 text-sm">Loading details...</p>
            ) : (
                <>
                    <Input
                        label="Name"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Mobile"
                        name="mobile"
                        placeholder="Enter mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />

                    <Select
                        label="Job Type"
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        required
                        options={[
                            { label: "Select Job Type", value: "" },
                            ...jobTypes.map((jt) => ({
                                label: jt.name,
                                value: jt.id
                            }))
                        ]}
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>

                        <Button variant="default" loading={loading}>
                            {loading ? "Saving..." : isEdit ? "Update" : "Add"}
                        </Button>
                    </div>
                </>
            )}
        </form>
    );
}
