import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import ChangePassword from './ChangePassword';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();
    const [showChangePwd, setShowChangePwd] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            setIsLoggingOut(true);
            try {
                // Short delay to let user see the feedback even if API is instant
                await new Promise(resolve => setTimeout(resolve, 500));
                await authService.logout();
                navigate('/login');
            } catch (error) {
                console.error('Logout error:', error);
                localStorage.clear();
                navigate('/login');
            } finally {
                // Don't set isLoggingOut false as we are navigating
            }
        }
    };

    const getInitials = (name) => {
        return name?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'US';
    };

    return (
        <div className="admin-layout">
            {isLoggingOut && (
                <div className="logout-overlay">
                    <div className="spinner"></div>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>Đang đăng xuất...</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '4px' }}>Hẹn gặp lại bạn!</div>
                </div>
            )}
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-brand">
                    Project Manager
                </div>
                <nav className="sidebar-menu">
                    <NavLink to="/" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/users" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                        Người dùng
                    </NavLink>
                    <div className="menu-item" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                        Dự án (Sắp tới)
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="main-wrapper">
                <header className="app-header">
                    <div className="header-search">
                        {/* Placeholder search if needed */}
                    </div>
                    <div className="user-profile">
                        <div style={{ textAlign: 'right', marginRight: '1rem' }}>
                            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{user?.name || 'User'}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.role}</div>
                        </div>
                        <div className="avatar-wrapper" style={{ position: 'relative', cursor: 'pointer' }}>
                            <div className="avatar" id="userMenuBtn">{getInitials(user?.name)}</div>
                            <div className="user-dropdown">
                                <div className="user-dropdown-content">
                                    <div onClick={() => setShowChangePwd(true)}>Đổi mật khẩu</div>
                                    <div onClick={handleLogout} style={{ color: 'var(--danger)' }}>Đăng xuất</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="content-body">
                    {children}
                </main>
            </div>

            <ChangePassword
                show={showChangePwd}
                onClose={() => setShowChangePwd(false)}
            />
        </div>
    );
};

export default Layout;
