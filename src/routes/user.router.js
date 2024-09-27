import { verifyJWT } from '../config/middlewares/verifyJWT.js'
import {
  getAll,
  create,
  getOne,
  remove,
  update,
  verifyAccountCode
} from '../controllers/user.controllers.js'
import { Router } from 'express'

const routerUser = Router()

routerUser.route('/').get(verifyJWT, getAll).post(create)

routerUser.route('/verify/:code').get(verifyAccountCode)

routerUser
  .route('/:id')
  .get(verifyJWT, getOne)
  .delete(verifyJWT, remove)
  .put(verifyJWT, update)

export default routerUser
