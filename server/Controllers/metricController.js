const express = require('express');
const axios = require('axios');
const pg = require('../models/errorLog');


const prometheusServerHostname = 'http://localhost:';
const prometheusPort = '9090';
const url = prometheusServerHostname + prometheusPort;


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


metricController.getMetricData = async (req, res, next) => {
    const allMetrics = req.body;
    io.on('connection', (socket) => {
        console.log(socket.id, 'connected inside getMetricData');
    })
    const queryString = queryStringDictionary[metric];
    try {
        const data = await axios.get(`${url}${queryString}`);
        res.locals.metricData = data.data.data.result;
        return next();
    } catch (error) {
        return next({
            log: "Error in getData middleware: " + error,
            status: 404,
            message:  "Error occurred when obtaining Prometheus data: " + error
        })
    }
}


metricController.getErrors = async (req, res, next) => {
    const {email} = req.body;
    const queryString = `SELECT * FROM errors WHERE email = '${email}' LIMIT 100`;
    const result = await pg.query(queryString);
    res.locals.errorData = result.rows;
    return next();
}

module.exports = metricController;

