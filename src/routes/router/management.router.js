import { Router } from 'express'
import {
  userCreateManagement,
  userManagementCreated
} from '../../controllers/user.controllers.js'
import { sendEmail } from '../../config/nodemailer/middlewares/sendEmail.middlewares.js'
import { validateUserManagement } from '../../validation/middleware/validateUserManagement.middlewares.js'
import { verifyaccount } from '../../config/nodemailer/views/verifyaccount.views.js'

const routermanagement = Router()

routermanagement
  .route('/users/admin')
  .post(
    validateUserManagement,
    userCreateManagement,
    userManagementCreated,
    sendEmail(
      'Creación de usuario ADMINISTRADOR - GHIOMA',
      verifyaccount,
      process.env.EMAIL
    )
  )

export default routermanagement
