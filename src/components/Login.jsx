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
            <div className="card" style={{ width: '380px', padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.35rem', color: 'var(--primary)', marginBottom: '0.25rem', fontWeight: 700 }}>Quản lý Dự án</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Đăng nhập vào hệ thống để bắt đầu</p>
                </div>

                {error && (
                    <div style={{
                        padding: '0.65rem 0.85rem',
                        background: 'rgba(239, 68, 68, 0.05)',
                        color: 'var(--danger)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.8rem',
                        marginBottom: '1.25rem',
                        border: '1px solid rgba(239, 68, 68, 0.1)'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <BaseInput
                            label="Email"
                            name="email"
                            type="email"
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="admin@example.com"
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <BaseInput
                            label="Mật khẩu"
                            name="password"
                            type="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <LoadingButton
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', padding: '0.65rem', marginTop: '0.5rem', justifyContent: 'center', fontSize: '0.95rem' }}
                        loading={loading}
                    >
                        Đăng nhập
                    </LoadingButton>
                </form>

                <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Quên mật khẩu? Liên hệ quản trị viên.
                </div>
            </div>
        </div>
    );
};

export default Login;
