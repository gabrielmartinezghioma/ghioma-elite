import { randomCrypto } from '../schemas/randomCrypto.schemas.js'

export function validateRandomCrypto(req, res, next) {
  const idParams = (({ id }) => ({
    id
  }))(req.params)

  const { error } = randomCrypto.validate(idParams)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  next()
}
