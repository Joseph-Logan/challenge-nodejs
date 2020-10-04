/**
 * Author: Joseph Ramirez
 */
const Mail = require('../config/mail')
const HandleLogs = require('../services/logs-responses')
const Serialize = require('../services/serialize-responses')
const SingleSerialize = require('../app/validator/single-validation-error')

const infoMicroCredit = async (req, res) => {
  try {
    let data = req.body
    HandleLogs('Processing send email with infomation about microservice', 'POST', 'Processing', data.email)
    let resp = await Mail.sendEmail(Mail.user, data.email, 'Solicitud de microprestamo',{...data ,...await Serialize.serializeResponseFields(data)})
    HandleLogs(`Done send email ${resp.messageId}`, 'POST', 'Done', data.email)
    return res.status(200).json('Emial was sent successfully')
  } catch (err) {
    HandleLogs(`${err}`, 'POST', 'Failed', req.body.email)
    return res.status(500).json(SingleSerialize.serializeErrors(['Error sending email about microcredit']))
  }
}

module.exports = infoMicroCredit