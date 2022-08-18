import './app.scss';
import React from "react"
import Signup from "./Signup"
import { Container } from "@mui/material"
import { AuthProvider } from "./AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainDisplay from './Containers/MainDisplay';
import Login from './Login';
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import ErrorLogDisplay from './Containers/ErrorLogDisplay';
// import { io } from "socket.io-client";
// const { io } = require("socket.io-client");

// const socket = io("https://localhost:3500");
// console.log('SOCKETClientSide: ', socket)
// // send a message to the server
// socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// // receive a message from the server
// socket.on("hello from server", (...args) => {
//   // ...
//   console.log("ARG IM A PIRATE: ", ...args)
//   console.log(socket.id)
// });
const socket = io('ws://localhost:3500');

socket.on('message', text => {
  console.log('TEXT: ', text)
  console.log(socket.id)
    // const el = document.createElement('li');
    // el.innerHTML = text;
    // document.querySelector('ul').appendChild(el)

});



function App() {
  return (
    // <Container className="main-app" style={{ minHeight: "100vh", minWidth:"100vw" }}>
        <Router>
          <AuthProvider>
            <Routes>
            {/* <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<MainDisplay/>}/>
          </Route> */}
              <Route path ='/errorlogs' element={<ErrorLogDisplay/>}/>
              <Route path ='/dashboard' element={<MainDisplay/>}/>
              {/* <Route exact path="/" element={<PrivateRoute/>}>
                <Route exact path = '/' element = {<MainDisplay/>}/>
              </Route> */}
              {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
              <Route path="/signup" element={<Signup/>} />
              <Route path="/" element={<Login/>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
            </Routes>
          </AuthProvider>
        </Router>
    //  </Container>
  )
}



export default App;
