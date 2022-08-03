import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material';

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
        <Box>
          Number of Offline Partitions: {offlinePartitions}
        </Box>
        <Box>
          Number of Active Controllers: {activeControllers}
        </Box>
        <Box>
          Number of Underreplicated Partitions: {underReplicated}
        </Box>
    </div>
  )

}
export default SimpleKeyMetrics;