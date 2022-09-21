const express = require('express');
const axios = require('axios');
const pg = require('../models/users');
const { path } = require('../server');


const userController = {};

userController.connectPort = async (req, res, next) => {
  const { port, domain } = req.body;
  const queryParameter = [ domain, port, 1 ];
  const queryString = 'UPDATE users SET domain = $1, port = $2 WHERE user_id = $3';
  try {
    const result = await pg.query(queryString, queryParameter);
    res.locals.domain = domain;
    res.locals.port = port;
    return next();
  } catch (err) {
    return next(err)
  }
}

userController.checkUser = async (req, res, next) => {
  const {email} = req.body;
  const queryParameter = email;
  return next();
}

module.exports = userController;