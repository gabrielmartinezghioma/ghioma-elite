import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'
import path from 'node:path'
import { fileURLToPath } from 'url'
import router from './routes/index.js'
import errorHandler from './config/middlewares/errorHandler.js'

const app = express()

process.env.NODE_ENV === 'development' && app.use(logger('dev'))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(helmet({ crossOriginResourcePolicy: false }))

app.get('/', router)
app.use('/api/v1', router)

app.use(errorHandler)

export default app
