import { Router } from 'express'
import { verifyJWT } from '../../config/middlewares/verifyJWT.middlewares.js'
import { verifyRecaptcha } from '../../config/middlewares/verifyRecaptcha.middlewares.js'
import { validateUserCreate } from '../../validation/middleware/validateUserCreate.middlewares.js'
import { sendEmail } from '../../config/nodemailer/middlewares/sendEmail.middlewares.js'
import {
  getAll,
  getOne,
  remove,
  update,
  verifyAccountCode,
  userCreated,
  registerUser
} from '../../controllers/user.controllers.js'

import { verifyaccount } from '../../config/nodemailer/views/verifyaccount.views.js'

import { validateUserUpdate } from '../../validation/middleware/validateUserUpdate.middlewares.js'
import { checkAdminRole } from '../../config/middlewares/checkAdminRole.middlewares.js'

const routerUser = Router()

routerUser
  .route('/')
  .get(verifyJWT, checkAdminRole('admin'), getAll)
  .post(
    verifyRecaptcha,
    validateUserCreate,
    registerUser,
    userCreated,
    sendEmail('Verificación de cuenta - GHIOMA ELITE', verifyaccount)
  )

routerUser.route('/verify/:code').get(verifyAccountCode)

routerUser
  .route('/:id')
  .get(verifyJWT, getOne)
  .delete(verifyJWT, remove)
  .put(verifyRecaptcha, verifyJWT, validateUserUpdate, update)

export default routerUser
