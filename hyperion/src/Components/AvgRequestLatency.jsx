import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material';
import Chart from 'chart.js/auto';
import { Line} from "react-chartjs-2";
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
// import { queryDictionary } from '../Containers/DataContainer.jsx';
//const { avgReqLatencyQuery } = queryDictionary;


Chart.register(StreamingPlugin);
  
//interval for data fetching
const pollingInterval = 5000;

const AvgRequestLatency = () => {
  let count = 0; 
  const [zookeepers, setZookeepers] = useState([]);
  //dataPoints will be the array of objects (that contain new data points) that is returned from the fetch request to the server
  const [dataPoints, setDataPoints] = useState([]);

  
  useEffect(()=> {
    // make Initial Fetch on Component Did Mount that returns the data that will be passed into makeDataSets function
    initialFetch();
    // count is incremented, triggering the next useEffect hook
    count++;
  }, [])
  
  // iterate through the returned data in order to determine # of zookeepers. 
  const makeDataSets = zooData => {
    const output = [];
    for (let i = 0; i < zooData.length; i++){
      let colorVal = Math.floor(Math.random() * 255)
      const obj = {
        label: zooData[i].instance,
        backgroundColor: `rgba(${colorVal}, ${colorVal}, ${colorVal}, 0.5)`,
        borderColor: `rgb(${colorVal}, ${colorVal}, ${colorVal})`,
        fill: false,
        data: [],
       }
      output.push(obj);
    }
    //update zookeepers state with the output array that contains the correct # of objects
    setZookeepers(output);
  }
  
  //intialFetch is invoked when the page first renders. The returned data from the fetch request is passed into makeDataSets.
  const initialFetch = async () => {
    const response = await fetch('/server/metrics?metric=avgReqLatency');
    const data = await response.json();
    makeDataSets(data);
  }

  //hook for invoking fetchLatency every set interval. This is initially triggered by count being incremented in the first useEffect hook
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLatency();
    }, pollingInterval);
    return () => clearInterval(interval);
  },[count])
  
  //subsequent fetch requests to the server for fresh avgReqLatency data points
  const fetchLatency = async () =>  {
    const newDataPoints = [];
    const response = await fetch('/server/metrics?metric=avgReqLatency')
    const newData = await response.json();
    for (let i = 0; i < newData.length; i++) {
      newDataPoints.push({x: newData[i].x, y: newData[i].y});
    }
    //state is updated with the new data points
    setDataPoints(newDataPoints);
    localStorage.setItem('Average Request Latency', JSON.stringify(newDataPoints));
  }
 

  return (
    <Box>
      <Line
        //datasets is the state zookeepers array
        data={{
          datasets: zookeepers,
        }}
        options={{
          animation: false,
          plugins: {
            title:
           {
              display: true,
              text: 'Average Request Latency'
            }
        },
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                duration : 200000, //duration = x-axis maximum
                refresh: 5000,
                //chart will refresh every 5 seconds, pushing in the new data points from state into the datasets.data property
                onRefresh: chart => {
                  chart.data.datasets.forEach((zooKeeperInstance, index, array) => {
                    zooKeeperInstance.data.push({
                      x: dataPoints[index].x,
                      y: dataPoints[index].y
                    });
                  });
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
