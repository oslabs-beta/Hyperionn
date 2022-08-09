import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material';

import Chart from 'chart.js/auto';
import { Line} from "react-chartjs-2";
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
// import { queryDictionary } from '../Containers/DataContainer.jsx';
//const { avgReqLatencyQuery } = queryDictionary;


 Chart.register(StreamingPlugin);
  


const pollingInterval = 10000;

const BrokenRequestRate = () => {

  const [dataPoints, setDataPoints] = useState([]);


  useEffect(() => {
    const interval = setInterval(() => {
      fetchRequestRate();
    }, pollingInterval);
    return () => clearInterval(interval);
  },[])

  
  const fetchRequestRate = async () =>  {
    let newDataPoints = [];
    const response = await fetch('/server/metrics?metric=requestRate');
    const newData = await response.json();
    //console.log('new req request: ', newData);
    newDataPoints = [{x: newData[0].x, y: newData[0].y}];
   // console.log('newDataPoints: ', newDataPoints);
    setDataPoints(newDataPoints);
  }

  return (
    <Box>
      <Line
        data={{
            datasets:[{
              label: 'Connect Metrics Request Rate',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
              borderDash: [8, 4],
              fill: false,
              data: []
            }]
        }}
        options={{
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                delay: 5000,
                duration : 200000, //duration = x-axis maximum
                onRefresh: () => {
       
                  data.datasets[0].data.push({
                      x: newData[0].x,
                      y: newData[0].y
                  })

                }
              }
            }
          }
        }}
      />
    </Box>
  )
}


// dataPoints[index].y
export default BrokenRequestRate;