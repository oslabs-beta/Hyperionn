import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material';

import Chart from 'chart.js/auto';
import { Line} from "react-chartjs-2";
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';


Chart.register(StreamingPlugin);
  

const pollingInterval = 5000;

const RequestRate = ({requestRate}) => {
//request rate is An average number of responses sent per producer.

  const [reqRateSets, setReqRateSets] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  

  useEffect(()=> {
    if (!reqRateSets.length){
      makeDataSets(requestRate);
    }
    makeDataPoints(requestRate);
    console.log('requestRate sets: ', reqRateSets)
    console.log('requestRate: ', requestRate)
  }, [requestRate])
  

  function makeDataSets(reqData) {
    const output = [];
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
    setReqRateSets(output);
  }
  

  
  function makeDataPoints(newData) {
    const newDataPoints = [];
    for (let i = 0; i < newData.length; i++) {
      newDataPoints.push({x: newData[i].x, y: newData[i].y});
    }
    setDataPoints(newDataPoints);
    // localStorage.setItem('Request Rate', JSON.stringify(newDataPoints));
  }

  
  return (
    <Box>
      <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Request Rate</Typography>
      <Line
        data={{
          datasets: reqRateSets,
        }}
        options={{
          elements: {
            point:{
                radius: 0
            }
          },
          animation: true,
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
      <ReadMoreIcon fontSize='small' onClick={handleClick} sx={{color:'#f6f6f6'}}></ReadMoreIcon>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
        vertical: 'bottom',
          horizontal: 'left',
              }}
            >
              <Typography sx={{ p: 2 }}>The average request latency is a measure of the amount of time between when KafkaProducer.send() was called until the producer receives a response from the broker. </Typography>
              <Typography sx={{ p: 1, color: '#f366dc' }}>Source: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics/</Typography>
             </Popover>
    </Box>
  )
}
export default RequestRate;
