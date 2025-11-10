// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js');

// Initialize Firebase inside the service worker
firebase.initializeApp({
    apiKey: "AIzaSyCSZ8-6CKyG4arM3Zv0ni5REqISMCUMyMQ",
    authDomain: "jobeasy-5394d.firebaseapp.com",
    projectId: "jobeasy-5394d",
    storageBucket: "jobeasy-5394d.firebasestorage.app",
    messagingSenderId: "772062011602",
    appId: "1:772062011602:web:e8e78add3b448ae8478d0b",
    measurementId: "G-HD8RBRKEM8"
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Optional: handle background messages
messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message:', payload);
    const notificationTitle = payload.notification?.title || 'New Notification';
    const notificationOptions = {
        body: payload.notification?.body || 'You have a new message.',
        icon: '/firebase-logo.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
