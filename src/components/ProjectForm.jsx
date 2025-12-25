import React, { useState, useEffect } from 'react';
import BaseInput from './common/BaseInput';
import LoadingButton from './common/LoadingButton';
import { PROJECT_STATUS, PROJECT_STATUS_LABELS } from '../constants/projectConstants';
import userService from '../services/userService';

const ProjectForm = ({
    currentProject,
    isEditing,
    errors,
    submitting,
    onInputChange,
    onCancel,
    onSubmit,
    setProject
}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await userService.getAllUsers();
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleMemberToggle = (userId) => {
        const currentMembers = currentProject.members || [];
        // The currentProject.members might be objects with id, or just IDs depending on how we handle it
        // We'll normalize it to IDs for the form
        const memberIds = currentMembers.map(m => typeof m === 'object' ? m.id : m);

        let newMembers;
        if (memberIds.includes(userId)) {
            newMembers = memberIds.filter(id => id !== userId);
        } else {
            newMembers = [...memberIds, userId];
        }

        setProject({ ...currentProject, members: newMembers });
    };

    const memberIds = (currentProject.members || []).map(m => typeof m === 'object' ? m.id : m);

    return (
        <form onSubmit={onSubmit}>
            <BaseInput
                label="Tên dự án"
                name="name"
                value={currentProject.name}
                onChange={onInputChange}
                error={errors.name}
                required
                placeholder="Ví dụ: Hệ thống ERP v2"
            />

            <div className="form-group">
                <label>Mô tả dự án</label>
                <textarea
                    name="description"
                    value={currentProject.description || ''}
                    onChange={onInputChange}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-main)',
                        minHeight: '80px'
                    }}
                    placeholder="Mô tả mục tiêu, yêu cầu của dự án..."
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                    <label>Trạng thái</label>
                    <select name="status" value={currentProject.status} onChange={onInputChange}>
                        {Object.entries(PROJECT_STATUS_LABELS).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>PM Chính</label>
                    <select name="pm_id" value={currentProject.pm_id} onChange={onInputChange} required>
                        <option value="">Chọn PM...</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                        ))}
                    </select>
                    {errors.pm_id && <div className="error-text">{errors.pm_id}</div>}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <BaseInput
                    label="Ngày bắt đầu"
                    name="start_date"
                    type="date"
                    value={currentProject.start_date || ''}
                    onChange={onInputChange}
                />
                <BaseInput
                    label="Ngày kết thúc"
                    name="end_date"
                    type="date"
                    value={currentProject.end_date || ''}
                    onChange={onInputChange}
                    error={errors.end_date}
                />
            </div>

            <div className="form-group">
                <label>Thành viên tham gia ({memberIds.length})</label>
                <div style={{
                    maxHeight: '150px',
                    overflowY: 'auto',
                    padding: '0.5rem',
                    border: '1px solid var(--border-main)',
                    borderRadius: 'var(--radius-sm)',
                    background: '#f8fafc'
                }}>
                    {users.map(user => (
                        <div key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <input
                                type="checkbox"
                                id={`user-${user.id}`}
                                checked={memberIds.includes(user.id)}
                                onChange={() => handleMemberToggle(user.id)}
                                style={{ width: 'auto', marginRight: '8px' }}
                            />
                            <label htmlFor={`user-${user.id}`} style={{ margin: 0, fontWeight: 400, cursor: 'pointer' }}>
                                {user.name} <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>({user.email})</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem' }}>
                <button type="button" className="btn" onClick={onCancel}>Hủy bỏ</button>
                <LoadingButton
                    type="submit"
                    className="btn-primary"
                    loading={submitting}
                >
                    {isEditing ? 'Cập nhật dự án' : 'Tạo dự án'}
                </LoadingButton>
            </div>
        </form>
    );
};

export default ProjectForm;
