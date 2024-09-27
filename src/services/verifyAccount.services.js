import VerifyAccount from '../models/VerifyAccount.js'

export const createVerifyAccount = async (verifyCode, userId) => {
  return await VerifyAccount.create(verifyCode, userId)
}

export const getVerifyAccount = async code => {
  return await VerifyAccount.findOne({ where: { code } })
}

export const destroyCodeVerifyAccount = async code => {
  return await VerifyAccount.destroy({ where: { code } })
}
