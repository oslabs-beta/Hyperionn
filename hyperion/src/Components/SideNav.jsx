import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';

const SideNav = () => {

const [connectButton, setConnectButton] = useState(false);

const button = {
  color: '#a4a4a4',
  letterSpacing: '1px',
  width: '120px'
}

    return (
        <>
          {connectButton && (
            <div className="side-nav">
              <TextField className="input" label="Domain" variant="filled" sx={button}/>
              <TextField className="input" label="Port" variant="filled" sx={button}/>
              <Button variant="text" sx={button} onClick={()=> setConnectButton(false)}>Submit</Button>
            </div>
          )}
          {!connectButton && (
            <div className="side-nav">
              <Button variant="text" sx={button} onClick={()=> setConnectButton(true)}>Connect</Button>
              <Button variant="text" sx={button}>Error Logs</Button>
              <Button variant="text" sx={button}>Topics</Button>
          </div> 
          )}
        </>
    )
};

export default SideNav;