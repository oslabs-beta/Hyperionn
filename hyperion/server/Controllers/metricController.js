const express = require('express');
const axios = require('axios');

//This should be flexible based on what the client sends as their prometheus port, but for now we will be using port 9090
//http://<prometheusServerHostname>:<prometheusport>/targets
const prometheusServerHostname = 'http://localhost:';
const prometheusPort = '9090';
const url = prometheusServerHostname + prometheusPort;

//kafka_cluster_partition_underreplicated
//Create a dictionary of all needed query strings, representing metrics to send to prometheus
const queryStringDictionary = {
    underReplicated: '/api/v1/query?query=kafka_server_replicamanager_underreplicatedpartitions',
    offlinePartitions: '/api/v1/query?query=kafka_controller_kafkacontroller_offlinepartitionscount',
    activeControllers: '/api/v1/query?query=kafka_controller_kafkacontroller_activecontrollercount',
    responseRate: '/api/v1/query?query=kafka_connect_connect_metrics_response_rate',
    requestRate: '/api/v1/query?query=kafka_connect_connect_metrics_request_rate',
    avgReqLatency: '/api/v1/query?query=zookeeper_avgrequestlatency',
};

const metricController = {};

//Middleware to get under replicated partitions from Prometheus
metricController.getMetricData = async (req, res, next) => {
    //destructure target query from request query
    const { metric } = req.query;
    const queryString = queryStringDictionary[metric];
    try {
      //Request data from prometheus
      const data = await axios.get(`${url}${queryString}`);
      //Create a property on res.locals with the data to be sent back to the client
      res.locals.metricData = data.data.data.result;
      //Invoke next in our middleware chain
      return next();
  } catch (error) {
      //Invoke global error handler in case of any errors
      return next({
          log: "Error in getData middleware: " + error,
          status: 404,
          message:  "Error occurred when obtaining Prometheus data: " + error
      })
  }
 }
 //parse out the requested data for the client
 metricController.parseData =  (req, res, next) => {
    const { metric } = req.query;
    if(metric === 'underReplicated' || metric === 'offlinePartitions' || metric === 'activeControllers'){
        return next();
    }
    // parse out data to conform to an object with an x value (timestamp) and a y value (data value)
    // res.locals.metricData = 
    return next()
 }

module.exports = metricController;