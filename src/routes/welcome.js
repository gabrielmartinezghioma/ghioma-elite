import path from 'node:path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const welcome = (req, res) => {
  const pathFile = path.join(__dirname, '..', 'public', 'views', 'index.html')
  return res.sendFile(pathFile)
}

export default welcome
