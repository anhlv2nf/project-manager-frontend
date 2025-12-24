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
    ...props
}) => {
    return (
        <div className="form-group">
            {label && <label>{label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}</label>}
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={error ? 'error' : ''}
                placeholder={placeholder}
                {...props}
            />
            {error && <div className="error-text">{error}</div>}
        </div>
    );
};

export default BaseInput;
