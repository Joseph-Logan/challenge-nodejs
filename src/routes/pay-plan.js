/**
 * Author: Joseph Ramirez
 */
const Fee = require('../app/model/fee')
const Serialize = require('../services/serialize-responses')

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
  
    Fee.findOneAndUpdate({planId}, {amount: resp.amount}, { "new": true})
      .then(async doc => {
        return res.status(200).json({...await Serialize.serializeResponseFields(doc), ...resp})
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json({error: 'Error to process payment'})
      })
     
  } catch (err) {
    throw new Error(err)
  }
}

const validateAmount = async (amount, pay) => {
  let result = amount - pay

  if (amount === 0) {
    return {
      msg: 'Plan cancelled',
      amount
    }
  } 

  if (result < 0) {
    return {
      msg: 'Plan cancelled, has devolved money',
      balance: Math.abs(result),
      amount: 0
    }
  }

  return {
    msg: 'Plan payed successfully',
    amount: result
  }
}

module.exports = payPlan
