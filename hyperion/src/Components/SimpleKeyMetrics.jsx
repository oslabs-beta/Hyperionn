import React from 'react'
import { Box } from '@mui/material';


const SimpleKeyMetrics = (props) => {
  // const {numberOfActivePartitions,
  //   numberOfActiveControllers,
  //   underReplicatedPartitions} = props
  const [kafkaData, setKafkaData] = useState({
    offlinePartitions : 0,
    activeControllers : 0,
    underReplicated : 0
  })

  useEffect(() =>{
    getSimpleKeyMetrics()
    .catch(console.log('error in fetchData' ))
  }, []) 

  async function getSimpleKeyMetrics() {
    console.log('prefetch')
    //fetch number of active partition data
    const responseOfflinePart = await fetch('/server/metrics?metric=offlinePartitions');
    const dataOfflinePart = await responseOfflinePart.json();

    //fetch number of active controllers
    const responseActiveCont = await fetch('/server/metrics?metric=activeController');
    const dataActiveCont = await responseActiveCont.json();

  //fetch under replicated partition data
    const responseUnderReplicated = await fetch('/server/metrics?metric=underReplicated');
    const dataUnderReplicated = await responseUnderReplicated.json();

  //set state of kafkaData
    setKafkaData({
        offlinePartitions: dataOfflinePart.offlinePartitions,
        activeControllers: dataActiveCont.activeControllers,
        underReplicated: dataUnderReplicated.underReplicatedPartitions,
    })

  }

  setInterval(getSimpleKeyMetrics, 5000)



  return (
    <div>
        <Box>
         <NumberOfActiveControllers/>
        </Box>
        <Box>
          <NumberOfOfflinePartitions/>
        </Box>
        <Box>
          <UnderReplicatedPartitions/>
        </Box>
    </div>
  )

}
export default SimpleKeyMetrics;