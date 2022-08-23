import React, { useState, useEffect } from 'react';  
import { Grid, Box, Paper, TextField, Autocomplete} from '@mui/material';
import SimpleKeyMetrics from '../Components/SimpleKeyMetrics.jsx';
import AvgRequestLatency from '../Components/AvgRequestLatency.jsx';
// import BrokenRequestRate from '../Components/BrokenRequestRate.jsx';
import ResponseRate from '../Components/ResponseRate.jsx';
import RequestRate from '../Components/RequestRate.jsx';





// const allMetrics = ['underReplicated']; // ,'activeControllers', 'offlinePartitions', 'avgReqLatency', 'responseRate', 'requestRate'
// socket.on('message', text => {
//   console.log('TEXT: ', text)
//   console.log(socket.id)
// });
  // socket.onAny((eventName, ...args)=>{
//   console.log("HEY BUDDY WE GOT SOME DATA:", ...args)
//   console.log(eventName)
// })

// socket.on('data', function(data){
//   console.log(data, 'front end data');
// });
// const metrics = {};
// const fetchWithClosure = fetchData();


const DataContainer = (props) => {
  // const [metrics, setMetrics] = useState({
    //   'underReplicated': [],
    //   // 'offlinePartitions' : [],
    //   // 'activeControllers': [],
    //   // 'requestRate': [],
    //   // 'responseRate': [],
    //   // 'avgReqLatency': []
    // })
    // const [socket, setSocket] = useState(null)
    // const [fetched, setFetched] = useState(false)
    // const [underReplicated, setUnderReplicated] = useState({});
    // const [email, setEmail] = useState(null);
    // const [offlinePartitions, setOfflinePartitions] = useState([])
    // const [activeControllers, setActiveControllers] = useState([])
    // const [requestRate, setRequestRate] = useState([])
    // const [responseRate, setResponseRate] = useState([])
    // const [avgReqLatency, setAvgReqLatency] = useState([])


    function fetchData(){
      const email = localStorage.getItem('email');
      fetch('/server/isConnected',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email })
      })
      //with the a const data = nswer that comes back, set isConnected to true. 
      if (socket === null){
        setSocket(io('ws://localhost:3500'));
      }
      if (socket){
        socket.onAny((metric, data) =>{
          console.log("Here's your data: ", data); //is an object with a metric property
          setUnderReplicated(data)
        });
      }
    }
  

  
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
  
  function setFetchState() {
    setFetched(true);
  } 

  // useEffect(()=>{
  //   console.log('use effect triggered');
  //   if (fetched) return;
  //   else if (!fetched) {
  //     setFetchState();
  //     fetchData();
  //   }
    
  //  },[socket])



return(
  <>
      <Grid container sx={dataGrid}>
        <SimpleKeyMetrics 
          // connected={props.connected}
        underReplicated = {props.underReplicated} 
        offlinePartitions = {props.offlinePartitions} 
        activeControllers = {props.activeControllers} 
        sx={{gridArea:"SimpleKeyMetrics", minWidth: "100px"}}/> 
        <Paper className="paper"  sx={{gridArea:"FirstGraph", boxShadow:"none"}}>
          <AvgRequestLatency 
            avgReqLatency = {props.avgReqLatency}
            // avgDataSets = {props.avgDataSets}
          />
        </Paper>
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
// const fetchData = () => {
//   // let hasBeenCalled = false;
//   // return function(){
//     // if(hasBeenCalled) return;
//     fetch('/server/metrics', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     }, 
//     body: JSON.stringify(allMetrics)
//     })
//   // hasBeenCalled = true;
//   // }
// }
  // const returnedFunc = fetchData(