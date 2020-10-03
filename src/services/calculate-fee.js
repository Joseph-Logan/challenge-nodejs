/**
 * Author: Joseph Ramirez
 * here going to create methods that help us to make calculations depending of current salary -> totalIngress of user and the Bank interests
 * Based on BAC Forumulas https://www.baccredomatic.com/sites/default/files/formulas_de_calculos_y_ejemplos.pdf
 * */

class Calculate {
  interests = 0.16
  daysOfYear = 365
  defaultValue = 360 
  monthly = 1

  constructor () {

  }
  /**
   * Formula & example level Quota Calculation
   * @param {int} amount -> amount of finance
   * @param {int} payTime -> period of plan
   * @param {int} frecuency -> monthly or biweekly
   */

  async handleInterest (amount, payTime = 12, frecuency = 1) {
    try {
      let totalInterest = await this.levelQuotaCalculation(amount, payTime)
      return frecuency === this.monthly ? totalInterest : (totalInterest / 2)
    } catch (err) {
      throw new Error(err)
    }
  } 
  async levelQuotaCalculation (amount, payTime = 12) {
    try {
      let interest = await this.monthlyInterest(payTime)
      return amount / ((1 - Math.pow(1 + interest, -payTime)) / interest)
    } catch (err) {
      throw new Error(err)
    }
  } 
  
  async monthlyInterest (payTime) {
   try {
    return this.interests / ((this.defaultValue * payTime) / this.daysOfYear)
   } catch (err) {
     throw new Error(err)
   }
  }
}

module.exports = new Calculate()