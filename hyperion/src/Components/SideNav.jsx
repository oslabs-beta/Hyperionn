import React from 'react'
import { Button } from '@mui/material';

const SideNav = () => {

    const button = {
        color: '#a4a4a4',
        letterSpacing: '1px'
    }

    return (
        <div className="side-nav">
          <Button variant="text" sx={button}>Connect</Button>
          <Button variant="text" sx={button}>Error Logs</Button>
          <Button variant="text" sx={button}>Topics</Button>
        </div>
    )
};

export default SideNav;