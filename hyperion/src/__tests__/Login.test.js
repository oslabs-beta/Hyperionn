//import {render, waitFor, screen} from '@testing-library/react'
//import '@testing-library/jest-dom'
//import regeneratorRuntime from 'regenerator-runtime';
//kristin is a nice lady

import Login from '../Login.js';
//import NavBar from '../Components/NavBar';

// describe('Addition', () => {
//     it('knows that 2 and 2 make 4', () => {
//       expect(2 + 2).toBe(4);
//     });
//   });



describe("please work", () => {
    test("Login Rendering", () => {
        render(<Login/>); // Rendering the App
        const google = screen.getByTestId("google-button"); 
        const login = screen.getByTestId("login-button");
        const github = screen.getByTestId("github-button");
        expect(google).toBeInTheDocument();
        expect(login).toBeInTheDocument();
        expect(github).toBeInTheDocument();
    })
})
