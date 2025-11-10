// 'use client';
// import React, { useState } from 'react';
// import Input from '@/components/shared/input/page';
// import Button from '@/components/shared/button/page';
// import toast from 'react-hot-toast';

// const NormalRegistration = ({ selectedRole, onNext }) => {
//     const [form, setForm] = useState({ name: '', email: '', password: '' });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!form.email || !form.password || !form.email)
//             return toast.error('Please fill all fields');
//         console.log('form', form);
//         toast.success('Registered successfully!');
//         onNext();
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4 mt-6">
//             <Input label={selectedRole === 'employer' ? 'Company Name' : 'Full Name'} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
//             <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
//             <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
//             <Button type="submit" fullWidth>Register</Button>
//         </form>
//     );
// };

// export default NormalRegistration;

'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Input from '@/components/shared/input/page';
import Button from '@/components/shared/button/page';
import { apiRequest } from '@/common/api/apiService';
import apiRoutes from '@/common/constants/apiRoutes';
import { getDeviceInfo } from '@/common/utils/deviceInfo';
import { showSuccess, showError } from '@/common/toast/toastService';

const NormalRegistration = ({ selectedRole, onNext }) => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { selectedRoleId } = useSelector((state) => state.role);

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
