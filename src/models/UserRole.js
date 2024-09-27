import { DataTypes } from 'sequelize'
import sequelize from '../config/DB/conection.js'
import Role from './Role.js'
import User from './User.js'

const UserRole = sequelize.define('userRole', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
})

User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' })
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' })

export default UserRole
