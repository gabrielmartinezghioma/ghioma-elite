import catchError from '../config/middlewares/asyncWrapper.middlewares.js'
import photoDefault from '../public/User/photoDefault.user.js'
import { getOneFilter } from '../services/role.services.js'
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  isVerifedUser
} from '../services/user.services.js'
import { createRole } from '../services/userRole.services.js'
import {
  createVerifyAccount,
  destroyCodeVerifyAccount,
  getVerifyAccount
} from '../services/verifyAccount.services.js'

export const getAll = catchError(async (req, res) => {
  const results = await getAllUsers()
  return res.json(results)
})

export const registerUser = catchError(async (req, res, next) => {
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
  const image = photoDefault(req)
  const result = await createUser({ ...body, image })
  req.userCreated = result
  next()
})

export const userCreated = catchError(async (req, res, next) => {
  const result = req.userCreated
  const userId = result.id
  const { id } = await getOneFilter('user')
  await createRole(userId, id)
  const userCreated = await createVerifyAccount(userId)
  req.code = userCreated.code
  req.result = result
  next()
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

export const userCreateManagement = catchError(async (req, res, next) => {
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
  const image = photoDefault(req)
  const result = await createUser({ ...body, image })
  req.userCreated = result
  next()
})

export const userManagementCreated = catchError(async (req, res, next) => {
  const result = req.userCreated
  const userId = result.id
  const { id } = await getOneFilter('admin')
  await createRole(userId, id)
  const userCreated = await createVerifyAccount(userId)
  req.code = userCreated.code
  req.result = result
  next()
})
