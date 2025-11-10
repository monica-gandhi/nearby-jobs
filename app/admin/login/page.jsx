'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { loginSuccess } from '@/common/store/auth/authSlice';
import { showError, showSuccess } from '@/common/toast/toastService';
import { getRoleFromId } from '@/common/utils/util';

export default function Admin_Login() {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    const handleChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const clearForm = () => {
        setFormData({ userName: '', password: '' });
        setFormSubmitted(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        const payload = {
            userName: formData.userName.trim(),
            password: formData.password.trim(),
        };

        if (!payload.userName || !payload.password) return;

        try {
            setLoading(true);
            const res = await apiRequest(apiRoutes.adminLogin, 'POST', payload);

            if (res?.data?.token) {
                const user = { userName: res.data.userName, id: res.data.id };
                const roleId = getRoleFromId(res.data.id);

                dispatch(
                    loginSuccess({
                        token: res.data.token,
                        user,
                        roleId,
                        userProfileData: res.data.userProfileData || null,
                    })
                );

                showSuccess(res.message || 'Login successful');

                // Clear the form instantly
                clearForm();

                // Redirect to dashboard fast
                setTimeout(() => {
                    router.push('/admin/dashboard');
                }, 500);
            } else {
                showError(res?.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            showError('An error occurred during login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-3 sm:px-6 py-12">
            <section className="w-full max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row">
                {/* Left Image Section */}
                <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 items-center justify-center relative">
                    <img
                        src="/assets/images/no_image.png"
                        alt="Admin Login"
                        className="w-full h-full object-cover opacity-70 absolute inset-0"
                    />
                    <div className="z-10 text-center text-white px-6">
                        <h2 className="text-4xl font-bold mb-3">Welcome Back, Admin</h2>
                        <p className="text-sm opacity-80 max-w-sm mx-auto">
                            Manage jobs, users, and analytics securely from your dashboard.
                        </p>
                    </div>
                </div>

                {/* Right Form Section */}
                <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        Admin Login
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Username"
                            value={formData.userName}
                            onChange={(e) => handleChange('userName', e.target.value)}
                            placeholder="Enter your admin username"
                            error={
                                formSubmitted && !formData.userName
                                    ? 'Username is required'
                                    : ''
                            }
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            placeholder="Enter your password"
                            error={
                                formSubmitted && !formData.password
                                    ? 'Password is required'
                                    : ''
                            }
                        />

                        {/* <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center gap-2 text-gray-600">
                                <input type="checkbox" className="accent-indigo-600" /> Remember me
                            </label>
                            <button
                                type="button"
                                onClick={() => router.push('/admin/forgot-password')}
                                className="text-indigo-600 hover:underline font-medium"
                            >
                                Forgot Password?
                            </button>
                        </div> */}

                        <Button
                            type="submit"
                            variant="default"
                            fullWidth
                            loading={loading}
                            disabled={loading}
                            className="py-3 text-base font-medium"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>

                    <p className="text-center text-xs text-gray-400 mt-8">
                        © {new Date().getFullYear()} JobEasy Admin Panel. All rights reserved.
                    </p>
                </div>
            </section>
        </main>
    );
}

