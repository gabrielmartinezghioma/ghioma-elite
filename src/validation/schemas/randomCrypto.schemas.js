import Joi from 'joi'

export const randomCrypto = Joi.object({
  id: Joi.string()
    .length(128)
    .hex()
    .pattern(/^[a-f0-9]+$/)
    .required()
    .messages({
      'string.length': 'ID must be exactly 128 characters long.',
      'string.hex': 'ID must be a valid hexadecimal string.',
      'string.pattern.base': 'ID contains invalid characters.',
      'any.required': 'ID is required'
    })
})
