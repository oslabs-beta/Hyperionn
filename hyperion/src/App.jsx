// import './app.scss';
// import React from 'react'
// import MainDisplay from './Containers/MainDisplay.jsx'
// import Login from './Login';
      
// function App() {
//   return (
//     <div className="MainDisplay">
//       <Login/>
//     </div>
//   );
// }

// export default App;

import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Dashboard from "./Dashboard"
import MainDisplay from './Containers/MainDisplay';
import Login from './Login'
// import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
// import UpdateProfile from "./UpdateProfile"

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <PrivateRoute exact path="/" element={<MainDisplay/>} />
              {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App;