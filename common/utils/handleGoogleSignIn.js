// // src/utils/handleGoogleSignIn.js
// import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "@/common/config/firebase.config";
// import { apiRequest } from "@/common/api/apiService";
// import apiRoutes from "@/common/constants/apiRoutes";
// import { getDeviceInfo } from "@/common/utils/deviceInfo";

// export const handleGoogleSignIn = async (roleId) => {
//     try {
//         // Step 1: Google sign-in popup
//         const result = await signInWithPopup(auth, provider);
//         const user = result.user;

//         const token = await user.getIdToken(); // Firebase token
//         const uid = user.uid; // localId
//         const name = user.displayName;
//         const email = user.email;

//         // Step 2: Get device info
//         const deviceInfo = await getDeviceInfo(token);

//         // Step 3: Prepare payload
//         const payload = {
//             uid,
//             name,
//             email,
//             roleId,
//             deviceInfo,
//         };

//         console.log("Google Registration Payload:", payload);

//         // Step 4: Call backend API
//         const response = await apiRequest.post(apiRoutes.jobSeekerGoogleSignIn, payload);

//         return response.data;
//     } catch (error) {
//         console.error("Google sign-in failed:", error);
//         throw error;
//     }
// };
// src/utils/handleGoogleSignIn.js
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/common/config/firebase.config";
import { apiRequest } from "@/common/api/apiService";
import apiRoutes from "@/common/constants/apiRoutes";
import { getDeviceInfo } from "@/common/utils/deviceInfo";

export const handleGoogleSignIn = async (roleId, roleName = "") => {
    try {
        // Step 1: Google Sign-In
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const firebaseToken = await user.getIdToken();

        // Step 2: Device Info
        const deviceInfo = await getDeviceInfo(firebaseToken);

        // Step 3: Payload
        const payload = {
            uid: user.uid,
            username: user.email || user.displayName,
            name: user.displayName,
            email: user.email,
            roleId,
            roleName,
            deviceInfo,
            logout: false,
        };

        console.log("Google Registration Payload:", payload);

        // Step 4: Select correct API endpoint
        const endpoint =
            roleName.toLowerCase().includes("job") || roleName === "jobseeker"
                ? apiRoutes.jobSeekerLogin
                : apiRoutes.employerLogin;

        // Step 5: Correct apiRequest usage
        const response = await apiRequest(
            endpoint,
            "POST",
            payload,
            null // no extra headers
        );

        return response;
    } catch (error) {
        console.error("Google sign-in failed:", error);
        throw error;
    }
};

