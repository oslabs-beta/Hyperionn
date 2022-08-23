import React, { useState, useEffect } from 'react';  
import { Grid, Box, Paper, TextField, Autocomplete, Container, Card,  CardContent, CardActionArea } from '@mui/material';
import SimpleKeyMetrics from '../Components/SimpleKeyMetrics.jsx';
import AvgRequestLatency from '../Components/AvgRequestLatency.jsx';
// import BrokenRequestRate from '../Components/BrokenRequestRate.jsx';
import ResponseRate from '../Components/ResponseRate.jsx';
import RequestRate from '../Components/RequestRate.jsx';


const DataContainer = (props) => {
  // const [metrics, setMetrics] = useState({
    //   'underReplicated': [],
    //   // 'offlinePartitions' : [],
    //   // 'activeControllers': [],
    //   // 'requestRate': [],
    //   // 'responseRate': [],
    //   // 'avgReqLatency': []
    // })



    // function fetchData(){
    //   const email = localStorage.getItem('email');
    //   fetch('/server/isConnected',{
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({ email })
    //   })
    //   //with the a const data = nswer that comes back, set isConnected to true. 
    //   if (socket === null){
    //     setSocket(io('ws://localhost:3500'));
    //   }
    //   if (socket){
    //     socket.onAny((metric, data) =>{
    //       console.log("Here's your data: ", data); //is an object with a metric property
    //       setUnderReplicated(data)
    //     });
    //   }
    // }
  

  
  //create state for isConnected, and upon component did mount, make request to back end to check 
  // const dataGrid = {
  //   padding: "20px",
  //   display: "grid", 
  //   gridTemplateColumns: "40vw 40vw", 
  //   gridTemplateRows: "1fr 1fr",
  //   gap: "15px 15px", 
  //   gridTemplateAreas:`
  //     "SimpleKeyMetrics FirstGraph"
  //     "SecondGraph ThirdGraph"
  //     `,
  //   gridArea: "DataContainer",
  // }
  
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
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Card>
          <Grid container spacing={3}>

            {/* Simple Key Metrics */}
            <Grid item xs={12}>
              <CardActionArea>
                <CardContent className="paper" sx={{boxShadow:"none", backgroundColor:'#f6f6f6'}}>
                  <SimpleKeyMetrics 
                    underReplicated = {props.underReplicated} 
                    offlinePartitions = {props.offlinePartitions} 
                    activeControllers = {props.activeControllers} 
                  />
                </CardContent>
              </CardActionArea>
            </Grid>

            {/* Average Request Latency Graph */}
            <Grid item xs={12} sm={4}>
              <CardActionArea>
                <CardContent className="paper"  sx={{boxShadow:"none"}}>
                  <AvgRequestLatency avgReqLatency = {props.avgReqLatency}/>
                </CardContent>
              </CardActionArea>
            </Grid>

            {/* Request Rate Graph */}
            <Grid item xs={12} sm={4}>
              <Paper className="paper" sx={{boxShadow:"none"}}>
                <RequestRate requestRate = {props.requestRate}/>
              </Paper>
            </Grid>

            {/* Response Rate Graph */}
            <Grid item xs={12} sm={4}>
              <Paper className="paper" sx={{boxShadow:"none", cursor: "move"}}>
                <ResponseRate responseRate = {props.responseRate}/>
              </Paper>
            </Grid>

            {/* User Designated Graph #1 */}
            <Grid item xs={12} sm={6}>
              <Paper className="paper" sx={{boxShadow:"none", cursor: "move"}}>
                <ResponseRate responseRate = {props.responseRate}/>
              </Paper>
            </Grid>

            {/* User Designated Graph #2 */}
            <Grid item xs={12} sm={6}>
              <Paper className="paper" sx={{boxShadow:"none", cursor: "move"}}>
                <ResponseRate responseRate = {props.responseRate}/>
              </Paper>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}

export default DataContainer;
