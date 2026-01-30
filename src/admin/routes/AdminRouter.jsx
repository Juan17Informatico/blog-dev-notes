import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { AdminDashboard } from "../pages/AdminDashboard";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { AdminLayout } from "../components/AdminLayout";
import { PostsPage } from "../pages/PostsPage";
import { PostEditor } from "../pages/PostEditor";
import { CategoriesPage } from "../pages/CategoriesPage";
import { CategoryEditor } from "../pages/CategoryEditor";

export const AdminRouter = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />

            <Route
                path="/*"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<AdminDashboard />} />
                <Route path="posts" element={<PostsPage />} />
                <Route path="posts/new" element={<PostEditor />} />
                <Route path="posts/:slug/edit" element={<PostEditor />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="categories/new" element={<CategoryEditor />} />
                <Route path="categories/:id/edit" element={<CategoryEditor />} />
            </Route>

            <Route path="*" element={<Navigate to="login" />} />
        </Routes>
    );
};
