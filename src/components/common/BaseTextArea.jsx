import React from 'react';

const BaseTextArea = ({
    label,
    error,
    name,
    value,
    onChange,
    placeholder,
    required = false,
    rows = 3,
    style,
    containerStyle,
    className = '',
    ...props
}) => {
    return (
        <div className={`form-group ${className}`} style={containerStyle}>
            {label && (
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                    {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
                </label>
            )}
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows={rows}
                className={error ? 'error' : ''}
                placeholder={placeholder}
                style={{
                    width: '100%',
                    padding: '0.625rem 0.8rem',
                    border: error ? '1px solid var(--danger)' : '1px solid var(--border-main)',
                    borderRadius: 'var(--radius-sm)',
                    outline: 'none',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease',
                    resize: 'vertical',
                    ...style
                }}
                {...props}
            />
            {error && <div className="error-text">{error}</div>}
        </div>
    );
};

export default BaseTextArea;
