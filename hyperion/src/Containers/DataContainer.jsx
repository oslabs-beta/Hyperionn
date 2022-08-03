import React from 'react';
import { Grid, Paper } from '@mui/material';
import SimpleKeyMetrics from '../Components/SimpleKeyMetrics.jsx'
import AvgRequestLatency from '../Components/AvgRequestLatency.jsx'


const DataContainer = (props) => {

const dataGrid = {
  padding: "20px",
  display: "grid", 
  gridTemplateColumns: "1fr 1fr 1fr", 
  height: "87vh",
  gridTemplateRows: "1fr 1fr",
  gap: "15px 15px", 
  gridTemplateAreas:`
    "SimpleKeyMetrics SimpleKeyMetrics SimpleKeyMetrics"
    "AvgRequestLatency AvgRequestLatency AvgRequestLatency"
  `,
  gridArea: "DataContainer",
}

  return(
    <>
      <Grid container sx={dataGrid}>
        <Paper className="paper">
          <SimpleKeyMetrics sx={{gridArea:"SimpleKeyMetrics"}}/>
        </Paper>
        <Paper className="paper" sx={{gridArea:"AvgRequestLatency"}}>
          <AvgRequestLatency/>
        </Paper>
      </Grid>
    </>
  )
}

export default DataContainer;