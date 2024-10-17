import { randomCrypto } from '../schemas/randomCrypto.schemas.js'

export function validateRandomCrypto(req, res, next) {
  const { code } = req.params

  const { error } = randomCrypto.validate(code)

  if (error) {
    return res.status(404).json({ message: error.details[0].message })
  }

  next()
}
