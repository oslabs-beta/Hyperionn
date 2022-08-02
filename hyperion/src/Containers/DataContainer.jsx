import React from 'react';
import { Paper } from '@mui/material';
import SimpleKeyMetrics from '../Components/SimpleKeyMetrics.jsx'



const DataContainer = (props) => {

const dataGrid = {
  display: "grid", 
  gridTemplateColumns: "1fr 1fr 1fr", 
  gridTemplateRows: "1fr 1fr",
  gap: "15px 15px", 
  gridTemplateAreas:`
    "SimpleKeyMetrics . ."
    ". . .",
  `
}

  return(
    <>
      <Grid container sx={dataGrid}>
        <Paper id="paper">
          <SimpleKeyMetrics/>
        </Paper>
      </Grid>
    </>
  )
}

export default DataContainer;