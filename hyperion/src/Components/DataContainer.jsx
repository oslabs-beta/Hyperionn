import React, { useState, useEffect } from 'react';  
import { Grid, Box, Paper, TextField, Autocomplete, Container, Card,  CardContent, CardActionArea } from '@mui/material';
//import SimpleKeyMetrics from '../Components/SimpleKeyMetrics.jsx';
import AvgRequestLatency from './AvgRequestLatency.jsx';
import ResponseRate from './ResponseRate.jsx';
import RequestRate from './RequestRate.jsx';
import UnderReplicated from './UnderReplicated.jsx';
import OfflinePartitions from './OfflinePartitions.jsx';
import ActiveControllers from './ActiveControllers.jsx';
import DiskUsage from './DiskUsage.jsx';


const DataContainer = (props) => {
 
  function setFetchState() {
    setFetched(true);
  } 

return(
  <>
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Card sx={{boxShadow:"none"}}>
          <Grid container spacing={3}>

            {/* UnderReplicated */}
            <Grid item xs={12} sm={4}>
              <CardActionArea>
                <CardContent className="paper" sx={{boxShadow:"none", backgroundColor:'#f6f6f6'}}>
                  {/* <SimpleKeyMetrics 
                    underReplicated = {props.underReplicated} 
                    offlinePartitions = {props.offlinePartitions} 
                    activeControllers = {props.activeControllers} 
                  /> */}
                  <UnderReplicated underReplicated = {props.underReplicated}/>
                </CardContent>
              </CardActionArea>
            </Grid>

            {/* Active Controllers */}
            <Grid item xs={12} sm={4}>
              <CardActionArea>
                <CardContent className="paper" sx={{boxShadow:"none", backgroundColor:'#f6f6f6'}}>
                  {/* <SimpleKeyMetrics 
                    underReplicated = {props.underReplicated} 
                    offlinePartitions = {props.offlinePartitions} 
                    activeControllers = {props.activeControllers} 
                  /> */}
                  <ActiveControllers activeControllers = {props.activeControllers}/>
                </CardContent>
              </CardActionArea>
            </Grid>

            {/* Offline Partitions*/}
            <Grid item xs={12} sm={4}>
              <CardActionArea>
                <CardContent className="paper" sx={{boxShadow:"none", backgroundColor:'#f6f6f6'}}>
                  <OfflinePartitions offlinePartitions = {props.offlinePartitions}/>
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
              <CardActionArea>
                <CardContent className="paper" sx={{boxShadow:"none"}}>
                  <RequestRate requestRate = {props.requestRate}/>
                  </CardContent>
              </CardActionArea>
            </Grid>

            {/* Response Rate Graph */}
            <Grid item xs={12} sm={4}>
              <CardActionArea>
                <CardContent className="paper" sx={{boxShadow:"none"}}>
                  <ResponseRate responseRate = {props.responseRate}/>
                  </CardContent>
              </CardActionArea>
            </Grid>

            {/* User Designated Graph #1 */}
            <Grid item xs={12} sm={6}>
              <CardActionArea>
                <CardContent className="paper" sx={{boxShadow:"none"}}>
                  <DiskUsage avgReqLatency = {props.avgReqLatency}/>
                </CardContent>
              </CardActionArea>
            </Grid>

            {/* User Designated Graph #2 */}
            <Grid item xs={12} sm={6}>
              <CardActionArea>
                <CardContent className="paper" sx={{boxShadow:"none"}}>
                  <ResponseRate responseRate = {props.responseRate}/>
                </CardContent>
              </CardActionArea>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}

export default DataContainer;
