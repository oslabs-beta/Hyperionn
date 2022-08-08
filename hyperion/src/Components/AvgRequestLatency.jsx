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

const AvgRequestLatency = () => {
  let count = 0; 
  const [zookeepers, setZookeepers] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  //dataPoints = [ {x: 2, y: 4}, {x: 2, y: 5}]

  //  const [zookeepers, setZookeepers] = useState([{
  //   label: '', //make more specific by pulling the actual name
  //   backgroundColor: '',
  //   borderColor: '',
  //   fill: false,
  //   data: [],
  //  }]);

  //const [label, setLabel] = useState('');
  //const [xAxis, setXAxis] = useState(Date.now());
  //const [yAxis, setYAxis] = useState();
  //const [latencyHistory, setLatencyHistory] = useState({})
  
  useEffect(()=> {
    // make Initial Fetch on Component Did Mount
    initialFetch();
    // console.log('initial useEffect ');
    count++;
  }, [])
  
  // const initialFetch = async () => {
  //   //checks how many zookeepers there are.

  const output = [];
  const makeDataSets = zooData => {
    for (let i = 0; i < zooData.length; i++){
      let colorVal = Math.floor(Math.random() * 255)
      const obj = {
        label: zooData[i].instance, //make more specific by pulling the actual name
        backgroundColor: `rgba(${colorVal}, ${colorVal}, ${colorVal}, 0.5)`,
        borderColor: `rgb(${colorVal}, ${colorVal}, ${colorVal})`,
        fill: false,
        data: [],
       }
      output.push(obj);
    }
    setZookeepers(output);
    // console.log('output', output);
  }
  
  const initialFetch = async () => {
    const response = await fetch('/server/metrics?metric=avgReqLatency');
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
    const response = await fetch('/server/metrics?metric=avgReqLatency')
    const newData = await response.json();
    // console.log('new Avg request latency: ', newData);
    for (let i = 0; i < newData.length; i++) {
      newDataPoints.push({x: newData[i].x, y: newData[i].y});
    }
    // console.log('newDataPoints: ', newDataPoints);
    // setZookeepers(output);
    setDataPoints(newDataPoints);
  }


  // console.log('zookeeper state', zookeepers);
  //console.log('output', output);


  
  return (
    <Box>
      <Line
        data={{
          datasets: zookeepers,
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Average Request Latency'
            }
        },
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                // delay: 1000,
                duration : 200000, //duration = x-axis maximum
                onRefresh: chart => {
                  chart.data.datasets.forEach((zooKeeperInstance, index, array) => {
                    // console.log('zookeeper instance', zooKeeperInstance.data.dataSets);
                    //console.log('dataPoints[index].x', dataPoints[index].x);
                    //console.log('dataPoints[index].y', dataPoints[index].y);
                    //console.log('zooKeeperInstance.data Array', zooKeeperInstance.data)
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


//{
//label: 'Dataset 1',
// backgroundColor: 'rgba(255, 99, 132, 0.5)',
// borderColor: 'rgb(255, 99, 132)',
// borderDash: [8, 4],
// fill: false,
// data: []
// },
// {
// label: 'Dataset 2',
// backgroundColor: 'rgba(54, 162, 235, 0.5)',
// borderColor: 'rgb(54, 162, 235)',
// cubicInterpolationMode: 'monotone',
// fill: false,
// data: []
// },
// {
// label: 'Dataset 3',
// backgroundColor: 'rgba(50, 100, 100, 0.5)',
// borderColor: 'rgb(54, 162, 235)',
// cubicInterpolationMode: 'monotone',
// fill: false,
// data: []
// },
