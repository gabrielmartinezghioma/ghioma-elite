import { Router } from 'express'
import { getAll, getOne } from '../../controllers/role.controllers.js'
import { validateId } from '../../validation/middleware/validateId.middlewares.js'

const routerRole = Router()

routerRole.route('/').get(getAll)

routerRole.route('/:id').get(validateId, getOne)
export default routerRole
