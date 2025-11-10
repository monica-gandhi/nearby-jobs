'use client';
import React from 'react';

const NotificationPrompt = ({ open, onAllow }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-[90%] max-w-md text-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          Enable Notifications
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Allow notifications to get the latest job updates and alerts directly in your browser.
        </p>
        <button
          onClick={onAllow}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Allow
        </button>
      </div>
    </div>
  );
};

export default NotificationPrompt;
