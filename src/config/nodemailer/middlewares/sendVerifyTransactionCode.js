import { sendNotificationEmail } from '../sendNotificationEmail.js' // Asegúrate de importar la función correcta

export function sendVerifyTransactionCode(email, subject, hmtl, code) {
  return async function (req, res, next) {
    try {
      await sendNotificationEmail(email, subject, hmtl(code))

      next()
    } catch (emailError) {
      console.error('Error al enviar el correo:', emailError)

      return res.status(500).json({
        message: 'Error al enviar el correo.'
      })
    }
  }
}
