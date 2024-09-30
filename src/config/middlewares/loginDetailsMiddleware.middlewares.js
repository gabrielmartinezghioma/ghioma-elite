import axios from 'axios'

const loginDetailsMiddleware = async (req, res, next) => {
  try {
    const userAgentInfo = req.useragent || {}
    const deviceInfo = {
      browser: userAgentInfo.browser || 'Desconocido',
      version: userAgentInfo.version || 'Desconocido',
      os: userAgentInfo.os || 'Desconocido',
      platform: userAgentInfo.platform || 'Desconocido',
      source: userAgentInfo.source || 'Desconocido'
    }

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    let locationInfo = {}
    if (ip !== '::1' && ip !== '127.0.0.1') {
      const locationData = await axios.get(`https://ipapi.co/${ip}/json/`)
      locationInfo = {
        city: locationData.data.city || 'Desconocido',
        region: locationData.data.region || 'Desconocido',
        country: locationData.data.country_name || 'Desconocido'
      }
    }

    req.loginDetails = {
      time: new Date(),
      location: locationInfo,
      device: deviceInfo,
      ip
    }
    next()
  } catch (error) {
    console.error('Error al obtener los detalles del login:', error)
    next()
  }
}

export default loginDetailsMiddleware
