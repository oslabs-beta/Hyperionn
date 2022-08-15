const express = require('express');
const axios = require('axios');
const pg = require('../models/errorLog');

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
    avgReqLatency: '/api/v1/query?query=kafka_producer_producer_metrics_request_latency_avg',
    avgReqLatencyZookeepers: '/api/v1/query?query=zookeeper_avgrequestlatency',
};

const metricController = {};

//Middleware to get under replicated partitions from Prometheus
metricController.getMetricData = async (req, res, next) => {
    // if (res.locals.connected === true) {
        console.log('entered true logic in getMetricData')
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
    // } else {
    //     res.locals.metricData = null;
    //     return next()
    // }
}
 //parse out the requested data for the client
 metricController.parseData = (req, res, next) => {
    // if (res.locals.connected === true) {
        const { metric } = req.query;
        const queryString = `INSERT INTO errors 
        (name, instance, env, value, time, user_id) 
        VALUES ($1, $2, $3, $4, $5, $6)`;
        
        if(metric === 'underReplicated' || metric === 'offlinePartitions'){
            // console.log('inside logic for underReplicated/offlinePartitions');
            // console.log('metricData to be parsed: ', res.locals.metricData);
            // console.log(Date.now());
            res.locals.metricData.forEach((metricObj, ind, arr) => {
                if (Number(metricObj.value[1]) > 0) {
                    const name = res.locals.metricData[ind].metric.__name__;
                    const instance = res.locals.metricData[ind].metric.instance;
                    const env = res.locals.metricData[ind].metric.env;
                    const value = Number(res.locals.metricData[ind].value[1]);
                    const dateObj = new Date(res.locals.metricData[ind].value[0]);
                    const time = dateObj.toLocaleString(); //human readable timestamp
                    const user_id = 1;
                    const queryParameter = [name, instance, env, value, time, user_id];
                    pg.query(queryString, queryParameter)
                    .then((data) => {
                        console.log('inserted error into db: ', data);
                        return next();
                    })
                    .catch(err => {return next(err)});
                } else return next();
            });
    
        } else if (metric === 'activeControllers') {
            const sum = res.locals.metricData.reduce((acc, curr) => 
                Number(acc) + Number(curr.value[1])
            , 0);
            // console.log('sum: ', sum);
            if (sum !== 1) {
                const name = res.locals.metricData[0].metric.__name__;
                const instance = res.locals.metricData[0].metric.instance;
                const env = res.locals.metricData[0].metric.env;
                const value = sum;
                const time = res.locals.metricData[0].value[0]
                const user_id = 1;
                const queryParameter = [name, instance, env, value, time, user_id];
                pg.query(queryString, queryParameter)
                .then((data) => {
                    console.log('inserted error into db: ', data);
                    return next();
                })
                .catch(err => {return next(err)});
            }
            return next();
    
        } else {
            //grab Metric data out of res.locals
            const tempMetricData = res.locals.metricData;
            //create a new date object
            // const today = new Date();
            //Get CURRENT TIME from the date object
            // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            //create an array to hold data needed by Anoish on the front end
            const arrayWithDataForAnish = []
            //iterate through our metric data, pushing relevant data into the array to be sent to the front end
            tempMetricData.forEach(dataObj => {
                arrayWithDataForAnish.push({x: Date.now(), y: dataObj.value[1], instance: dataObj.metric.instance});
            });
            // const objWithDataForAnish = {'x': Math.floor(Date.now() / 1000), 'y': averageLatency};
            console.log('arrayWithDataForAnish: ', arrayWithDataForAnish);
            //send data to the front end on res.locals
            res.locals.metricData = arrayWithDataForAnish;
            // parse out data to conform to an object with an x value (timestamp) and a y value (data value)
            // res.locals.metricData = 
            return next();
        } 

    // } else {
    //     res.locals.metricData = null;
    //     return next();
    // }
 }

metricController.getErrors = async (req, res, next) => {
    const queryString = 'SELECT * FROM errors LIMIT 100';
    const result = await pg.query(queryString);
    console.log('result: ', result);
    res.locals.errorData = result.rows;
    return next();
}

module.exports = metricController;

