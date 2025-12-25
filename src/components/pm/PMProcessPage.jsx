import React from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { PMP_LABELS } from '../../constants/pmConstants';

const PMProcessPage = () => {
    const { process } = useParams();

    return (
        <div style={{ padding: '2rem' }} className="fade-in">
            <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', margin: 0 }}>
                    {PMP_LABELS[process]} Phase
                </h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Quản lý các hoạt động trong giai đoạn này.
                </p>
            </div>

            <div style={{
                background: 'white',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-main)',
                minHeight: '400px',
                padding: '2rem'
            }}>
                <Outlet />
                {/* Show welcome message if no specific tool is selected */}
                {!window.location.pathname.split('/').slice(3)[0] && (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '4rem' }}>
                        <h3>Chào mừng đến với quy trình {PMP_LABELS[process]}</h3>
                        <p>Vui lòng chọn một công cụ từ menu bên trái để bắt đầu làm việc.</p>
                        <div style={{ fontSize: '3rem', marginTop: '1rem', opacity: 0.2 }}>
                            &larr;
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PMProcessPage;
