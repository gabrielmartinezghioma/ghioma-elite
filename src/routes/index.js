import express from 'express'
import routerUser from './user.router.js'
import routerLogin from './login.router.js'

const router = express.Router()

router.use('/users', routerUser)
router.use('/login', routerLogin)
export default router
