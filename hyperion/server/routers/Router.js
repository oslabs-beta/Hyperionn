const express = require('express');
const router = express.Router();
const metricController = require('../Controllers/metricController');

// const axios = require('axios');

//Middleware to get underreplicated partition data from Prometheus
// const getData = async (req, res, next) => {

//   try {
//     //Request data from prometheus
//     const data = await axios.get('http://localhost:9090/api/v1/query?query=kafka_cluster_partition_underreplicated');
//     //Create a property on res.locals with the data to be sent back to the client
//     res.locals.data = data.data.data.result;
//     //Invoke next in our middleware chain
//     return next();
//   } catch (error) {
//     //Invoke global error handler in case of any errors
//       return next({
//         log: "Error in getData middleware: " + error,
//         status: 404,
//         message:  "Error occurred when obtaining partition data: " + error
//       })
//   }
// }

//Handle get requests for metricData
router.get('/metrics', 
  metricController.getMetricData, 
  metricController.parseData,
  (req, res) => {
    return res.status(200).json(res.locals.metricData);
  }
)

module.exports = router;