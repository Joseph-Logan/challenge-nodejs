/**
 * Author: Joseph Ramirez
 */

class HandleLanguage {  
  defaultLanguage = 'en'
  constructor () {}

  async setLanguage (language = 'en') {
    try {
      if (this.getLanguages().includes(language)) {
        this.languageSelected = language
        return
      }
      this.languageSelected = language
    } catch (err) {
      throw new Error(err)
    }
  }

  getLanguages () {
    return [
      'es',
      'en'
    ]
  }

  async getText (fee, frecuency, payTime) {
    let text;
    frecuency = await this.getFrecuency(frecuency)

    switch (this.languageSelected) {
      case 'es':
        text = `La cuota seria $ ${fee} ${frecuency} durante ${payTime} meses`
      break;
      default:
        text = `The fee would be $ ${fee} ${frecuency} for ${payTime} months`
      break;
    }
    return text
  }

  async getFrecuency (frecuency) {
    let enFrecuency = ['monthly', 'biweekly']
    let esFrecuency = ['mensual', 'quincenal']
    
    return this.languageSelected === this.defaultLanguage ? enFrecuency[frecuency - 1] : esFrecuency[frecuency - 1]
  }

  async payTime () {
    return this.languageSelected === this.defaultLanguage ? 'months' : 'meses'
  }

  getErrorAmount () {
    let esText = 'No es posible crear un credito, el ingreso total no es suficiente para saldar los intereses', 
        enText = 'It is not possible to create a credit, the total income is not enough to pay off the interests'
    return this.languageSelected === this.defaultLanguage ? {error: enText} : {error: esText}
  }
}

module.exports = new HandleLanguage()