export const loginSendMail = loginDetails => {
  const { time, location, device, ip } = loginDetails
  const { city, region, country } = location

  return `
  <div style="width: 100%; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #ebebeb; padding: 0; margin: 0;">
    <!-- Encabezado -->
    <div style="background-color: #ffe404; color: #000000; padding: 30px 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">GHIOMA</h1>
    </div>
    
    <!-- Cuerpo del mensaje -->
    <div style="background-color: white; max-width: 600px; margin: 40px auto; padding: 40px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <p style="font-size: 18px; color: #000000; line-height: 1.6;">Estimado/a cliente,</p>
      <p style="font-size: 18px; color: #000000; line-height: 1.6;">
        Hemos detectado un inicio de sesión en su cuenta con los siguientes detalles:
      </p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px; color: #333;">Fecha y hora</td>
          <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px; color: #555;">${new Date(time).toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px; color: #333;">IP</td>
          <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px; color: #555;">${ip || 'Desconocida'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px; color: #333;">Ubicación</td>
          <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px; color: #555;">${city}, ${region}, ${country}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px; color: #333;">Dispositivo</td>
          <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px; color: #555;">${device.browser} - ${device.os}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px; color: #333;">Plataforma</td>
          <td style="padding: 10px; border: 1px solid #ddd; font-size: 16px; color: #555;">${device.platform || 'Desconocida'}</td>
        </tr>
      </table>
      <p style="font-size: 16px; color: #000000; margin-top: 30px;">
        Si usted no ha iniciado esta sesión, por favor póngase en contacto con nuestro equipo de soporte de inmediato.
      </p>
    </div>
  
    <!-- Pie de página -->
    <div style="background-color: #ffe404; color: #000000; padding: 15px; text-align: center; font-size: 12px;">
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} GHIOMA. Todos los derechos reservados.</p>
    </div>
  </div>
  `
}
