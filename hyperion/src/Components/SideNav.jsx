import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material';

const SideNav = () => {

    return (
        <div>
          <Button variant="text">Connect</Button>
          <Button variant="text">Error Logs</Button>
          <Button variant="text">Topics</Button>
        </div>
    )
};

export default SideNav;