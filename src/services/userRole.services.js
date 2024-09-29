import UserRole from '../models/UserRole.js'

export const getAllUserRoles = async () => {
  return await UserRole.findAll()
}

export const getOneUserRoles = async id => {
  return await UserRole.findByPk(id)
}

export const getRole = async result => {
  return await UserRole.findOne({ where: { userId: result.userId } })
}

export const removeUserRoles = async (userId, role) => {
  return await userId.update({
    roleId: role.id
  })
}
