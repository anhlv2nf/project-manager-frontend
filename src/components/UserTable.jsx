import React from 'react';
import BaseBadge from './common/BaseBadge';
import { USER_ROLES, USER_STATUS, ROLE_LABELS } from '../constants/userConstants';

const UserTable = ({ users, onEdit, onDelete }) => {
    return (
        <div style={{ overflowX: 'auto' }}>
            <table>
                <thead>
                    <tr>
                        <th>Họ và tên</th>
                        <th>Thông tin liên hệ</th>
                        <th>Vai trò</th>
                        <th>Trạng thái</th>
                        <th style={{ textAlign: 'right' }}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="fade-in">
                            <td style={{ padding: '1.25rem 1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div
                                        className="avatar"
                                        style={{
                                            width: '36px',
                                            height: '36px',
                                            fontSize: '14px',
                                            background: `hsl(${(user.id * 137.5) % 360}, 65%, 60%)`
                                        }}
                                    >
                                        {user.name?.[0]?.toUpperCase()}
                                    </div>
                                    <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem' }}>{user.name}</div>
                                </div>
                            </td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10Z" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                    <div style={{ fontWeight: 500, fontSize: '0.85rem' }}>{user.email}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.phone_number || 'N/A'}</div>
                                </div>
                            </td>
                            <td>
                                <BaseBadge
                                    type={user.role === USER_ROLES.ADMIN ? 'danger' : user.role === USER_ROLES.MANAGER ? 'warning' : 'primary'}
                                    style={{ borderRadius: '6px', fontSize: '0.75rem' }}
                                >
                                    {ROLE_LABELS[user.role] || user.role}
                                </BaseBadge>
                            </td>
                            <td>
                                <BaseBadge
                                    type={user.status === USER_STATUS.ACTIVE ? 'success' : 'danger'}
                                    style={{
                                        gap: '6px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        borderRadius: '20px',
                                        padding: '0.25rem 0.75rem'
                                    }}
                                >
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span>
                                    {user.status === USER_STATUS.ACTIVE ? 'Hoạt động' : 'Bị khóa'}
                                </BaseBadge>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                    <button
                                        className="btn-icon"
                                        title="Sửa"
                                        onClick={() => onEdit(user)}
                                        style={{ color: '#0ea5e9', background: '#f0f9ff' }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                                    </button>
                                    <button
                                        className="btn-icon"
                                        title="Xóa"
                                        onClick={() => onDelete(user.id)}
                                        style={{ color: 'var(--danger)', background: '#fef2f2' }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
