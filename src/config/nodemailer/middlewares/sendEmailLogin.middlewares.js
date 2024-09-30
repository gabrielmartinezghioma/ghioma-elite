import { sendNotificationEmail } from '../sendNotificationEmail.js'

export function sendEmailLogin(subject, html) {
  return async function (req, res, next) {
    try {
      await sendNotificationEmail(
        req.userlogin.email,
        subject,
        html(req.loginDetails)
      )
      next()
    } catch (emailError) {
      console.error('Error al enviar el correo:', emailError)
      return res.status(500).json({
        message: 'Error al enviar el correo'
      })
    }
  }
}
