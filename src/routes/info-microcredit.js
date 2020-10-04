/**
 * Author: Joseph Ramirez
 */
const Mail = require('../config/mail')
const { handleLogs, getAllLogsByEmail } = require('../services/logs-responses')
const Serialize = require('../services/serialize-responses')
const SingleSerialize = require('../app/validator/single-validation-error')


const infoMicroCredit = async (req, res) => {
  try {
    let data = req.body
    handleLogs('Processing send email with infomation about microservice', 'POST', 'Processing', data.email)
    let resp = await Mail.sendEmail(Mail.user, process.env.USER_RESPONSE_EMAIL, 'Solicitud de microprestamo',{...data ,...await Serialize.serializeResponseFields(data)})
    handleLogs(`Done send email ${resp.messageId}`, 'POST', 'Done', data.email)
    return res.status(200).json('Emial was sent successfully')
  } catch (err) {
    handleLogs(`${err}`, 'POST', 'Failed', req.body.email)
    return res.status(500).json(SingleSerialize.serializeErrors(['Error sending email about microcredit']))
  }
}

const infoProcess = async (req, res) => {
  try {
    let data = req.body
    let resp = await getAllLogsByEmail(data.email)
    return res.status(200).json(resp)
  } catch (err) {
    return res.status(400).json(SingleSerialize.serializeErrors(['Error while getting logs']))
  }
}

module.exports = {
  infoMicroCredit,
  infoProcess
}