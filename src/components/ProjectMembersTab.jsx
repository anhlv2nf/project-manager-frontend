import React, { useState, useEffect } from 'react';
import projectService from '../services/projectService';
import userService from '../services/userService';
import LoadingButton from './common/LoadingButton';
import BaseSelect from './common/BaseSelect';
import { getAvailableUserOptions, getProjectRoleOptions } from '../utils/userHelper';
import { PROJECT_MEMBER_ROLES, PROJECT_MEMBER_ROLE_LABELS } from '../constants/projectConstants';

const ProjectMembersTab = ({ projectId, managers, members, onRefresh }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    // State to manage assignments locally before saving
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        // Initialize assignments from existing managers and members
        const initial = [
            ...managers.map(u => ({ user_id: u.id, name: u.name, email: u.email, role_in_project: 'manager' })),
            ...members.map(u => ({ user_id: u.id, name: u.name, email: u.email, role_in_project: 'member' }))
        ];
        setAssignments(initial);
    }, [managers, members]);

    const fetchUsers = async () => {
        try {
            const response = await userService.getAllUsers();
            setAllUsers(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddUser = (userId) => {
        const user = allUsers.find(u => u.id === parseInt(userId));
        if (!user || assignments.find(a => a.user_id === user.id)) return;

        setAssignments([...assignments, {
            user_id: user.id,
            name: user.name,
            email: user.email,
            role_in_project: 'member'
        }]);
    };

    const handleRemoveUser = (userId) => {
        setAssignments(assignments.filter(a => a.user_id !== userId));
    };

    const handleRoleChange = (userId, newRole) => {
        setAssignments(assignments.map(a =>
            a.user_id === userId ? { ...a, role_in_project: newRole } : a
        ));
    };

    const handleSave = async () => {
        setSubmitting(true);
        try {
            const payload = assignments.map(a => ({
                user_id: a.user_id,
                role_in_project: a.role_in_project
            }));
            await projectService.syncProjectUsers(projectId, payload);
            onRefresh();
            alert('Cập nhật thành viên thành công!');
        } catch (error) {
            alert('Lỗi khi cập nhật thành viên');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h4 style={{ margin: 0 }}>Thành viên tham dự ({assignments.length})</h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <BaseSelect
                        placeholder="+ Thêm thành viên..."
                        containerStyle={{ margin: 0 }}
                        style={{ width: '200px' }}
                        onChange={(e) => {
                            if (e.target.value) {
                                handleAddUser(e.target.value);
                                e.target.value = '';
                            }
                        }}
                        options={getAvailableUserOptions(allUsers, assignments.map(a => a.user_id))}
                    />
                    <LoadingButton className="btn-primary" onClick={handleSave} loading={submitting}>
                        Lưu thay đổi
                    </LoadingButton>
                </div>
            </div>

            <div style={{ background: 'white', border: '1px solid var(--border-main)', borderRadius: 'var(--radius-sm)' }}>
                <table>
                    <thead>
                        <tr>
                            <th>Nhân viên</th>
                            <th>Vai trò dự án</th>
                            <th style={{ textAlign: 'right' }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.length === 0 ? (
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                    Chưa có thành viên nào trong dự án này.
                                </td>
                            </tr>
                        ) : (
                            assignments.map(a => (
                                <tr key={a.user_id}>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{a.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{a.email}</div>
                                    </td>
                                    <td>
                                        <BaseSelect
                                            value={a.role_in_project}
                                            onChange={(e) => handleRoleChange(a.user_id, e.target.value)}
                                            style={{ padding: '0.3rem', width: 'auto' }}
                                            options={getProjectRoleOptions(PROJECT_MEMBER_ROLES, PROJECT_MEMBER_ROLE_LABELS)}
                                        />
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button
                                            className="btn"
                                            style={{ color: 'var(--danger)', padding: '0.4rem' }}
                                            onClick={() => handleRemoveUser(a.user_id)}
                                        >
                                            Gỡ bỏ
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectMembersTab;
