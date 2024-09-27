import catchError from '../config/middlewares/asyncWrapper.js'
import { userLogin } from '../services/login.services.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { loginSchema } from '../validation/login.validation.js'
import axios from 'axios'

export const login = catchError(async (req, res) => {
  const { email, passwordHash, recaptchaToken } = req.body

  let success = true
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`
  const recaptchaResponse = await axios.post(verifyURL)
  if (process.env.NODE_ENV !== 'development') {
    success = recaptchaResponse.data.success
  }

  if (!success) {
    return res.status(401).json({ error: 'reCAPTCHA verification failed' })
  }

  const body = (({ email, passwordHash }) => ({
    email,
    passwordHash
  }))(req.body)

  const { error } = loginSchema.validate(body)
  if (error) {
    return res.status(401).json({ error: error.details[0].message })
  }

  const user = await userLogin(email)
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })

  const isValid = await bcrypt.compare(passwordHash, user.passwordHash) // true || false
  if (!isValid) return res.status(401).json({ error: 'Invalid credentials' })

  const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
    expiresIn: '10d'
  })

  return res.json({ user, token })
})

export const logged = catchError(async (req, res) => {
  const user = req.user
  return res.json(user)
})
