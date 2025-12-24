import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingButton from './common/LoadingButton';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        name: '',
        email: '',
        phone_number: '',
        role: 'member',
        status: 'active',
        password: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            setUsers(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (isEditing) {
                await axios.put(`/api/users/${currentUser.id}`, currentUser);
            } else {
                await axios.post('/api/users', currentUser);
            }
            setShowModal(false);
            resetForm();
            fetchUsers();
        } catch (error) {
            alert('Lỗi: ' + (error.response?.data?.message || 'Không thể lưu dữ liệu'));
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setCurrentUser({ name: '', email: '', phone_number: '', role: 'member', status: 'active', password: '' });
        setIsEditing(false);
    };

    const handleEdit = (user) => {
        setCurrentUser({ ...user, password: '' });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Xác nhận xóa tài khoản này?')) {
            try {
                await axios.delete(`/api/users/${id}`);
                fetchUsers();
            } catch (error) {
                console.error(error);
            }
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

                <div style={{ overflowX: 'auto' }}>
                    {loading ? (
                        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Đang nạp dữ liệu...</div>
                    ) : (
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
                                            <span className={`badge badge-${user.role === 'admin' ? 'danger' : user.role === 'manager' ? 'warning' : 'primary'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-danger'}`} style={{ gap: '6px' }}>
                                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span>
                                                {user.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className="btn" style={{ padding: '0.4rem 0.6rem' }} onClick={() => handleEdit(user)}>Sửa</button>
                                            <button className="btn" style={{ padding: '0.4rem 0.6rem', color: 'var(--danger)', marginLeft: '6px' }} onClick={() => handleDelete(user.id)}>Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="card-header" style={{ background: '#f8fafc' }}>
                            <h3 style={{ fontSize: '1rem' }}>{isEditing ? 'Cập nhật' : 'Tạo mới'} tài khoản</h3>
                        </div>
                        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
                            <div className="form-group">
                                <label>Họ và tên</label>
                                <input name="name" value={currentUser.name} onChange={handleInputChange} required placeholder="Ví dụ: Nguyễn Văn A" />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input name="email" type="email" value={currentUser.email} onChange={handleInputChange} required placeholder="example@domain.com" />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input name="phone_number" value={currentUser.phone_number || ''} onChange={handleInputChange} placeholder="090..." />
                                </div>
                                <div className="form-group">
                                    <label>Vai trò hệ thống</label>
                                    <select name="role" value={currentUser.role} onChange={handleInputChange}>
                                        <option value="member">Thành viên</option>
                                        <option value="manager">Quản lý dự án</option>
                                        <option value="admin">Quản trị viên</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Trạng thái tài khoản</label>
                                <select name="status" value={currentUser.status} onChange={handleInputChange}>
                                    <option value="active">Đang hoạt động</option>
                                    <option value="inactive">Đang bị khóa</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu {isEditing && '(Để trống nếu giữ nguyên)'}</label>
                                <input name="password" type="password" value={currentUser.password} onChange={handleInputChange} required={!isEditing} placeholder="Tối thiểu 8 ký tự" />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem' }}>
                                <button type="button" className="btn" onClick={() => setShowModal(false)} style={{ padding: '0.6rem 1.2rem' }}>Đóng</button>
                                <LoadingButton
                                    type="submit"
                                    className="btn-primary"
                                    style={{ padding: '0.6rem 1.2rem' }}
                                    loading={submitting}
                                >
                                    {isEditing ? 'Cập nhật' : 'Tạo tài khoản'}
                                </LoadingButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
