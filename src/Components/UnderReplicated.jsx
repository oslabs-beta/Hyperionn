import React, { useState, useRef, useEffect } from 'react'
import { Paper, Box,Typography, Card, Popover } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';


const UnderReplicated = ({ underReplicated }) => {

  const [kafkaData, setKafkaData] = useState({
    underReplicatedParsed : [],
  })

  let previousValues = useRef({ underReplicated })

  useEffect(() => {
    if (previousValues.current.underReplicated !== underReplicated) {
      parseSimpleKeyMetrics(underReplicated);
      previousValues.current = { underReplicated }
      console.log('underReplicated: ', underReplicated);
    }
  });
  

  function parseSimpleKeyMetrics(underRep) {   
    let underRepSum = 0;
    if (JSON.stringify(underRep) === '{}') return;
  
    //loop through data and sum all values
    for (const metricChunk of underRep) {
      underRepSum += Number(metricChunk.value[1]);
    }

  //set state of kafkaData
    setKafkaData({ underReplicatedParsed: underRepSum });
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

  const { underReplicatedParsed } = kafkaData;

  return (
        <Card>
          <Paper className="paper" sx={{boxShadow:"none"}}>
            <Typography className="data-label" sx={{ fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>Underreplicated Partitions</Typography>
            <Box sx={{ display:'flex', justifyContent:'space-between', alignContent:'flex-end'}}>
              <Typography className="big-number" sx={{ fontSize: '3rem'}}>{underReplicatedParsed}</Typography>
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
              <Typography sx={{ p: 2 }}>In a healthy cluster, the number of in sync replicas (ISRs) should be exactly equal to the total number of replicas. If partition replicas fall too far behind their leaders, the follower partition is removed from the ISR pool, and you should see a corresponding increase in IsrShrinksPerSec. If a broker becomes unavailable, the value of UnderReplicatedPartitions will increase sharply. Since Kafka’s high-availability guarantees cannot be met without replication, investigation is certainly warranted should this metric value exceed zero for extended time periods.</Typography>
              <Typography sx={{ p: 1, color: '#f366dc' }}>Source: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics/</Typography>
             </Popover>
            </Box>
          </Paper>
       </Card>
  )
}
export default UnderReplicated;