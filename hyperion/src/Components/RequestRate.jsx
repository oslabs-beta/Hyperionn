import React, { useState, useEffect, useRef } from 'react'
import { Paper, Box, Typography, Container, Grid, Popover, Button } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
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
        //   plugins: {
        //     title: {
        //       display: true,
        //       text: 'Request Rate'
        //     }
        // },
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
      <ReadMoreIcon fontSize='small' onClick={handleClick} sx={{color:'#ececec'}}></ReadMoreIcon>
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
              <Typography sx={{ p: 2 }}>The request rate is the rate at which producers send data to brokers. Of course, what constitutes a healthy request rate will vary drastically depending on the use case. Keeping an eye on peaks and drops is essential to ensure continuous service availability. If rate-limiting is not enabled, in the event of a traffic spike, brokers could slow to a crawl as they struggle to process a rapid influx of data.</Typography>
              <Typography sx={{ p: 1, color: '#f366dc' }}>Source: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics/</Typography>
             </Popover>
    </Box>
  )
}
export default RequestRate;
