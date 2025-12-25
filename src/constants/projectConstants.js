export const PROJECT_STATUS = {
    PLANNED: 'planned',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    ON_HOLD: 'on_hold'
};

export const PROJECT_STATUS_LABELS = {
    [PROJECT_STATUS.PLANNED]: 'Đang lập kế hoạch',
    [PROJECT_STATUS.ACTIVE]: 'Đang triển khai',
    [PROJECT_STATUS.COMPLETED]: 'Đã hoàn thành',
    [PROJECT_STATUS.ON_HOLD]: 'Tạm dừng'
};

export const PROJECT_STATUS_TYPES = {
    [PROJECT_STATUS.PLANNED]: 'primary',
    [PROJECT_STATUS.ACTIVE]: 'warning',
    [PROJECT_STATUS.COMPLETED]: 'success',
    [PROJECT_STATUS.ON_HOLD]: 'danger'
};

export const PROJECT_MEMBER_ROLES = {
    MANAGER: 'manager',
    MEMBER: 'member'
};

export const PROJECT_MEMBER_ROLE_LABELS = {
    [PROJECT_MEMBER_ROLES.MANAGER]: 'Project Manager',
    [PROJECT_MEMBER_ROLES.MEMBER]: 'Thành viên'
};
