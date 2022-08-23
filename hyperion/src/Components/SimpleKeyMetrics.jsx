import React, { useState, useRef, useEffect, MyProvider } from 'react'
import { Paper, Typography, Container, Grid, Popover, Button } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
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

  // const stylingBox = {
  //   display: "flex",
  //   flexDirection: "column",
  //   height: "90%",
  //   width: "200px",
  //   justifyContent: "space-evenly",
  //   alignItems: "center",
  //   alignContent: "center",
  //   textAlign: "center",
  //   margin: "10px",
  //   border: "1px solid #d0d0d0",
  //   boxShadow: "none",
  // }

  

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

  // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const { offlinePartitionsParsed, activeControllersParsed, underReplicatedParsed } = kafkaData;

  return (
    <Container maxWidth="xl" sx={{ display:'flex', flexDirection:'row' }}>
      <Grid container spacing={2}>

        {/* Offline Partitions */}
        <Grid item xs={12} sm={4}>
          <Paper className="paper" sx={{boxShadow:"none"}}>
            <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Offline Partitions</Typography>
            <Typography className="big-number" sx={{ fontSize: '3rem'}}>{offlinePartitionsParsed}</Typography>
            <ReadMoreIcon fontSize='small' onClick={handleClick} sx={{color:'#f6f6f6'}}></ReadMoreIcon>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Typography sx={{ p: 2 }}>This metric reports the number of partitions without an active leader. Because all read and write operations are only performed on partition leaders, you should alert on a non-zero value for this metric to prevent service interruptions. Any partition without an active leader will be completely inaccessible, and both consumers and producers of that partition will be blocked until a leader becomes available.</Typography>
              <Typography sx={{ p: 1, color: '#f366dc' }}>Source: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics/</Typography>
             </Popover>
          </Paper>
        </Grid>

        {/* Active Controllers */}
        <Grid item xs={12} sm={4}>
          <Paper className="paper" sx={{boxShadow:"none"}}>
            <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Active Controllers</Typography>
            <Typography className="big-number" sx={{ fontSize: '3rem'}}>{activeControllersParsed}</Typography>
            <ReadMoreIcon fontSize='small' onClick={handleClick} sx={{color:'#f6f6f6'}}></ReadMoreIcon>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Typography sx={{ p: 2 }}>The first node to boot in a Kafka cluster automatically becomes the controller, and there can be only one. The controller in a Kafka cluster is responsible for maintaining the list of partition leaders, and coordinating leadership transitions (in the event a partition leader becomes unavailable). If it becomes necessary to replace the controller, ZooKeeper chooses a new controller randomly from the pool of brokers. The sum of ActiveControllerCount across all of your brokers should always equal one, and you should alert on any other value that lasts for longer than one second.</Typography>
              <Typography sx={{ p: 1, color: '#f366dc' }}>Source: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics/</Typography>
             </Popover>
          </Paper>
        </Grid>

        {/* Underreplicated Partitions */}
        <Grid item xs={12} sm={4}>
          <Paper className="paper" sx={{boxShadow:"none"}}>
            <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Underreplicated Partitions</Typography>
            <Typography className="big-number" sx={{ fontSize: '3rem'}}>{underReplicatedParsed}</Typography>
            <ReadMoreIcon fontSize='small' onClick={handleClick} sx={{color:'#f6f6f6'}}></ReadMoreIcon>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Typography sx={{ p: 2 }}>In a healthy cluster, the number of in sync replicas (ISRs) should be exactly equal to the total number of replicas. If partition replicas fall too far behind their leaders, the follower partition is removed from the ISR pool, and you should see a corresponding increase in IsrShrinksPerSec. If a broker becomes unavailable, the value of UnderReplicatedPartitions will increase sharply. Since Kafka’s high-availability guarantees cannot be met without replication, investigation is certainly warranted should this metric value exceed zero for extended time periods.</Typography>
              <Typography sx={{ p: 1, color: '#f366dc' }}>Source: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics/</Typography>
             </Popover>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )

}
export default SimpleKeyMetrics;