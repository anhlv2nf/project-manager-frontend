import React from 'react';
import BaseInput from './common/BaseInput';
import BaseSelect from './common/BaseSelect';
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
                <BaseSelect
                    label="Vai trò hệ thống"
                    name="role"
                    value={currentUser.role}
                    onChange={onInputChange}
                    options={[
                        { value: USER_ROLES.MEMBER, label: 'Thành viên' },
                        { value: USER_ROLES.MANAGER, label: 'Quản lý dự án' },
                        { value: USER_ROLES.ADMIN, label: 'Quản trị viên' }
                    ]}
                />
            </div>

            <BaseSelect
                label="Trạng thái tài khoản"
                name="status"
                value={currentUser.status}
                onChange={onInputChange}
                options={[
                    { value: USER_STATUS.ACTIVE, label: 'Đang hoạt động' },
                    { value: USER_STATUS.INACTIVE, label: 'Đang bị khóa' }
                ]}
            />

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
