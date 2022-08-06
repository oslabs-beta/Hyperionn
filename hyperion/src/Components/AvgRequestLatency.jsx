import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material';

import Chart from 'chart.js/auto';
import { Line} from "react-chartjs-2";
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';


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



const AvgRequestLatency = () => {

  let count = 0; 
  [Zookeepers, setZookeepers] = useState([])
  [LatencyHistory, setLatencyHistory] = useState({})
  
  useEffect(()=> {
    // make Initial Fetch on Component Did Mount
  }, [])
  
  const initialFetch = async () => {
    //checks how many zookeepers there are.
    const makeDataSets = array => {
      const output = [];
      for (let i = 0; i < array.length; i++){
        let colorVal = Math.floor(Math.random() * 255)
        const obj = {
          label: `Dataset${i}`,
          backgroundColor: `rgba(${colorVal}, ${colorVal}, ${colorVal}, 0.5)`,
          borderColor: `rgb(${colorVal}, ${colorVal}, ${colorVal})`,
          fill: false,
          data: [],
          //zookeeperId : ''
         }
        output.push(obj);
      }
      await setZookeepers(output);
      count++;
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLatency();
    }, pollingInterval);
    return () => clearInterval(interval);
  },[count])
  
  const fetchLatency = async () =>  {
    // where we make every fetch request after the 1st one
  }

  return (
    <Box>
         <Line
        data={{
          datasets: [{
            label: 'Dataset 1',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderDash: [8, 4],
            fill: false,
            data: []
           },
            {
            label: 'Dataset 2',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            cubicInterpolationMode: 'monotone',
            fill: false,
            data: []
          },
          {
            label: 'Dataset 3',
            backgroundColor: 'rgba(50, 100, 100, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            cubicInterpolationMode: 'monotone',
            fill: false,
            data: []
          },
        ]

        }}
        options={{
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                delay: 2000,
                onRefresh: chart => {
                  chart.data.datasets.forEach(dataset => {
                    dataset.data.push({
                      x: Date.now(),
                      y: Math.random()
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