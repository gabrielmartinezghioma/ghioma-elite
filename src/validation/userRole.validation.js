import Joi from 'joi'

export const userRole = Joi.object({
  code: Joi.number().integer().min(10000000).max(99999999).required().messages({
    'number.base': 'El código debe ser un número entero.',
    'number.min': 'El código debe ser un número de 8 dígitos.',
    'number.max': 'El código debe ser un número de 8 dígitos.',
    'any.required': 'El código es un campo requerido.'
  })
})

export const userRoleUpdate = Joi.object({
  code: Joi.number().integer().min(10000000).max(99999999).required().messages({
    'number.base': 'El código debe ser un número entero.',
    'number.min': 'El código debe ser un número de 8 dígitos.',
    'number.max': 'El código debe ser un número de 8 dígitos.',
    'any.required': 'El código es un campo requerido.'
  }),

  role: Joi.string()
    .valid('admin', 'user', 'guest', 'moderator')
    .required()
    .messages({
      'any.only':
        'El rol debe ser uno de los siguientes: admin, user, guest, moderator.',
      'any.required': 'El rol es un campo requerido.'
    })
})
