import Joi from 'joi'

export const idSchema = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
    'string.guid': 'Invalid id format.',
    'any.required': 'ID is required'
  })
})
