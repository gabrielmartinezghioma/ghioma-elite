import catchError from '../config/middlewares/asyncWrapper.js'
import User from '../models/User.js'
import photoDefault from '../public/User/photoDefault.user.js'
import userSchema from '../validation/user.validation.js'

const getAll = catchError(async (req, res) => {
  const results = await User.findAll()
  return res.json(results)
})

const create = catchError(async (req, res) => {
  const { error } = userSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  const image = photoDefault(req)
  const result = await User.create({ ...req.body, image })
  return res.status(201).json(result)
})

const getOne = catchError(async (req, res) => {
  const { id } = req.params
  const result = await User.findByPk(id)
  if (!result) return res.sendStatus(404)
  return res.json(result)
})

const remove = catchError(async (req, res) => {
  const { id } = req.params
  const result = await User.destroy({ where: { id } })
  if (!result) return res.sendStatus(404)
  return res.sendStatus(204)
})

const update = catchError(async (req, res) => {
  const { id } = req.params
  const result = await User.update(req.body, { where: { id }, returning: true })
  if (result[0] === 0) return res.sendStatus(404)
  return res.json(result[1][0])
})

export { getAll, create, getOne, remove, update }
