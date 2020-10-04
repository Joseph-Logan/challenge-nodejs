/**
 * Author: Joseph Ramirez
 */
const { randomBytes } = require('crypto')
const Fee = require('../app/model/fee')
const Calculate = require('../services/calculate-fee')
const Serialize = require('../services/serialize-responses')
const SingleSerialize = require('../app/validator/single-validation-error')
const HandleLogs = require('../services/logs-responses')

/**
 * Passing params
 * @param {Request} req 
 * @param {Response} res 
 */
const createPlan = async (req, res) => {
  try { 
    let language = req.query.lg || 'en'
    let data = req.body
    let plan = new Fee(data)
    plan.fee = await Calculate.handleInterest(data.amount, data.payTime, data.frecuency)
    plan.planId = await generateRandomId()
  
    if (plan.totalIngress < plan.fee) {
      HandleLogs(await Serialize.handleErrorAmount(language), 'POST', 'Failed', data.email)
      return res.status(400).json(await Serialize.handleErrorAmount(language))
    }

    let resp = await plan.save()
    HandleLogs('Micro service was payed successfully', 'POST', 'Done', data.email)
    return res.status(201).json(await Serialize.serializeResponseFields(resp, language))
  } catch (err) {
    return res.status(SingleSerialize.statusCode).json(await SingleSerialize.serializeErrors(['Error creating a microcredit']))
  }
}
/**
 * Generate planId -> in this example no validate if it's unique, so planId will be used to pay plan and reduce coute
 */
const generateRandomId = async () => {
  return `${randomBytes(4).toString('hex')}-${Math.floor(Math.random() * 100)}`
}

module.exports = createPlan 
