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


// interface ServerToClientEvents {
//   noArg: () => void;
//   basicEmit: (a: number, b: string, c: Buffer) => void;
//   withAck: (d: string, callback: (e: number) => void) => void;
// }

// interface ClientToServerEvents {
//   hello: () => void;
// }

// interface InterServerEvents {
//   ping: () => void;
// }

// interface SocketData {
//   name: string;
//   age: number;
// }

// const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(); 
const socket = io('ws://localhost:3500');




// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     info: {
//       main: "#9d5ee1",
//     },
//   },
// });

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
        </ThemeProvider>
      </Router>
  )
}



export default App;
