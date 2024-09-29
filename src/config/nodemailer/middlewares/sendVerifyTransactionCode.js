import { sendNotificationEmail } from '../sendNotificationEmail.js'

export function sendVerifyTransactionCode(email, subject, hmtl) {
  return async function (req, res) {
    try {
      await sendNotificationEmail(email, subject, hmtl(req.code))
      return res.json({ message: 'Sent email' })
    } catch (emailError) {
      console.error('Error al enviar el correo:', emailError)
      return res.status(500).json({
        message: 'Error al enviar el correo.'
      })
    }
  }
}
