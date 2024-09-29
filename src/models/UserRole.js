import { DataTypes } from 'sequelize'
import sequelize from '../config/DB/conection.js'
import Role from './Role.js'
import User from './User.js'
import { v4 as uuidv4 } from 'uuid'

const UserRole = sequelize.define('userRole', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
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
      model: Role,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
})

User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' })
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' })

UserRole.beforeValidate(async record => {
  let uniqueId
  const isUUIDInUse = async uuid => {
    const existingRecord = await UserRole.findOne({
      where: { id: uuid }
    })
    return existingRecord !== null
  }
  do {
    uniqueId = uuidv4()
  } while (await isUUIDInUse(uniqueId))

  record.id = uniqueId
})

export default UserRole
