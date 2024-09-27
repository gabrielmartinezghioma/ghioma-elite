import {
  getAll,
  getOne,
  remove,
  update
} from '../controllers/userRole.controllers.js'
import { Router } from 'express'

const routerUserRole = Router()

routerUserRole.route('/').get(getAll)

routerUserRole.route('/:id').get(getOne).post(remove).put(update)

export default routerUserRole
