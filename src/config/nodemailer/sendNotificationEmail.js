import { sendEmail } from './nodemailer.js'

export const sendNotificationEmail = async (email, subject, verifyaccount) => {
  await sendEmail({
    to: email,
    subject: 'Verificación de cuenta - GHIOMA ELITE',
    html: verifyaccount
  })
}
