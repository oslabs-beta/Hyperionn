import React, { useState, useEffect, useRef } from 'react'
import { Box } from '@mui/material';
import Chart from 'chart.js/auto';
import { Line} from "react-chartjs-2";
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
// import { queryDictionary } from '../Containers/DataContainer.jsx';
//const { avgReqLatencyQuery } = queryDictionary;


Chart.register(StreamingPlugin);
  
//interval for data fetching
// const pollingInterval = 5000;

const AvgRequestLatency = ({avgReqLatency}) => {
  // let count = 0; 
  const [avgDataSets, setDataSets] = useState([]);
  //dataPoints will be the array of objects (that contain new data points) that is returned from the fetch request to the server
  const [dataPoints, setDataPoints] = useState([]);

  // let previousValues = useRef({avgReqLatency})
  useEffect(()=> {
    // make Initial Fetch on Component Did Mount that returns the data that will be passed into makeDataSets function
    
    // count is incremented, triggering the next useEffect hook
    // count++;
    // if (previousValues.current.avgReqLatency !== avgReqLatency) {
      if (!avgDataSets.length) {
        makeDataSets(avgReqLatency);
      }
      makeDataPoints(avgReqLatency)
      console.log('sets: ', avgDataSets)
      console.log('props avgreq: ', avgReqLatency)
      // previousValues.current = {avgReqLatency}
    // }
    // console.log('count: ', count)
  }, [avgReqLatency])
  
  // iterate through the returned data in order to determine # of zookeepers. 
  const makeDataSets = incomingDataArray => {
    const colorArray = ['#f3be66', '#f39566', '#f366dc', '#ce10fa', '#63489b'];
    const output = [];
    for (let i = 0; i < incomingDataArray.length; i++){
      let colorVal = Math.floor(Math.random() * 255)
      const obj = {
        label: incomingDataArray[i].instance,
        //backgroundColor: `rgba(${colorVal}, ${colorVal}, ${colorVal}, 0.5)`,
       backgroundColor: `#f39566`,
        borderColor: `#f39566`,
        fill: false,
        data: [],
       }
      output.push(obj);
    }
    //update zookeepers state with the output array that contains the correct # of objects
    setDataSets(output);
  }
  
  function makeDataPoints(avgReqLat) {
    const newDataPoints = [];
    for (let i = 0; i < avgReqLat.length; i++) {
      newDataPoints.push({x: avgReqLat[i].x, y: avgReqLat[i].y});
    }
    //state is updated with the new data points
    setDataPoints(newDataPoints);
  }
  //intialFetch is invoked when the page first renders. The returned data from the fetch request is passed into makeDataSets.
  // const initialFetch = async () => {
  //   const response = await fetch('/server/metrics?metric=avgReqLatency');
  //   const data = await response.json();
  //   makeDataSets(data);
  // }

  //hook for invoking fetchLatency every set interval. This is initially triggered by count being incremented in the first useEffect hook
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchLatency();
  //   }, pollingInterval);
  //   return () => clearInterval(interval);
  // },[count])
  

  // useEffect(() => {
  //   if (count ===2) {
  //     if (previousValues.current.avgReqLatency !== avgReqLatency) {
  //       makeDataPoints(avgReqLatency);
  //       console.log('fresh data in avgReqLatency');
  //       console.log('avgReqLatency: ', avgReqLatency);
  //       console.log('sets: ', avgDataSets)
  //       previousValues.current = {avgReqLatency}
  //     }
  //   } else return;
  // })
  
  //subsequent fetch requests to the server for fresh avgReqLatency data points
  // const fetchLatency = async () =>  {
  //   const newDataPoints = [];
  //   const response = await fetch('/server/metrics?metric=avgReqLatency')
  //   const newData = await response.json();
  //   for (let i = 0; i < newData.length; i++) {
  //     newDataPoints.push({x: newData[i].x, y: newData[i].y});
  //   }
  //   //state is updated with the new data points
  //   setDataPoints(newDataPoints);
  //   localStorage.setItem('Average Request Latency', JSON.stringify(newDataPoints));
  // }
 

  return (
    <Box>
      <Line
        //datasets is the state zookeepers array
        data={{
          datasets: avgDataSets,
        }}
        options={{
          elements: {
            point:{
                radius: 0
            }
          },
         // animation: false,
          plugins: {
            title:
           {
              display: true,
              text: 'Average Request Latency'
            }
        },
          scales: {
            y: {
                display: true,
                align: 'center',
                text: 'ms',
            },
            x: {
              type: 'realtime',
              realtime: {
                duration : 200000, //duration = x-axis maximum
                refresh: 5000,
                //chart will refresh every 5 seconds, pushing in the new data points from state into the datasets.data property
                onRefresh: chart => {
                  chart.data.datasets.forEach((instance, index, array) => {
                    instance.data.push({
                      x: dataPoints[index].x,
                      y: dataPoints[index].y
                    });
                  });
                }
              }
            },
            y:{
              title : {
                display : true,
                text : 'ms'
              }
            }
          }
        }}
      />
    </Box>
  )
}
export default AvgRequestLatency;
