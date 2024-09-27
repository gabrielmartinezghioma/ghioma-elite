import UserRole from '../models/UserRole.js'

export const getAllUserRoles = async () => {
  return await UserRole.findAll()
}

export const getOneUserRoles = async id => {
  return await UserRole.findByPk(id)
}

export const removeUserRoles = async (roleUser, role) => {
  return await roleUser.update({
    roleId: role.id
  })
}
