import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import projectService from '../services/projectService';
import userService from '../services/userService';
import { PROJECT_STATUS } from '../constants/projectConstants';
import LoadingSpinner from './common/LoadingSpinner';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalProjects: 0,
        activeProjects: 0,
        totalUsers: 0,
        recentProjects: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [projectsRes, usersRes] = await Promise.all([
                    projectService.getAllProjects(),
                    userService.getAllUsers()
                ]);

                const projects = projectsRes.data.data;
                const users = usersRes.data.data;

                setStats({
                    totalProjects: projects.length,
                    activeProjects: projects.filter(p => p.status === PROJECT_STATUS.IN_PROGRESS).length,
                    totalUsers: users.length,
                    recentProjects: projects.slice(0, 5)
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="fade-in">
            <div style={{ marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                    Tổng quan hệ thống
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Chào mừng bạn quay trở lại. Dưới đây là tóm tắt hoạt động của dự án.</p>
            </div>

            <div className="stats-grid">
                {/* Stat cards already have tighter styles via common CSS */}
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.08)', color: 'var(--primary)' }}>📁</div>
                    <div className="stat-info">
                        <h4>Dự án quản lý</h4>
                        <div className="stat-value">{stats.totalProjects}</div>
                    </div>
                </div>
                {/* ... other stats ... */}
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.08)', color: 'var(--success)' }}>🚀</div>
                    <div className="stat-info">
                        <h4>Đang triển khai</h4>
                        <div className="stat-value">{stats.activeProjects}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(249, 115, 22, 0.08)', color: '#f97316' }}>👥</div>
                    <div className="stat-info">
                        <h4>Tổng thành viên</h4>
                        <div className="stat-value">{stats.totalUsers}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.08)', color: 'var(--danger)' }}>📈</div>
                    <div className="stat-info">
                        <h4>Hiệu suất</h4>
                        <div className="stat-value">92%</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginTop: '1.25rem' }}>
                <div className="card">
                    <div className="card-header">
                        <h3 style={{ fontSize: '1rem' }}>Dự án mới cập nhật</h3>
                        <button className="btn" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }} onClick={() => navigate('/projects')}>Xem tất cả</button>
                    </div>
                    <div style={{ padding: '0' }}>
                        <table style={{ border: 'none' }}>
                            <thead>
                                <tr>
                                    <th style={{ background: 'transparent', padding: '0.75rem 1.25rem' }}>Tên dự án</th>
                                    <th style={{ background: 'transparent', padding: '0.75rem 1.25rem' }}>Trạng thái</th>
                                    <th style={{ background: 'transparent', textAlign: 'right', padding: '0.75rem 1.25rem' }}>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.recentProjects.map(project => (
                                    <tr key={project.id}>
                                        <td style={{ fontWeight: 600, fontSize: '0.9rem' }}>{project.name}</td>
                                        <td>
                                            <span className={`badge badge-${project.status === PROJECT_STATUS.IN_PROGRESS ? 'success' : 'primary'}`} style={{ fontSize: '0.7rem' }}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className="btn-icon" style={{ width: '28px', height: '28px' }} onClick={() => navigate(`/projects/${project.id}`)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: 'white', border: 'none' }}>
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ color: 'white', marginBottom: '0.75rem', fontSize: '1.15rem' }}>Sẵn sàng bắt đầu?</h3>
                        <p style={{ opacity: 0.9, fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                            Tạo một dự án mới để bắt đầu quy trình quản lý chuyên nghiệp theo tiêu chuẩn PMP.
                        </p>
                        <button
                            className="btn"
                            style={{ width: '100%', background: 'white', color: '#6366f1', border: 'none', padding: '0.75rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem' }}
                            onClick={() => navigate('/projects')}
                        >
                            + Tạo dự án mới
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
