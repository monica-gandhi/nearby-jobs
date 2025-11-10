import { getFirebaseToken } from "@/common/config/firebase.config";
export const getDeviceInfo = async (firebaseToken = "") => {
  if (typeof window === "undefined") return {};

  // Try getting FCM token dynamically
  let fcmToken = firebaseToken;
  if (!fcmToken) {
    try {
      fcmToken = await getFirebaseToken();
    } catch (error) {
      console.warn("Unable to fetch FCM token:", error);
      fcmToken = "";
    }
  }

  return {
    deviceName: "web",
    deviceId: navigator.userAgent || "unknown",
    deviceModel: navigator.platform || "unknown",
    deviceBrand: navigator.vendor || "unknown",
    os: navigator.platform || "unknown",
    osVersion: navigator.appVersion || "unknown",
    locale: navigator.language || "en",
    fcmToken: fcmToken || "",
    // verifyId: firebaseToken || "",
  };
};

