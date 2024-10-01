import { userUpdateSchema } from '../schemas/user.schemas.js'

export function validateUserUpdate(req, res, next) {
  const body = (({ firstName, lastName }) => ({
    firstName,
    lastName
  }))(req.body)

  const { error } = userUpdateSchema.validate(body)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  next()
}
