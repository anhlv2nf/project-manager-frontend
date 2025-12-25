export const PMP_PROCESSES = {
    INITIATION: 'initiation',
    PLANNING: 'planning',
    EXECUTION: 'execution',
    MONITORING: 'monitoring',
    CLOSING: 'closing'
};

export const PMP_LABELS = {
    [PMP_PROCESSES.INITIATION]: 'Initiation',
    [PMP_PROCESSES.PLANNING]: 'Planning',
    [PMP_PROCESSES.EXECUTION]: 'Execution',
    [PMP_PROCESSES.MONITORING]: 'Monitoring & Control',
    [PMP_PROCESSES.CLOSING]: 'Closing'
};

export const PMP_DESCRIPTIONS = {
    [PMP_PROCESSES.INITIATION]: 'Xác định dự án mới hoặc giai đoạn mới, xin phê duyệt điều lệ dự án.',
    [PMP_PROCESSES.PLANNING]: 'Thiết lập phạm vi, mục tiêu và xác định phương hướng hành động.',
    [PMP_PROCESSES.EXECUTION]: 'Hoàn thành công việc được xác định trong kế hoạch quản lý dự án.',
    [PMP_PROCESSES.MONITORING]: 'Theo dõi, xem xét và điều chỉnh tiến độ và hiệu suất.',
    [PMP_PROCESSES.CLOSING]: 'Hoàn tất tất cả các hoạt động để chính thức đóng dự án hoặc giai đoạn.'
};

export const PMP_SIDEBAR_MENU = {
    [PMP_PROCESSES.INITIATION]: [
        { label: 'Project Charter', path: 'project-charter' },
        { label: 'Stakeholders', path: 'stakeholder-register' }
    ],
    [PMP_PROCESSES.PLANNING]: [
        { label: 'Scope Management', path: 'scope' },
        { label: 'Schedule (WBS)', path: 'schedule' },
        { label: 'Cost Management', path: 'cost' },
        { label: 'Quality Plan', path: 'quality' },
        { label: 'Resource Plan', path: 'resources' }
    ],
    [PMP_PROCESSES.EXECUTION]: [
        { label: 'Direct & Manage Work', path: 'work-management' },
        { label: 'Project Knowledge', path: 'knowledge' },
        { label: 'Team Management', path: 'team' }
    ],
    [PMP_PROCESSES.MONITORING]: [
        { label: 'Monitor Work', path: 'monitor-work' },
        { label: 'Change Control', path: 'change-requests' },
        { label: 'Validate Scope', path: 'qa-qc' }
    ],
    [PMP_PROCESSES.CLOSING]: [
        { label: 'Close Project', path: 'close-project' },
        { label: 'Lessons Learned', path: 'lessons-learned' }
    ]
};
