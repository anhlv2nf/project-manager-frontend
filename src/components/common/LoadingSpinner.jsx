import React from 'react';

const LoadingSpinner = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4rem',
            color: 'var(--text-muted)',
            flexDirection: 'column',
            gap: '1rem'
        }}>
            <div className="spinner" style={{ width: '30px', height: '30px', borderTopColor: 'var(--primary)' }}></div>
            <div>Đang tải dữ liệu...</div>
        </div>
    );
};

export default LoadingSpinner;
