import React, { useState, useRef, useEffect, MyProvider } from 'react'
import { Paper, Box, Typography } from '@mui/material';
//import { queryDictionary } from '../Containers/DataContainer.jsx';

// const pollingInterval = 5000;
const SimpleKeyMetrics = ({ underReplicated, activeControllers, offlinePartitions }) => {
  // console.log('props: ', props)
  // const { underReplicated, activeControllers, offlinePartitions } = props;
  // const { underReplicated, activeControllers, offlinePartitions } = props
  const [kafkaData, setKafkaData] = useState({
    underReplicatedParsed : [],
    activeControllersParsed : [],
    offlinePartitionsParsed : []
  })
  let previousValues = useRef({underReplicated, activeControllers, offlinePartitions})
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
    if (previousValues.current.activeControllers !== activeControllers && previousValues.current.underReplicated !== underReplicated && previousValues.current.offlinePartitions !== offlinePartitions) {
      parseSimpleKeyMetrics( activeControllers, offlinePartitions, underReplicated);
      previousValues.current = {underReplicated, activeControllers, offlinePartitions}
      console.log('fresh data in simplekeymetrics');
      console.log('underReplicated: ', underReplicated);
      console.log('activeControllers: ', activeControllers);
      console.log('offlinePartitions: ', offlinePartitions);
    }
    // console.log('underReplicated: ', underReplicated);
    // console.log('activeControllers: ', activeControllers);
    // console.log('offlinePartitions: ', offlinePartitions);
  });
  

  // useEffect(() => {
  // }, []);

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

  

  function parseSimpleKeyMetrics( actCont, offPart, underRep ) {
    // console.log('offlinePartitions prop: ', offlinePartitions)
    let offlinePartSum = 0;
    let activeContSum = 0;    
    let underRepSum = 0;
    if ( JSON.stringify(actCont) === '{}' || JSON.stringify(offPart) === '{}' || JSON.stringify(underRep) === '{}') return;
  

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
    for (const metricChunk of underRep) {
      underRepSum += Number(metricChunk.value[1]);
    }

    for (const metricChunk of actCont) {
      activeContSum += Number(metricChunk.value[1]);
    }

    for (const metricChunk of offPart) {
      offlinePartSum += Number(metricChunk.value[1]);
    }

  //set state of kafkaData
    setKafkaData({
        offlinePartitionsParsed: offlinePartSum,
        activeControllersParsed: activeContSum,
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

  const { offlinePartitionsParsed, activeControllersParsed, underReplicatedParsed } = kafkaData;

  return (
    <div className="key-metrics">
        <Paper sx={stylingBox}>
          <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Offline Partitions</Typography>
          <Typography className="big-number" sx={{ fontSize: '3rem'}}>{offlinePartitionsParsed}</Typography>
        </Paper>
        <Paper sx={stylingBox}>
          <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Active Controllers</Typography>
          <Typography className="big-number" sx={{ fontSize: '3rem'}}>{activeControllersParsed}</Typography>
        </Paper>
        <Paper sx={stylingBox}>
          <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Underreplicated Partitions</Typography>
          <Typography className="big-number" sx={{ fontSize: '3rem'}}>{underReplicatedParsed}</Typography>
        </Paper>
    </div>
  )

}
export default SimpleKeyMetrics;