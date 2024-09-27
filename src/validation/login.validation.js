import Joi from 'joi'

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Invalid credentials',
    'string.email': 'Invalid credentials',
    'any.required': 'Invalid credentials'
  }),

  passwordHash: Joi.string().min(6).max(20).required().messages({
    'string.base': 'Invalid credentials',
    'string.min': 'Invalid credentials',
    'string.max': 'Invalid credentials',
    'any.required': 'Invalid credentials'
  })
})
