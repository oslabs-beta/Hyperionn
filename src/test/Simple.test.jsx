 /**
 * @jest-environment jsdom
 */
import React from 'react'
// import render from 'react'
import { render, screen} from '@testing-library/react';
import Simple from "../Simple";
import { describe, expect, it } from 'vitest';
import "@testing-library/jest-dom";




describe('Simple', () => {
  it('test', async () => {
   render(<Simple/>)
  expect(screen.getByText('hello')).toBeInTheDocument()
  })
})


// moduleNameMapper: {
//   "^.+\\.(css|less|scss|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "identity-obj-proxy"
// },