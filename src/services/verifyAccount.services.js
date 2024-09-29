import VerifyAccount from '../models/VerifyAccount.js'

export const createVerifyAccount = async userId => {
  return await VerifyAccount.create({ userId })
}

export const getVerifyAccount = async code => {
  return await VerifyAccount.findOne({ where: { code } })
}

export const destroyCodeVerifyAccount = async code => {
  return await VerifyAccount.destroy({ where: { code } })
}
