// import React, { useState, useEffect } from 'react'
// import { Box } from '@mui/material';

// import Chart from 'chart.js/auto';
// import { Line} from "react-chartjs-2";
// import 'chartjs-adapter-luxon';
// import StreamingPlugin from 'chartjs-plugin-streaming';
// // import { queryDictionary } from '../Containers/DataContainer.jsx';
// //const { avgReqLatencyQuery } = queryDictionary;


//  Chart.register(StreamingPlugin);
  


// const pollingInterval = 10000;

// const BrokenRequestRate = () => {
//   //let count = 0; 
//   //const [requestRateArray, setRequestRateArray] = useState([]);
//   //const [dataPoints, setDataPoints] = useState([]);


//   //dataPoints = [ {x: 2, y: 4}, {x: 2, y: 5}]

  
//   // useEffect(()=> {
//   //   // make Initial Fetch on Component Did Mount
//   //   initialFetch();
//   //   console.log('initial useEffect ');
//   //   count++;
//   // }, [])
  
//   // const initialFetch = async () => {
//   //   //checks how many zookeepers there are.

//   // const output = [];
//   // const makeDataSets = zooData => {
//   //   for (let i = 0; i < zooData.length; i++){
//   //     let colorVal = Math.floor(Math.random() * 255)
//   //     const obj = {
//   //       label: zooData[i].instance, //make more specific by pulling the actual name
//   //       backgroundColor: `rgba(${colorVal}, ${colorVal}, ${colorVal}, 0.5)`,
//   //       borderColor: `rgb(${colorVal}, ${colorVal}, ${colorVal})`,
//   //       fill: false,
//   //       data: [],
//   //      }
//   //     output.push(obj);
//   //   }
//   //   setZookeepers(output);
//   //   console.log('output', output);
//   // }
  
  
//   // const initialFetch = async () => {
//   //   const response = await fetch('/server/metrics?metric=avgReqLatency');
//   //   const data = await response.json();
//   //   console.log('Avg request latency: ', data);
//   //   makeDataSets(data);
//   // }



//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     fetchRequestRate();
//   //   }, pollingInterval);
//   //   return () => clearInterval(interval);
//   // },[])

  
//   const fetchRequestRate = async () =>  {
//     let newDataPoints = [];
//     const response = await fetch('/server/metrics?metric=requestRate');
//     const newData = await response.json();
//     console.log('new req request: ', newData);
//     newDataPoints = [{x: newData[0].x, y: newData[0].y}];
//     console.log('newDataPoints: ', newDataPoints);
//     setDataPoints(newDataPoints);
//   }

//   // return (
//   //   <Box>
//   //        <Line
//   //       data={{
//   //         datasets: [{
//   //           label: 'Dataset 1',
//   //           backgroundColor: 'rgba(255, 99, 132, 0.5)',
//   //           borderColor: 'rgb(255, 99, 132)',
//   //           borderDash: [8, 4],
//   //           fill: false,
//   //           data: []
//   //          },
//   //           {
//   //           label: 'Dataset 2',
//   //           backgroundColor: 'rgba(54, 162, 235, 0.5)',
//   //           borderColor: 'rgb(54, 162, 235)',
//   //           cubicInterpolationMode: 'monotone',
//   //           fill: false,
//   //           data: []
//   //         },
//   //         {
//   //           label: 'Dataset 3',
//   //           backgroundColor: 'rgba(50, 100, 100, 0.5)',
//   //           borderColor: 'rgb(54, 162, 235)',
//   //           cubicInterpolationMode: 'monotone',
//   //           fill: false,
//   //           data: []
//   //         },
//   //       ]

//   //       }}
//   //       options={{
//   //         scales: {
//   //           x: {
//   //             type: 'realtime',
//   //             realtime: {
//   //               delay: 5000,
//   //               duration : 100000000, //duration = x-axis maximum
//   //               onRefresh: chart => {
//   //                 chart.data.datasets.forEach(dataset => {
//   //                   //dataset.label= `zookeeper${1}` 
//   //                   dataset.data.push({
//   //                     x: Date.now(),
//   //                     y: Math.random()
//   //                   });
//   //                 });
//   //               }
//   //             }
//   //           }
//   //         }
//   //       }}
//   //     />
//   //   </Box>
//   // )

//   // setInterval(fetchRequestRate, 5000);

//   return (
//     <Box>
//       <Line
//         data={{
//             datasets:[{
//               label: 'Connect Metrics Request Rate',
//               backgroundColor: 'rgba(255, 99, 132, 0.5)',
//               borderColor: 'rgb(255, 99, 132)',
//               borderDash: [8, 4],
//               fill: false,
//               data: []
//             }]
//         }}
//         options={{
//           scales: {
//             x: {
//               type: 'realtime',
//               realtime: {
//                 delay: 5000,
//                 duration : 200000, //duration = x-axis maximum
//                 onRefresh: async() => {
//                     let newDataPoints = [];
//                     const response = await fetch('/server/metrics?metric=requestRate');
//                     const newData = await response.json();
//                     //console.log('new req request: ', newData);
//                     // newDataPoints = [{x: newData[0].x, y: newData[0].y}];
//                     // console.log('newDataPoints: ', newDataPoints);

              
//                   data.datasets[0].data.push({
//                       x: newData[0].x,
//                       y: newData[0].y
//                   })
                 
//                 //   // console.table('chart.data.datasets[0].data: ', chart.data.datasets[0].data)
//                 // }
//                 }
//               }
//             }
//           }
//         }}
//       />
//     </Box>
//   )
// }


// // dataPoints[index].y
// export default BrokenRequestRate;