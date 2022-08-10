import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./AuthContext";
import { Link, useHistory, useNavigate } from "react-router-dom"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, loginWithGoogle, loginWithGithub } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

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
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      
      <div><Button onClick={handleGoogle} className="w-100" type="submit">
              Sign in with Google
            </Button>
            <Button onClick={handleGithub} className="w-100" type="submit">
              Sign in with github
            </Button></div>
    </>
  )
}