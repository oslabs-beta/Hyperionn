const express = require('express');
const axios = require('axios');
const pg = require('../models/users');
const { path } = require('../server');


const userController = {};

userController.connectPort = async (req, res, next) => {
  const { port, domain } = req.body;
  console.log('port: ', port);
  console.log(typeof port);
  const queryParameter = [ domain, port, 1 ];
  const queryString = 'UPDATE users SET domain = $1, port = $2 WHERE user_id = $3';
  try {
    const result = await pg.query(queryString, queryParameter);
    console.log('saved port info: ', result);
    res.locals.domain = domain;
    res.locals.port = port;
    return next();
  } catch (err) {
    return next(err)
  }
}

userController.createUser = async (req, res, next) => {
  //if user doesn't exist, create one in sql db
}

//for checking if the user has a port already, if yes then res.locals.connected = true, 
//if not, res.locals.connect = false and then metrics controller won't show any data
userController.checkUser = async (req, res, next) => {
  const queryParameter = [1];
  const queryString = 'SELECT domain, port FROM users WHERE user_id = $1'
  try {
    const result = await pg.query(queryString, queryParameter);
    console.log('result from trying to find domain and port: ', result);
    res.locals.connect = true;
    return next();
  } catch(err) {
    return next(err);
  }
}

module.exports = userController;