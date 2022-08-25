import React from 'react';
import {render, screen} from '@testing-library/react';
import {describe, it, expect, test} from 'vitest'
import "@testing-library/jest-dom";
vi.mock('react-chartjs-2', () => ({
  Line: () => null
}));


//import { BrowserRouter} from 'react-router-dom';
import AvgRequestLatency, {makeDataPoints} from '../Components/AvgRequestLatency';
//import * as data from "../Components/AvgRequestLatency'

const avgReqLatency = {x: 1, y : 2}
//const dataSets = vi.spyOn(incomingDataArray, makeDataSets)
const dataPoints = [{x:2,y:2}]
describe('average request latency takes in state', () => {
  //const incomingDataArray = []
  //const {canvas} = uçndefined || {};
  it('renders and expects props', async () => {
    render(<AvgRequestLatency avgReqLatency={avgReqLatency}/>)
    //const spy = dataSets.mockImplementation(() => dataPoints)
    //makeDataSets.mockReturnValue({x:1,y:2})
    //expect(spy).toBe([{x:2,y:2}])
    //const mock = vi.spyOn(data, "makeDataPoints").mockReturnValue(avgReqLatency)
    expect(screen.getByRole('name')).toBeInTheDocument();

  //mock.mockRestore();
  })


})