// import App from '../App.jsx';
import React from 'react'
import {render, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import regeneratorRuntime from 'regenerator-runtime';
//kristin is a nice lady

// import '../app.scss';
//import React from "react"
//import Signup from "./Signup"
//const Login = require("../Login")
// import { Container } from "@mui/material"
// import { AuthProvider } from "./AuthContext"
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MainDisplay from './Containers/MainDisplay';
//import App from '../App.jsx';
import NavBar from '../Components/NavBar';
// import PrivateRoute from "./PrivateRoute";
// import ForgotPassword from "./ForgotPassword";
// import ErrorLogDisplay from './Containers/ErrorLogDisplay';

describe('Addition', () => {
    it('knows that 2 and 2 make 4', () => {
      expect(2 + 2).toBe(4);
    });
  });



// describe("please work", () => {
//     test("Login Rendering", () => {
//         render(<Login/>); // Rendering the App
//         const google = screen.getByTestId("google-button"); 
//         const login = screen.getByTestId("login-button");
//         const github = screen.getByTestId("github-button");
//         expect(google).toBeInTheDocument();
//         expect(login).toBeInTheDocument();
//         expect(github).toBeInTheDocument();
//     })
// })
