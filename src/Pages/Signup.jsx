import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { Box, Button, TextField } from '@mui/material';
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import logo from '../assets/Hyperion.png';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth() || {}
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      console.log('email', emailRef.current.value)
      console.log('password', passwordRef.current.value)
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate("/dashboard")
    } catch {
      setError("Failed to create an account")
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
        <h2 className="text-center mb-4">Hyperion</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <TextField size="small" role='emailText' label="Email" ref={emailRef}  required />
            </div>
            <div className="form-input">
              <TextField size="small" role='password' label="PasswordOne" type="password" ref={passwordRef}  required />
            </div>
            <div className="form-input">
              <TextField size="small" role="confirmPassword" label="ConfirmPassword" type="password" ref={passwordConfirmRef}  required />
            </div>
            <div className="form-button">
              <Button disabled={loading} role ='signUp' className="button" type="submit" sx={{color: "#f39566", width: "195px", border: "1px solid #ececec", margin:"10px"}}>Sign Up</Button>
              <Button className="button" sx={{ color: "#f39566", width: "195px" }}>
                <GoogleIcon></GoogleIcon>
              </Button>
              <Button className="button" sx={{ color: "#f39566", width: "195px" }}>
                <GitHubIcon></GitHubIcon>
              </Button>
              </div>
            </form>
            <div className="form-input">
              Already have an account? <Link to="/">Log in</Link>
            </div>
          </Box>
        </Box>
    </div>
  )
}