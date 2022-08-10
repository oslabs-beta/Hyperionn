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
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <TextField size="small" label="Email" inputRef={emailRef}  required />
            </div>
            <div className="form-button">
              <Button disabled={loading} className="button" type="submit">Reset Password</Button>
            </div>
          </form>
          <div className="form-input">
            <Link to="/">Login</Link>
          </div>
          <div className="form-input">
            Need an account? <Link to="/signup">Sign up</Link>
          </div>
       </Box>
    </Box>
</div>
  )
}