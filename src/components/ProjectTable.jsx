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
                            <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                                <div
                                    style={{ cursor: 'pointer', color: 'var(--primary)' }}
                                    onClick={() => navigate(`/projects/${project.id}`)}
                                >
                                    {project.name}
                                </div>
                                <div style={{ fontWeight: 400, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    {project.description?.substring(0, 50)}...
                                </div>
                            </td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {(project.managers || []).map(pm => (
                                        <div
                                            key={pm.id}
                                            className="avatar"
                                            style={{ width: '24px', height: '24px', fontSize: '10px' }}
                                            title={pm.name}
                                        >
                                            {pm.name?.[0]}
                                        </div>
                                    ))}
                                    {project.managers?.length === 0 && <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Chưa có PM</span>}
                                </div>
                            </td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {project.members?.slice(0, 3).map((member, idx) => (
                                        <div
                                            key={member.id}
                                            className="avatar"
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                fontSize: '10px',
                                                marginLeft: idx > 0 ? '-8px' : '0',
                                                border: '2px solid white'
                                            }}
                                            title={member.name}
                                        >
                                            {member.name?.[0]}
                                        </div>
                                    ))}
                                    {project.members?.length > 3 && (
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '4px' }}>
                                            +{project.members.length - 3}
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td>
                                <BaseBadge type={PROJECT_STATUS_TYPES[project.status]}>
                                    {PROJECT_STATUS_LABELS[project.status]}
                                </BaseBadge>
                            </td>
                            <td>
                                <div style={{ fontSize: '0.8rem' }}>
                                    {project.start_date || 'N/A'} - {project.end_date || 'N/A'}
                                </div>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <button className="btn" style={{ padding: '0.4rem 0.6rem' }} onClick={() => navigate(`/projects/${project.id}`)}>Chi tiết</button>
                                <button className="btn" style={{ padding: '0.4rem 0.6rem', marginLeft: '6px' }} onClick={() => onEdit(project)}>Sửa</button>
                                <button className="btn" style={{ padding: '0.4rem 0.6rem', color: 'var(--danger)', marginLeft: '6px' }} onClick={() => onDelete(project.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectTable;
