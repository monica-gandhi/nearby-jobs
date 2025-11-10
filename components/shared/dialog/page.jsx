'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function CustomDialog({
  open,
  onClose,
  title,
  titleColor = 'text-black',
  backgroundColor = 'bg-white',
  content,
  actions = null,
  maxWidth = 'max-w-lg',
}) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`relative w-full ${maxWidth} mx-4 ${backgroundColor} rounded-lg shadow-lg transform transition-all duration-300 scale-100`}
      >
        {/* Header */}
        {title && (
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
            <h3 className={`text-sm font-semibold ${titleColor}`}>{title}</h3>
            <button
              onClick={onClose}
              className="cursor-pointer text-gray-500 hover:bg-gray-100 rounded-md p-1 transition"
              aria-label="Close dialog"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="px-4 py-5">
          {content}
        </div>

        {/* Actions */}
        {actions && (
          <div className="px-4 py-3 border-t border-gray-200 flex justify-end space-x-2">
            {actions}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
