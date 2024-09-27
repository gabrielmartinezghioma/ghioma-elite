import { DataTypes } from 'sequelize'
import sequelize from '../config/DB/conection.js'

const Role = sequelize.define('role', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  roleName: {
    type: DataTypes.ENUM('admin', 'user', 'guest', 'moderator'),
    defaultValue: 'user',
    allowNull: false
  }
})

export default Role
