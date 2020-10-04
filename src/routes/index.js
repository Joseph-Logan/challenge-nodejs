// Not necesary create a project with controller, so in this case it's under arquitecture based on microservices
// The differents files in routes has a specific functionality and we restructure an better experience when you have a scalable 
// with specific file

const validateRequest = require('../app/validator/validate-request')
const validateContentPlan = require('../app/validator/content-plan-validate')
const validateContentPayPlan = require('../app/validator/content-plan-pay-validate')
const validateContentInfoLogs = require('../app/validator/content-info-logs')

const route = require('express').Router();
const createPlan = require('./create-plan');
const payPlan = require('./pay-plan')
const { infoMicroCredit, infoProcess } = require('./info-microcredit')

route.post(
  '/create-microcredit',
  validateContentPlan, 
  validateRequest, 
  createPlan
);

route.post(
  '/pay-microcredit',
  validateContentPayPlan,
  validateRequest,
  payPlan
);

route.post(
  '/info-microcredit',
  validateContentPlan,
  validateRequest,
  infoMicroCredit
);

route.post(
  '/info-logs',
  validateContentInfoLogs,
  validateRequest,  
  infoProcess
)


route.get('*', (req, res) => {
    res.status(404).send('Api not found')
})

module.exports = route
