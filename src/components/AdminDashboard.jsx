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
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    Tổng quan hệ thống
                </h2>
                <p style={{ color: 'var(--text-muted)' }}>Chào mừng bạn quay trở lại. Dưới đây là tóm tắt hoạt động của dự án.</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#eef2ff', color: '#4f46e5' }}>📁</div>
                    <div className="stat-info">
                        <h4>Dự án quản lý</h4>
                        <div className="stat-value">{stats.totalProjects}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>🚀</div>
                    <div className="stat-info">
                        <h4>Đang triển khai</h4>
                        <div className="stat-value">{stats.activeProjects}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#fff7ed', color: '#f97316' }}>👥</div>
                    <div className="stat-info">
                        <h4>Tổng thành viên</h4>
                        <div className="stat-value">{stats.totalUsers}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#fef2f2', color: '#ef4444' }}>📈</div>
                    <div className="stat-info">
                        <h4>Hiệu suất</h4>
                        <div className="stat-value">92%</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
                <div className="card">
                    <div className="card-header">
                        <h3>Dự án mới cập nhật</h3>
                        <button className="btn" onClick={() => navigate('/projects')}>Xem tất cả</button>
                    </div>
                    <div style={{ padding: '0' }}>
                        <table style={{ border: 'none' }}>
                            <thead>
                                <tr>
                                    <th style={{ background: 'transparent' }}>Tên dự án</th>
                                    <th style={{ background: 'transparent' }}>Trạng thái</th>
                                    <th style={{ background: 'transparent', textAlign: 'right' }}>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.recentProjects.map(project => (
                                    <tr key={project.id}>
                                        <td style={{ fontWeight: 600 }}>{project.name}</td>
                                        <td>
                                            <span className={`badge badge-${project.status === PROJECT_STATUS.IN_PROGRESS ? 'success' : 'primary'}`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className="btn-icon" onClick={() => navigate(`/projects/${project.id}`)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: 'white', border: 'none' }}>
                    <div style={{ padding: '2rem' }}>
                        <h3 style={{ color: 'white', marginBottom: '1rem' }}>Sẵn sàng bắt đầu?</h3>
                        <p style={{ opacity: 0.9, fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                            Tạo một dự án mới để bắt đầu quy trình quản lý chuyên nghiệp theo tiêu chuẩn PMP.
                        </p>
                        <button
                            className="btn"
                            style={{ width: '100%', background: 'white', color: '#4f46e5', border: 'none', padding: '1rem', borderRadius: '12px', fontWeight: 700 }}
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
