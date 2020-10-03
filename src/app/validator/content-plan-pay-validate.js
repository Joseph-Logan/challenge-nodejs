const { check } = require('express-validator')

const validateContentPayPlan = [
  check("planId")
    .trim()
    .exists()
    .withMessage('Field planId is required'),
  
    check('amount')
      .exists()
      .withMessage('Field amount is required')
      .isNumeric()
      .withMessage('Field amount is not a number')
      .custom((value) => value >= 0)
      .withMessage('Amount Does not fall into range')
    
]

module.exports = validateContentPayPlan