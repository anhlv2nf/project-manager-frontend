import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PMP_PROCESSES, PMP_LABELS, PMP_DESCRIPTIONS } from '../../constants/pmConstants';

const PMDashboard = () => {
    const navigate = useNavigate();

    const steps = [
        { key: PMP_PROCESSES.INITIATION, icon: '🚀', color: '#3b82f6' },
        { key: PMP_PROCESSES.PLANNING, icon: '📋', color: '#8b5cf6' },
        { key: PMP_PROCESSES.EXECUTION, icon: '⚙️', color: '#10b981' },
        { key: PMP_PROCESSES.MONITORING, icon: '📊', color: '#f59e0b' },
        { key: PMP_PROCESSES.CLOSING, icon: '🏁', color: '#ef4444' },
    ];

    return (
        <div className="pm-dashboard-container fade-in">
            <div style={{ textAlign: 'center', marginBottom: '3rem', zIndex: 2 }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1rem',
                    fontWeight: 800
                }}>
                    Project Management Workspace
                </h1>
                <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                    Chọn một giai đoạn trong vòng đời dự án để bắt đầu quản lý và theo dõi tiến độ.
                </p>
            </div>

            <div className="pm-process-map">
                {steps.map((step, index) => (
                    <React.Fragment key={step.key}>
                        <div
                            className={`pm-node ${step.key}`}
                            onClick={() => navigate(`/pm/${step.key}`)}
                            style={{ '--node-color': step.color }}
                        >
                            <div className="pm-node-icon" style={{ color: step.color, background: `${step.color}15` }}>
                                {step.icon}
                            </div>
                            <div className="pm-node-title">{PMP_LABELS[step.key]}</div>
                            <div className="pm-node-desc">
                                {PMP_DESCRIPTIONS[step.key].split(',')[0]}...
                            </div>
                        </div>

                        {index < steps.length - 1 && (
                            <div className="pm-connector"></div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Decorative background elements */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(255,255,255,0) 70%)',
                zIndex: 0
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(255,255,255,0) 70%)',
                zIndex: 0
            }}></div>
        </div>
    );
};

export default PMDashboard;
