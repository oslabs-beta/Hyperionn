import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material';
import Chart from 'chart.js/auto';
import { Line} from "react-chartjs-2";
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';



Chart.register(StreamingPlugin);
  

// const pollingInterval = 5000;

const ResponseRate = ({responseRate}) => {
//ResponseRate = An average number of responses received per producer.

  const [resRateSets, setResRateSets] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  
  useEffect(()=> {
    if (!resRateSets.length){
      makeDataSets(responseRate);
    }
    makeDataPoints(responseRate);
    console.log('responseRate sets: ', resRateSets)
    console.log('responseRate: ', responseRate)
  }, [responseRate])
  
  const makeDataSets = resData => {
    const output = [];
    for (let i = 0; i < resData.length; i++){
      let colorVal = Math.floor(Math.random() * 255)
      const obj = {
        label: resData[i].instance, 
        backgroundColor: `#f39566`,
        borderColor: `#f39566`,
        fill: false,
        data: [],
       }
      output.push(obj);
    }
    setResRateSets(output);
  }
  
  
  function makeDataPoints(newData) {
    const newDataPoints = [];
    for (let i = 0; i < newData.length; i++) {
      newDataPoints.push({x: newData[i].x, y: newData[i].y});
    }
    setDataPoints(newDataPoints);
    // localStorage.setItem('Request Rate', JSON.stringify(newDataPoints));
  }
  

  return (
    <Box>
      <Line
        data={{
          datasets: resRateSets,
    
        }}
        options={{
          elements: {
            point:{
                radius: 0
            }
          },
          animation: true,
          plugins: {
            title: {
              display: true,
              text: 'Response Rate'
            }
        },
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                duration : 200000, 
                refresh: 5000,
                onRefresh: chart => {
                  chart.data.datasets.forEach((resRateInstance, index, array) => {
                    resRateInstance.data.push({
                      x: dataPoints[index].x,
                      y: dataPoints[index].y
                    });
                  });
                }
              }
            },
          }
        }}
      />
    </Box>
  )
}
export default ResponseRate;