import VerifyTransaction from '../models/VerifyTransaction.js'

export const getVerifyTransaction = async code => {
  return await VerifyTransaction.findOne({ where: { code } })
}

export const verifyTransaction = async userId => {
  return await VerifyTransaction.create({ userId })
}

export const destroyVerifyTransaction = async userId => {
  return await VerifyTransaction.destroy({ where: { userId } })
}
