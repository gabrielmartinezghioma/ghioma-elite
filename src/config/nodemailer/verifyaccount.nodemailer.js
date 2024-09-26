export const verifyaccount = url => {
  return `
<div style="width: 100%; font-family: Arial, sans-serif;">
  <!-- Encabezado -->
  <div style="background-color: black; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 24px; text-transform: uppercase;">GHIOMA ELITE</h1>
  </div>
  
  <!-- Cuerpo del mensaje -->
  <div style="padding: 40px; text-align: center;">
    <p style="font-size: 18px; color: #333;">Haga clic en el siguiente botón o enlace para verificar su cuenta:</p>
    <a href=${url}
       style="background-color: black; color: white; padding: 10px 20px; text-decoration: none; 
       font-size: 16px; border-radius: 5px; display: inline-block; margin-top: 20px;">
      Verificar cuenta
    </a>
    <p style="margin-top: 20px;">O puede hacer clic en el siguiente enlace:</p>
    <a href=${url} style="color: black; text-decoration: underline;">
      ${url}
    </a>
  </div>
  
  <!-- Pie de página -->
  <div style="background-color: black; color: white; padding: 10px; text-align: center;">
    <p style="margin: 0; font-size: 12px;">&copy; ${new Date().getFullYear()} GHIOMA ELITE. Todos los derechos reservados.</p>
  </div>
</div>
`
}
