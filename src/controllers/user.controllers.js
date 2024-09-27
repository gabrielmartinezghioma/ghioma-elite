import catchError from '../config/middlewares/asyncWrapper.js'
import photoDefault from '../public/User/photoDefault.user.js'
import {
  userCreateSchema,
  userUpdateSchema
} from '../validation/user.validation.js'
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  isVerifedUser
} from '../services/user.services.js'
import { sendNotificationEmail } from '../config/nodemailer/sendNotificationEmail.js'
import { verifyaccount } from '../config/nodemailer/verifyaccount.nodemailer.js'
import { randomBytes } from 'crypto'
import {
  createVerifyAccount,
  destroyCodeVerifyAccount,
  getVerifyAccount
} from '../services/verifyAccount.services.js'

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
    phoneNumber,
    frontBaseUrl
  }) => ({
    firstName,
    lastName,
    email,
    passwordHash,
    phoneNumber,
    frontBaseUrl
  }))(req.body)

  const { error } = userCreateSchema.validate(body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  const image = photoDefault(req)
  const code = randomBytes(64).toString('hex')

  try {
    await sendNotificationEmail(
      body.email,
      'Verificación de cuenta - GHIOMA ELITE',
      verifyaccount(body.frontBaseUrl, code)
    )
  } catch (emailError) {
    console.error(emailError)
    return res.status(500).json({
      message:
        'Error al enviar el correo. Por favor, intenta crear el usuario nuevamente.'
    })
  }

  const result = await createUser({ ...body, image })

  await createVerifyAccount({ code, userId: result.id })

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

  const { error } = userUpdateSchema.validate(body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  const { id } = req.params
  const result = await updateUser(id, body)
  if (!result) return res.sendStatus(404)
  return res.json(result)
})

export const verifyAccountCode = catchError(async (req, res) => {
  const { code } = req.params
  const codeUser = await getVerifyAccount(code)
  if (!codeUser) return res.status(404).json({ message: 'Code not found' })
  const { userId } = codeUser
  const user = await getUserById(userId)
  await isVerifedUser(user)
  await destroyCodeVerifyAccount(code)
  return res.json(user)
})
