

import React from 'react'
import {render, screen} from '@testing-library/react';
import {describe, it, expect, test} from 'vitest'
import { BrowserRouter} from 'react-router-dom';
//import { useNavigate } from 'react-router';
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";
// import logo from '../assets/Hyperion.png';

import Login from '../Pages/Login';
//import NavBar from '../Components/NavBar';


describe("please work", () => {
  test("Login Rendering", () => {
    render(<BrowserRouter>
            <Login/>
      </BrowserRouter>); // Rendering the App
        const google = screen.getByRole("google-button"); 
        const login = screen.getByRole("login-button");
        const github = screen.getByRole("github-button");
        expect(google).toBeInTheDocument();
        expect(login).toBeInTheDocument();
        expect(github).toBeInTheDocument();
      })
    })
    
    describe('Addition', () => {
        it('knows that 2 and 2 make 4', () => {
          expect(2 + 2).toBe(4);
        });
      });
    
