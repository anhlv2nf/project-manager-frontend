import React, { useState } from 'react';
import authService from '../services/authService';
import BaseInput from './common/BaseInput';
import LoadingButton from './common/LoadingButton';
import { USER_ROLES } from '../constants/userConstants';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.login(credentials);
            const user = authService.getCurrentUser();

            if (user && user.role === USER_ROLES.MANAGER) {
                window.location.href = '/pm';
            } else {
                window.location.href = '/';
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
        }}>
            <div className="card" style={{ width: '400px', padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Quản lý Dự án</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Đăng nhập vào hệ thống để bắt đầu</p>
                </div>

                {error && (
                    <div style={{
                        padding: '0.75rem',
                        background: '#fef2f2',
                        color: 'var(--danger)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.875rem',
                        marginBottom: '1.5rem',
                        border: '1px solid #fee2e2'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <BaseInput
                        label="Email"
                        name="email"
                        type="email"
                        value={credentials.email}
                        onChange={handleChange}
                        placeholder="admin@example.com"
                        required
                    />

                    <BaseInput
                        label="Mật khẩu"
                        name="password"
                        type="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                    />

                    <LoadingButton
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', padding: '0.75rem', marginTop: '1rem', justifyContent: 'center' }}
                        loading={loading}
                    >
                        Đăng nhập
                    </LoadingButton>
                </form>

                <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Quên mật khẩu? Liên hệ quản trị viên.
                </div>
            </div>
        </div>
    );
};

export default Login;
