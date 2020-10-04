/**
 * Author: Joseph Ramirez
 */
const Logs = require('../app/model/log')

const handleLogs = (action, method, process, executed_by) => {
  try {
    let logData = {
      action,
      methods_used: method,
      type_process: process,
      executed_by: executed_by,
      executed_at: new Date()
    }
    let logs = new Logs(logData)
    logs.save()
  } catch (err) {
    throw new Error(err)
  }
}

const getAllLogsByEmail = async (email) => {
  try {
    let resp = await Logs.find({ executed_by: email }).exec();
    return resp.length > 0 ? resp : 'Email not found' 
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = { 
  handleLogs,
  getAllLogsByEmail
}