const { body, check } = require('express-validator')

const validateContentPlan = [
    check('name')
      .exists()
      .withMessage('Field name is required')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 4 and 20 characters'),
  
    check('email')
      .exists()
      .withMessage('Field email is required')
      .isEmail()
      .withMessage('Email must be valid')
      .isLength({  min: 6, max: 255 })
      .withMessage('Email must be between 6 and 255 characters'),
  
    check('totalIngress')
      .exists()
      .withMessage('Field totalIngress is required')
      .isNumeric()
      .withMessage('Field totalIngress is not a number'),
  
    check('sector')
      .exists()
      .withMessage('Field sector is required')
      .isInt()
      .withMessage('Field sector is not a single number')
      .isIn([1, 2])
      .withMessage('Field sector has not content a current option'),
  
    check('workYears')
      .exists()
      .withMessage('Field workYears is required')
      .isInt()
      .withMessage('Field workYears is not a single number')
      .custom((value) => value >= 0 && value <= 100)
      .withMessage('workYears must be between 0 and 100 characters'),
  
    check('amount')
      .exists()
      .withMessage('Field amount is required')
      .isNumeric()
      .withMessage('Field amount is not a number')
      .custom((value) => value >= 100 && value <= 2000)
      .withMessage('amount must be between 100 and 2000'),
    
    body('frecuency') 
      .if(body('frecuency').exists())
      .isInt().withMessage('Field frecuency is not a single number')
      .isIn([1, 2])
      .withMessage('Field frecuency has not content a current option'),
  
    body('payTime')
      .if(body('payTime').exists())
      .isInt().withMessage('Field payTime is not a single number')
      .isIn([3, 6, 12, 18, 24, 36])
      .withMessage('Field payTime has not content a current option')
  ]

module.exports = validateContentPlan