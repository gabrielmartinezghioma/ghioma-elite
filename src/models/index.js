import User from './User.js'
import VerifyAccount from './VerifyAccount.js'

// VerifyAccount _> userId
VerifyAccount.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(VerifyAccount, { foreignKey: 'userId' })
