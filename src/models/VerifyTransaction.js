import { DataTypes } from 'sequelize'
import sequelize from '../config/DB/conection.js'
import { v4 as uuidv4 } from 'uuid'

const VerifyTransaction = sequelize.define('verifyTransaction', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  code: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      len: {
        args: [8, 8],
        msg: 'El código debe tener 8 dígitos.'
      }
    },
    unique: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  }
})

VerifyTransaction.beforeValidate(async record => {
  let uniqueId
  const isUUIDInUse = async uuid => {
    const existingRecord = await VerifyTransaction.findOne({
      where: { id: uuid }
    })
    return existingRecord !== null
  }
  do {
    uniqueId = uuidv4()
  } while (await isUUIDInUse(uniqueId))

  record.id = uniqueId
})

export default VerifyTransaction
