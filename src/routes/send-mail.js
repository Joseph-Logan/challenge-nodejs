const Mail = require('../config/mail')
const Logs = require('../app/model/log')

const sendEmail = async (req, res) => {
  try {
    let data = req.body
    let logData = {
      action: 'Processing send email with info',
      methods_used: 'POST',
      type_process: 'Processing',
      executed_by: data.email,
    }
    let logs = new Logs(logData)
    logs.save()

    let resp = await Mail.sendEmail(Mail.user, data.email, 'Solicitud de microprestamo', data)
    logData.action = `Done send email ${resp.messageId}`
    logData.type_process = 'Done'
    logs = new Logs(logData)
    logs.save()

    res.status(200).json('Emial was sent successfully')
  } catch (err) {
    let logData = {
      action: err,
      methods_used: 'POST',
      type_process: 'Failed',
      executed_by: req.body.email,
    }
    logs = new Logs(logData)
    logs.save()
    throw new Error(err)
  }
}

module.exports = sendEmail