import React from 'react'
import { render, screen, cleanup} from '@testing-library/react';
import Signup from '../Pages/Signup.jsx'
import { describe, expect, it, vi, beforeEach, afterEach, test} from 'vitest';
import { BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";

//const submitTest = vi.fn(() => 0)


describe('sign up works', async() => {

  afterEach(cleanup)
 
  

  test("Login Rendering",  () => {
    render(<BrowserRouter>
      <Signup/>
    </BrowserRouter>)
        const email = screen.getByRole('emailText'); 
        const password = screen.getByRole('password'); 
        const confirmPassword = screen.getByRole("confirmPassword");
        const signUpBttn = screen.getByRole('signUp')
        expect(email).toBeInTheDocument();
        expect(email.value).toBe(undefined)
        expect(password).toBeInTheDocument();
        expect(password.value).toBe(undefined)
        expect(confirmPassword).toBeInTheDocument();
        expect(confirmPassword.value).toBe(undefined)
        expect(signUpBttn).toBeInTheDocument()  
      })
      
      test(('test'), async () => {
        render(<BrowserRouter>
          <Signup/>
        </BrowserRouter>)
      const email = await screen.getByRole('textbox', {name : /email/i}); 
      //expect(email).toBeInTheDocument()
      await userEvent.type(email, 'tonysoprano@gmail.com')
      expect(await email.value).toBe('tonysoprano@gmail.com')
      
      
      
    //   const password = await screen.getByRole('textbox', {name : /confirmpassword/i}); 
    //  // expect(passwordOne).toBeInTheDocument()
    //   await userEvent.type(password, 'joeyisgoodguy')
    //   expect(await password.value).toBe('joeyisagoodguy')




      // const passwordTwo = await screen.getByLabelText('ConfirmPassword'); 
      // //expect(passwordOne).toBeInTheDocument()
      // await userEvent.type(screen.findByLabelText('ConfirmPassword'), 'joeyisagoodguy')
      // expect(passwordTwo.value).toBe('joeyisagoodguy')
      
    
     })
    })

    











