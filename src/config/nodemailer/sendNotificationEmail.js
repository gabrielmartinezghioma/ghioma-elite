import { sendEmail } from './nodemailer.js'

export const sendNotificationEmail = async (email, subject, template) => {
  await sendEmail({
    to: email,
    subject,
    html: template
  })
}
