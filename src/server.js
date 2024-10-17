import app from './app.js'
import sequelize from './config/DB/conection.js'
import Role from './models/Role.js'
import './models/VerifyAccount.js'
import { roles } from './roles/roles.js'
const PORT = process.env.PORT || 8080

async function startServer() {
  try {
    await sequelize.authenticate()
    console.log('✅ Database connection established successfully.')

    await sequelize.sync({ force: true })
    // await sequelize.sync()s
    console.log('✅ Database synchronized successfully.')
    const result = await Role.findAll()
    if (result.length === 0) await Role.bulkCreate(roles)
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
