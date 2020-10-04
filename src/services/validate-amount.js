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
      msg: 'Plan canceled, you must return the balance',
      balance: Math.abs(result),
      amount: 0
    }
  }

  return {
    msg: 'Plan payed successfully',
    amount: result
  }
}

module.exports = validateAmount