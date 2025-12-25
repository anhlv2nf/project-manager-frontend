import React from 'react';

const BaseInput = ({
    label,
    error,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    style,
    containerStyle,
    className = '',
    icon,
    ...props
}) => {
    return (
        <div className={`form-group ${className}`} style={containerStyle}>
            {label && (
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                    {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
                </label>
            )}
            <div style={{ position: 'relative' }}>
                <input
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
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
                        paddingRight: icon ? '30px' : '0.8rem',
                        ...style
                    }}
                    {...props}
                />
                {icon && (
                    <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                        {icon}
                    </div>
                )}
            </div>
            {error && <div className="error-text">{error}</div>}
        </div>
    );
};

export default BaseInput;
