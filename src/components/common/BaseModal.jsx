import React from 'react';

const BaseModal = ({ show, title, onClose, children }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="card-header" style={{ background: '#f8fafc' }}>
                    <h3 style={{ fontSize: '1rem' }}>{title}</h3>
                </div>
                <div style={{ padding: '1.5rem' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BaseModal;
