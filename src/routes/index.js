import express from 'express'
// import welcome from './welcome.js'
import routerUser from './user.router.js'

const router = express.Router()

router.use('/users', routerUser)

export default router
