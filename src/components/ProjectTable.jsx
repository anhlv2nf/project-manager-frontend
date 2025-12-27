import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseBadge from './common/BaseBadge';
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_TYPES } from '../constants/projectConstants';

const ProjectTable = ({ projects, onEdit, onDelete }) => {
    const navigate = useNavigate();

    return (
        <div style={{ overflowX: 'auto' }}>
            <table>
                <thead>
                    <tr>
                        <th>Tên dự án</th>
                        <th>PM Chính</th>
                        <th>Thành viên</th>
                        <th>Trạng thái</th>
                        <th>Thời gian</th>
                        <th style={{ textAlign: 'right' }}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project.id} className="fade-in">
                            <td style={{ padding: '1.25rem 1.5rem' }}>
                                <div
                                    style={{
                                        fontWeight: 700,
                                        color: 'var(--primary)',
                                        cursor: 'pointer',
                                        fontSize: '0.95rem',
                                        marginBottom: '0.25rem'
                                    }}
                                    onClick={() => navigate(`/projects/${project.id}`)}
                                >
                                    {project.name}
                                </div>
                                <div style={{ fontWeight: 400, fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '300px' }} className="text-truncate">
                                    {project.description || 'Không có mô tả cho dự án này.'}
                                </div>
                            </td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {(project.managers || []).length > 0 ? (
                                        (project.managers || []).map(pm => (
                                            <div key={pm.id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <div
                                                    className="avatar"
                                                    style={{
                                                        width: '28px',
                                                        height: '28px',
                                                        fontSize: '11px',
                                                        background: 'linear-gradient(135deg, #6366f1, #a855f7)'
                                                    }}
                                                    title={pm.name}
                                                >
                                                    {pm.name?.[0]?.toUpperCase()}
                                                </div>
                                                <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{pm.name}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>Chưa có PM</span>
                                    )}
                                </div>
                            </td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="avatar-group" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                        {project.members?.slice(0, 4).map((member, idx) => (
                                            <div
                                                key={member.id}
                                                className="avatar"
                                                style={{
                                                    width: '28px',
                                                    height: '28px',
                                                    fontSize: '11px',
                                                    marginLeft: idx > 0 ? '-10px' : '0',
                                                    border: '2px solid #fff',
                                                    background: `hsl(${(member.id * 137.5) % 360}, 60%, 65%)`
                                                }}
                                                title={member.name}
                                            >
                                                {member.name?.[0]?.toUpperCase()}
                                            </div>
                                        ))}
                                        {project.members?.length > 4 && (
                                            <div className="avatar" style={{
                                                width: '28px',
                                                height: '28px',
                                                fontSize: '10px',
                                                marginLeft: '-10px',
                                                border: '2px solid #fff',
                                                background: '#f1f5f9',
                                                color: '#475569',
                                                fontWeight: 600
                                            }}>
                                                +{project.members.length - 4}
                                            </div>
                                        )}
                                        {(!project.members || project.members.length === 0) && (
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>0 TV</span>
                                        )}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <BaseBadge
                                    type={PROJECT_STATUS_TYPES[project.status]}
                                    style={{
                                        padding: '0.35rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.7rem',
                                        letterSpacing: '0.02em',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {PROJECT_STATUS_LABELS[project.status]}
                                </BaseBadge>
                            </td>
                            <td>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                                        {project.start_date ? new Date(project.start_date).toLocaleDateString('vi-VN') : '---'}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        đến {project.end_date ? new Date(project.end_date).toLocaleDateString('vi-VN') : '---'}
                                    </div>
                                </div>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                    <button
                                        className="btn-icon"
                                        title="Chi tiết"
                                        onClick={() => navigate(`/projects/${project.id}`)}
                                        style={{ color: 'var(--primary)', background: 'var(--primary-light)' }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                    </button>
                                    <button
                                        className="btn-icon"
                                        title="Sửa"
                                        onClick={() => onEdit(project)}
                                        style={{ color: '#0ea5e9', background: '#f0f9ff' }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                                    </button>
                                    <button
                                        className="btn-icon"
                                        title="Xóa"
                                        onClick={() => onDelete(project.id)}
                                        style={{ color: 'var(--danger)', background: '#fef2f2' }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectTable;
