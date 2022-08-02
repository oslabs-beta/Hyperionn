import React from 'react'
import { Box } from '@mui/material';
import NumberOfActiveControllers from './KeyMetricsComponents/NumberOfActiveControllers.jsx'
import NumberOfOfflinePartitions from './KeyMetricsComponents/NumberOfOfflinePartitions.jsx'
import UnderReplicatedPartitions from './KeyMetricsComponents/UnderReplicatedPartitions.jsx'

const SimpleKeyMetrics = (props) => {
  // const {numberOfActivePartitions,
  //   numberOfActiveControllers,
  //   underReplicatedPartitions} = props

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