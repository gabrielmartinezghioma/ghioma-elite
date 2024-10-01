import express from 'express'
import routerUser from '../routes/router/user.router.js'
import routerLogin from '../routes/router/login.router.js'
import routerRole from '../routes/router/role.router.js'
import routerUserRole from '../routes/router/userRole.router.js'
import routermanagement from '../routes/router/management.router.js'
import { verifyJWT } from '../config/middlewares/verifyJWT.middlewares.js'
import { checkAdminRole } from '../config/middlewares/checkAdminRole.middlewares.js'
import { verifyRecaptcha } from '../config/middlewares/verifyRecaptcha.middlewares.js'

const router = express.Router()

router.use('/users', routerUser)
router.use('/management', verifyRecaptcha, routermanagement)
router.use('/login', verifyRecaptcha, routerLogin)
router.use('/admin/roles', verifyJWT, checkAdminRole('admin'), routerRole) // 🔒
router.use(
  '/admin/set-roles',
  verifyJWT,
  checkAdminRole('admin'),
  routerUserRole
)

export default router
