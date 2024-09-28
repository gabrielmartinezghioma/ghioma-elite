import { DataTypes } from 'sequelize'
import sequelize from '../config/DB/conection.js'

const VerifyTransaction = sequelize.define('verifyTransaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  code: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      len: {
        args: [8, 8],
        msg: 'El código debe tener exactamente 8 dígitos.'
      }
    }
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  }
})

export default VerifyTransaction
