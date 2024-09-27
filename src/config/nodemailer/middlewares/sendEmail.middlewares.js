import { sendNotificationEmail } from '../sendNotificationEmail.js' // Asegúrate de importar la función correcta

export function sendEmail(subject, hmtl, code) {
  return async function (req, res, next) {
    const { email, frontBaseUrl } = req.body

    try {
      await sendNotificationEmail(email, subject, hmtl(frontBaseUrl, code))

      next()
    } catch (emailError) {
      console.error('Error al enviar el correo:', emailError)

      return res.status(500).json({
        message:
          'Error al enviar el correo. Por favor, intenta crear el usuario nuevamente.'
      })
    }
  }
}
