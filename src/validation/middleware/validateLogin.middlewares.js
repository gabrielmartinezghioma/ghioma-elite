import { loginSchema } from '../schemas/login.schemas.js'

export function validateLogin(req, res, next) {
  const body = (({ email, passwordHash }) => ({
    email,
    passwordHash
  }))(req.body)

  const { error } = loginSchema.validate(body)

  if (error) {
    return res.status(404).json({ error: error.details[0].message })
  }

  next()
}
