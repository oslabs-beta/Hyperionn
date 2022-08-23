import React, { useState, useEffect, useRef } from 'react'
import { Paper, Box, Typography, Container, Grid, Popover, Button } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
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
      <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Average Request Latency</Typography>
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
          //   title:
          //  {
          //     display: true,
          //     text: 'Average Request Latency'
          //   }
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
      <ReadMoreIcon fontSize='small' onClick={handleClick} sx={{color:'#a4a4a4'}}></ReadMoreIcon>
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
export default AvgRequestLatency;
