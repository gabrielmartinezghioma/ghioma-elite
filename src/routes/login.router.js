import { login } from '../controllers/login.controllers.js'
import { Router } from 'express'

const routerLogin = Router()

routerLogin.route('/').post(login)

export default routerLogin
