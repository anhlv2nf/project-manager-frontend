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
                        <tr key={user.id}>
                            <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{user.name}</td>
                            <td>
                                <div style={{ fontWeight: 500 }}>{user.email}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{user.phone_number || 'N/A'}</div>
                            </td>
                            <td>
                                <BaseBadge type={user.role === USER_ROLES.ADMIN ? 'danger' : user.role === USER_ROLES.MANAGER ? 'warning' : 'primary'}>
                                    {ROLE_LABELS[user.role] || user.role}
                                </BaseBadge>
                            </td>
                            <td>
                                <BaseBadge
                                    type={user.status === USER_STATUS.ACTIVE ? 'success' : 'danger'}
                                    style={{ gap: '6px', display: 'inline-flex', alignItems: 'center' }}
                                >
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span>
                                    {user.status === USER_STATUS.ACTIVE ? 'Hoạt động' : 'Bị khóa'}
                                </BaseBadge>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <button className="btn" style={{ padding: '0.4rem 0.6rem' }} onClick={() => onEdit(user)}>Sửa</button>
                                <button className="btn" style={{ padding: '0.4rem 0.6rem', color: 'var(--danger)', marginLeft: '6px' }} onClick={() => onDelete(user.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
