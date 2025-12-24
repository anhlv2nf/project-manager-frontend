import React from 'react';

const LoadingButton = ({
    children,
    loading,
    type = 'button',
    className = '',
    disabled,
    onClick,
    ...props
}) => {
    return (
        <button
            type={type}
            className={`btn ${className} ${loading ? 'btn-loading' : ''}`}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading && (
                <svg className="spinner" viewBox="0 0 24 24">
                    <circle
                        className="path"
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        strokeWidth="3"
                    ></circle>
                </svg>
            )}
            <span className={loading ? 'loading-text-shifted' : ''}>
                {children}
            </span>
        </button>
    );
};

export default LoadingButton;
