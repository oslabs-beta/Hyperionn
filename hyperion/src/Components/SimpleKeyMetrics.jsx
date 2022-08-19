import React, { useState, useEffect } from 'react'
import { Paper, Box, Typography } from '@mui/material';
//import { queryDictionary } from '../Containers/DataContainer.jsx';

const pollingInterval = 5000;

const SimpleKeyMetrics = (props) => {
  console.log('props: ', props)
  const { underReplicated } = props;
  const [kafkaData, setKafkaData] = useState({
    // offlinePartitionsParsed : [],
    // activeControllersParsed : [],
    underReplicatedParsed : []
  })

  // if (localStorage.getItem('offlinePartitions')) {
  //   kafkaData.offlinePatitions = localStorage.getItem('offlinePartitions');
  // }
  
  // if (localStorage.getItem('activeControllers')) {
  //   kafkaData.activeControllers = localStorage.getItem('activeControllers');
  // }
  
  // if (localStorage.getItem('underReplicated')) {
  //   kafkaData.underReplicated = localStorage.getItem('underReplicated');
  // }
  
  useEffect(() => {
    // parseSimpleKeyMetrics(underReplicated);
  }, [underReplicated]);

  const stylingBox = {
    display: "flex",
    flexDirection: "column",
    height: "90%",
    width: "200px",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    margin: "10px",
    border: "1px solid #d0d0d0",
    boxShadow: "none",
  }
  

  function parseSimpleKeyMetrics( underReplicated) {
    // console.log('offlinePartitions prop: ', offlinePartitions)
    let offlinePartSum = 0;
    let activeContSum = 0;
    let underRepSum = 0;

    // //fetch number of offline partition data //sum of values
    // const responseOfflinePart = await fetch(`/server/metrics?metric=offlinePartitions`);
    // const dataOfflinePart = await responseOfflinePart.json();
    // //console.log('Offline Part', dataOfflinePart)

    // //fetch number of active controllers //sum of values should be 1
    // const responseActiveCont = await fetch(`/server/metrics?metric=activeControllers`);
    // const dataActiveCont = await responseActiveCont.json();
    // //console.log('Active Controllers', dataActiveCont);

    // //fetch under replicated partition data
    // const responseUnderReplicated = await fetch(`/server/metrics?metric=underReplicated`);
    // const dataUnderReplicated = await responseUnderReplicated.json();
    // //console.log('UnderReplicate', dataUnderReplicated);

    //loop through data and sum all values
    for (const metricChunk of underReplicated) {
      underRepSum += Number(metricChunk.value[1]);
    }

    // for (const metricChunk of activeControllers) {
    //   activeContSum += Number(metricChunk.value[1]);
    // }

    // for (const metricChunk of offlinePartitions) {
    //   offlinePartSum += Number(metricChunk.value[1]);
    // }

  //set state of kafkaData
    setKafkaData({
        // offlinePartitionsParsed: offlinePartSum,
        // activeControllersParsed: activeContSum,
        underReplicatedParsed: underRepSum,
    });
  }

  // useEffect(() => {
  //   setKafkaData(JSON.parse(window.localStorage.getItem('kafkaData')));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem('kafkaData', kafakData);
  // }, [kafkaData]);

  //deconstruct state
  // const { offlinePartitions, activeControllers, underReplicated } = kafkaData;

  // localStorage.setItem('offlinePartitions', offlinePartitions);
  // localStorage.setItem('activeControllers', activeControllers);
  // localStorage.setItem('underReplicated', underReplicated);

  return (
    <div className="key-metrics">
        {/* <Paper sx={stylingBox}>
          <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Offline Partitions</Typography>
          <Typography className="big-number" sx={{ fontSize: '3rem'}}>{offlinePartitions}</Typography>
        </Paper>
        <Paper sx={stylingBox}>
          <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Active Controllers</Typography>
          <Typography className="big-number" sx={{ fontSize: '3rem'}}>{activeControllers}</Typography>
        </Paper> */}
        <Paper sx={stylingBox}>
          <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Underreplicated Partitions</Typography>
          <Typography className="big-number" sx={{ fontSize: '3rem'}}>{underReplicated}</Typography>
        </Paper>
    </div>
  )

}
export default SimpleKeyMetrics;