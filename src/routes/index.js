// Not necesary create a project with controller, so in this case it's under arquitecture based on microservices
// The differents files in routes has a specific functionality and we restructure an better experience when you have a scalable 
// with specific file

const validateRequest = require('../app/validator/validate-request')
const validateContentPlan = require('../app/validator/content-plan-validate')
const validateContentPayPlan = require('../app/validator/content-plan-pay-validate')

const route = require('express').Router();
const createPlan = require('./create-plan');
const payPlan = require('./pay-plan')
const sendMail = require('./send-mail')

route.post(
  '/create-plan',
  validateContentPlan, 
  validateRequest, 
  createPlan
);

route.post(
  '/pay-plan',
  validateContentPayPlan,
  validateRequest,
  payPlan
);

route.post(
  '/info-plan',
  validateContentPlan,
  validateRequest,
  sendMail
)


route.get('*', (req, res) => {
    res.status(404).send('Api not found')
})

module.exports = route
