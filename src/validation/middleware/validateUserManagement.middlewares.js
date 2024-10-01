import { userManagementSchema } from '../schemas/userManagement.schemas'

export function validateUserManagement(req, res, next) {
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

  const { error } = userManagementSchema.validate(body)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  next()
}
