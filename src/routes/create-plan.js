/**
 * Author: Joseph Ramirez
 */
const { randomBytes } = require('crypto')
const Fee = require('../app/model/fee')
const Calculate = require('../services/calculate-fee')
const Serialize = require('../services/serialize-responses')

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
      return res.status(400).json(await Serialize.handleErrorAmount(language))
    }
    let resp = await plan.save()

    return res.status(201).json(await Serialize.serializeResponseFields(resp, language))
  } catch (err) {
    throw new Error(err)
  }
}
/**
 * Generate planId -> in this example no validate if it's unique, so planId will be used to pay plan and reduce coute
 */
const generateRandomId = async () => {
  return `${randomBytes(4).toString('hex')}-${Math.floor(Math.random() * 100)}`
}

module.exports = createPlan 
