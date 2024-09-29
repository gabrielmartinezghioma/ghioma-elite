import { sendVerifyTransactionCode } from '../config/nodemailer/middlewares/sendVerifyTransactionCode.js'
import { verifyTransactionCode } from '../config/nodemailer/views/verifyTransactionCode.js'
import {
  getAll,
  getOne,
  remove,
  removeRole,
  removeRoleUpdate,
  removeSendEmail,
  update
} from '../controllers/userRole.controllers.js'
import { Router } from 'express'
import { validateUserRole } from '../validation/middleware/validateUserRole.middlewares.js'

const routerUserRole = Router()

routerUserRole.route('/').get(getAll)

const code = Math.floor(10000000 + Math.random() * 90000000).toString()

routerUserRole
  .route('/verify-code/:id')
  .post(validateUserRole, removeRole, removeRoleUpdate)

routerUserRole
  .route('/:id')
  .get(getOne)
  .post(
    remove,
    sendVerifyTransactionCode(
      process.env.EMAIL,
      'Este es tu código de un solo uso',
      verifyTransactionCode,
      code
    ),
    removeSendEmail(code)
  )
  .put(update)

export default routerUserRole
