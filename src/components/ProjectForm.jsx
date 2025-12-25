import React from 'react';
import BaseInput from './common/BaseInput';
import BaseSelect from './common/BaseSelect';
import LoadingButton from './common/LoadingButton';
import { PROJECT_STATUS_LABELS } from '../constants/projectConstants';

const ProjectForm = ({
    currentProject,
    isEditing,
    errors,
    submitting,
    onInputChange,
    onCancel,
    onSubmit
}) => {
    return (
        <form onSubmit={onSubmit}>
            <BaseInput
                label="Tên dự án"
                name="name"
                value={currentProject.name}
                onChange={onInputChange}
                error={errors.name}
                required
                placeholder="Ví dụ: Hệ thống ERP v2"
            />

            <div className="form-group">
                <label>Mô tả dự án</label>
                <textarea
                    name="description"
                    value={currentProject.description || ''}
                    onChange={onInputChange}
                    style={{ minHeight: '100px' }}
                    placeholder="Mô tả mục tiêu, yêu cầu của dự án..."
                />
            </div>

            <BaseSelect
                label="Trạng thái"
                name="status"
                value={currentProject.status}
                onChange={onInputChange}
                options={Object.entries(PROJECT_STATUS_LABELS).map(([key, label]) => ({
                    value: key,
                    label: label
                }))}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <BaseInput
                    label="Ngày bắt đầu"
                    name="start_date"
                    type="date"
                    value={currentProject.start_date || ''}
                    onChange={onInputChange}
                />
                <BaseInput
                    label="Ngày kết thúc"
                    name="end_date"
                    type="date"
                    value={currentProject.end_date || ''}
                    onChange={onInputChange}
                    error={errors.end_date}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem' }}>
                <button type="button" className="btn" onClick={onCancel}>Hủy bỏ</button>
                <LoadingButton
                    type="submit"
                    className="btn-primary"
                    loading={submitting}
                >
                    {isEditing ? 'Cập nhật dự án' : 'Tạo dự án'}
                </LoadingButton>
            </div>
        </form>
    );
};

export default ProjectForm;
