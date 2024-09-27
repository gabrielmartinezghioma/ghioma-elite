import express from 'express'
import routerUser from './user.router.js'
import routerLogin from './login.router.js'
import routerRole from './role.router.js'
import { verifyJWT } from '../config/middlewares/verifyJWT.middlewares.js'
import { checkAdminRole } from '../config/middlewares/checkAdminRole.middlewares.js'
import { verifyRecaptcha } from '../config/middlewares/verifyRecaptcha.middlewares.js'
import routerUserRole from './userRole.router.js'

const router = express.Router()

router.use('/users', routerUser)
router.use('/login', verifyRecaptcha, routerLogin)
router.use('/admin/roles', verifyJWT, checkAdminRole('user'), routerRole) // 🔒
router.use(
  '/admin/set-roles',
  verifyJWT,
  checkAdminRole('user'),
  routerUserRole
)

export default router
