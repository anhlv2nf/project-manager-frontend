import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectService from '../services/projectService';
import ProjectMembersTab from './ProjectMembersTab';
import BaseBadge from './common/BaseBadge';
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_TYPES } from '../constants/projectConstants';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('members');

    useEffect(() => {
        fetchProjectDetail();
    }, [id]);

    const fetchProjectDetail = async () => {
        try {
            const response = await projectService.getProjectById(id);
            setProject(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            alert('Không thể tải thông tin dự án');
            navigate('/projects');
        }
    };

    if (loading) {
        return <div style={{ padding: '4rem', textAlign: 'center' }}>Đang tải thông tin dự án...</div>;
    }

    return (
        <div className="fade-in">
            {/* Project Header Card */}
            <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                            <h2 style={{ margin: 0, fontSize: '1.75rem' }}>{project.name}</h2>
                            <BaseBadge type={PROJECT_STATUS_TYPES[project.status]}>
                                {PROJECT_STATUS_LABELS[project.status]}
                            </BaseBadge>
                        </div>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 0 1.5rem 0', lineHeight: 1.6 }}>
                            {project.description || 'Chưa có mô tả cho dự án này.'}
                        </p>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <div>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Ngày bắt đầu</span>
                                <span style={{ fontWeight: 600 }}>{project.start_date || 'N/A'}</span>
                            </div>
                            <div>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>Ngày kết thúc</span>
                                <span style={{ fontWeight: 600 }}>{project.end_date || 'N/A'}</span>
                            </div>
                            <div>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block' }}>PM chính</span>
                                <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                                    {project.managers?.map(m => (
                                        <div key={m.id} className="avatar" style={{ width: '28px', height: '28px' }} title={m.name}>
                                            {m.name[0]}
                                        </div>
                                    ))}
                                    {(!project.managers || project.managers.length === 0) && <span>-</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn" onClick={() => navigate('/projects')}>Quay lại danh sách</button>
                </div>
            </div>

            {/* Project Tabs */}
            <div className="card">
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-main)' }}>
                    <div
                        onClick={() => setActiveTab('members')}
                        style={{
                            padding: '1rem 2rem',
                            cursor: 'pointer',
                            fontWeight: 600,
                            color: activeTab === 'members' ? 'var(--primary)' : 'var(--text-muted)',
                            borderBottom: activeTab === 'members' ? '2px solid var(--primary)' : 'none',
                            marginBottom: '-1px'
                        }}
                    >
                        Thành viên & PM
                    </div>
                    <div
                        onClick={() => setActiveTab('settings')}
                        style={{
                            padding: '1rem 2rem',
                            cursor: 'pointer',
                            fontWeight: 600,
                            color: activeTab === 'settings' ? 'var(--primary)' : 'var(--text-muted)',
                            borderBottom: activeTab === 'settings' ? '2px solid var(--primary)' : 'none',
                            marginBottom: '-1px'
                        }}
                    >
                        Cài đặt chung
                    </div>
                </div>

                <div style={{ padding: '2rem' }}>
                    {activeTab === 'members' && (
                        <ProjectMembersTab
                            projectId={project.id}
                            managers={project.managers || []}
                            members={project.members || []}
                            onRefresh={fetchProjectDetail}
                        />
                    )}
                    {activeTab === 'settings' && (
                        <div className="fade-in">
                            <p style={{ color: 'var(--text-muted)' }}>Các cài đặt nâng cao khác cho dự án sẽ sớm được bổ sung tại đây.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
