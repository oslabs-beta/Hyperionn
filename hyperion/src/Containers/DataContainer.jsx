import React from 'react';
import { Grid, Box, Paper, TextField, Autocomplete} from '@mui/material';
import SimpleKeyMetrics from '../Components/SimpleKeyMetrics.jsx';
import AvgRequestLatency from '../Components/AvgRequestLatency.jsx';
import RequestRate from '../Components/RequestRate.jsx';
import SecondGraph from '../Components/SecondGraph.jsx';
import ThirdGraph from '../Components/ThirdGraph.jsx';

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
  gridTemplateColumns: "1fr 1fr 1fr", 
  height: "87vh",
  gridTemplateRows: "1fr 1fr",
  gap: "15px 15px", 
  gridTemplateAreas:`
    "SimpleKeyMetrics AvgRequestLatency AvgRequestLatency"
    "FirstGraph SecondGraph ThirdGraph"
  `,
  gridArea: "DataContainer",
}




// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const Metrics = [

  { label: 'Offline Partitions', year: 1995 },
  { label: 'Under Replicated Partitions', year: 1991 },
  { label: "Active Controllers", year: 1946 },
  { label: 'Average Request Latency', year: 1997 },
];


  return(
    <>
      {/* <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={Metrics}
      sx={{ width: 200, padding: "30px"}}
      renderInput={(params) => <TextField {...params} label="Metrics" />}
      /> */}
      <Grid container sx={dataGrid}>
        <SimpleKeyMetrics sx={{gridArea:"SimpleKeyMetrics", height: "100%"}}/>
        <Paper className="paper"  sx={{gridArea:"AvgRequestLatency", boxShadow:"none"}}>
          <AvgRequestLatency/>
        </Paper>
        <Paper className="paper" sx={{gridArea:"RequestRate", boxShadow:"none"}}>
          <RequestRate/>
        </Paper>
        <Paper className="paper" sx={{gridArea:"SecondGraph", boxShadow:"none"}}>
          <SecondGraph/>
        </Paper>
        <Paper className="paper" sx={{gridArea:"ThirdGraph", boxShadow:"none"}}>
          <ThirdGraph/>
        </Paper>
      </Grid>
    </>
  )
}

export default DataContainer;