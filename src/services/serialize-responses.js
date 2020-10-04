/**
 * Author: Joseph Ramirez
 */

const Language = require('./handle-language')

class SerializeResponse {
  constructor() {}
  
  async serializeResponseFields (data, language = 'en') {
    const { amount, frecuency, payTime, fee = 0, planId = 0 } = data
    await Language.setLanguage(language)
  
    return {
      amount, 
      text: await this.text(fee, frecuency, payTime),
      frecuency: await Language.getFrecuency(frecuency),
      payTime: await Language.payTime(payTime),
      planId
    }
  }

  async text (fee, frecuency, payTime) {
    return await Language.getText(fee.toFixed(2), frecuency, payTime)
  }

  async handleErrorAmount (language = 'en') {
    try {
      await Language.setLanguage(language)
      return Language.getErrorAmount()
    } catch (err) {
      throw new Error(err)
    }
  }

}

module.exports = new SerializeResponse()