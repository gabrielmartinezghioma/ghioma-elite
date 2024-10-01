import { idSchema } from '../schemas/id.schemas.js'

export function validateId(req, res, next) {
  const idParams = (({ id }) => ({
    id
  }))(req.params)

  const { error } = idSchema.validate(idParams)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  next()
}
