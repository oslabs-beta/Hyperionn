import React, { useState, useRef, useEffect, MyProvider } from 'react'
import { Paper, Box,Typography, Card, Popover } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';

const OfflinePartitions = ({ offlinePartitions }) => {
  const [kafkaData, setKafkaData] = useState({
    offlinePartitionsParsed : []
  })
  let previousValues = useRef({offlinePartitions})
  
  useEffect(() => {
    if (previousValues.current.offlinePartitions !== offlinePartitions) {
      parseSimpleKeyMetrics(offlinePartitions);
      previousValues.current = { offlinePartitions }
      console.log('offlinePartitions: ', offlinePartitions);
    }
  });

  function parseSimpleKeyMetrics(offPart) {
    let offlinePartSum = 0;
    if (JSON.stringify(offPart) === '{}') return;

    //loop through data and sum all values
    for (const metricChunk of offPart) {
      offlinePartSum += Number(metricChunk.value[1]);
    }

  //set state of kafkaData
    setKafkaData({ offlinePartitionsParsed: offlinePartSum });
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

  const { offlinePartitionsParsed } = kafkaData;

  return (
    <Card>
          <Paper className="paper" sx={{boxShadow:"none"}}>
            <Typography role='title' className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Offline Partitions</Typography>
            <Box sx={{ display:'flex', justifyContent:'space-between', alignContent:'flex-end'}}>
              <Typography className="big-number" sx={{ fontSize: '3rem'}}>{offlinePartitionsParsed}</Typography>
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
                <Typography sx={{ p: 2 }}>This metric reports the number of partitions without an active leader. Because all read and write operations are only performed on partition leaders, you should alert on a non-zero value for this metric to prevent service interruptions. Any partition without an active leader will be completely inaccessible, and both consumers and producers of that partition will be blocked until a leader becomes available.</Typography>
                <Typography sx={{ p: 1, color: '#f366dc' }}>Source: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics/</Typography>
              </Popover>
            </Box>
          </Paper>
    </Card>
  )
}
export default OfflinePartitions;