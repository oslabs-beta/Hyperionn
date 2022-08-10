import React, { useRef, useState } from "react"
import { Card, Alert } from "react-bootstrap"
import { useAuth } from "./AuthContext";
import { Link, useHistory, useNavigate } from "react-router-dom"
import { Box, Button, TextField } from '@mui/material';
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import logo from './assets/Hyperion.png';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, loginWithGoogle, loginWithGithub } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {

    e.preventDefault()
    console.log('email ref', emailRef.current.value)
    console.log('pw ref', passwordRef.current.value)

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate("/dashboard")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  async function handleGoogle(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      const result = await loginWithGoogle();
      console.log(result);
      navigate("/dashboard")
    // setTimeout(()=>navigate("/dashboard"),5000)

    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }
  async function handleGithub(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      
      const result = await loginWithGithub();
    //   setTimeout(()=>navigate("/dashboard"),5000)
      navigate('/dashboard')
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }


  return (
    <div className="login-page">
      <Box className="login-box">
        <Box className="logo-box">
        <img src={logo} width="200px" height="200px"></img>
        </Box>
        <Box className="login-text-box">
          <h2>Welcome Back</h2>
          {/* <Box className='logo'>
            <img src={logo} width="30px" height="30px"></img>
          </Box> */}
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <TextField 
                size="small" 
                label="Email" 
                inputRef={emailRef}
                sx={{
                  backgroundColor: "#fefefe",
                  color: "#f39566",
                  "&:hover": {
                    color: "#63489b",
                  },
                }}  
                />
            </div>
            <div className="form-input">
              <TextField 
                size="small" 
                label="Password" 
                type="password" 
                inputRef={passwordRef} 
                sx={{
                    backgroundColor: "#fefefe",
                    color: "#f39566",
                    "&:hover": {
                      color: "#63489b",
                    },
                }} 
                />
            </div>
            <div className="form-button">
              <Button className="button" disabled={loading} type="submit" sx={{color: "#f39566", width: "195px", border: "1px solid #ececec", margin:"10px"}}>Log In</Button>
              <Button className="button" sx={{color: "#f39566", width: "195px" }} onClick={handleGoogle}>
                <GoogleIcon></GoogleIcon>
              </Button>
              <Button className="button" sx={{color: "#f39566", width: "190px" }} onClick={handleGithub}>
                <GitHubIcon></GitHubIcon>
              </Button>
            </div>
          </form>
          <div className="form-input">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div>
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Box>
     </Box>
    </div>
  )
}

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// export default function FormPropsTextFields() {
//   return (
//     <Box
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <div>
//         <TextField
//           required
//           id="outlined-required"
//           label="Required"
//           defaultValue="Hello World"
//         />
//         <TextField
//           disabled
//           id="outlined-disabled"
//           label="Disabled"
//           defaultValue="Hello World"
//         />
//         <TextField
//           id="outlined-password-input"
//           label="Password"
//           type="password"
//           autoComplete="current-password"
//         />
//         <TextField
//           id="outlined-read-only-input"
//           label="Read Only"
//           defaultValue="Hello World"
//           InputProps={{
//             readOnly: true,
//           }}
//         />
//         <TextField
//           id="outlined-number"
//           label="Number"
//           type="number"
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//         <TextField id="outlined-search" label="Search field" type="search" />
//         <TextField
//           id="outlined-helperText"
//           label="Helper text"
//           defaultValue="Default Value"
//           helperText="Some important text"
//         />
//       </div>
//       <div>
//         <TextField
//           required
//           id="filled-required"
//           label="Required"
//           defaultValue="Hello World"
//           variant="filled"
//         />
//         <TextField
//           disabled
//           id="filled-disabled"
//           label="Disabled"
//           defaultValue="Hello World"
//           variant="filled"
//         />
//         <TextField
//           id="filled-password-input"
//           label="Password"
//           type="password"
//           autoComplete="current-password"
//           variant="filled"
//         />
//         <TextField
//           id="filled-read-only-input"
//           label="Read Only"
//           defaultValue="Hello World"
//           InputProps={{
//             readOnly: true,
//           }}
//           variant="filled"
//         />
//         <TextField
//           id="filled-number"
//           label="Number"
//           type="number"
//           InputLabelProps={{
//             shrink: true,
//           }}
//           variant="filled"
//         />
//         <TextField
//           id="filled-search"
//           label="Search field"
//           type="search"
//           variant="filled"
//         />
//         <TextField
//           id="filled-helperText"
//           label="Helper text"
//           defaultValue="Default Value"
//           helperText="Some important text"
//           variant="filled"
//         />
//       </div>
//       <div>
//         <TextField
//           required
//           id="standard-required"
//           label="Required"
//           defaultValue="Hello World"
//           variant="standard"
//         />
//         <TextField
//           disabled
//           id="standard-disabled"
//           label="Disabled"
//           defaultValue="Hello World"
//           variant="standard"
//         />
//         <TextField
//           id="standard-password-input"
//           label="Password"
//           type="password"
//           autoComplete="current-password"
//           variant="standard"
//         />
//         <TextField
//           id="standard-read-only-input"
//           label="Read Only"
//           defaultValue="Hello World"
//           InputProps={{
//             readOnly: true,
//           }}
//           variant="standard"
//         />
//         <TextField
//           id="standard-number"
//           label="Number"
//           type="number"
//           InputLabelProps={{
//             shrink: true,
//           }}
//           variant="standard"
//         />
//         <TextField
//           id="standard-search"
//           label="Search field"
//           type="search"
//           variant="standard"
//         />
//         <TextField
//           id="standard-helperText"
//           label="Helper text"
//           defaultValue="Default Value"
//           helperText="Some important text"
//           variant="standard"
//         />
//       </div>
//     </Box>
//   );
// }
