import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { logout as logoutService } from '../../services/authService';

export const AdminLayout = () => {
    const { user } = useAuthStore();

    const handleLogout = () => {
        logoutService();
        window.location.href = `/${process.env.VITE_ADMIN_PATH || 'admin'}/login`;
    };

    return (
        <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
            <aside className="w-64 bg-white dark:bg-gray-800 p-4 border-r">
                <div className="mb-6">
                    <div className="text-lg font-bold text-gray-800 dark:text-gray-100">Admin</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{user?.email}</div>
                </div>

                <nav className="space-y-2">
                    <Link to="/admin" className="block px-2 py-1 text-gray-700 dark:text-gray-200">Overview</Link>
                    <Link to="/admin/posts" className="block px-2 py-1 text-gray-700 dark:text-gray-200">Posts</Link>
                    <Link to="/admin/categories" className="block px-2 py-1 text-gray-700 dark:text-gray-200">Categories</Link>
                </nav>

                <div className="mt-6">
                    <button onClick={handleLogout} className="w-full px-2 py-1 bg-red-600 text-white rounded">Logout</button>
                </div>
            </aside>

            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
