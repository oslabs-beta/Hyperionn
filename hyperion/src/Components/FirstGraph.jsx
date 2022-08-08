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

const RequestRate = () => {
  //let count = 0; 
  //const [requestRateArray, setRequestRateArray] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  //dataPoints = [ {x: 2, y: 4}, {x: 2, y: 5}]

  
  // useEffect(()=> {
  //   // make Initial Fetch on Component Did Mount
  //   initialFetch();
  //   console.log('initial useEffect ');
  //   count++;
  // }, [])
  
  // const initialFetch = async () => {
  //   //checks how many zookeepers there are.

  // const output = [];
  // const makeDataSets = zooData => {
  //   for (let i = 0; i < zooData.length; i++){
  //     let colorVal = Math.floor(Math.random() * 255)
  //     const obj = {
  //       label: zooData[i].instance, //make more specific by pulling the actual name
  //       backgroundColor: `rgba(${colorVal}, ${colorVal}, ${colorVal}, 0.5)`,
  //       borderColor: `rgb(${colorVal}, ${colorVal}, ${colorVal})`,
  //       fill: false,
  //       data: [],
  //      }
  //     output.push(obj);
  //   }
  //   setZookeepers(output);
  //   console.log('output', output);
  // }
  
  
  // const initialFetch = async () => {
  //   const response = await fetch('/server/metrics?metric=avgReqLatency');
  //   const data = await response.json();
  //   console.log('Avg request latency: ', data);
  //   makeDataSets(data);
  // }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchRequestRate();
    }, pollingInterval);
    return () => clearInterval(interval);
  },[])

  
  const fetchRequestRate = async () =>  {
    const newDataPoints = [];
    const response = await fetch('/server/metrics?metric=requestRate');
    const newData = await response.json();
    console.log('new req request: ', newData);
    for (let i = 0; i < newData.length; i++) {
      newDataPoints.push({x: newData[i].x, y: newData[i].y});
    }
    console.log('newDataPoints: ', newDataPoints);
    setDataPoints(newDataPoints);
  }

  
  return (
    <Box>
      <Line
        data={{
            datasets:[{
                label: 'Dataset 1',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
                borderDash: [8, 4],
                fill: false,
                data: []
            }]
        }}
        options={{
          point:{
            radius: 0
          },
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                // delay: 1000,
                duration : 200000, //duration = x-axis maximum
                onRefresh: chart => {
                  chart.data.datasets[0].data.push({
                      x: dataPoints[index].x,
                      y: dataPoints[index].y
                  })
                  // chart.data.datasets.forEach((dataSet, index, array) => {
                  //   console.log('zookeeper instance', zooKeeperInstance.data.dataSets);
                  //   console.log('dataPoints[index].x', dataPoints[index].x);
                  //   console.log('dataPoints[index].y', dataPoints[index].y);
                  //   zooKeeperInstance.data.push({
                  //     x: dataPoints[index].x,
                  //     y: dataPoints[index].y
                  //   });
                  // });
                }
              }
            }
          }
        }}
      />
    </Box>
  )
}
export default AvgRequestLatency;