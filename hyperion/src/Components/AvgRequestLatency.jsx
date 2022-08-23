import React, { useState, useEffect, useRef } from 'react'
import { Box } from '@mui/material';
import Chart from 'chart.js/auto';
import { Line} from "react-chartjs-2";
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';


Chart.register(StreamingPlugin);
  

const AvgRequestLatency = ({avgReqLatency}) => {

  const [avgDataSets, setDataSets] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  // let previousValues = useRef({avgReqLatency})
  useEffect(()=> {
    if (!avgDataSets.length) {
      makeDataSets(avgReqLatency);
    }
    makeDataPoints(avgReqLatency)
    console.log('sets: ', avgDataSets)
    console.log('props avgreq: ', avgReqLatency)
  }, [avgReqLatency])
  
  // iterate through the returned data in order to determine # of producers. 
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

 

  return (
    <Box>
      <Line
        //datasets is the state avgDataSets array
        data={{
          datasets: avgDataSets,
        }}
        options={{
          elements: {
            point:{
                radius: 0
            }
          },
          animation: true,
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
