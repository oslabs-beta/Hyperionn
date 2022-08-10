import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const SideNav = () => {

const [connectButton, setConnectButton] = useState(false);

const button = {
  color: '#a4a4a4',
  letterSpacing: '1px',
  width: '120px'
}

const handleSubmit = async () => {
  //get the values of the needed imputs to send to server
  const port = document.getElementById('port');
  const domain = document.getElementById('domain');
  try{
    axios.post('/server/metrics', { port: port.value, domain: domain.value })
    setConnectButton(false);
  }
  catch(error){
    console.log('error sending data')
  }
}

    return (
        <>
          {connectButton && (
            <div className="side-nav">
              <TextField id="domain" label="Domain" variant="filled" sx={button}/>
              <TextField id="port" label="Port" variant="filled" sx={button}/>
              <Button variant="text" sx={button} onClick={()=> handleSubmit()}>Submit</Button>
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