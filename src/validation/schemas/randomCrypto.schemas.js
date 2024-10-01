import Joi from 'joi'

export const randomCrypto = Joi.string()
  .length(128)
  .hex()
  .pattern(/^[a-f0-9]+$/)
  .required()
  .messages({
    'string.length': 'Code not found',
    'string.hex': 'Code not found',
    'string.pattern.base': 'Code not found',
    'any.required': 'Code not found'
  })
