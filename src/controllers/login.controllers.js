import catchError from '../config/middlewares/asyncWrapper.middlewares.js'
import { userLogin } from '../services/login.services.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = catchError(async (req, res, next) => {
  const { email, passwordHash } = req.body
  const user = await userLogin(email)
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  const isValid = await bcrypt.compare(passwordHash, user.passwordHash)
  if (!isValid) return res.status(401).json({ message: 'Invalid credentials' })
  if (!user.isVerified) {
    return res.status(403).json({
      message: 'Your account must be verified to log in.',
      isVerified: user.isVerified,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
  }

  const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
    expiresIn: '10d'
  })
  req.userlogin = user
  req.token = token
  next()
})

export const loginUser = catchError(async (req, res) => {
  const user = req.userlogin
  const token = req.token
  res.json({ user, token })
})

export const logged = catchError(async (req, res) => {
  const user = req.user
  return res.json(user)
})
