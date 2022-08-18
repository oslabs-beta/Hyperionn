const regeneratorRuntime = require('regenerator-runtime')

module.exports = () => {
    console.log('in jest-setup');
    global.testServer = require('./server/server.js');
  };