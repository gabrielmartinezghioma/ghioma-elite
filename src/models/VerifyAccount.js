import { DataTypes } from 'sequelize'
import sequelize from '../config/DB/conection.js'

const VerifyAccount = sequelize.define('verifyAccount', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  code: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  }
})

export default VerifyAccount
