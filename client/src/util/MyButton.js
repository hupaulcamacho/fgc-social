import React from 'react'

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

export default function MyButton ({ children, onClick, tip, btnClassName, tipClassName}) {
    return (
        <Tooltip title={tip} className={tipClassName}>
            <IconButton onClick={onClick} className={btnClassName}>
                {children}
            </IconButton>
        </Tooltip>
    );
};