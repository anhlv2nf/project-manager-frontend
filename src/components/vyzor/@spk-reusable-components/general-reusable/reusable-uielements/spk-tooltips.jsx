import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const SpkTooltips = ({ title, id, children, tooltipClass, trigger, placement }) => {
    return (
        <OverlayTrigger placement={placement} trigger={trigger} overlay={<Tooltip id={id} className={tooltipClass} >{title}</Tooltip>} >
            {children}
        </OverlayTrigger>
    )
}

export default SpkTooltips
