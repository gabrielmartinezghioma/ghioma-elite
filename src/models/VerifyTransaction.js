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
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  }
})

export default VerifyTransaction
