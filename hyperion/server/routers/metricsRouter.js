const express = require('express');
const router = express.Router();
const axios = require('axios');
module.exports = router;

const getData = async (req, res, next) => {
  try {
    const data = await axios.get('localhost:9090/api/v1/labels')
    console.log(data);
    res.locals.data = data;
    return next();
  } catch (error) {
      return next({
        log: "Error in getData middleware: " + error,
        status: 404,
        message:  "Error in getData middleware: " + error
      })
  }
}

router.get('/metrics', getData, 
(req, res) => {
    return res.status(200).json(res.locals.data)
}
)