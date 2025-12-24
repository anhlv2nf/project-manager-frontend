import React from 'react';

const BaseBadge = ({ type, children, className = '', ...props }) => {
    const getBadgeClass = () => {
        switch (type) {
            case 'success': return 'badge-success';
            case 'warning': return 'badge-warning';
            case 'danger': return 'badge-danger';
            case 'primary': return 'badge-primary';
            default: return '';
        }
    };

    return (
        <span className={`badge ${getBadgeClass()} ${className}`} {...props}>
            {children}
        </span>
    );
};

export default BaseBadge;
