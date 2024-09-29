import { sendNotificationEmail } from '../sendNotificationEmail.js' // Asegúrate de importar la función correcta

export function sendEmail(subject, hmtl) {
  return async function (req, res) {
    const { email, frontBaseUrl } = req.body

    try {
      await sendNotificationEmail(email, subject, hmtl(frontBaseUrl, req.code))

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
