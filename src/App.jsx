import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import UserManagement from './components/UserManagement';
import ProjectManagement from './components/ProjectManagement';
import ProjectDetail from './components/ProjectDetail';
import Login from './components/Login';
import authService from './services/authService';

import PMDashboard from './components/pm/PMDashboard';
import PMLayout from './components/pm/PMLayout';
import PMProcessPage from './components/pm/PMProcessPage';
import { USER_ROLES } from './constants/userConstants';

// Protection Wrapper that wraps content in standard Admin Layout
const AdminRoute = ({ children }) => {
    const user = authService.getCurrentUser();
    if (!user) return <Navigate to="/login" />;

    // Explicitly redirect PMs to their workspace if they try to access Admin routes
    if (user.role === USER_ROLES.MANAGER) {
        return <Navigate to="/pm" />;
    }

    return <Layout>{children}</Layout>;
};

// Protection Wrapper specifically for PMs
const PMRoute = ({ children }) => {
    const user = authService.getCurrentUser();

    if (!user) return <Navigate to="/login" />;
    if (user.role !== USER_ROLES.MANAGER) return <Navigate to="/" />; // Redirect others to default

    return children;
};

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/login" element={<Login />} />

                {/* PM Routes - Common Layout Scheme */}
                <Route path="/pm" element={
                    <PMRoute>
                        <PMLayout />
                    </PMRoute>
                }>
                    <Route index element={<PMDashboard />} />
                    <Route path=":process/*" element={<PMProcessPage />} />
                </Route>

                {/* Admin/Standard Routes */}
                <Route path="/" element={
                    <AdminRoute>
                        <div className="card" style={{ padding: '2rem' }}>
                            <h2>Chào mừng quay trở lại!</h2>
                            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                Đây là bảng điều khiển chính của hệ thống quản lý dự án.
                            </p>
                        </div>
                    </AdminRoute>
                } />

                <Route path="/users" element={
                    <AdminRoute>
                        <UserManagement />
                    </AdminRoute>
                } />

                <Route path="/projects" element={
                    <AdminRoute>
                        <ProjectManagement />
                    </AdminRoute>
                } />

                <Route path="/projects/:id" element={
                    <AdminRoute>
                        <ProjectDetail />
                    </AdminRoute>
                } />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
