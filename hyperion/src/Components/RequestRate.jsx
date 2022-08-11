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
//request rate is An average number of responses sent per producer.
  let count = 0; 
  const [reqRate, setReqRate] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  
  // make Initial Fetch on Component Did Mount
  useEffect(()=> {
    initialFetch();
    count++;
  }, [])
  

  const output = [];
  const makeDataSets = reqData => {
    for (let i = 0; i < reqData.length; i++){
      let colorVal = Math.floor(Math.random() * 255)
      const obj = {
        label: reqData[i].instance, 
        backgroundColor: `#f39566`,
        borderColor: `#f39566`,
        fill: false,
        data: [],
       }
      output.push(obj);
    }
    setReqRate(output);
  }
  
  const initialFetch = async () => {
    const response = await fetch('/server/metrics?metric=requestRate');
    const data = await response.json();
    makeDataSets(data);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchReqRate();
    }, pollingInterval);
    return () => clearInterval(interval);
  },[count])
  
  
  const fetchReqRate = async () =>  {
    const newDataPoints = [];
    const response = await fetch('/server/metrics?metric=requestRate');
    const newData = await response.json();
    for (let i = 0; i < newData.length; i++) {
      newDataPoints.push({x: newData[i].x, y: newData[i].y});
    }
    setDataPoints(newDataPoints);
    localStorage.setItem('Request Rate', JSON.stringify(newDataPoints));
  }

  
  return (
    <Box>
      <Line
        data={{
          datasets: reqRate,
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
              text: 'Request Rate'
            }
        },
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                duration : 200000,
                refresh: 5000, 
                onRefresh: chart => {
                  chart.data.datasets.forEach((reqRateInstance, index, array) => {
                    reqRateInstance.data.push({
                      x: dataPoints[index].x,
                      y: dataPoints[index].y
                    });
                  });
                }
              }
            },
          }
        }}
      />
    </Box>
  )
}
export default RequestRate;
