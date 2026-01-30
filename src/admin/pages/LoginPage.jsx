import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login as loginService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { getEnvVariables } from '../../helpers/getEnvVariables';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { loading, error, clearError } = useAuthStore();

    const { VITE_ADMIN_PATH } = getEnvVariables();
    const adminBase = `/${VITE_ADMIN_PATH}`;
    const from = location.state?.from?.pathname || adminBase;

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();
        try {
            await loginService(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            // authService already sets error in store
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded shadow">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Admin Login</h2>
                {error && <div className="mb-3 text-red-600">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">Email</label>
                    <input
                        className="w-full mb-3 p-2 border rounded bg-gray-50 dark:bg-gray-900"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                    />

                    <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">Password</label>
                    <input
                        className="w-full mb-4 p-2 border rounded bg-gray-50 dark:bg-gray-900"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
