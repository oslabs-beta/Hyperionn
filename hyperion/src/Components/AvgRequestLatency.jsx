import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material';

import Chart from 'chart.js/auto';
import { Line} from "react-chartjs-2";
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
// import { queryDictionary } from '../Containers/DataContainer.jsx';

//const { avgReqLatencyQuery } = queryDictionary;


 Chart.register(StreamingPlugin);
  

//  const config = {
//    type: 'line',
//    data: data,
//    options : {
//     scales: {
//       x: {
//         realtime: {
//           onRefresh: chart => {
//             // request data so that it can be received asynchronously
//             // assume the response is an array of {x: timestamp, y: value} objects
//             fetch(YOUR_DATA_SOURCE_URL)
//               .then(response => response.json())

//               .then(data => {
//                 // append the new data array to the existing chart data
//                 chart.data.datasets[0].data.push(...data);

//                 // update chart datasets keeping the current animation
//                 chart.update('quiet');
//               });
//           }
//         }
//       }
//     }
//   }
//  }


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
    console.log('initial useEffect ');
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
    console.log('output', output);
  }
  
  const initialFetch = async () => {
    const response = await fetch('/server/metrics?metric=avgReqLatency');
    const data = await response.json();
    console.log('Avg request latency: ', data);
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
    const response = await fetch('/server/metrics?metric=avgReqLatency');
    const newData = await response.json();
    console.log('new Avg request latency: ', newData);
    for (let i = 0; i < newData.length; i++) {
      newDataPoints.push({x: newData[i].x, y: newData[i].y});
    }
    console.log('newDataPoints: ', newDataPoints);
    // setZookeepers(output);
    setDataPoints(newDataPoints);
  }


  console.log('zookeeper state', zookeepers);
  console.log('output', output);


  
  return (
    <Box>
      <Line
        data={{
          datasets: zookeepers,
    
        }}
        options={{
          point:{
            radius: 0
          },
          plugins: {
            title: {
              display: true,
              text: 'Average Latency'
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
                    console.log('zookeeper instance', zooKeeperInstance.data.dataSets);
                    console.log('dataPoints[index].x', dataPoints[index].x);
                    console.log('dataPoints[index].y', dataPoints[index].y);
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










// import { Line} from "react-chartjs-2";
// import 'chartjs-adapter-luxon';
// import StreamingPlugin from 'chartjs-plugin-streaming';
// // import { queryDictionary } from '../Containers/DataContainer.jsx';

// //const { avgReqLatencyQuery } = queryDictionary;


//  Chart.register(StreamingPlugin);
// 	@@ -38,46 +41,62 @@ import StreamingPlugin from 'chartjs-plugin-streaming';
// //  }


// const pollingInterval = 10000;

// const AvgRequestLatency = () => {
//   let count = 0; 
//   const [zookeepers, setZookeepers] = useState([])
//   //const [latencyHistory, setLatencyHistory] = useState({})

//   useEffect(()=> {
//     // make Initial Fetch on Component Did Mount
//     initialFetch();
//   }, [])

//   // const initialFetch = async () => {
//   //   //checks how many zookeepers there are.

//   const output = [];
//   const makeDataSets = zooData => {
//     for (let i = 0; i < zooData.length; i++){
//       let colorVal = Math.floor(Math.random() * 255)
//       const obj = {
//         label: zooData[i].instance, //make more specific by pulling the actual name
//         backgroundColor: `rgba(${colorVal}, ${colorVal}, ${colorVal}, 0.5)`,
//         borderColor: `rgb(${colorVal}, ${colorVal}, ${colorVal})`,
//         fill: false,
//         data: [{x: zooData[i].x, y: zooData[i].y}],
//        }
//       output.push(obj);
//     }
//     setZookeepers(output);
//     count++;
//     console.log('output', output);
//   }


//   const initialFetch = async () => {
//     const response = await fetch('/server/metrics?metric=avgReqLatency');
//     const data = await response.json();
//     console.log('Avg request latency: ', data);
//     makeDataSets(data);
//   }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchLatency();
//     }, pollingInterval);
//     return () => clearInterval(interval);
//   },[count])

//   const fetchLatency = async () =>  {
//     const response = await fetch('/server/metrics?metric=avgReqLatency');
//     const newData = await response.json();
//     console.log('new Avg request latency: ', newData);
//     for (let i = 0; i < newData.length; i++) {
//       output[i].data.push({x: newData[i].x, y: newData[i].y});
//     }
//     console.log('updated output: ', output);
//   }

//   return (
// 	@@ -112,13 +131,15 @@ const AvgRequestLatency = () => {

//         }}
//         options={{
//           duration : 100000000,
//           scales: {
//             x: {
//               type: 'realtime',
//               realtime: {
//                 delay: 5000,
//                 onRefresh: chart => {
//                   chart.data.datasets.forEach(dataset => {
//                     //dataset.label= `zookeeper${1}` 
//                     dataset.data.push({
//                       x: Date.now(),
//                       y: Math.random()