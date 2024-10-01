import { userRole, userRoleUpdate } from '../schemas/userRole.schemas.js'

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

export function validateUserRoleUpdate(req, res, next) {
  const body = (({ code, role }) => ({
    code,
    role
  }))(req.body)

  const { error } = userRoleUpdate.validate(body)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  next()
}
