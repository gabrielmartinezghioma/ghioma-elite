import Role from '../models/Role.js'
import User from '../models/User.js'

export const getAllUsers = async () => {
  return await User.findAll({
    include: [
      {
        model: Role,
        attributes: ['roleName']
      }
    ]
  })
}

export const getUserById = async id => {
  return await User.findByPk(id, {
    include: [
      {
        model: Role,
        attributes: ['roleName']
      }
    ]
  })
}

export const userById = async id => {
  return await User.findByPk(id)
}

export const createUser = async userData => {
  return await User.create(userData)
}

export const updateUser = async (id, userData) => {
  const result = await User.update(userData, { where: { id }, returning: true })
  return result[0] === 0 ? null : result[1][0]
}

export const deleteUser = async id => {
  return await User.destroy({ where: { id } })
}

export const isVerifedUser = async user => {
  return await user.update({ isVerified: true })
}
