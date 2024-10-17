import Role from '../models/Role.js'
import User from '../models/User.js'

export const userLogin = async email => {
  return await User.findOne({ where: { email }, include: [Role] })
}
