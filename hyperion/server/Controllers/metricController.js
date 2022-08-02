const express = require('express');
const axios = require('axios');

//This should be flexible based on what the client sends as their prometheus port, but for now we will be using port 9090
const prometheusPort = 9090;
const url = `http://localhost:${prometheusPort}`;

const queryStrings = {};
queryStrings.underReplicated = '/api/v1/query?query=kafka_cluster_partition_underreplicated';

const metricController = {};

//Middleware to get under replicated partitions from Prometheus
metricController.underReplicatedPartitions = async (req, res, next) => {
    const endpoint = 'underReplicated'
    const queryString = queryStrings[endpoint];
    try {
    //   const queryString = '/api/v1/query?query=kafka_cluster_partition_underreplicated';

      //Request data from prometheus
      const data = await axios.get(`${url}${queryString}`);
      //Create a property on res.locals with the data to be sent back to the client
      res.locals.underReplicatedPartitions = data.data.data.result;
      //Invoke next in our middleware chain
      return next();
  } catch (error) {
      //Invoke global error handler in case of any errors
      return next({
          log: "Error in getData middleware: " + error,
          status: 404,
          message:  "Error occurred when obtaining under replicated partition data: " + error
      })
  }
 }

 metricController.offlinePartitions = async (req, res, next) => {
  try {
      const queryString = '/api/v1/query?query=kafka_controller_kafkacontroller_offlinepartitionscount'
      //Request data from prometheus
      const data = await axios.get(`${url}${queryString}`);
      //Create a property on res.locals with the data to be sent back to the client
      res.locals.offlinePartitions = data.data.data.result;
      //Invoke next in our middleware chain
      return next();
  } catch (error) {
      //Invoke global error handler in case of any errors
      return next({
          log: "Error in getData middleware: " + error,
          status: 404,
          message:  "Error occurred when obtaining offline partition data: " + error
      })
  }
 }
module.exports = metricController;