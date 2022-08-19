import React, { useState, useEffect } from 'react';  
import { Grid, Box, Paper, TextField, Autocomplete} from '@mui/material';
import SimpleKeyMetrics from '../Components/SimpleKeyMetrics.jsx';
import AvgRequestLatency from '../Components/AvgRequestLatency.jsx';
// import BrokenRequestRate from '../Components/BrokenRequestRate.jsx';
import ResponseRate from '../Components/ResponseRate.jsx';
import RequestRate from '../Components/RequestRate.jsx';



// const queryEndpoint = '/server/metrics?metric=';

// export const queryDictionary = {
//   offlinePartitionsQuery: `${queryEndpoint}offlinePartition`,
//   activeControllersQuery: `${queryEndpoint}activeControllers`,
//   underreplicatedControllersQuery: `${queryEndpoint}underReplicated`,
//   avgReqLatencyQuery: `${queryEndpoint}avgReqLatency`
// }

const socket = io('ws://localhost:3500');
const allMetrics = ['underReplicated','activeControllers', 'offlinePartitions', 'avgReqLatency', 'responseRate', 'requestRate']; // 
socket.on('message', text => {
  console.log('TEXT: ', text)
  console.log(socket.id)
    // const el = document.createElement('li');
    // el.innerHTML = text;
    // document.querySelector('ul').appendChild(el)

});
// socket.onAny((eventName, ...args)=>{
//   console.log("HEY BUDDY WE GOT SOME DATA:", ...args)
//   console.log(eventName)
// })

// socket.on('data', function(data){
//   console.log(data, 'front end data');
// });
// const metrics = {};


const DataContainer = (props) => {
  const [metrics, setMetrics] = useState({
    'underReplicated': [],
    // 'offlinePartitions' : [],
    // 'activeControllers': [],
    // 'requestRate': [],
    // 'responseRate': [],
    // 'avgReqLatency': []
  })
  // 
  // const [underReplicated, setUnderReplicated] = useState([])
  // const [offlinePartitions, setOfflinePartitions] = useState([])
  // const [activeControllers, setActiveControllers] = useState([])
  // const [requestRate, setRequestRate] = useState([])
  // const [responseRate, setResponseRate] = useState([])
  // const [avgReqLatency, setAvgReqLatency] = useState([])
  //

  socket.onAny((metric, data) =>{
    console.log("Here's your metric: ", metric);
    console.log(socket.id)
    console.log("Here's your data: ", data); //is an object with a metric property
    // if(metrics[metric]) metrics[metric].push(data);
    // else metrics[metric] = [data]
    const newMetric = {};
    
    newMetric[metric] = data;
    // console.log("newMetric: --->>>>>", newMetric);
  

  //   const handleChange = (metric, data) => {
  //     const { name, value } = e.target;
  //     setState(prevState => ({
  //         ...prevState,
  //         [metric]: data
  //     }));
  // };

    // const handleClick = val =>
    // setState({
    //   ...state,
    //   [val]: state[val] + 1
    // })
    // //const {metric} = metric
    setMetrics(metrics => ({
      ...metrics, 
      [`${metric}`]: data
    }));
    
    // function logState(){
    //   console.log('HERE ARE YOUR METRICS AGAIN', metrics)
    // }
    // setTimeout(logState, 1000)
    //setMetrics(...metrics, newMetric);
    // console.log('UPDATED METRICS BUDDY BOI: ', metrics);
    // console.log('HERE ARE YOUR UPDATED METRICS: ', metrics)
  });
  //create state for isConnected, and upon component did mount, make request to back end to check 
const dataGrid = {
  padding: "20px",
  display: "grid", 
  gridTemplateColumns: "40vw 40vw", 
  gridTemplateRows: "1fr 1fr",
  gap: "15px 15px", 
  gridTemplateAreas:`
    "SimpleKeyMetrics FirstGraph"
    "SecondGraph ThirdGraph"
  `,
  gridArea: "DataContainer",
}
const fetchData = () => {
  // let hasBeenCalled = false;
  // return function(){
    // if(hasBeenCalled) return;
    fetch('/server/metrics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }, 
    body: JSON.stringify(allMetrics)
    })
  // hasBeenCalled = true;
  // }
}
  // const returnedFunc = fetchData();
  useEffect(fetchData, [])

  const { underReplicated } = metrics;
  //, offlinePartitions, activeControllers, avgRequestLatency, requestRate, responseRate
  console.log("underReplicated", underReplicated);
  // console.log("offlinePartitions", offlinePartitions);
  
  return(
    <>
      <Grid container sx={dataGrid}>
        <SimpleKeyMetrics underReplicated = {underReplicated}  sx={{gridArea:"SimpleKeyMetrics", minWidth: "100px"}}/> 
        {/* <Paper className="paper"  sx={{gridArea:"FirstGraph", boxShadow:"none"}}>
          <AvgRequestLatency avgRequestLatency = {avgRequestLatency}/>
        </Paper> */}
        {/* <Paper className="paper" sx={{gridArea:"FirstGraph", boxShadow:"none"}}>
          <BrokenRequestRate/>
        </Paper> */}
        {/* <Paper className="paper" sx={{gridArea:"SecondGraph", boxShadow:"none"}}>
          <RequestRate requestRate = {requestRate}/>
        </Paper> */}
        {/* <Paper className="paper" sx={{gridArea:"ThirdGraph", boxShadow:"none"}}>
          <ResponseRate responseRate = {responseRate}/>
        </Paper> */}
      </Grid>
    </>
  )
}

export default DataContainer;