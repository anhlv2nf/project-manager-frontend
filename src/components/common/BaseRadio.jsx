import React from 'react';

const BaseRadio = ({
    label,
    name,
    value,
    options = [],
    onChange,
    disabled = false,
    error,
    direction = 'horizontal', // 'horizontal' | 'vertical'
    required,
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
            <div style={{
                display: 'flex',
                flexDirection: direction === 'vertical' ? 'column' : 'row',
                gap: direction === 'vertical' ? '0.5rem' : '1.5rem',
                flexWrap: 'wrap'
            }}>
                {options.map((option) => (
                    <label
                        key={option.value}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: disabled ? 'not-allowed' : 'pointer',
                            gap: '6px',
                            fontWeight: 400,
                            color: disabled ? 'var(--text-muted)' : 'var(--text-main)'
                        }}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange({ target: { name, value: option.value } })}
                            disabled={disabled || option.disabled}
                            style={{
                                width: '18px',
                                height: '18px',
                                accentColor: 'var(--primary)',
                                margin: 0,
                                cursor: 'inherit'
                            }}
                            {...props}
                        />
                        {option.label}
                    </label>
                ))}
            </div>
            {error && <div className="error-text">{error}</div>}
        </div>
    );
};

export default BaseRadio;
