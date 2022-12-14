import React, { useState, useEffect, useRef } from 'react'
import { Paper, Box, Typography, Container, Grid, Popover, Button } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import Chart from 'chart.js/auto';
import { Line} from "react-chartjs-2";
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';


Chart.register(StreamingPlugin);
  

const BytesConsumedRate = ({bytesConsumedRate}) => {

  const [byteDataSets, setDataSets] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(()=> {
    if (!byteDataSets.length) {
      makeDataSets(bytesConsumedRate);
    }
    makeDataPoints(bytesConsumedRate)
    console.log('sets: ', byteDataSets)
    console.log('props byterate: ', bytesConsumedRate)
  }, [bytesConsumedRate])

  
  const makeDataSets = incomingDataArray => {
    

    const colorArray = ['#f3be66', '#f6f6f6', '#ececec', '#2d2d2d', '#f3be66', '#f39566', '#f366dc', '#ce10fa', '#63489b', '#120a27'];
    const output = [];
    for (let i = 0; i < incomingDataArray.length; i++){
      let colorVal = Math.floor(Math.random() * 255)
      const obj = {
        label: incomingDataArray[i].instance,
        backgroundColor: `${colorArray[i]}`,
        borderColor: `${colorArray[i]}`,
        fill: false,
        data: [],
       }
      output.push(obj);
    }
    setDataSets(output);
  }
  
  
  function makeDataPoints(byteData) {
    const newDataPoints = [];
    for (let i = 0; i < byteData.length; i++) {
      newDataPoints.push({x: byteData[i].x, y: byteData[i].y});
    }
    setDataPoints(newDataPoints);
  }

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
      <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Bytes Consumed Rate</Typography>
      <Line
        data={{
          datasets: byteDataSets,
        }}
        options={{
          elements: {
            point:{
                radius: 0
            }
          },
          animation: true,
          scales: {
            y: {
                display: true,
                align: 'center',
                text: 'ms',
            },
            x: {
              type: 'realtime',
              realtime: {
                duration : 200000, 
                refresh: 5000,
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
          <Typography sx={{ p: 2 }}>As with Kafka brokers, you will want to monitor your producer network throughput. Observing traffic volume over time is essential for determining whether you need to make changes to your network infrastructure. Monitoring producer network traffic will help to inform decisions on infrastructure changes, as well as to provide a window into the production rate of producers and identify sources of excessive traffic.</Typography>
          <Typography sx={{ p: 1, color: '#f366dc' }}>Source: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics/</Typography>
        </Popover>
    </Box>
  )
}
export default BytesConsumedRate;