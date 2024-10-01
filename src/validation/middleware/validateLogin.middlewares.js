import { loginSchema } from '../schemas/login.schemas'

export function validateLogin(req, res, next) {
  const body = (({ email, password }) => ({
    email,
    password
  }))(req.body)

  const { error } = loginSchema.validate(body)

  if (error) {
    return res.status(401).json({ error: error.details[0].message })
  }

  next()
}
