const { check } = require('express-validator')

const validateContentInfoLogs = [
  check('email')
  .exists()
  .withMessage('Field email is required')
  .isEmail()
  .withMessage('Email must be valid')
  .isLength({  min: 6, max: 255 })
  .withMessage('Email must be between 6 and 255 characters')
]

module.exports = validateContentInfoLogs