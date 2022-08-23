const { urlencoded } = require('express');
const express = require('express');
const path = require('path');
const app = express();
const router = require('./routers/Router');
// const getDataAndEmit = require('./routers/Router');
const PORT = 3001;
const axios = require('axios');
//const { SocketAddress } = require('net');
// var firebase = require('firebase');
// var firebaseui = require('firebaseui');
// const { auth } = require('express-openid-connect');
const queryStringDictionary = {
  underReplicated: '/api/v1/query?query=kafka_server_replicamanager_underreplicatedpartitions',
  offlinePartitions: '/api/v1/query?query=kafka_controller_kafkacontroller_offlinepartitionscount',
  activeControllers: '/api/v1/query?query=kafka_controller_kafkacontroller_activecontrollercount',
  responseRate: '/api/v1/query?query=kafka_connect_connect_metrics_response_rate',
  requestRate: '/api/v1/query?query=kafka_connect_connect_metrics_request_rate',
  avgReqLatency: '/api/v1/query?query=kafka_producer_producer_metrics_request_latency_avg',
  avgReqLatencyZookeepers: '/api/v1/query?query=zookeeper_avgrequestlatency',
};
// const prometheusServerHostname = 'http://localhost:';
// const prometheusPort = '9090';
// const url = prometheusServerHostname + prometheusPort;
//import { Server } from "socket.io";

// const io = new Server(3500);
const parseData = (data, metric) => {
  // if (res.locals.connected === true) {
  const queryString = `INSERT INTO errors 
  (name, instance, env, value, time, user_id) 
  VALUES ($1, $2, $3, $4, $5, $6)`;
  const dataArray = data.data.data.result;
  // console.log('dataArray: ', dataArray);
  if(metric === 'underReplicated' || metric === 'offlinePartitions'){
      // console.log('inside logic for underReplicated/offlinePartitions');
      // console.log('metricData to be parsed: ', res.locals.metricData);
      // console.log(Date.now());
      try {
        dataArray.forEach((metricObj, ind, arr) => {
            if (Number(metricObj.value[1]) > 0) {
                const name = dataArray[ind].metric.__name__;
                const instance = dataArray[ind].metric.instance;
                const env = dataArray[ind].metric.env;
                const value = Number(dataArray[ind].value[1]);
                const dateObj = new Date(dataArray[ind].value[0]);
                const time = dateObj.toLocaleString(); //human readable timestamp
                const user_id = 1;
                const queryParameter = [name, instance, env, value, time, user_id];
                pg.query(queryString, queryParameter)
                .then((result) => {
                    console.log('inserted out of range metric into db: ', result);
                    return dataArray;
                })
                .catch(err => {throw new Error('ERROR LOGGING OUT OF RANGE METRIC')});
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
      // console.log('sum: ', sum);
      if (sum !== 1) {
          const name = dataArray[0].metric.__name__;
          const instance = dataArray[0].metric.instance;
          const env = dataArray[0].metric.env;
          const value = sum;
          const time = dataArray[0].value[0]
          const user_id = 1;
          const queryParameter = [name, instance, env, value, time, user_id];
          pg.query(queryString, queryParameter)
          .then((result) => {
              console.log('inserted out of range metric into db: ', result);
              return dataArray;
          })
          .catch(err =>{ throw new Error('ERROR LOGGING OUT OF RANGE METRIC')});
      }
      return dataArray;
    } catch(error) {
      console.log('Error in parseData activeControllers: ', error);
      throw new Error('Error setting data metrics')
    }

    } else {
        //grab Metric data out of res.locals
        try{
          // console.log('data for tempMetricData: ', data)
        const tempMetricData = dataArray;
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
        // console.log('arrayWithDataForAnish: ', arrayWithDataForAnish);
        //send data to the front end on res.locals
        return arrayWithDataForAnish;
      }catch(error){
        console.log('error in setting metric data: ', error)
        throw new Error('Error setting data metrics')
      }
        // parse out data to conform to an object with an x value (timestamp) and a y value (data value)
        // res.locals.metricData = 

    } 
 }
 const allMetrics = [ 'underReplicated', 'offlinePartitions', 'activeControllers']; 

const getDataAndEmit = (url) => {
  //  for (let key in queryStringDictionary){
    // allMetrics.forEach(metric => {
      console.log('trying to get data SOS')
      allMetrics.forEach( async (metric) => {
    try{
      const queryString = queryStringDictionary[metric]
      const data = await axios.get(`${url}${queryString}`);
      const parsedData = parseData(data, metric)
              //Create a property on res.locals with the data to be sent back to the client
      // const emittedData  = data.data.data.result;
      // console.log(key);
      console.log('back end sending this data through socket: ', metric, parsedData)
      // io.emit(metric, parsedData);
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
  console.log('client connected');  

  // socket.on("range", range => {
    
  //   //passing down ip using closure in the queries.js file
  //   query_chart(socket, ipInCache, range);
    
    
  // })

  socket.on("ip", ip => {
    console.log('IN HERE')
    // for testing 
    // query(socket,ip);
    //setTimeout(callTransporter, 3000, {to: 'sendFromMetricCard@yay.com', subject: 'FAKE Underreplicated Partitions'});
    
    // uncomment after test for normal use
    setInterval(getDataAndEmit, 5000, ip); //ip = domain:port
  })

  // socket.on("alert", data => {
  //   throttled_callTransport(data);

  // })
})




//const count = 0;
// let data = Date.now()
// let data = 1;
// setInterval(()=>{data++},5000)
// io.on('connection', (socket) => {
//   console.log('a user connected');
//   console.log(socket.id)
  
//   socket.on('message', (message) =>     {
//     console.log(message);
//     io.emit('message', `${socket.id.substr(0,2)} said ${message}` );   
//   });
  
  
//   setInterval(function(){
//     socket.emit('data', data); 
// }, 5000);
  
// });


// io.on('connection', (socket) => { app.get('/server/metrics', (req,res)=> {
//   socket.emit(msg,res)
// })})

// const getMetricData = async (metric) => {
//   // if (res.locals.connected === true) {
//       console.log('entered true logic in getMetricData')
//       //destructure target query from request query

//       const queryString = queryStringDictionary[metric];
//       try {
//         //Request data from prometheus
//         const data = await axios.get(`${url}${queryString}`);
//         //Create a property on res.locals with the data to be sent back to the client
//         console.log(data.data.data.result)
//         return data.data.data.result;
//         //Invoke next in our middleware chain

//       } catch (error) {
//           //Invoke global error handler in case of any errors
//           console.log(error)
//       }
//     }
//io.on('connection',(socket)=>{
  //create a method to get some data, parse the data

// // 
// //const interval = () => {
// //   socket.emit('data', JSON.stringify(getMetricData('underReplicated')))
// // }
//   //set an interval to invoke that method every n seconds
//   setInterval(async ()=>{
//     socket.emit('data', await getMetricData('underReplicated'))
//   }, 5000)
//   // setInterval( () => socket.emit('data', JSON.stringify(getMetricData('underReplicated')), 5000));
//   // setInterval( () => socket.emit('data',{data: 'HERES SOME DATA FOR YOU BUDDY'}), 5000);

//   //send that data to client

//   }
// )


http.listen(3500, () => console.log('listening on http://localhost:3500') );



// io.use((socket, next) => {
//   if (isValid(socket.request)) {npm version
//     next();
//   } else {
//     next(new Error("invalid"));
//   }
// });








// const io = require('socket.io')(3500, {
//   cors: {
//     origin: ["*"],
//   },
// })

// io.on("connection", (socket) => {
//   // send a message to the client
//   io.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

//   // receive a message from the client
//   io.on("hello from client", (...args) => {
//     console.log("ARGS IM A PIRATE: ", ...args)
//     console.log(socket.id)
//   });
// });


//Boiler plate for parsing incoming json and requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', express.static(path.resolve(__dirname,'../dist')));

//Serve index.html file from src
app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../src/index.html'));
});

app.use('/server', router)

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:3000',
//   clientID: 'NWBHNft50IXsivyNlP58egnDHfyYiuWy',
//   issuerBaseURL: 'https://dev-s3izej8e.us.auth0.com'
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });


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



//Set up server to listen on port
app.listen(PORT, () => console.log('LISTENING ON PORT: ' + PORT));

module.exports = app;