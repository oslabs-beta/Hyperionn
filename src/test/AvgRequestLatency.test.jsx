import React from 'react';
import {render, screen} from '@testing-library/react';
import {describe, it, expect, test} from 'vitest'
import "@testing-library/jest-dom";
vi.mock('react-chartjs-2', () => ({
  Line: () => null
}));


//import { BrowserRouter} from 'react-router-dom';
import AvgRequestLatency, {makeDataPoints} from '../Components/AvgRequestLatency';


const avgReqLatency = {x: 1, y : 2}
const dataPoints = [{x:2,y:2}]
describe('average request latency takes in state', () => {

  it('renders and expects props', async () => {
    render(<AvgRequestLatency avgReqLatency={avgReqLatency}/>)
    expect(screen.getByRole('name')).toBeInTheDocument();
  })
 
})