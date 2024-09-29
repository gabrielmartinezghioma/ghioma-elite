import { DataTypes } from 'sequelize'
import sequelize from '../config/DB/conection.js'
import { v4 as uuidv4 } from 'uuid'

const Role = sequelize.define('role', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  roleName: {
    type: DataTypes.ENUM('admin', 'user', 'guest', 'moderator'),
    defaultValue: 'user',
    allowNull: false
  }
})

Role.beforeValidate(async record => {
  let uniqueId
  const isUUIDInUse = async uuid => {
    const existingRecord = await Role.findOne({
      where: { id: uuid }
    })
    return existingRecord !== null
  }
  do {
    uniqueId = uuidv4()
  } while (await isUUIDInUse(uniqueId))

  record.id = uniqueId
})

export default Role
