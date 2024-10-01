import { Router } from 'express'
import loginDetailsMiddleware from '../../config/middlewares/loginDetailsMiddleware.middlewares.js'
import { sendEmailLogin } from '../../config/nodemailer/middlewares/sendEmailLogin.middlewares.js'
import { loginSendMail } from '../../config/nodemailer/views/loginSendMail.views.js'
import { login, loginUser } from '../../controllers/login.controllers.js'
import { validateLogin } from '../../validation/middleware/validateLogin.middlewares.js'
import { verifyRecaptcha } from '../../config/middlewares/verifyRecaptcha.middlewares.js'

const routerLogin = Router()

routerLogin
  .route('/')
  .post(
    verifyRecaptcha,
    validateLogin,
    login,
    loginDetailsMiddleware,
    sendEmailLogin('Nuevo inicio de sesión', loginSendMail),
    loginUser
  )

export default routerLogin
