import Role from './Role.js'
import User from './User.js'
import UserRole from './UserRole.js'
import VerifyAccount from './VerifyAccount.js'

// VerifyAccount _> userId
VerifyAccount.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(VerifyAccount, { foreignKey: 'userId' })

User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' })
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' })
