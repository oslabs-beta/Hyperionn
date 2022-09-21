const express = require('express');
const router = express.Router();
const metricController = require('../Controllers/metricController');
const userController = require('../Controllers/userController');
const axios = require('axios')
const prometheusServerHostname = 'http://localhost:';
const prometheusPort = '9090';



const queryStringDictionary = {
  underReplicated: '/api/v1/query?query=kafka_server_replicamanager_underreplicatedpartitions',
  offlinePartitions: '/api/v1/query?query=kafka_controller_kafkacontroller_offlinepartitionscount',
  activeControllers: '/api/v1/query?query=kafka_controller_kafkacontroller_activecontrollercount',
  responseRate: '/api/v1/query?query=kafka_connect_connect_metrics_response_rate',
  requestRate: '/api/v1/query?query=kafka_connect_connect_metrics_request_rate',
  avgReqLatency: '/api/v1/query?query=kafka_producer_producer_metrics_request_latency_avg',
  avgReqLatencyZookeepers: '/api/v1/query?query=zookeeper_avgrequestlatency',
};


router.post('/errors', 
  metricController.getErrors, 
  (req, res) => {
    return res.status(200).json(res.locals.errorData);
  }
)


router.post('/ports', 
  userController.connectPort, 
  (req, res) => {
    return res.status(200).send('Saved prometheus information');
  }
)

module.exports = router;