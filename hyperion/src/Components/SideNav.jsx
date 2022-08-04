import React, { useState, useEffect } from 'react'
import { Button, Box } from '@mui/material';

const SideNav = () => {

const button = {
  color: "$lightGrey",
}

    return (
        <div className="side-nav">
          <Button variant="text" color="secondary">Connect</Button>
          <Button variant="text" sx={button}>Error Logs</Button>
          <Button variant="text" sx={button}>Topics</Button>
        </div>
    )
};

export default SideNav;