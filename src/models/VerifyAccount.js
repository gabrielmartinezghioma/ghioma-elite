import { DataTypes } from 'sequelize'
import sequelize from '../config/DB/conection.js'
import { v4 as uuidv4 } from 'uuid'
import { randomBytes } from 'crypto'

const VerifyAccount = sequelize.define('verifyAccount', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  code: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  }
})

VerifyAccount.beforeValidate(async record => {
  let uniqueId
  let uniqueCode

  const isUUIDInUse = async uuid => {
    const existingRecord = await VerifyAccount.findOne({
      where: { id: uuid }
    })
    return existingRecord !== null
  }
  do {
    uniqueId = uuidv4()
  } while (await isUUIDInUse(uniqueId))

  const isCodeInUse = async code => {
    const existingRecord = await VerifyAccount.findOne({
      where: { code }
    })
    return existingRecord !== null
  }
  do {
    uniqueCode = randomBytes(64).toString('hex')
  } while (await isCodeInUse(uniqueCode))

  record.id = uniqueId
  record.code = uniqueCode
})

export default VerifyAccount
