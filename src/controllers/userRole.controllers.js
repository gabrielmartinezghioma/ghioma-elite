import catchError from '../config/middlewares/asyncWrapper.middlewares.js'
import userRole from '../models/UserRole.js'
import { roles } from '../roles/roles.js'
import {
  getAllUserRoles,
  getOneUserRoles,
  removeUserRoles
} from '../services/userRole.services.js'

export const getAll = catchError(async (req, res) => {
  const results = await getAllUserRoles()
  return res.json(results)
})

export const getOne = catchError(async (req, res) => {
  const { id } = req.params
  const result = await getOneUserRoles(id)
  if (!result) return res.sendStatus(404)
  return res.json(result)
})

// lo lleva a role user con verificacion por mail
export const remove = catchError(async (req, res) => {
  const { id } = req.params
  const roleUser = await getOneUserRoles(id)
  if (!roleUser) return res.status(404).json({ message: 'role not found' })
  const role = roles.find(role => role.roleName === 'user')
  const result = await removeUserRoles(roleUser, role)
  if (!result) return res.sendStatus(404)
  return res.json(result)
})

// puede cambiar el rol que sea con verificacion por mail, y de host
export const update = catchError(async (req, res) => {
  const { id } = req.params
  const result = await userRole.update(req.body, {
    where: { id },
    returning: true
  })
  if (result[0] === 0) return res.sendStatus(404)
  return res.json(result[1][0])
})
