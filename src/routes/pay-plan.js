/**
 * Author: Joseph Ramirez
 */
const Fee = require('../app/model/fee')
const Serialize = require('../services/serialize-responses')
const SingleSerialize = require('../app/validator/single-validation-error')
const validateAmount = require('../services/validate-amount')
const { handleLogs } = require('../services/logs-responses')

const getPlan = async (planId) => {
  try {
    return await Fee.findOne({ planId }).exec();
  } catch (err) {
    throw new Error(err)
  }
}

const payPlan = async (req, res) => {
  try {
    const { planId, amount } = req.body
    let plan = await getPlan(planId)
    let resp = await validateAmount(plan.amount, amount)
  
    Fee.findOneAndUpdate({planId}, {amount: resp.amount}, {"new": true})
      .then(async doc => {
        handleLogs('Pay microservice', 'POST', 'Done', plan.email)
        return res.status(200).json({...await Serialize.serializeResponseFields(doc), ...resp})
      })
      .catch(async () => {
        handleLogs('Error while paying microservice', 'POST', 'Failed', plan.email)
        return res.status(SingleSerialize.statusCode).json(await SingleSerialize.serializeErrors(['Error to process payment']))
      })
     
  } catch (err) {
    handleLogs('Error to process payment, ensure your planId is correctly', 'POST', 'Failed', plan.email)
    return res.status(SingleSerialize.statusCode).json(await SingleSerialize.serializeErrors(['Error to process payment, ensure your planId is correctly']))
  }
}

module.exports = payPlan
