import { DataTypes } from 'sequelize'
import sequelize from '../config/DB/conection.js'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'suspended', 'inactive'),
    defaultValue: 'active',
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING(15),
    allowNull: true,
    unique: true
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get())
  delete values.password
  return values
}

User.beforeCreate(async user => {
  const password = user.passwordHash
  const hashPassword = await bcrypt.hash(password, 10)
  user.passwordHash = hashPassword
})

User.beforeValidate(async record => {
  let uniqueId
  const isUUIDInUse = async uuid => {
    const existingRecord = await User.findOne({
      where: { id: uuid }
    })
    return existingRecord !== null
  }
  do {
    uniqueId = uuidv4()
  } while (await isUUIDInUse(uniqueId))

  record.id = uniqueId
})

export default User
