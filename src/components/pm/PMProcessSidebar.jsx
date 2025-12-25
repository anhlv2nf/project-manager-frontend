import React from 'react';
import { NavLink } from 'react-router-dom';
import { PMP_SIDEBAR_MENU } from '../../constants/pmConstants';

const PMProcessSidebar = ({ activeProcess }) => {
    const menuItems = PMP_SIDEBAR_MENU[activeProcess] || [];

    return (
        <div style={{
            width: '240px',
            background: '#1e293b',
            color: 'white',
            height: 'calc(100vh - 60px)',
            position: 'fixed',
            top: '60px',
            left: 0,
            overflowY: 'auto'
        }}>
            <div style={{ padding: '1.5rem' }}>
                <div style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    color: '#94a3b8',
                    letterSpacing: '0.05em',
                    fontWeight: 600,
                    marginBottom: '1rem'
                }}>
                    Process Tools
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={`/pm/${activeProcess}/${item.path}`}
                            className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}
                            style={{ padding: '0.75rem 1rem', borderRadius: '6px' }}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                    {menuItems.length === 0 && (
                        <div style={{ color: '#64748b', fontSize: '0.85rem', fontStyle: 'italic' }}>
                            Chưa có công cụ cho quy trình này.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PMProcessSidebar;
