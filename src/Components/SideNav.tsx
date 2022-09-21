import React, { useState } from 'react'
import { Button, TextField, Drawer } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SideNav = (props) => {

  const [connectButton, setConnectButton] = React.useState(false);
  const navigate = useNavigate();


  const button: { color: string, width: string} = {
    color: "#a4a4a4",
    width: "150px"
  }

  const handleSubmit = () => {
    const port = (document.getElementById('port') as HTMLInputElement).value;
    const domain = (document.getElementById('domain') as HTMLInputElement).value;
    localStorage.setItem('port', port);
    localStorage.setItem('domain', domain);
    props.handlePortAndDomain(domain, port);
    setConnectButton(false)
  }

    return (
        <>
          {connectButton && (
            <div className="side-nav">
              <Button variant="text" sx={button} onClick={() => navigate('/dashboard')}>Home</Button>
              <TextField id="domain" label="Domain" variant="filled" sx={button}/>
              <TextField id="port" label="Port" variant="filled" sx={button}/>
              <Button variant="text" sx={button} onClick={()=> handleSubmit()}>Submit</Button>
              <Button variant="text" sx={button} onClick={() => navigate('/errorlogs')}>Error Logs</Button>
            </div>
          )}
          {!connectButton && (
            <div className="side-nav">
              <Button variant="text" sx={button} onClick={() => navigate('/dashboard')}>Home</Button>
              <Button variant="text" sx={button} onClick={()=> setConnectButton(true)}>Connect</Button>
              <Button variant="text" sx={button} onClick={() => navigate('/errorlogs')}>Error Logs</Button>
            </div> 
          )}
        </>
    )
};

export default SideNav;