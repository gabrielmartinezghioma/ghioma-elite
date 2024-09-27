import catchError from '../config/middlewares/asyncWrapper.middlewares.js'
import { getAllroles, getOneRole } from '../services/role.services.js'

export const getAll = catchError(async (req, res) => {
  const results = await getAllroles()
  return res.json(results)
})

export const getOne = catchError(async (req, res) => {
  const { id } = req.params
  const result = await getOneRole(id)
  if (!result) return res.sendStatus(404)
  return res.json(result)
})
