'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';

export default function ToastContainer() {
    const { toasts } = useShop();

    return (
        <div id="toast-container" className="toast-container">
            {toasts.map(toast => (
                <div key={toast.id} className="toast show">
                    <svg className="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>{toast.message}</span>
                </div>
            ))}
        </div>
    );
}
