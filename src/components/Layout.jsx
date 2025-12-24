import React, { useState } from 'react';

const Layout = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-brand">
                    Project Manager
                </div>
                <nav className="sidebar-menu">
                    <div className="menu-item active">
                        Dashboard
                    </div>
                    <div className="menu-item">
                        Người dùng
                    </div>
                    <div className="menu-item">
                        Dự án
                    </div>
                    <div className="menu-item">
                        Cài đặt
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="main-wrapper">
                <header className="app-header">
                    <div className="header-search">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="user-profile">
                        <div className="avatar">AD</div>
                        <div style={{ fontSize: '12px' }}>
                            <div style={{ fontWeight: 600 }}>Admin</div>
                        </div>
                    </div>
                </header>

                <main className="content-body">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
