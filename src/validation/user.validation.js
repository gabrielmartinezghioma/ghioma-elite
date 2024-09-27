import Joi from 'joi'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import PasswordValidator from 'password-validator'

const schema = new PasswordValidator()
schema
  .is()
  .min(6) // Longitud mínima 6
  .is()
  .max(20) // Longitud máxima 20
  .has()
  .uppercase() // Debe tener al menos una letra mayúscula
  .has()
  .lowercase() // Debe tener al menos una letra minúscula
  .has()
  .digits() // Debe tener al menos un número
  .has()
  .symbols() // Debe tener al menos un carácter especial
  .has()
  .not()
  .spaces() // No debe tener espacios

const validatePassword = password => {
  return schema.validate(password)
}

const isValidPhoneNumber = value => {
  const phoneNumber = parsePhoneNumberFromString(value)
  return phoneNumber && phoneNumber.isValid() // Devuelve true o false
}

export const userCreateSchema = Joi.object({
  firstName: Joi.string().min(3).max(100).required().messages({
    'string.base': 'El nombre debe ser una cadena de texto.',
    'string.min': 'El nombre debe tener al menos 3 caracteres.',
    'string.max': 'El nombre no puede exceder los 100 caracteres.',
    'any.required': 'El nombre es un campo requerido.'
  }),

  lastName: Joi.string().min(3).max(100).required().messages({
    'string.base': 'El Apellido debe ser una cadena de texto.',
    'string.min': 'El Apellido debe tener al menos 3 caracteres.',
    'string.max': 'El Apellido no puede exceder los 100 caracteres.',
    'any.required': 'El Apellido es un campo requerido.'
  }),

  email: Joi.string().email().required().messages({
    'string.base': 'El correo electrónico debe ser una cadena de texto.',
    'string.email': 'El correo electrónico no es válido.',
    'any.required': 'El correo electrónico es un campo requerido.'
  }),

  passwordHash: Joi.string()
    .custom((value, helpers) => {
      if (!validatePassword(value)) {
        return helpers.message(
          'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.'
        )
      }
      return value
    })
    .required()
    .messages({
      'string.base': 'La contraseña debe ser una cadena de texto.',
      'string.min': 'La contraseña debe tener al menos 6 caracteres.',
      'any.required': 'La contraseña es un campo requerido.'
    }),

  status: Joi.string().valid('active', 'inactive').default('active').messages({
    'string.base': 'El estado debe ser una cadena de texto.',
    'any.only': 'El estado debe ser "active" o "inactive".'
  }),

  image: Joi.string().uri().messages({
    'string.base': 'La imagen debe ser una cadena de texto.',
    'string.uri': 'La imagen debe ser una URL válida.'
  }),

  phoneNumber: Joi.string()
    .custom((value, helpers) => {
      if (!isValidPhoneNumber(value)) {
        return helpers.message('El número de celular no es válido.')
      }
      return value
    })
    .required()
    .messages({
      'string.base': 'El número de celular debe ser una cadena de texto.',
      'any.required': 'El número de celular es un campo requerido.'
    }),
  frontBaseUrl: Joi.string()
    .pattern(/^(http:\/\/tn\.com|http:\/\/localhost:1000)/)
    .required()
    .messages({
      'string.base': 'La URL debe ser una cadena de texto.',
      'string.pattern.base': 'La URL es incorrecta.',
      'any.required': 'La URL de la base frontal es un campo requerido.'
    })
})

export const userUpdateSchema = Joi.object({
  firstName: Joi.string().min(3).max(100).required().messages({
    'string.base': 'El nombre debe ser una cadena de texto.',
    'string.min': 'El nombre debe tener al menos 3 caracteres.',
    'string.max': 'El nombre no puede exceder los 100 caracteres.',
    'any.required': 'El nombre es un campo requerido.'
  }),

  lastName: Joi.string().min(3).max(100).required().messages({
    'string.base': 'El Apellido debe ser una cadena de texto.',
    'string.min': 'El Apellido debe tener al menos 3 caracteres.',
    'string.max': 'El Apellido no puede exceder los 100 caracteres.',
    'any.required': 'El Apellido es un campo requerido.'
  })
})
