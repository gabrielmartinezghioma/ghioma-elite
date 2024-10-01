import { userCreateSchema } from '../schemas/user.schemas.js'

export function validateUserCreate(req, res, next) {
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

  next()
}
