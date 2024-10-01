import {
  validateUserRole,
  validateUserRoleUpdate
} from '../../validation/middleware/validateUserRole.middlewares.js'
import { Router } from 'express'
import { sendVerifyTransactionCode } from '../../config/nodemailer/middlewares/sendVerifyTransactionCode.js'
import { verifyTransactionCode } from '../../config/nodemailer/views/verifyTransactionCode.js'
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
} from '../../controllers/userRole.controllers.js'
import { validateId } from '../../validation/middleware/validateId.middlewares.js'

const routerUserRole = Router()

routerUserRole.route('/').get(getAll)

routerUserRole
  .route('/verify-code/:id')
  .post(validateId, validateUserRole, removeRole, removeRoleUpdate)
  .put(validateId, validateUserRoleUpdate, updateRole, updateRoleUpdate)

routerUserRole
  .route('/:id')
  .get(validateId, getOne)
  .post(
    validateId,
    remove,
    removeSendEmail,
    sendVerifyTransactionCode(
      process.env.EMAIL,
      'Este es tu código de un solo uso para restablecer el rol a predeterminado.',
      verifyTransactionCode
    )
  )
  .put(
    validateId,
    update,
    updateSendEmail,
    sendVerifyTransactionCode(
      process.env.EMAIL,
      'Este es tu código de un solo uso, para actualizar rol',
      verifyTransactionCode
    )
  )

export default routerUserRole
