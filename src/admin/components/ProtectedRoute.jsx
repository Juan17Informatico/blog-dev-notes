import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { verifyToken } from '../../services/authService';
import { getEnvVariables } from '../../helpers/getEnvVariables';

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, setLoading } = useAuthStore();
    const [checking, setChecking] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const check = async () => {
            // If already authenticated, skip
            if (isAuthenticated) return;

            setChecking(true);
            setLoading(true);
            try {
                const ok = await verifyToken();
                if (!ok) {
                    // will redirect below
                }
            } finally {
                setLoading(false);
                setChecking(false);
            }
        };

        check();
    }, []);

    if (checking) return null;

    if (!isAuthenticated) {
        const { VITE_ADMIN_PATH } = getEnvVariables();
        const loginPath = `/${VITE_ADMIN_PATH}/login`;
        return <Navigate to={loginPath} state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
