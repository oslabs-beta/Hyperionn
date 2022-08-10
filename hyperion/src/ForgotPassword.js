import React, { useRef, useState } from "react"
import { Alert } from "react-bootstrap"
import { useAuth } from "./AuthContext"
import { Link } from "react-router-dom"
import { Box, Button, TextField } from '@mui/material';
import logo from './assets/Hyperion.png';

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
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
          <h2 className="text-center mb-4">Reset Password</h2>
          <h4 className="text-center mb-4">Enter email to verify password reset</h4>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <TextField size="small" label="Email" inputRef={emailRef}  required />
            </div>
            <div className="form-button">
              <Button disabled={loading} className="button" type="submit" sx={{color: "#f39566", width: "195px", border: "1px solid #ececec", margin:"10px"}}>Verify Email</Button>
            </div>
          </form>
          <div className="form-input">
            Need an account? <Link to="/signup">Sign up</Link>
          </div>
       </Box>
    </Box>
</div>
  )
}