import React from 'react'
import { Box, Button, Typography } from '@mui/material';
import GitHubIcon from "@mui/icons-material/GitHub";
import logo from '../assets/Hyperion.png';

const LoginPage = () => {

  const button = {
    backgroundColor: "white",
    borderRadius: "3px",
    padding: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100px",
  }

  return (
    <div className='login-page'>
      <div className='login-box'>
        <Box className='logo'>
          <img src={logo} width="70px" height="70px"></img>
        </Box>
        <Typography variant="h2" sx={{padding: '50px'}}>Hyperion</Typography>
        {/* <a href="/auth/google"> */}
          <Button sx={button}>
            <GitHubIcon></GitHubIcon>
          </Button>
        {/* </a> */}
      </div>
    </div>
  )
}

export default LoginPage;