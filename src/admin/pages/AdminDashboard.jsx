import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { logout as logoutService } from '../../services/authService';

export const AdminDashboard = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutService();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Admin Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-700 dark:text-gray-200">{user?.email}</div>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1 bg-red-600 text-white rounded"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <section className="bg-white dark:bg-gray-800 p-6 rounded shadow">
                    <p className="text-gray-700 dark:text-gray-200">Welcome to the admin area. Use the sidebar to manage posts and categories.</p>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
