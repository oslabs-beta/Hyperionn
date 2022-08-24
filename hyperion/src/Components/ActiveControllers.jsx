import React, { useState, useRef, useEffect, MyProvider } from 'react'
import { Paper, Box,Typography, Card, Popover } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';

const ActiveControllers = ({ activeControllers }) => {
  const [kafkaData, setKafkaData] = useState({
    activeControllersParsed : [],
  })
  let previousValues = useRef({ activeControllers })
 
  useEffect(() => {
    if (previousValues.current.activeControllers !== activeControllers) {
      parseSimpleKeyMetrics( activeControllers);
      previousValues.current = {activeControllers}
      console.log('activeControllers: ', activeControllers);
    }
  });

  function parseSimpleKeyMetrics( actCont ) {
 
    let activeContSum = 0;    
    if ( JSON.stringify(actCont) === '{}') return;

    //loop through data and sum all values
    for (const metricChunk of actCont) {
      activeContSum += Number(metricChunk.value[1]);
    }

  //set state of kafkaData
    setKafkaData({ activeControllersParsed: activeContSum });
  }


  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = (open) ? 'simple-popover' : undefined;

  const { activeControllersParsed } = kafkaData;

  return (
    <Card>
          <Paper className="paper" sx={{boxShadow:"none"}}>
            <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Active Controllers</Typography>
            <Box sx={{ display:'flex', justifyContent:'space-between', alignContent:'flex-end'}}>
              <Typography className="big-number" sx={{ fontSize: '3rem'}}>{activeControllersParsed}</Typography>
              <ReadMoreIcon 
                fontSize='small' 
                onClick={handleClick} 
                sx={{
                color:'#a4a4a4',
                '&:hover': {
                    color: '#ce10fa',
                },
                }}></ReadMoreIcon>
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
            </Box>
          </Paper>
    </Card>    
  )
}
export default ActiveControllers;