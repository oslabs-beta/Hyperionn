const express = require('express');
const router = express.Router();
const metricController = require('../Controllers/metricController');

//Handle get requests for metricData
router.get('/metrics', 
  metricController.getMetricData, 
  // metricController.parseData,
  (req, res) => {
    return res.status(200).json(res.locals.metricData);
  }
)

module.exports = router;