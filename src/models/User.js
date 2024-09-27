import { DataTypes } from 'sequelize'
import sequelize from '../config/DB/conection.js'
import bcrypt from 'bcrypt'

const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
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
  isVerifed: {
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

export default User
