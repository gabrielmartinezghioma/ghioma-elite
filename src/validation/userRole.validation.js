import Joi from 'joi'

export const userRole = Joi.object({
  code: Joi.number()
    .integer()
    .min(10000000) // Mínimo valor con 8 dígitos
    .max(99999999) // Máximo valor con 8 dígitos
    .required()
    .messages({
      'number.base': 'El código debe ser un número entero.',
      'number.min': 'El código debe ser un número de 8 dígitos.',
      'number.max': 'El código debe ser un número de 8 dígitos.',
      'any.required': 'El código es un campo requerido.'
    })
})
