import { sendNotificationEmail } from '../sendNotificationEmail.js'

export function sendEmail(subject, html, emailParam) {
  return async function (req, res) {
    const { email: emailFromBody, frontBaseUrl } = req.body
    const email = emailParam || emailFromBody // Si emailParam está presente, lo usa, si no, usa el de req.body

    try {
      await sendNotificationEmail(email, subject, html(frontBaseUrl, req.code))

      return res.status(201).json(req.result)
    } catch (emailError) {
      console.error('Error al enviar el correo:', emailError)

      return res.status(500).json({
        message:
          'Error al enviar el correo. Por favor, intenta crear el usuario nuevamente.'
      })
    }
  }
}
