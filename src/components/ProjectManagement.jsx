import React, { useState, useEffect } from 'react';
import projectService from '../services/projectService';
import ProjectTable from './ProjectTable';
import ProjectForm from './ProjectForm';
import BaseModal from './common/BaseModal';
import BaseConfirmModal from './common/BaseConfirmModal';
import LoadingSpinner from './common/LoadingSpinner';
import { PROJECT_STATUS } from '../constants/projectConstants';
import { isEmpty } from '../utils/validateHelper';

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [currentProject, setCurrentProject] = useState({
        name: '',
        description: '',
        status: PROJECT_STATUS.PLANNED,
        start_date: '',
        end_date: ''
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await projectService.getAllProjects();
            setProjects(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProject({ ...currentProject, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (isEmpty(currentProject.name)) newErrors.name = 'Tên dự án không được để trống';

        if (currentProject.start_date && currentProject.end_date) {
            if (new Date(currentProject.start_date) > new Date(currentProject.end_date)) {
                newErrors.end_date = 'Ngày kết thúc không được trước ngày bắt đầu';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setSubmitting(true);
        try {
            if (isEditing) {
                await projectService.updateProject(currentProject.id, currentProject);
            } else {
                await projectService.createProject(currentProject);
            }
            setShowModal(false);
            resetForm();
            fetchProjects();
        } catch (error) {
            alert('Lỗi: ' + (error.response?.data?.message || 'Không thể lưu dữ liệu'));
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setCurrentProject({
            name: '',
            description: '',
            status: PROJECT_STATUS.PLANNED,
            start_date: '',
            end_date: ''
        });
        setErrors({});
        setIsEditing(false);
    };

    const handleEdit = (project) => {
        setCurrentProject({
            id: project.id,
            name: project.name,
            description: project.description,
            status: project.status,
            start_date: project.start_date,
            end_date: project.end_date
        });
        setIsEditing(true);
        setErrors({});
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        setSubmitting(true);
        try {
            await projectService.deleteProject(deleteId);
            fetchProjects();
            setShowConfirm(false);
        } catch (error) {
            alert('Không thể xóa dự án');
        } finally {
            setSubmitting(false);
            setDeleteId(null);
        }
    };

    return (
        <div className="fade-in">
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#eef2ff', color: '#4f46e5' }}>📋</div>
                    <div className="stat-info">
                        <h4>Tổng dự án</h4>
                        <div className="stat-value">{projects.length}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>⚡</div>
                    <div className="stat-info">
                        <h4>Đang triển khai</h4>
                        <div className="stat-value">{projects.filter(p => p.status === PROJECT_STATUS.IN_PROGRESS).length}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#fffbe3', color: '#f59e0b' }}>🕒</div>
                    <div className="stat-info">
                        <h4>Đang lập kế hoạch</h4>
                        <div className="stat-value">{projects.filter(p => p.status === PROJECT_STATUS.PLANNED).length}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#fef2f2', color: '#ef4444' }}>⚠️</div>
                    <div className="stat-info">
                        <h4>Dự án rủi ro</h4>
                        <div className="stat-value">0</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header" style={{ padding: '1.5rem 2rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Dự án đang thực hiện</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
                            Danh sách và trạng thái chi tiết các dự án trong hệ thống.
                        </p>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '0.625rem 1.25rem', borderRadius: '10px' }} onClick={() => { resetForm(); setShowModal(true); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        Tạo dự án mới
                    </button>
                </div>

                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <ProjectTable
                        projects={projects}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            <BaseModal
                show={showModal}
                title={`${isEditing ? 'Cập nhật' : 'Tạo mới'} dự án`}
                onClose={() => setShowModal(false)}
            >
                <ProjectForm
                    currentProject={currentProject}
                    isEditing={isEditing}
                    errors={errors}
                    submitting={submitting}
                    onInputChange={handleInputChange}
                    onCancel={() => setShowModal(false)}
                    onSubmit={handleSubmit}
                />
            </BaseModal>

            <BaseConfirmModal
                show={showConfirm}
                title="Xóa dự án"
                content="Bạn có chắc chắn muốn xóa dự án này? Toàn bộ dữ liệu liên quan sẽ bị mất."
                onClose={() => setShowConfirm(false)}
                onConfirm={confirmDelete}
                confirmText="Xóa bỏ"
                type="danger"
                loading={submitting}
            />
        </div>
    );
};

export default ProjectManagement;
