import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import UserManagement from './components/UserManagement';
import Login from './components/Login';
import authService from './services/authService';

// Protection Wrapper
const PrivateRoute = ({ children }) => {
    const user = authService.getCurrentUser();
    return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/login" element={<Login />} />

                {/* Private Routes */}
                <Route path="/" element={
                    <PrivateRoute>
                        <div className="card" style={{ padding: '2rem' }}>
                            <h2>Chào mừng quay trở lại!</h2>
                            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                Đây là bảng điều khiển chính của hệ thống quản lý dự án.
                            </p>
                        </div>
                    </PrivateRoute>
                } />

                <Route path="/users" element={
                    <PrivateRoute>
                        <UserManagement />
                    </PrivateRoute>
                } />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
