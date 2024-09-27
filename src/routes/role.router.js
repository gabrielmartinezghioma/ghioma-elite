import {
  getAll,
  create,
  getOne,
  remove,
  update
} from '../controllers/role.controllers.js '
import { Router } from 'express'

const routerRole = Router()

routerRole.route('/').get(getAll).post(create)

routerRole.route('/:id').get(getOne).delete(remove).put(update)

export default routerRole
