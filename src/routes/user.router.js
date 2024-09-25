import {
  getAll,
  create,
  getOne,
  remove,
  update
} from '../controllers/user.controllers.js'
import { Router } from 'express'

const routerUser = Router()

routerUser.route('/').get(getAll).post(create)

routerUser.route('/:id').get(getOne).delete(remove).put(update)

export default routerUser
