/**
 * Author: Joseph Ramirez
 * here going to create methods that help us to make calculations depending of current salary -> totalIngress of user and the Bank interests
 * Based on Matematicas financieras de las operaciones bursales
 * */

/*
un préstamo de interés mensual del 20% de $1000 a 6 meses plazo , con una entidad bancaria ya que el interés se aplica a anual 
y se solo se aplica a los 6 meses de plazo. el resultado es de =  $183.33 cuota mensual 
*/
class Calculate {
  interests = 0.18
  monthly = 1
  anual = 12

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
      let interest = await this.monthlyInterest(amount, payTime)
      // return amount / ((1 - Math.pow(1 + interest, -payTime)) / interest)
      return (interest + amount) / payTime
    } catch (err) {
      throw new Error(err)
    }
  } 
  
  async monthlyInterest (amount, payTime) {
   try {
    // return this.interests / ((this.defaultValue * payTime) / this.daysOfYear)
    return (amount * this.interests * (payTime / this.anual))
   } catch (err) {
     throw new Error(err)
   }
  }
}

module.exports = new Calculate()