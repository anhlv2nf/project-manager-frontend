import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PMP_PROCESSES, PMP_LABELS } from '../../constants/pmConstants';

const PMProcessHeader = ({ activeProcess }) => {
    const navigate = useNavigate();

    return (
        <div className="glass-header" style={{
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 90
        }}>
            <div
                style={{
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    marginRight: '3rem',
                    cursor: 'pointer',
                    color: 'var(--primary)'
                }}
                onClick={() => navigate('/pm')}
            >
                PM Workspace
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flex: 1, overflowX: 'auto' }}>
                {Object.values(PMP_PROCESSES).map(process => {
                    const isActive = process === activeProcess;
                    return (
                        <div
                            key={process}
                            onClick={() => navigate(`/pm/${process}`)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s',
                                background: isActive ? 'var(--primary)' : 'transparent',
                                color: isActive ? 'white' : 'var(--text-muted)',
                            }}
                        >
                            {PMP_LABELS[process]}
                        </div>
                    );
                })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button className="btn" onClick={() => navigate('/')} style={{ fontSize: '0.8rem' }}>
                    Admin View
                </button>
            </div>
        </div>
    );
};

export default PMProcessHeader;
