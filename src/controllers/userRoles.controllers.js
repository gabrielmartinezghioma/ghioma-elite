import catchError from '../config/middlewares/asyncWrapper.js'
import UserRole from '../models/UserRole.js'

export const getAll = catchError(async (req, res) => {
  const results = await UserRole.findAll()
  return res.json(results)
})

export const create = catchError(async (req, res) => {
  const result = await UserRole.create(req.body)
  return res.status(201).json(result)
})

export const getOne = catchError(async (req, res) => {
  const { id } = req.params
  const result = await UserRole.findByPk(id)
  if (!result) return res.sendStatus(404)
  return res.json(result)
})

export const remove = catchError(async (req, res) => {
  const { id } = req.params
  const result = await UserRole.destroy({ where: { id } })
  if (!result) return res.sendStatus(404)
  return res.sendStatus(204)
})

export const update = catchError(async (req, res) => {
  const { id } = req.params
  const result = await UserRole.update(req.body, {
    where: { id },
    returning: true
  })
  if (result[0] === 0) return res.sendStatus(404)
  return res.json(result[1][0])
})
