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
        <div className="pm-dashboard-container fade-in" style={{
            background: 'radial-gradient(circle at top right, #f8fafc, #f1f5f9, #e2e8f0)',
            position: 'relative'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem', zIndex: 10, position: 'relative' }}>
                <div style={{
                    display: 'inline-block',
                    padding: '0.4rem 1rem',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    PMP Lifecycle
                </div>
                <h1 style={{
                    fontSize: '2.5rem',
                    background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '-0.03em'
                }}>
                    Project Workspace
                </h1>
                <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
                    Hệ thống quản lý dự án chuyên nghiệp tối ưu theo quy trình 5 bước cốt lõi.
                    Bắt đầu bằng việc chọn một giai đoạn bên dưới.
                </p>
            </div>

            <div className="pm-process-map" style={{ zIndex: 10, gap: '1rem' }}>
                {steps.map((step, index) => (
                    <React.Fragment key={step.key}>
                        <div
                            className={`pm-node ${step.key}`}
                            onClick={() => navigate(`/pm/${step.key}`)}
                            style={{
                                '--node-color': step.color,
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                                background: 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '20px',
                                width: '200px',
                                height: '160px',
                                padding: '1.25rem'
                            }}
                        >
                            <div className="pm-node-icon" style={{
                                color: step.color,
                                background: 'white',
                                boxShadow: `0 4px 10px rgba(0,0,0,0.05)`,
                                width: '48px',
                                height: '48px',
                                fontSize: '1.25rem'
                            }}>
                                {step.icon}
                            </div>
                            <div className="pm-node-title" style={{ fontSize: '1.05rem', fontWeight: 700 }}>{PMP_LABELS[step.key]}</div>
                            <div className="pm-node-desc" style={{ padding: '0', fontSize: '0.75rem' }}>
                                {PMP_DESCRIPTIONS[step.key].split(',')[0]}
                            </div>
                        </div>

                        {index < steps.length - 1 && (
                            <div className="pm-connector" style={{ minWidth: '40px', height: '1px', background: `linear-gradient(to right, ${step.color}40, ${steps[index + 1].color}40)` }}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Decorative background glass circles */}
            <div style={{
                position: 'absolute',
                top: '15%',
                left: '20%',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(168,85,247,0.05) 100%)',
                filter: 'blur(80px)',
                zIndex: 0
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '15%',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(59,130,246,0.05) 100%)',
                filter: 'blur(60px)',
                zIndex: 0
            }}></div>
        </div>
    );
};

export default PMDashboard;
