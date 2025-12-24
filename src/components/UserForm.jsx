import React from 'react';
import BaseInput from './common/BaseInput';
import LoadingButton from './common/LoadingButton';
import { USER_ROLES, USER_STATUS } from '../constants/userConstants';

const UserForm = ({
    currentUser,
    isEditing,
    errors,
    submitting,
    onInputChange,
    onCancel,
    onSubmit
}) => {
    return (
        <form onSubmit={onSubmit}>
            <BaseInput
                label="Họ và tên"
                name="name"
                value={currentUser.name}
                onChange={onInputChange}
                error={errors.name}
                required
                placeholder="Ví dụ: Nguyễn Văn A"
            />

            <BaseInput
                label="Email Address"
                name="email"
                type="email"
                value={currentUser.email}
                onChange={onInputChange}
                error={errors.email}
                required
                placeholder="example@domain.com"
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <BaseInput
                    label="Số điện thoại"
                    name="phone_number"
                    value={currentUser.phone_number || ''}
                    onChange={onInputChange}
                    placeholder="090..."
                />
                <div className="form-group">
                    <label>Vai trò hệ thống</label>
                    <select name="role" value={currentUser.role} onChange={onInputChange}>
                        <option value={USER_ROLES.MEMBER}>Thành viên</option>
                        <option value={USER_ROLES.MANAGER}>Quản lý dự án</option>
                        <option value={USER_ROLES.ADMIN}>Quản trị viên</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label>Trạng thái tài khoản</label>
                <select name="status" value={currentUser.status} onChange={onInputChange}>
                    <option value={USER_STATUS.ACTIVE}>Đang hoạt động</option>
                    <option value={USER_STATUS.INACTIVE}>Đang bị khóa</option>
                </select>
            </div>

            <BaseInput
                label={`Mật khẩu ${isEditing ? '(Để trống nếu giữ nguyên)' : ''}`}
                name="password"
                type="password"
                value={currentUser.password}
                onChange={onInputChange}
                error={errors.password}
                required={!isEditing}
                placeholder="Tối thiểu 8 ký tự"
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem' }}>
                <button type="button" className="btn" onClick={onCancel} style={{ padding: '0.6rem 1.2rem' }}>Hủy bỏ</button>
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
    );
};

export default UserForm;
