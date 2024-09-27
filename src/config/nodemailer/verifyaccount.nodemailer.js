export const verifyaccount = (url, code) => {
  return `
<div style="width: 100%; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4; padding: 0; margin: 0;">
  <!-- Encabezado -->
  <div style="background-color: #333; color: white; padding: 30px 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">GHIOMA ELITE</h1>
  </div>
  
  <!-- Cuerpo del mensaje -->
  <div style="background-color: white; max-width: 600px; margin: 40px auto; padding: 40px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-radius: 10px;">
    <p style="font-size: 18px; color: #555; line-height: 1.6;">Estimado/a cliente,</p>
    <p style="font-size: 18px; color: #555; line-height: 1.6;">
      Para completar la verificación de su cuenta, haga clic en el botón a continuación:
    </p>
    <a href="${url}/verify_email/${code}"
       style="background-color: #333; color: white; padding: 15px 30px; text-decoration: none; 
       font-size: 16px; border-radius: 50px; display: inline-block; margin-top: 20px;">
      Verificar cuenta
    </a>
    <p style="font-size: 16px; color: #777; margin-top: 30px;">O copie y pegue el siguiente enlace en su navegador:</p>
    <div style="font-size: 14px; color: #333; word-wrap: break-word; background-color: #f4f4f4; padding: 10px 15px; border-radius: 5px; margin-top: 10px;">
      <a href="${url}/verify_email/${code}" style="color: #333; text-decoration: none;">
        ${url}/verify-email/${code}
      </a>
    </div>
  </div>

  <!-- Pie de página -->
  <div style="background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
    <p style="margin: 0;">&copy; ${new Date().getFullYear()} GHIOMA ELITE. Todos los derechos reservados.</p>
  </div>
</div>
`
}
