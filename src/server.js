import app from './app.js'
import sequelize from './config/DB/conection.js'

const PORT = process.env.PORT || 8080

async function startServer() {
  try {
    await sequelize.authenticate()
    console.log('✅ Database connection established successfully.')

    await sequelize.sync()
    console.log('✅ Database synchronized successfully.')

    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`)
      console.log(`🌐 Access the application at: http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('❌ Failed to start the server.')
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

startServer()
