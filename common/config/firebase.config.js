// utils/firebaseUtils.js
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCSZ8-6CKyG4arM3Zv0ni5REqISMCUMyMQ",
    authDomain: "jobeasy-5394d.firebaseapp.com",
    projectId: "jobeasy-5394d",
    storageBucket: "jobeasy-5394d.firebasestorage.app",
    messagingSenderId: "772062011602",
    appId: "1:772062011602:web:e8e78add3b448ae8478d0b",
    measurementId: "G-HD8RBRKEM8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export const getFirebaseToken = async () => {
    if (typeof window === "undefined") return null;

    if (!("Notification" in window)) {
        console.warn("Notifications are not supported by this browser.");
        return null;
    }

    // If permission is blocked, show alert
    if (Notification.permission === "denied") {
        // alert(
        //     "You've blocked notifications. Please enable them manually in your browser settings to receive updates."
        // );
        console.warn("Notifications are blocked.");
        return null;
    }

    // Ask for permission if not already granted
    if (Notification.permission !== "granted") {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            // alert("Please allow notifications to receive important updates.");
            console.warn("User denied notification permission.");
            return null;
        }
    }

    try {
        const messaging = getMessaging(app);
        const vapidKey =
            "BFu4ctR1xo0ojiXid4FipsEWi9jyYwA43IMHWEeVJta8BQ_LcYdX4MWhGZuFBn9SVwcUnDMWUy_fv1xKDiJD8gE"; // 🔑 your VAPID key

        const token = await getToken(messaging, { vapidKey });
        console.log("FCM Token generated:", token);
        return token;
    } catch (error) {
        console.error("❌ Error getting FCM token:", error);
        return null;
    }
};

provider.setCustomParameters({
    prompt: "select_account"
});

export { auth, provider };