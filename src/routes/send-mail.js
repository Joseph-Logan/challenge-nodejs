/**
 * Author: Joseph Ramirez
 */
const Mail = require('../config/mail')
const handleLogs = require('../services/logs-responses')
const Serialize = require('../services/serialize-responses')

const sendEmail = async (req, res) => {
  try {
    let data = req.body
    handleLogs('Processing send email with infomation about microservice', 'POST', 'Processing', data.email)
    let resp = await Mail.sendEmail(Mail.user, data.email, 'Solicitud de microprestamo',{...data ,...await Serialize.serializeResponseFields(data)})
    handleLogs(`Done send email ${resp.messageId}`, 'POST', 'Done', data.email)
    return res.status(200).json('Emial was sent successfully')
  } catch (err) {
    handleLogs(`${err}`, 'POST', 'Failed', req.body.email)
    throw new Error(err)
  }
}

module.exports = sendEmail