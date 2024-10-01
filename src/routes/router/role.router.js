import { getAll, getOne } from '../../controllers/role.controllers.js'
import { Router } from 'express'

const routerRole = Router()

routerRole.route('/').get(getAll)

routerRole.route('/:id').get(getOne)
export default routerRole
