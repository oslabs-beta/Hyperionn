const { urlencoded } = require('express');
const express = require('express');
const path = require('path');
const app = express();
const router = require('./routers/Router');
const PORT = 3001;
// var firebase = require('firebase');
// var firebaseui = require('firebaseui');
// const { auth } = require('express-openid-connect');

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