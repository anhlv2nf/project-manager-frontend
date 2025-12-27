import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import UserTable from './UserTable';
import UserForm from './UserForm';
import BaseModal from './common/BaseModal';
import BaseConfirmModal from './common/BaseConfirmModal';
import LoadingSpinner from './common/LoadingSpinner';
import { USER_ROLES, USER_STATUS } from '../constants/userConstants';
import { validateEmail, isEmpty } from '../utils/validateHelper';

const UserManagement = () => {
    // States
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [currentUser, setCurrentUser] = useState({
        name: '',
        email: '',
        phone_number: '',
        role: USER_ROLES.MEMBER,
        status: USER_STATUS.ACTIVE,
        password: ''
    });

    // Effects
    useEffect(() => {
        fetchUsers();
    }, []);

    // API Handlers
    const fetchUsers = async () => {
        try {
            const response = await userService.getAllUsers();
            setUsers(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (isEmpty(currentUser.name)) newErrors.name = 'Họ tên không được để trống';
        if (!validateEmail(currentUser.email)) newErrors.email = 'Email không hợp lệ';
        if (!isEditing && (isEmpty(currentUser.password) || currentUser.password.length < 8)) {
            newErrors.password = 'Mật khẩu phải từ 8 ký tự';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setSubmitting(true);
        try {
            if (isEditing) {
                await userService.updateUser(currentUser.id, currentUser);
            } else {
                await userService.createUser(currentUser);
            }
            setShowModal(false);
            resetForm();
            fetchUsers();
        } catch (error) {
            const message = error.response?.data?.message || 'Không thể lưu dữ liệu';
            alert('Lỗi: ' + message);
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setCurrentUser({
            name: '',
            email: '',
            phone_number: '',
            role: USER_ROLES.MEMBER,
            status: USER_STATUS.ACTIVE,
            password: ''
        });
        setErrors({});
        setIsEditing(false);
    };

    const handleEdit = (user) => {
        setCurrentUser({ ...user, password: '' });
        setIsEditing(true);
        setErrors({});
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        setSubmitting(true);
        try {
            await userService.deleteUser(deleteId);
            fetchUsers();
            setShowConfirm(false);
        } catch (error) {
            console.error(error);
            alert('Không thể xóa người dùng');
        } finally {
            setSubmitting(false);
            setDeleteId(null);
        }
    };

    return (
        <div className="fade-in">
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#eef2ff', color: '#4f46e5' }}>👥</div>
                    <div className="stat-info">
                        <h4>Tổng thành viên</h4>
                        <div className="stat-value">{users.length}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>✅</div>
                    <div className="stat-info">
                        <h4>Đang hoạt động</h4>
                        <div className="stat-value">{users.filter(u => u.status === USER_STATUS.ACTIVE).length}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#fef2f2', color: '#ef4444' }}>🚫</div>
                    <div className="stat-info">
                        <h4>Bị khóa</h4>
                        <div className="stat-value">{users.filter(u => u.status === USER_STATUS.INACTIVE).length}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#fffbe3', color: '#f59e0b' }}>👑</div>
                    <div className="stat-info">
                        <h4>Quản trị viên</h4>
                        <div className="stat-value">{users.filter(u => u.role === USER_ROLES.ADMIN).length}</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header" style={{ padding: '1.5rem 2rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Người dùng hệ thống</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
                            Danh sách và quyền hạn của các thành viên trong dự án.
                        </p>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '0.625rem 1.25rem', borderRadius: '10px' }} onClick={() => { resetForm(); setShowModal(true); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="17" y1="11" x2="23" y2="11" /></svg>
                        Thêm thành viên
                    </button>
                </div>

                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <UserTable
                        users={users}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            <BaseModal
                show={showModal}
                title={`${isEditing ? 'Cập nhật' : 'Tạo mới'} tài khoản`}
                onClose={() => setShowModal(false)}
            >
                <UserForm
                    currentUser={currentUser}
                    isEditing={isEditing}
                    errors={errors}
                    submitting={submitting}
                    onInputChange={handleInputChange}
                    onCancel={() => setShowModal(false)}
                    onSubmit={handleSubmit}
                />
            </BaseModal>

            <BaseConfirmModal
                show={showConfirm}
                title="Xóa tài khoản"
                content="Bạn có chắc chắn muốn xóa tài khoản này? Hành động này không thể hoàn tác."
                onClose={() => setShowConfirm(false)}
                onConfirm={confirmDelete}
                confirmText="Xóa bỏ"
                type="danger"
                loading={submitting}
            />
        </div>
    );
};

export default UserManagement;
