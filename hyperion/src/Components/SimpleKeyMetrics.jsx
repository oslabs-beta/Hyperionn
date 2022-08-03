import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material';


const SimpleKeyMetrics = (props) => {
 
  const [kafkaData, setKafkaData] = useState({
    offlinePartitions : [],
    activeControllers : [],
    underReplicated : []
  })

  useEffect(() =>{
    getSimpleKeyMetrics()
    .catch(console.log('error in fetchData' ))
  }, []) 

  async function getSimpleKeyMetrics() {

    console.log('prefetch')
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

  //set state of kafkaData
    setKafkaData({
        offlinePartitions: dataOfflinePart,
        activeControllers: dataActiveCont,
        underReplicated: dataUnderReplicated,
    })

  }

  //setInterval(getSimpleKeyMetrics, 5000)



  return (
    <div>
        <Box>
          Number of Offline Partitions:
        </Box>
        <Box>
        </Box>
        <Box>
        </Box>
    </div>
  )

}
export default SimpleKeyMetrics;