import React, { useState, useEffect } from 'react';  
import { Grid, Box, Paper, TextField, Autocomplete, Container, Card,  CardContent, CardActionArea } from '@mui/material';
//import SimpleKeyMetrics from '../Components/SimpleKeyMetrics.jsx';
import AvgRequestLatency from './AvgRequestLatency';
import ResponseRate from './ResponseRate';
import RequestRate from './RequestRate';
import UnderReplicated from './UnderReplicated';
import OfflinePartitions from './OfflinePartitions';
import ActiveControllers from './ActiveControllers';
import OutgoingByteRate from './OutgoingByteRate';
import BytesConsumedRate from './BytesConsumedRate';


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

            {/* Producer Outgoing Byte Rate */}
            <Grid item xs={12} sm={6}>
              <CardActionArea>
                <CardContent className="paper" sx={{boxShadow:"none"}}>
                  <OutgoingByteRate producerByteRate = {props.producerByteRate}/>
                </CardContent>
              </CardActionArea>
            </Grid>

            {/* Bytes Consumed Rate */}
            <Grid item xs={12} sm={6}>
              <CardActionArea>
                <CardContent className="paper" sx={{boxShadow:"none"}}>
                  <BytesConsumedRate bytesConsumedRate={props.bytesConsumedRate}/>
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
