import {
  userCreateManagement,
  userManagementCreated
} from '../../controllers/user.controllers.js'
import { Router } from 'express'
import { sendEmail } from '../../config/nodemailer/middlewares/sendEmail.middlewares.js'
import { verifyaccount } from '../../config/nodemailer/views/verifyaccount.views.js'
import { validateUserManagement } from '../../validation/middleware/validateUserManagement.middlewares.js'

const routermanagement = Router()

routermanagement
  .route('/users/admin')
  .post(
    validateUserManagement,
    userCreateManagement,
    userManagementCreated,
    sendEmail(
      'Creación de usuario ADMINISTRADOR - GHIOMA ELITE',
      verifyaccount,
      process.env.EMAIL
    )
  )

export default routermanagement
