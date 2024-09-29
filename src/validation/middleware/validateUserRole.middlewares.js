import { userRole } from '../userRole.validation.js'

export function validateUserRole(req, res, next) {
  const body = (({ code }) => ({
    code
  }))(req.body)

  const { error } = userRole.validate(body)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  next()
}
