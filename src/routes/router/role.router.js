import { Router } from 'express'
import { getAll, getOne } from '../../controllers/role.controllers.js'

const routerRole = Router()

routerRole.route('/').get(getAll)

routerRole.route('/:id').get(getOne)
export default routerRole
