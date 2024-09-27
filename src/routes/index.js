import express from 'express'
import routerUser from './user.router.js'
import routerLogin from './login.router.js'
import routerRole from './role.router.js'
import { verifyJWT } from '../config/middlewares/verifyJWT.js'
import { checkAdminRole } from '../roles/checkAdminRole.js'

const router = express.Router()

router.use('/users', routerUser)
router.use('/login', routerLogin)
router.use('/admin/roles', verifyJWT, checkAdminRole('admin'), routerRole) // 🔒

export default router
