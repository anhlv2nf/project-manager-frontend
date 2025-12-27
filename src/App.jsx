import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import UserManagement from './components/UserManagement';
import ProjectManagement from './components/ProjectManagement';
import ProjectDetail from './components/ProjectDetail';
import Login from './components/Login';
import authService from './services/authService';
import VyzorLayout from './components/vyzor/VyzorLayout';
import PMDashboard from './components/pm/PMDashboard';
import PMProcessPage from './components/pm/PMProcessPage';
import AdminDashboard from './components/AdminDashboard';
import { USER_ROLES } from './constants/userConstants';

// Protection Wrapper specifically for Admin
const AdminRoute = () => {
    const user = authService.getCurrentUser();
    if (!user) return <Navigate to="/login" />;

    // Explicitly redirect PMs to their workspace if they try to access Admin routes
    if (user.role === USER_ROLES.MANAGER) {
        return <Navigate to="/pm" />;
    }

    return <Outlet />;
};

// Protection Wrapper specifically for PMs
const PMRoute = () => {
    const user = authService.getCurrentUser();

    if (!user) return <Navigate to="/login" />;
    if (user.role !== USER_ROLES.MANAGER) return <Navigate to="/" />;

    return <Outlet />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/login" element={<Login />} />

                {/* All authenticated routes use VyzorLayout as the main layout structure */}
                <Route element={<VyzorLayout />}>

                    {/* PM Routes */}
                    <Route path="/pm" element={<PMRoute />}>
                        <Route index element={<PMDashboard />} />
                        <Route path=":process/*" element={<PMProcessPage />} />
                    </Route>

                    {/* Admin/Standard Routes */}
                    <Route path="/" element={<AdminRoute />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="users" element={<UserManagement />} />
                        <Route path="projects" element={<ProjectManagement />} />
                        <Route path="projects/:id" element={<ProjectDetail />} />
                    </Route>
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
