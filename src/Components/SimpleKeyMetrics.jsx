import React, { useState, useRef, useEffect, MyProvider } from 'react'
import { Paper, Box,Typography, Container, Grid, Popover, Button } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';

const SimpleKeyMetrics = ({ underReplicated, activeControllers, offlinePartitions }) => {

  const [kafkaData, setKafkaData] = useState({
    underReplicatedParsed : [],
    activeControllersParsed : [],
    offlinePartitionsParsed : []
  })
  let previousValues = useRef({underReplicated, activeControllers, offlinePartitions})
  
  useEffect(() => {
    if (previousValues.current.activeControllers !== activeControllers && previousValues.current.underReplicated !== underReplicated && previousValues.current.offlinePartitions !== offlinePartitions) {
      parseSimpleKeyMetrics( activeControllers, offlinePartitions, underReplicated);
      previousValues.current = {underReplicated, activeControllers, offlinePartitions}
      console.log('fresh data in simplekeymetrics');
      console.log('underReplicated: ', underReplicated);
      console.log('activeControllers: ', activeControllers);
      console.log('offlinePartitions: ', offlinePartitions);
    }
  });
  
  function parseSimpleKeyMetrics( actCont, offPart, underRep ) {
    let offlinePartSum = 0;
    let activeContSum = 0;    
    let underRepSum = 0;
    if ( JSON.stringify(actCont) === '{}' || JSON.stringify(offPart) === '{}' || JSON.stringify(underRep) === '{}') return;
  
    for (const metricChunk of underRep) {
      underRepSum += Number(metricChunk.value[1]);
    }

    for (const metricChunk of actCont) {
      activeContSum += Number(metricChunk.value[1]);
    }

    for (const metricChunk of offPart) {
      offlinePartSum += Number(metricChunk.value[1]);
    }

    setKafkaData({
        offlinePartitionsParsed: offlinePartSum,
        activeControllersParsed: activeContSum,
        underReplicatedParsed: underRepSum,
    });
  }

  const [anchorElUnderRep, setAnchorElUnderRep] = useState(null);
  const [anchorElActiveCont, setAnchorElActiveCont] = useState(null);
  const [anchorElOffPart, setAnchorElOffPart] = useState(null);

  const handleClickUnderRep = (event) => {
    setAnchorElUnderRep(event.currentTarget);
  };

  const handleClickActiveCont = (event) => {
    setAnchorElActiveCont(event.currentTarget);
  };

  const handleClickOffPart = (event) => {
    setAnchorElOffPart(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElOffPart(null);
    setAnchorElActiveCont(null);
    setAnchorElUnderRep(null);
  };

  const openOff = Boolean(anchorElOffPart);
  const openActive = Boolean(anchorElActiveCont);
  const openUnder = Boolean(anchorElUnderRep);

  const id = (openOff || openActive || openUnder) ? 'simple-popover' : undefined;

  const { offlinePartitionsParsed, activeControllersParsed, underReplicatedParsed } = kafkaData;

  return (
    <Container maxWidth="xl" sx={{ display:'flex', flexDirection:'row' }}>
      <Grid container spacing={2}>

        {/* Offline Partitions */}
        <Grid item xs={12} sm={4}>
          <Paper className="paper" sx={{boxShadow:"none"}}>
            <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Offline Partitions</Typography>
            <Box sx={{ display:'flex', justifyContent:'space-between', alignContent:'flex-end'}}>
              <Typography className="big-number" sx={{ fontSize: '3rem'}}>{offlinePartitionsParsed}</Typography>
              <ReadMoreIcon fontSize='small' onClick={handleClickOffPart} sx={{color:'#a4a4a4'}}></ReadMoreIcon>
              <Popover
                id={id}
                open={openOff}
                anchorElOffPart={anchorElOffPart}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Typography sx={{ p: 2 }}>This metric reports the number of partitions without an active leader. Because all read and write operations are only performed on partition leaders, you should alert on a non-zero value for this metric to prevent service interruptions. Any partition without an active leader will be completely inaccessible, and both consumers and producers of that partition will be blocked until a leader becomes available.</Typography>
                <Typography sx={{ p: 1, color: '#f366dc' }}>Source: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics/</Typography>
              </Popover>
            </Box>
          </Paper>
        </Grid>

        {/* Active Controllers */}
        <Grid item xs={12} sm={4}>
          <Paper className="paper" sx={{boxShadow:"none"}}>
            <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Active Controllers</Typography>
            <Box sx={{ display:'flex', justifyContent:'space-between', alignContent:'flex-end'}}>
              <Typography className="big-number" sx={{ fontSize: '3rem'}}>{activeControllersParsed}</Typography>
              <ReadMoreIcon fontSize='small' onClick={handleClickActiveCont} sx={{color:'#a4a4a4'}}></ReadMoreIcon>
              <Popover
                id={id}
                open={openActive}
                anchorElActiveCont={anchorElActiveCont}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
               >
               <Typography sx={{ p: 2 }}>The first node to boot in a Kafka cluster automatically becomes the controller, and there can be only one. The controller in a Kafka cluster is responsible for maintaining the list of partition leaders, and coordinating leadership transitions (in the event a partition leader becomes unavailable). If it becomes necessary to replace the controller, ZooKeeper chooses a new controller randomly from the pool of brokers. The sum of ActiveControllerCount across all of your brokers should always equal one, and you should alert on any other value that lasts for longer than one second.</Typography>
               <Typography sx={{ p: 1, color: '#f366dc' }}>Source: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics/</Typography>
             </Popover>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className="paper" sx={{boxShadow:"none"}}>
            <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Underreplicated Partitions</Typography>
            <Box sx={{ display:'flex', justifyContent:'space-between', alignContent:'flex-end'}}>
              <Typography className="big-number" sx={{ fontSize: '3rem'}}>{underReplicatedParsed}</Typography>
              <ReadMoreIcon fontSize='small' onClick={handleClickUnderRep} sx={{color:'#a4a4a4'}}></ReadMoreIcon>
              <Popover
                id={id}
                open={openUnder}
                anchorElUnderRep={anchorElUnderRep}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
              <Typography sx={{ p: 2 }}>In a healthy cluster, the number of in sync replicas (ISRs) should be exactly equal to the total number of replicas. If partition replicas fall too far behind their leaders, the follower partition is removed from the ISR pool, and you should see a corresponding increase in IsrShrinksPerSec. If a broker becomes unavailable, the value of UnderReplicatedPartitions will increase sharply. Since Kafka’s high-availability guarantees cannot be met without replication, investigation is certainly warranted should this metric value exceed zero for extended time periods.</Typography>
              <Typography sx={{ p: 1, color: '#f366dc' }}>Source: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics/</Typography>
             </Popover>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
export default SimpleKeyMetrics;