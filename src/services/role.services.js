import Role from '../models/Role.js'
import User from '../models/User.js'

export const getAllroles = async () => {
  return await Role.findAll({
    include: [
      {
        model: User,
        attributes: ['email']
      }
    ]
  })
}

export const getOneRole = async id => {
  return await Role.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ['email']
      }
    ]
  })
}

export const getOneFilter = async role => {
  Role.findOne({ where: { roleName: role } })
}
