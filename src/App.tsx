import './app.scss';
import React from "react"
import { Container } from "@mui/material"
import { AuthProvider } from "./Pages/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainDisplay from './Pages/MainDisplay';
import Login from './Pages/Login';
import Signup from "./Pages/Signup";
import PrivateRoute from "./Pages/PrivateRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import ErrorLogDisplay from './Pages/ErrorLogDisplay';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { io } from "socket.io-client";
 
const socket = io('ws://localhost:3500');

const theme = createTheme({
  palette: {
    primary: {
      main: "#63489b",
      light: "#d8d8d8",
      dark: "#120a27",
    },
    secondary: {
      main: "#f39566",
      light: "#f3be66",
      dark: "#ce10fa",
    },
  },
});


const App: React.FC = () => {
  return (
      <Router>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Routes>
              <Route path ='/errorlogs' element={<ErrorLogDisplay/>}/>
              <Route path ='/dashboard' element={<MainDisplay/>}/>
              <Route path="/signup" element={<Signup/>} />
              <Route path="/" element={<Login/>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </Router>
  )
}

export default App;
