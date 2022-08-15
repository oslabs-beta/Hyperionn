const express = require('express');
const router = express.Router();
const metricController = require('../Controllers/metricController');
const userController = require('../Controllers/userController');
const axios = require('axios')
const prometheusServerHostname = 'http://localhost:';
const prometheusPort = '9090';
const url = prometheusServerHostname + prometheusPort;
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

const queryStringDictionary = {
  underReplicated: '/api/v1/query?query=kafka_server_replicamanager_underreplicatedpartitions',
  offlinePartitions: '/api/v1/query?query=kafka_controller_kafkacontroller_offlinepartitionscount',
  activeControllers: '/api/v1/query?query=kafka_controller_kafkacontroller_activecontrollercount',
  responseRate: '/api/v1/query?query=kafka_connect_connect_metrics_response_rate',
  requestRate: '/api/v1/query?query=kafka_connect_connect_metrics_request_rate',
  avgReqLatency: '/api/v1/query?query=kafka_producer_producer_metrics_request_latency_avg',
  avgReqLatencyZookeepers: '/api/v1/query?query=zookeeper_avgrequestlatency',
};

const getDataAndEmit = async (metric) => {
   for (let key in queryStringDictionary){
     const queryString = queryStringDictionary[key]
     const data = await axios.get(`${url}${queryString}`);
             //Create a property on res.locals with the data to be sent back to the client
     const emittedData  = data.data.data.result;
     console.log(key);
     io.emit('data', {key: emittedData});
  }
}
const time = 5000;

const emitter = (req, res, next) =>  {
  console.log('about to send some data!')
  const { metric } = req.query;
  //setInterval(()=> getDataAndEmit(metric), time)
  setTimeout(()=> getDataAndEmit(metric), time)
  io.emit('data', { 'message': res.locals.metricData });

  console.log('sent some data!!')

  return next()
}
//Handle get requests for metricData
router.get('/metrics', 
  // userController.checkUser,
  metricController.getMetricData, 
  metricController.parseData,
  emitter,
  (req, res) => {
    return res.send('connection established, and emitted data')
    // return res.status(200).json(res.locals.metricData);
  }
)

router.get('/errors', 
  metricController.getErrors, 
  (req, res) => {
    return res.status(200).json(res.locals.errorData);
  }
)

//Handle post requests for first time connects
router.post('/metrics', 
  userController.connectPort, 
  (req, res) => {
    return res.status(200).send('Saved prometheus information');
  }
)

module.exports = router;