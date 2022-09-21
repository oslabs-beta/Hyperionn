const { urlencoded } = require('express');
const express = require('express');
const path = require('path');
const app = express();
const router = require('./routers/Router');
const PORT = 3001;
const axios = require('axios');
const pg = require('./models/errorLog');

const queryStringDictionary = {
  underReplicated: '/api/v1/query?query=kafka_server_replicamanager_underreplicatedpartitions',
  offlinePartitions: '/api/v1/query?query=kafka_controller_kafkacontroller_offlinepartitionscount',
  activeControllers: '/api/v1/query?query=kafka_controller_kafkacontroller_activecontrollercount',
  responseRate: '/api/v1/query?query=kafka_connect_connect_metrics_response_rate',
  requestRate: '/api/v1/query?query=kafka_connect_connect_metrics_request_rate',
  avgReqLatency: '/api/v1/query?query=kafka_producer_producer_metrics_request_latency_avg',
  avgReqLatencyZookeepers: '/api/v1/query?query=zookeeper_avgrequestlatency',
  producerByteRate: '/api/v1/query?query=kafka_producer_producer_metrics_outgoing_byte_rate',
  bytesConsumedRate: '/api/v1/query?query=kafka_consumer_consumer_fetch_manager_metrics_bytes_consumed_rate'
};

const parseData = (data, metric, email) => {
  console.log('parse data email: ', email)
  const queryString = `INSERT INTO errors 
  (name, instance, env, value, time, email) 
  VALUES ($1, $2, $3, $4, $5, $6)`;
  const dataArray = data.data.data.result;
  if(metric === 'underReplicated' || metric === 'offlinePartitions'){
      try {
        dataArray.forEach((metricObj, ind, arr) => {
            if (Number(metricObj.value[1]) > 0) {
                const name = dataArray[ind].metric.__name__;
                const instance = dataArray[ind].metric.instance;
                const env = dataArray[ind].metric.env;
                const value = Number(dataArray[ind].value[1]);
                const today = new Date();
                const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                const partTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const time = date+' '+partTime;
                const queryParameter = [name, instance, env, value, time, email];
                pg.query(queryString, queryParameter)
                .then((result) => {
                    console.log('inserted out of range metric into db: ', result);
                    return dataArray;
                })
                .catch(err => {throw new Error('ERROR LOGGING OUT OF RANGE METRIC OFFLINE AND UNDER')});
            } 
          });
          return dataArray;
        } catch(error) {
        console.log('Error in parseData underReplicated and offlinePartitions: ', error);
        throw new Error('Error setting data metrics')
      }
  } else if (metric === 'activeControllers') {
    try {
      const sum = dataArray.reduce((acc, curr) => 
          Number(acc) + Number(curr.value[1])
      , 0);
      if (sum !== 1) {
          const name = dataArray[0].metric.__name__;
          const instance = dataArray[0].metric.instance;
          const env = dataArray[0].metric.env;
          const value = sum;
          const today = new Date();
          const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          const partTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          const time = date+' '+partTime;
          const queryParameter = [name, instance, env, value, time, email];
          pg.query(queryString, queryParameter)
          .then((result) => {
              console.log('inserted out of range metric into db: ', result);
              return dataArray;
          })
          .catch(err =>{ throw new Error('ERROR LOGGING OUT OF RANGE METRIC ACTIVE')});
      }
      return dataArray;
    } catch(error) {
      console.log('Error in parseData activeControllers: ', error);
      throw new Error('Error setting data metrics')
    }

    } else {
        try{
        const tempMetricData = dataArray;
 
        const arrayWithDataForAnish = []
        tempMetricData.forEach(dataObj => {
            arrayWithDataForAnish.push({x: Date.now(), y: Number(dataObj.value[1]), instance: dataObj.metric.instance});
        });
        return arrayWithDataForAnish;
      }catch(error){
        console.log('error in setting metric data: ', error)
        throw new Error('Error setting data metrics')
      }

    } 
 }
 const allMetrics = [ 'underReplicated', 'offlinePartitions', 'activeControllers', 'avgReqLatency', 'responseRate', 'requestRate', 'producerByteRate', 'bytesConsumedRate']; 

const getDataAndEmit = (url, email) => {
      allMetrics.forEach( async (metric) => {
    try{
      const queryString = queryStringDictionary[metric]
      const data = await axios.get(`${url}${queryString}`);
      const parsedData = parseData(data, metric, email)
      console.log('back end sending this data through socket: ', metric, parsedData)
      io.emit(metric, parsedData);
    }catch(error){
      console.log('error in get data and emit', error)
      throw new Error('Error in get Data and Emit')
    }
  }) 
}


const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});
global.io = io;


io.on('connection', socket => {

  socket.on("ip&email", (ip, email) => {
    setInterval(getDataAndEmit, 5000, ip, email); //ip = domain:port
  })


})

//socket hosted on 3500
http.listen(3500, () => console.log('listening on http://localhost:3500') );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', express.static(path.resolve(__dirname,'../dist')));

//Serve index.html file from src
app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../src/index.html'));
});

app.use('/server', router)


/**
 * configure express global error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
 app.use((err, req, res, next) => {
  
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred: ' + err }, 
  };
  
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  console.log(errorObj.message);
  
  return res.status(errorObj.status).json(errorObj.message)
});

app.listen(PORT, () => console.log('LISTENING ON PORT: ' + PORT));

module.exports = app;