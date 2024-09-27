import catchError from '../config/middlewares/asyncWrapper.js'
import Role from '../models/Role.js'

export const getAll = catchError(async (req, res) => {
  const results = await Role.findAll()
  return res.json(results)
})

export const create = catchError(async (req, res) => {
  const result = await Role.create(req.body)
  return res.status(201).json(result)
})

export const getOne = catchError(async (req, res) => {
  const { id } = req.params
  const result = await Role.findByPk(id)
  if (!result) return res.sendStatus(404)
  return res.json(result)
})

export const remove = catchError(async (req, res) => {
  const { id } = req.params
  const result = await Role.destroy({ where: { id } })
  if (!result) return res.sendStatus(404)
  return res.sendStatus(204)
})

export const update = catchError(async (req, res) => {
  const { id } = req.params
  const result = await Role.update(req.body, { where: { id }, returning: true })
  if (result[0] === 0) return res.sendStatus(404)
  return res.json(result[1][0])
})
