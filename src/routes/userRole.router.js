import { sendVerifyTransactionCode } from '../config/nodemailer/middlewares/sendVerifyTransactionCode.js'
import { verifyTransactionCode } from '../config/nodemailer/views/verifyTransactionCode.js'
import {
  getAll,
  getOne,
  remove,
  removeRole,
  removeRoleUpdate,
  removeSendEmail,
  update,
  updateRole,
  updateRoleUpdate,
  updateSendEmail
} from '../controllers/userRole.controllers.js'
import { Router } from 'express'
import {
  validateUserRole,
  validateUserRoleUpdate
} from '../validation/middleware/validateUserRole.middlewares.js'

const routerUserRole = Router()
const code = Math.floor(10000000 + Math.random() * 90000000).toString()

routerUserRole.route('/').get(getAll)

routerUserRole
  .route('/verify-code/:id')
  .post(validateUserRole, removeRole, removeRoleUpdate)
  .put(validateUserRoleUpdate, updateRole, updateRoleUpdate)

routerUserRole
  .route('/:id')
  .get(getOne)
  .post(
    remove,
    sendVerifyTransactionCode(
      process.env.EMAIL,
      'Este es tu código de un solo uso para restablecer el rol a predeterminado.',
      verifyTransactionCode,
      code
    ),
    removeSendEmail(code)
  )
  .put(
    update,
    sendVerifyTransactionCode(
      process.env.EMAIL,
      'Este es tu código de un solo uso, para actualizar rol',
      verifyTransactionCode,
      code
    ),
    updateSendEmail(code)
  )

export default routerUserRole
