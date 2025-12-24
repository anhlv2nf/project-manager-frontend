import React, { useState } from 'react';
import authService from '../services/authService';
import BaseInput from './common/BaseInput';
import LoadingButton from './common/LoadingButton';
import BaseModal from './common/BaseModal';

const ChangePassword = ({ show, onClose }) => {
    const [data, setData] = useState({
        current_password: '',
        new_password: '',
        confirm_password: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!data.current_password) newErrors.current_password = 'Vui lòng nhập mật khẩu hiện tại';
        if (!data.new_password || data.new_password.length < 8) newErrors.new_password = 'Mật khẩu mới phải từ 8 ký tự';
        if (data.new_password !== data.confirm_password) newErrors.confirm_password = 'Xác nhận mật khẩu không khớp';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            await authService.changePassword(data);
            alert('Đổi mật khẩu thành công!');
            onClose();
            setData({ current_password: '', new_password: '', confirm_password: '' });
        } catch (err) {
            setErrors({
                form: err.response?.data?.message || 'Đổi mật khẩu thất bại'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <BaseModal show={show} title="Đổi mật khẩu" onClose={onClose}>
            {errors.form && (
                <div style={{ padding: '0.75rem', background: '#fef2f2', color: 'var(--danger)', marginBottom: '1rem', borderRadius: '4px' }}>
                    {errors.form}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <BaseInput
                    label="Mật khẩu hiện tại"
                    name="current_password"
                    type="password"
                    value={data.current_password}
                    onChange={handleChange}
                    error={errors.current_password}
                    required
                />
                <BaseInput
                    label="Mật khẩu mới"
                    name="new_password"
                    type="password"
                    value={data.new_password}
                    onChange={handleChange}
                    error={errors.new_password}
                    required
                />
                <BaseInput
                    label="Xác nhận mật khẩu mới"
                    name="confirm_password"
                    type="password"
                    value={data.confirm_password}
                    onChange={handleChange}
                    error={errors.confirm_password}
                    required
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem' }}>
                    <button type="button" className="btn" onClick={onClose}>Hủy</button>
                    <LoadingButton type="submit" className="btn-primary" loading={loading}>
                        Cập nhật mật khẩu
                    </LoadingButton>
                </div>
            </form>
        </BaseModal>
    );
};

export default ChangePassword;
