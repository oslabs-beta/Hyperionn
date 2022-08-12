import React from 'react';  
import { Grid, Box, Paper, TextField, Autocomplete} from '@mui/material';
import SimpleKeyMetrics from '../Components/SimpleKeyMetrics.jsx';
import AvgRequestLatency from '../Components/AvgRequestLatency.jsx';
// import BrokenRequestRate from '../Components/BrokenRequestRate.jsx';
import ResponseRate from '../Components/ResponseRate.jsx';
import RequestRate from '../Components/RequestRate.jsx';



const queryEndpoint = '/server/metrics?metric=';

export const queryDictionary = {
  offlinePartitionsQuery: `${queryEndpoint}offlinePartition`,
  activeControllersQuery: `${queryEndpoint}activeControllers`,
  underreplicatedControllersQuery: `${queryEndpoint}underReplicated`,
  avgReqLatencyQuery: `${queryEndpoint}avgReqLatency`
}


const DataContainer = (props) => {

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


  return(
    <>
      <Grid container sx={dataGrid}>
        <SimpleKeyMetrics sx={{gridArea:"SimpleKeyMetrics", minWidth: "100px"}}/>
        <Paper className="paper"  sx={{gridArea:"FirstGraph", boxShadow:"none"}}>
          <AvgRequestLatency/>
        </Paper>
        {/* <Paper className="paper" sx={{gridArea:"FirstGraph", boxShadow:"none"}}>
          <BrokenRequestRate/>
        </Paper> */}
        <Paper className="paper" sx={{gridArea:"SecondGraph", boxShadow:"none"}}>
          <RequestRate/>
        </Paper>
        <Paper className="paper" sx={{gridArea:"ThirdGraph", boxShadow:"none"}}>
          <ResponseRate/>
        </Paper>
      </Grid>
    </>
  )
}

export default DataContainer;