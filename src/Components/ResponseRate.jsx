import React, { useState, useEffect, useRef } from 'react'
import { Paper, Box, Typography, Container, Grid, Popover, Button } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import Chart from 'chart.js/auto';
import { Line} from "react-chartjs-2";
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';

Chart.register(StreamingPlugin);
  
const ResponseRate = ({responseRate}) => {

  const [resRateSets, setResRateSets] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  
  useEffect(()=> {
    if (!resRateSets.length){
      makeDataSets(responseRate);
    }
    makeDataPoints(responseRate);
    console.log('responseRate sets: ', resRateSets)
    console.log('responseRate: ', responseRate)
  }, [responseRate])
  
  const makeDataSets = resData => {
    const output = [];
    for (let i = 0; i < resData.length; i++){
      let colorVal = Math.floor(Math.random() * 255)
      const obj = {
        label: resData[i].instance, 
        backgroundColor: `#f39566`,
        borderColor: `#f39566`,
        fill: false,
        data: [],
       }
      output.push(obj);
    }
    setResRateSets(output);
  }
  
  
  function makeDataPoints(newData) {
    const newDataPoints = [];
    for (let i = 0; i < newData.length; i++) {
      newDataPoints.push({x: newData[i].x, y: newData[i].y});
    }
    setDataPoints(newDataPoints);
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
      <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Response Rate</Typography>
      <Line
        data={{
          datasets: resRateSets,
    
        }}
        options={{
          elements: {
            point:{
                radius: 0
            }
          },
          animation: true,
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                duration : 200000, 
                refresh: 5000,
                onRefresh: chart => {
                  chart.data.datasets.forEach((resRateInstance, index, array) => {
                    resRateInstance.data.push({
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
      <ReadMoreIcon 
        fontSize='small' 
        onClick={handleClick} 
        sx={{
          color:'#a4a4a4',
          '&:hover': {
            color: '#ce10fa',
         },
        }}></ReadMoreIcon>
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
          <Typography sx={{ p: 2 }}>For producers, the response rate represents the rate of responses received from brokers. Brokers respond to producers when the data has been received. Depending on your configuration, “received” could have one of three meanings:</Typography>
          <Typography sx={{ p: 1 }}>- The message was received, but not committed (request.required.acks == 0)</Typography>
          <Typography sx={{ p: 1 }}>- The leader has written the message to disk (request.required.acks == 1)</Typography>
          <Typography sx={{ p: 1 }}>- The leader has received confirmation from all replicas that the data has been written to disk (request.required.acks == all)</Typography>
          <Typography sx={{ p: 2 }}>Producer data is not available for consumption until the required number of acknowledgments have been received. If you are seeing low response rates, a number of factors could be at play. A good place to start is by checking the request.required.acks configuration directive on your brokers. Choosing the right value for request.required.acks is entirely use case dependent—it’s up to you whether you want to trade availability for consistency.</Typography>
          <Typography sx={{ p: 1, color: '#f366dc' }}>Source: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics/</Typography>
        </Popover>
    </Box>
  )
}
export default ResponseRate;