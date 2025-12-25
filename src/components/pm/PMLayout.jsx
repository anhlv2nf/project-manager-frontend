import React from 'react';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import PMProcessHeader from './PMProcessHeader';
import PMProcessSidebar from './PMProcessSidebar';

const PMLayout = () => {
    const { process } = useParams();
    const location = useLocation();

    // Determine if we are in "Process Mode" (valid process param)
    // Note: When at /pm, process is undefined.
    // When at /pm/planning/..., process is 'planning'.
    const isProcessMode = !!process;

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
            <PMProcessHeader activeProcess={process} />

            <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
                {isProcessMode && (
                    <PMProcessSidebar activeProcess={process} />
                )}

                <div style={{
                    flex: 1,
                    marginLeft: isProcessMode ? '240px' : '0',
                    transition: 'margin-left 0.3s ease',
                    width: '100%'
                }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default PMLayout;
