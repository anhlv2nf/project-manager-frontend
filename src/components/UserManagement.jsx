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
        <div>
            <div className="card">
                <div className="card-header">
                    <div>
                        <h3>Người dùng hệ thống</h3>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                            Danh sách {users.length} tài khoản thành viên
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
                        <span>+</span> Thêm thành viên
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
