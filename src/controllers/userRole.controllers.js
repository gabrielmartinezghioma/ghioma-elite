import catchError from '../config/middlewares/asyncWrapper.middlewares.js'
import { sendNotificationEmail } from '../config/nodemailer/sendNotificationEmail.js'
import { changeRoleSuccessfully } from '../config/nodemailer/views/verifyTransaction.views.js'
import UserRole from '../models/UserRole.js'
import { roles } from '../roles/roles.js'
import { userById } from '../services/user.services.js'
import {
  getAllUserRoles,
  getOneUserRoles,
  getRole,
  removeUserRoles
} from '../services/userRole.services.js'
import {
  destroyVerifyTransaction,
  getVerifyTransaction,
  verifyTransaction
} from '../services/verifyTransaction.services.js'

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

/// //
export const remove = catchError(async (req, res, next) => {
  const { id } = req.params
  const roleUser = await getOneUserRoles(id)
  if (!roleUser) return res.status(404).json({ message: 'role not found' })
  next()
})

export function removeSendEmail(code) {
  return catchError(async (req, res) => {
    const { id } = req.user
    const body = { code, userId: id }
    await verifyTransaction(body)
    return res.json({ message: 'Sent email' })
  })
}
/// ///

export const removeRole = catchError(async (req, res, next) => {
  const { id } = req.params
  const getUserRole = await getOneUserRoles(id)
  if (!getUserRole) return res.status(404).json({ message: 'Role not found' })
  const { code } = req.body
  const result = await getVerifyTransaction(code)
  if (!result) return res.status(404).json({ message: 'Code not found' })
  const role = roles.find(role => role.roleName === 'user')
  const roleInstances = await getRole(result)
  const roleDefault = await removeUserRoles(roleInstances, role)
  if (!roleDefault)
    return res.status(400).json({
      message: 'It was not possible to change the role of the selected user.'
    })
  req.destroy = roleInstances.userId
  next()
})

export const removeRoleUpdate = catchError(async (req, res) => {
  const { id } = req.params
  const result = await getOneUserRoles(id)
  const user = await userById(result.userId)
  const { firstName, lastName, email } = user
  const destroyRegisters = req.destroy
  await destroyVerifyTransaction(destroyRegisters)
  await sendNotificationEmail(
    process.env.EMAIL,
    'Este es un correo para notificarte que el cambio de rol se ha realizado con éxito',
    changeRoleSuccessfully(firstName, lastName, email, 'user')
  )
  return res.status(200).json({
    message: 'Role changed successfully.'
  })
})

// puede cambiar el rol que sea con verificacion por mail, y de host
export const update = catchError(async (req, res) => {
  const { id } = req.params
  const result = await UserRole.update(req.body, {
    where: { id },
    returning: true
  })
  if (result[0] === 0) return res.sendStatus(404)
  return res.json(result[1][0])
})
