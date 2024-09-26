import catchError from '../config/middlewares/asyncWrapper.js'
import photoDefault from '../public/User/photoDefault.user.js'
import userSchema from '../validation/user.validation.js'
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../services/user.services.js'

import { sendNotificationEmail } from '../config/nodemailer/sendNotificationEmail.js'
import { verifyaccount } from '../config/nodemailer/verifyaccount.nodemailer.js'

export const getAll = catchError(async (req, res) => {
  const results = await getAllUsers()
  return res.json(results)
})

export const create = catchError(async (req, res) => {
  const body = (({
    firstName,
    lastName,
    email,
    passwordHash,
    phoneNumber
  }) => ({ firstName, lastName, email, passwordHash, phoneNumber }))(req.body)

  const { error } = userSchema.validate(body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  const image = photoDefault(req)

  try {
    await sendNotificationEmail(
      body.email,
      'Verificación de cuenta - GHIOMA ELITE',
      verifyaccount('LOCA.COM')
    )
  } catch (emailError) {
    console.error(emailError)
    return res.status(500).json({
      message:
        'Error al enviar el correo. Por favor, intenta crear el usuario nuevamente.'
    })
  }

  const result = await createUser({ ...body, image })
  return res.status(201).json(result)
})

export const getOne = catchError(async (req, res) => {
  const { id } = req.params
  const result = await getUserById(id)
  if (!result) return res.sendStatus(404)
  return res.json(result)
})

export const remove = catchError(async (req, res) => {
  const { id } = req.params
  const result = await deleteUser(id)
  if (!result) return res.sendStatus(404)
  return res.sendStatus(204)
})

export const update = catchError(async (req, res) => {
  const body = (({ firstName, lastName }) => ({
    firstName,
    lastName
  }))(req.body)
  const { id } = req.params
  const result = await updateUser(id, body)
  if (!result) return res.sendStatus(404)
  return res.json(result)
})
