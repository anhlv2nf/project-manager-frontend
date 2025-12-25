import React from 'react';
import BaseModal from './BaseModal';
import LoadingButton from './LoadingButton';

const BaseConfirmModal = ({
    show,
    title = 'Xác nhận hành động',
    content,
    onClose,
    onConfirm,
    confirmText = 'Xác nhận',
    cancelText = 'Hủy bỏ',
    type = 'primary', // primary, danger, warning
    loading = false
}) => {
    return (
        <BaseModal show={show} title={title} onClose={onClose}>
            <div style={{ marginBottom: '1.5rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                {content}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                    className="btn"
                    onClick={onClose}
                    disabled={loading}
                    style={{ padding: '0.6rem 1.2rem' }}
                >
                    {cancelText}
                </button>
                <LoadingButton
                    className={`btn-${type}`}
                    onClick={onConfirm}
                    loading={loading}
                    style={{ padding: '0.6rem 1.2rem' }}
                >
                    {confirmText}
                </LoadingButton>
            </div>
        </BaseModal>
    );
};

export default BaseConfirmModal;
