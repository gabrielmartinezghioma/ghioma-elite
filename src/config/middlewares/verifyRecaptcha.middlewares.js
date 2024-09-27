import axios from 'axios'

export async function verifyRecaptcha(req, res, next) {
  try {
    const { recaptchaToken } = req.body

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY

    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`

    const recaptchaResponse = await axios.post(verifyURL)

    let success = true
    if (process.env.NODE_ENV !== 'development') {
      success = recaptchaResponse.data.success
    }

    if (!success) {
      return res.status(401).json({ error: 'reCAPTCHA verification failed' })
    }

    next()
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error.message)
    return res
      .status(500)
      .json({ error: 'Internal server error during reCAPTCHA verification' })
  }
}
