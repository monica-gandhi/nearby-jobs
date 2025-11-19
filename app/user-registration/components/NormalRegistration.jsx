'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { getDeviceInfo } from '@/common/utils/deviceInfo';
import { showSuccess, showError } from '@/common/toast/toastService';
import { loginSuccess } from '@/common/store/auth/authSlice';

const NormalRegistration = ({ selectedRole, onNext }) => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { selectedRoleId } = useSelector((state) => state.role);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password) {
            showError('Please fill all fields');
            return;
        }

        try {
            setLoading(true);

            // 🔒 Encrypt password (base64 simple)
            const encryptedPassword = btoa(form.password);

            // 🌐 Get device info
            const deviceInfo = await getDeviceInfo();

            // 🧾 Build payload
            const payload = {
                name: form.name,
                email: form.email,
                password: encryptedPassword,
                roleId: selectedRoleId,
                deviceInfo,
            };

            console.log("Normal Registration Payload:", payload);

            // 🚀 Send to backend
            const response = await apiRequest(apiRoutes.jobSeekerNormalSignIn, 'POST', payload);

            if (response.status === 200 || response.data?.status) {
                const token = response.data?.token || response?.data?.token || response?.token;
                if (token) {
                    localStorage.setItem('authToken', token);
                    // keep redux auth slice in sync so apiService can pick it up
                    dispatch(loginSuccess({ token, user: { email: form.email } }));
                }

                // Persist jobseeker id if returned by backend (e.g., "Jobseeker-...")
                const jobseekerId = response?.data?.id || response?.data?.data?.id || response?.id || response?.data?.jobseekerId || null;
                if (jobseekerId) localStorage.setItem('jobseekerId', jobseekerId);
                showSuccess("Registered successfully!");
                onNext();
            } else {
                showError(response.data?.message || "Registration failed!");
            }
        } catch (error) {
            console.error("Normal Registration error:", error);
            showError("Something went wrong, please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <Input
                label={selectedRole === 'employer' ? 'Company Name' : 'Full Name'}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
                label="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button type="submit" fullWidth disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </Button>
        </form>
    );
};

export default NormalRegistration;
