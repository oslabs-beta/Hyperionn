import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material';

import Chart from 'chart.js/auto';
import { Line} from "react-chartjs-2";
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
// import { queryDictionary } from '../Containers/DataContainer.jsx';
//const { avgReqLatencyQuery } = queryDictionary;


Chart.register(StreamingPlugin);
  

const pollingInterval = 5000;

const ResponseRate = () => {
//ResponseRate = An average number of responses received per producer.
  let count = 0; 
  const [resRate, setResRate] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  
  // make Initial Fetch on Component Did Mount
  useEffect(()=> {
    initialFetch();
    count++;
  }, [])
  
  const makeDataSets = resData => {
    const output = [];
    for (let i = 0; i < resData.length; i++){
      let colorVal = Math.floor(Math.random() * 255)
      const obj = {
        label: resData[i].instance, 
        backgroundColor: `rgba(${colorVal}, ${colorVal}, ${colorVal}, 0.5)`,
        borderColor: `rgb(${colorVal}, ${colorVal}, ${colorVal})`,
        fill: false,
        data: [],
       }
      output.push(obj);
    }
    setResRate(output);
  }
  
  const initialFetch = async () => {
    const response = await fetch('/server/metrics?metric=responseRate');
    const data = await response.json();
    makeDataSets(data);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLatency();
    }, pollingInterval);
    return () => clearInterval(interval);
  },[count])
  
  
  const fetchLatency = async () =>  {
    const newDataPoints = [];
    const response = await fetch('/server/metrics?metric=responseRate');
    const newData = await response.json();
    for (let i = 0; i < newData.length; i++) {
      newDataPoints.push({x: newData[i].x, y: newData[i].y});
    }
    setDataPoints(newDataPoints);
  }
  

  return (
    <Box>
      <Line
        data={{
          datasets: resRate,
    
        }}
        options={{
          elements: {
            point:{
                radius: 0
            }
          },
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
                duration : 100000, 
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
            y: {
              max : 1,
            }
          }
        }}
      />
    </Box>
  )
}
export default ResponseRate;