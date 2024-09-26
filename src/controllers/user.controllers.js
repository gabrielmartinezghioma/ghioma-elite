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

export const getAll = catchError(async (req, res) => {
  const results = await getAllUsers()
  return res.json(results)
})

export const create = catchError(async (req, res) => {
  const { error } = userSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  const image = photoDefault(req)
  const result = await createUser({ ...req.body, image })
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
  const { id } = req.params
  const result = await updateUser(id, req.body)
  if (!result) return res.sendStatus(404)
  return res.json(result)
})
