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
  const [resRate, setresRate] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  
  useEffect(()=> {
    // make Initial Fetch on Component Did Mount
    initialFetch();
    // console.log('initial useEffect ');
    count++;
   //console.log(Date.now());
  }, [])
  
  // const initialFetch = async () => {
  //   //checks how many zookeepers there are.

  const makeDataSets = resData => {
    const output = [];
    for (let i = 0; i < resData.length; i++){
      let colorVal = Math.floor(Math.random() * 255)
      const obj = {
        label: resData[i].instance, //make more specific by pulling the actual name
        backgroundColor: `rgba(${colorVal}, ${colorVal}, ${colorVal}, 0.5)`,
        borderColor: `rgb(${colorVal}, ${colorVal}, ${colorVal})`,
        fill: false,
        data: [],
       }
      output.push(obj);
    }
    setresRate(output);
    // console.log('output', output);
  }
  
  const initialFetch = async () => {
    const response = await fetch('/server/metrics?metric=responseRate');
    const data = await response.json();
    // console.log('Avg request latency: ', data);
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
          // spanGaps: true,
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
                // delay: 1000,
                duration : 100000, //duration = x-axis maximum
                refresh: 5000,
                onRefresh: chart => {
                  console.log(Date.now());
                  chart.data.datasets.forEach((resRateInstance, index, array) => {
                    // console.log('zookeeper instance', zooKeeperInstance.data.dataSets);
                    //console.log('dataPoints[index].x', dataPoints[index].x);
                    //console.log('dataPoints[index].y', dataPoints[index].y);
                    //console.log('zooKeeperInstance.data Array', zooKeeperInstance.data)
                    resRateInstance.data.push({
                      x: dataPoints[index].x,
                      y: dataPoints[index].y
                    });
                  });
                }
              }
            },
            // y: {
            //   max : 1,
            // }
          }
        }}
      />
    </Box>
  )
}
export default ResponseRate;