import React, { useState, useEffect } from 'react';
import projectService from '../services/projectService';
import ProjectTable from './ProjectTable';
import ProjectForm from './ProjectForm';
import BaseModal from './common/BaseModal';
import { PROJECT_STATUS } from '../constants/projectConstants';
import { isEmpty } from '../utils/validateHelper';

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [currentProject, setCurrentProject] = useState({
        name: '',
        description: '',
        status: PROJECT_STATUS.PLANNED,
        pm_id: '',
        start_date: '',
        end_date: '',
        members: []
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
        if (!currentProject.pm_id) newErrors.pm_id = 'Vui lòng chọn PM chính';

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
        // Normalize members to IDs only for API
        const payload = {
            ...currentProject,
            members: (currentProject.members || []).map(m => typeof m === 'object' ? m.id : m)
        };

        try {
            if (isEditing) {
                await projectService.updateProject(currentProject.id, payload);
            } else {
                await projectService.createProject(payload);
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
            pm_id: '',
            start_date: '',
            end_date: '',
            members: []
        });
        setErrors({});
        setIsEditing(false);
    };

    const handleEdit = (project) => {
        setCurrentProject({
            ...project,
            pm_id: project.pm?.id || '',
            // Ensure members are IDs for the form but keep the logic flexible
            members: project.members || []
        });
        setIsEditing(true);
        setErrors({});
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Xác nhận xóa dự án này?')) {
            try {
                await projectService.deleteProject(id);
                fetchProjects();
            } catch (error) {
                alert('Không thể xóa dự án');
            }
        }
    };

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <div>
                        <h3>Quản lý Dự án</h3>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                            {projects.length} dự án đang được quản lý
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
                        <span>+</span> Tạo dự án mới
                    </button>
                </div>

                {loading ? (
                    <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Đang nạp dữ liệu...</div>
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
                    setProject={setCurrentProject}
                    onCancel={() => setShowModal(false)}
                    onSubmit={handleSubmit}
                />
            </BaseModal>
        </div>
    );
};

export default ProjectManagement;
