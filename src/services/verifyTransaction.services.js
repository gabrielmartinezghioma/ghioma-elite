import VerifyTransaction from '../models/VerifyTransaction.js'

export const getVerifyTransaction = async code => {
  return await VerifyTransaction.findOne({ where: { code } })
}

export const verifyTransaction = async body => {
  return await VerifyTransaction.create(body)
}

export const destroyVerifyTransaction = async userId => {
  return await VerifyTransaction.destroy({ where: { userId } })
}
