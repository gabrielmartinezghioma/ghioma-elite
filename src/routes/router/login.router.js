import { Router } from 'express'
import loginDetailsMiddleware from '../../config/middlewares/loginDetailsMiddleware.middlewares.js'
import { sendEmailLogin } from '../../config/nodemailer/middlewares/sendEmailLogin.middlewares.js'
import { loginSendMail } from '../../config/nodemailer/views/loginSendMail.views.js'
import { login, loginUser } from '../../controllers/login.controllers.js'

const routerLogin = Router()

routerLogin
  .route('/')
  .post(
    login,
    loginDetailsMiddleware,
    sendEmailLogin('Nuevo inicio de sesión', loginSendMail),
    loginUser
  )

export default routerLogin
