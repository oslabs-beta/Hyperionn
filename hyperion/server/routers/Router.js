const express = require('express');
const router = express.Router();
const metricController = require('../Controllers/metricController');
const userController = require('../Controllers/userController');
const axios = require('axios')
const prometheusServerHostname = 'http://localhost:';
const prometheusPort = '9090';
// const url = prometheusServerHostname + prometheusPort;
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


//setTimeout(() => {}, 5000)


console.log('in router SOS')

const queryStringDictionary = {
  underReplicated: '/api/v1/query?query=kafka_server_replicamanager_underreplicatedpartitions',
  offlinePartitions: '/api/v1/query?query=kafka_controller_kafkacontroller_offlinepartitionscount',
  activeControllers: '/api/v1/query?query=kafka_controller_kafkacontroller_activecontrollercount',
  responseRate: '/api/v1/query?query=kafka_connect_connect_metrics_response_rate',
  requestRate: '/api/v1/query?query=kafka_connect_connect_metrics_request_rate',
  avgReqLatency: '/api/v1/query?query=kafka_producer_producer_metrics_request_latency_avg',
  avgReqLatencyZookeepers: '/api/v1/query?query=zookeeper_avgrequestlatency',
};

// const parseData = (data, metric) => {
//   // if (res.locals.connected === true) {
//   const queryString = `INSERT INTO errors 
//   (name, instance, env, value, time, user_id) 
//   VALUES ($1, $2, $3, $4, $5, $6)`;
//   const dataArray = data.data.data.result;
//   // console.log('dataArray: ', dataArray);
//   if(metric === 'underReplicated' || metric === 'offlinePartitions'){
//       // console.log('inside logic for underReplicated/offlinePartitions');
//       // console.log('metricData to be parsed: ', res.locals.metricData);
//       // console.log(Date.now());
//       try {
//         dataArray.forEach((metricObj, ind, arr) => {
//             if (Number(metricObj.value[1]) > 0) {
//                 const name = dataArray[ind].metric.__name__;
//                 const instance = dataArray[ind].metric.instance;
//                 const env = dataArray[ind].metric.env;
//                 const value = Number(dataArray[ind].value[1]);
//                 const dateObj = new Date(dataArray[ind].value[0]);
//                 const time = dateObj.toLocaleString(); //human readable timestamp
//                 const user_id = 1;
//                 const queryParameter = [name, instance, env, value, time, user_id];
//                 pg.query(queryString, queryParameter)
//                 .then((result) => {
//                     console.log('inserted out of range metric into db: ', result);
//                     return dataArray;
//                 })
//                 .catch(err => {throw new Error('ERROR LOGGING OUT OF RANGE METRIC')});
//             } 
//           });
//           return dataArray;
//         } catch(error) {
//         console.log('Error in parseData underReplicated and offlinePartitions: ', error);
//         throw new Error('Error setting data metrics')
//       }
//   } else if (metric === 'activeControllers') {
//     try {
//       const sum = dataArray.reduce((acc, curr) => 
//           Number(acc) + Number(curr.value[1])
//       , 0);
//       // console.log('sum: ', sum);
//       if (sum !== 1) {
//           const name = dataArray[0].metric.__name__;
//           const instance = dataArray[0].metric.instance;
//           const env = dataArray[0].metric.env;
//           const value = sum;
//           const time = dataArray[0].value[0]
//           const user_id = 1;
//           const queryParameter = [name, instance, env, value, time, user_id];
//           pg.query(queryString, queryParameter)
//           .then((result) => {
//               console.log('inserted out of range metric into db: ', result);
//               return dataArray;
//           })
//           .catch(err =>{ throw new Error('ERROR LOGGING OUT OF RANGE METRIC')});
//       }
//       return dataArray;
//     } catch(error) {
//       console.log('Error in parseData activeControllers: ', error);
//       throw new Error('Error setting data metrics')
//     }

//     } else {
//         //grab Metric data out of res.locals
//         try{
//           // console.log('data for tempMetricData: ', data)
//         const tempMetricData = dataArray;
//         //create a new date object
//         // const today = new Date();
//         //Get CURRENT TIME from the date object
//         // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//         //create an array to hold data needed by Anoish on the front end
//         const arrayWithDataForAnish = []
//         //iterate through our metric data, pushing relevant data into the array to be sent to the front end
//         tempMetricData.forEach(dataObj => {
//             arrayWithDataForAnish.push({x: Date.now(), y: dataObj.value[1], instance: dataObj.metric.instance});
//         });
//         // const objWithDataForAnish = {'x': Math.floor(Date.now() / 1000), 'y': averageLatency};
//         // console.log('arrayWithDataForAnish: ', arrayWithDataForAnish);
//         //send data to the front end on res.locals
//         return arrayWithDataForAnish;
//       }catch(error){
//         console.log('error in setting metric data: ', error)
//         throw new Error('Error setting data metrics')
//       }
//         // parse out data to conform to an object with an x value (timestamp) and a y value (data value)
//         // res.locals.metricData = 

//     } 
//  }
//  const allMetrics = ['underReplicated']; 


// const getDataAndEmit = (socket, url) => {
//   //  for (let key in queryStringDictionary){
//     // allMetrics.forEach(metric => {
//       console.log('trying to get data SOS')
//       allMetrics.forEach( async (metric) => {
//     try{
//       const queryString = queryStringDictionary[metric]
//       const data = await axios.get(`${url}${queryString}`);
//       const parsedData = parseData(data, metric)
//               //Create a property on res.locals with the data to be sent back to the client
//       // const emittedData  = data.data.data.result;
//       // console.log(key);
//       console.log('back end sending this data through socket: ', metric, parsedData)
//       // io.emit(metric, parsedData);
//       io.emit(metric, parsedData);
//     }catch(error){
//       console.log('error in get data and emit', error)
//       throw new Error('Error in get Data and Emit')
//     }
//   }) 
// }
const time = 5000;
let hasBeenCalled = false;


// const emitter = (req, res, next) =>  {
//   if(hasBeenCalled) return next();
//   // console.log('about to send some data!')
//   // const { metric } = req.query;
//   //const allMetrics = req.body;
//   let count = 1;
//   try{
//   allMetrics.forEach(metric => {
//     setInterval(()=> getDataAndEmit(metric), time)
//     //console.log('just set a new interval: ', ++count)
//     hasBeenCalled = true;
//   });
//   //setInterval(()=> getDataAndEmit(metric), time)
//   // io.emit('data', { 'message': res.locals.metricData });

//   // console.log('sent some data!!');
//   return next();
// }catch(error){
//   return next({
//     log: 'error in emitter',
//     status: 404,
//     message: 'error in emitter'
//   })
// }
// }

//Handle get requests for metricData
// router.post('/metrics', 
//   // userController.checkUser,
//   // metricController.getMetricData, 
//   // metricController.parseData,
//   emitter,
//   (req, res) => {
//     return res.send('connection established, and emitted data')
//     // return res.status(200).json(res.locals.metricData);
//   }
// )


// router.post('/isConnected', 
//   userController.checkUser, //check if user is in postgresql, if not make entry. if so, obtain port and domain

//   emitter,
//   (req, res) => {
//     return res.send('connection established, and emitted data')
//     // return res.status(200).json(res.locals.metricData);
//   }
// )





router.post('/errors', 
  metricController.getErrors, 
  (req, res) => {
    return res.status(200).json(res.locals.errorData);
  }
)

//Handle post requests for first time connects
router.post('/ports', 
  userController.connectPort, 
  (req, res) => {
    return res.status(200).send('Saved prometheus information');
  }
)

module.exports = router;