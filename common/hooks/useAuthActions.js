'use client';
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { apiRequest } from "@/common/api/apiService";
import apiRoutes from "@/common/constants/apiRoutes";
import { getDeviceInfo } from "@/common/utils/deviceInfo";
import { handleGoogleSignIn } from "../utils/handleGoogleSignIn";
import { showError } from "../toast/toastService";
import { loginSuccess, logout } from "../store/auth/authSlice";
export const useAuthActions = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { selectedRoleId, roles } = useSelector((s) => s.role || {});
    const { user } = useSelector((state) => state.auth);

    const getSelectedRole = () => {
        if (!roles || !selectedRoleId) return null;
        return roles.find((r) => r.id === selectedRoleId) || null;
    };

    const normalLogin = async ({ username, password }) => {
        if (!selectedRoleId) {
            showError("Please select a role first");
            return null;
        }

        const role = getSelectedRole();
        const deviceInfo = await getDeviceInfo();

        const payload = {
            username,
            password: btoa(password),
            deviceInfo,
            logout: false,
        };

        const endpoint =
            (role?.roleName || "").toLowerCase().includes("job")
                ? apiRoutes.jobSeekerLogin
                : apiRoutes.employerLogin;

        try {
            const response = await apiRequest(endpoint, "POST", payload);
            return response.data;
        } catch (err) {
            showError(err?.message || "Login failed");
            return null;
        }
    };


    const socialLogin = async () => {
        if (!selectedRoleId) {
            showError("Please select a role first");
            return null; // stop function safely
        }

        const role = getSelectedRole();

        try {
            return await handleGoogleSignIn(selectedRoleId, role?.roleName);
        } catch (err) {
            showError(err?.message || "Something went wrong");
            return null;
        }
    };


    const handlePostLogin = (data) => {
        const token = data?.token || data?.data?.token;
        const fullUser = data?.data || data;           // ⭐ FULL BACKEND RESPONSE
        const userRoleId = fullUser?.roleId;

        // ⭐ SAVE INTO REDUX
        dispatch(
            loginSuccess({
                token,
                user: fullUser
            })
        );

        // Save into localStorage (your existing logic)
        if (token) localStorage.setItem("authToken", token);
        if (userRoleId) localStorage.setItem("roleId", userRoleId);

        // Role redirect (your same logic)
        const matchedRole = roles?.find((r) => r.id === userRoleId);
        const roleName = matchedRole?.roleName?.toLowerCase() || "";

        let redirectUrl = "/";

        if (roleName === "jobseeker") {
            redirectUrl = "/jobseeker/dashboard";
        }
        else if (roleName === "employer") {
            redirectUrl = "/employer/dashboard";
        }
        else if (roleName === "admin") {
            redirectUrl = "/admin-dashboard";
        }

        router.push(redirectUrl);
    };

    const logoutUser = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const roleId = localStorage.getItem("roleId");

            if (!token || !roleId) {
                localStorage.clear();
                dispatch(logout());
                router.push("/");
                return;
            }

            // Get user from redux
            const userId = user?.id; // Example: Jobseeker-12345

            // Pick role
            const matchedRole = roles?.find((r) => r.id === roleId);
            const roleName = matchedRole?.roleName?.toLowerCase();

            // Choose API
            let endpoint = null;
            if (roleName === "jobseeker") endpoint = apiRoutes.jobSeekerLogout;
            else if (roleName === "employer") endpoint = apiRoutes.employerLogout;
            else if (roleName === "admin") endpoint = apiRoutes.adminLogout;

            // Payload
            const payload = { id: userId };

            // Hit logout API with bearer
            if (endpoint) {
                await apiRequest(endpoint, "POST", payload, {
                    Authorization: `Bearer ${token}`,
                });
            }

            // Clear all
            localStorage.removeItem("authToken");
            localStorage.removeItem("roleId");
            dispatch(logout());

            router.push("/");
        } catch (err) {
            console.error("Logout error:", err);
            router.push("/");
        }
    };



    return {
        normalLogin,
        socialLogin,
        handlePostLogin,
        logoutUser
    };
};
