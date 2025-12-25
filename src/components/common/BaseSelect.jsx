import React from 'react';

const BaseSelect = ({
    label,
    value,
    onChange,
    options = [],
    placeholder,
    error,
    required,
    name,
    style,
    containerStyle,
    className = '',
    ...props
}) => {
    return (
        <div className={`${label ? 'form-group' : ''} ${className}`} style={containerStyle}>
            {label && (
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                    {label}{required && <span style={{ color: 'var(--danger)' }}> *</span>}
                </label>
            )}
            <select
                name={name}
                value={value}
                onChange={onChange}
                style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: error ? '1px solid var(--danger)' : '1px solid var(--border-main)',
                    background: 'white',
                    outline: 'none',
                    ...style
                }}
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <div className="error-text" style={{ marginTop: '0.25rem' }}>{error}</div>}
        </div>
    );
};

export default BaseSelect;
