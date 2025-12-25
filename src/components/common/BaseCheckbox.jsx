import React from 'react';

const BaseCheckbox = ({
    label,
    name,
    checked,
    onChange,
    disabled = false,
    error,
    style,
    containerStyle,
    className = '',
    ...props
}) => {
    return (
        <div className={`form-group ${className}`} style={{ marginBottom: '1rem', ...containerStyle }}>
            <label
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    gap: '0.5rem',
                    fontWeight: 500,
                    color: disabled ? 'var(--text-muted)' : 'var(--text-main)',
                    ...style
                }}
            >
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    style={{
                        width: '18px',
                        height: '18px',
                        accentColor: 'var(--primary)',
                        cursor: 'inherit'
                    }}
                    {...props}
                />
                {label}
            </label>
            {error && <div className="error-text" style={{ marginLeft: '26px' }}>{error}</div>}
        </div>
    );
};

export default BaseCheckbox;
