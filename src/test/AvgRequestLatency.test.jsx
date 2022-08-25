import React from 'react';
import {render, screen} from '@testing-library/react';
import {describe, it, expect, test} from 'vitest'
//import { BrowserRouter} from 'react-router-dom';
import AvgRequestLatency, {makeDataSets} from '../Components/AvgRequestLatency';
// import StreamingPlugin from 'chartjs-plugin-streaming';
// import Chart from 'chart.js/auto';
// import { Line} from "react-chartjs-2";
import 'chartjs-adapter-luxon';
//const avgDatSets = [{x:1,y:1}]
const incomingDataArray = [{x:1,y:1}]
// const makeDataSets = vi.fn(() => {})
// //incomingDataArray.length  = 1
const dataSets = vi.spyOn(incomingDataArray, 'makeDataSets')
const dataPoints = [{x:2,y:2}]
describe('average request latency takes in state', () => {
  //const incomingDataArray = []
  //const {canvas} = uçndefined || {};
  it('renders', () => {
    render(<AvgRequestLatency/>)
    makeDataSets.mockReturnValue({x:1,y:2})
  })


})