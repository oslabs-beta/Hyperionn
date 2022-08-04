import React, { useState, useEffect } from 'react'
import { Paper, Box, Typography } from '@mui/material';

const pollingInterval = 5000;
const SimpleKeyMetrics = (props) => {
 
  const [kafkaData, setKafkaData] = useState({
    offlinePartitions : [],
    activeControllers : [],
    underReplicated : []
  })
  
  useEffect(() => {
    const interval = setInterval(() => {
      getSimpleKeyMetrics();
    }, pollingInterval);
    return () => clearInterval(interval);
  }, []);

  const stylingBox = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px",
    // borderRadius: "10px",
    // boxShadow: "rgb(0, 149, 255) 0px 5px 10px -5px;",
  }

  async function getSimpleKeyMetrics() {
    
    let offlinePartSum = 0;
    let activeContSum = 0;
    let underRepSum = 0;

    //fetch number of offline partition data //sum of values
    const responseOfflinePart = await fetch('/server/metrics?metric=offlinePartitions');
    const dataOfflinePart = await responseOfflinePart.json();
    console.log('Offline Part', dataOfflinePart)

    //fetch number of active controllers //sum of values should be 1
    const responseActiveCont = await fetch('/server/metrics?metric=activeControllers');
    const dataActiveCont = await responseActiveCont.json();
    console.log('Active Controllers', dataActiveCont);

    //fetch under replicated partition data
    const responseUnderReplicated = await fetch('/server/metrics?metric=underReplicated');
    const dataUnderReplicated = await responseUnderReplicated.json();
    console.log('UnderReplicate', dataUnderReplicated);

    //loop through data and sum all values
    for (const metricChunk of dataUnderReplicated) {
      underRepSum += Number(metricChunk.value[1]);
    }

    for (const metricChunk of dataActiveCont) {
      activeContSum += Number(metricChunk.value[1]);
    }

    for (const metricChunk of dataOfflinePart) {
      offlinePartSum += Number(metricChunk.value[1]);
    }

  //set state of kafkaData
    setKafkaData({
        offlinePartitions: offlinePartSum,
        activeControllers: activeContSum,
        underReplicated: underRepSum,
    })
  }

  //destructure state
  const { offlinePartitions, activeControllers, underReplicated } = kafkaData;

  return (
    <div>
        <Paper sx={stylingBox}>
          <Typography className="data-label">Offline Partitions</Typography>
          {/* <Typography>{offlinePartitions}</Typography> */}
          <Typography className="big-number" sx={{ fontSize: '3rem'}}>0</Typography>
        </Paper>
        <Paper sx={stylingBox}>
          <Typography className="data-label">Active Controllers</Typography>
          {/* <Typography>{activeControllers}</Typography> */}
          <Typography className="big-number" sx={{ fontSize: '3rem'}}>1</Typography>
        </Paper>
        <Paper sx={stylingBox}>
          <Typography className="data-label">Underreplicated Partitions</Typography>
          {/* <Typography>{underReplicated}</Typography> */}
          <Typography className="big-number" sx={{ fontSize: '3rem'}}>0</Typography>
        </Paper>
    </div>
  )

}
export default SimpleKeyMetrics;