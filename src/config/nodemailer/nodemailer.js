import nodemailer from 'nodemailer'

export const sendEmail = options =>
  new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      },
      secure: false
    })
    const mailOptions = {
      from: process.env.EMAIL,
      ...options
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        return reject(new Error('An error has occurred'))
      }
      return resolve({ message: 'Email sent successfully' })
    })
  })
