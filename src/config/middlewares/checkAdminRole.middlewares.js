import Role from '../../models/Role.js'
import UserRole from '../../models/UserRole.js'

export function checkAdminRole(roleName) {
  return async function (req, res, next) {
    try {
      const userId = req.user.id

      const { id: roleId } = await Role.findOne({ where: { roleName } })

      const userRole = await UserRole.findOne({ where: { userId, roleId } })

      if (!userRole) {
        return res.sendStatus(401)
      }

      next()
    } catch (error) {
      console.error(`Error verifying ${roleName} role:`, error.message)
      return res.sendStatus(500)
    }
  }
}
