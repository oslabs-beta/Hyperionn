
import "@testing-library/jest-dom";
import React from 'react'
import {render, screen} from '@testing-library/react';
import {describe, it, expect, test} from 'vitest'
import { BrowserRouter} from 'react-router-dom';

import Login from '../Pages/Login';

describe("please work", () => {
  test("Login Rendering", () => {
    render(<BrowserRouter>
            <Login/>
      </BrowserRouter>); 
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
    
