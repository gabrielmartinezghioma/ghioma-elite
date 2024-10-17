export const changeRoleSuccessfully = (firstName, lastName, email, role) => {
  return `
<div style="width: 100%; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #ebebeb; padding: 0; margin: 0;">
  <!-- Encabezado -->
  <div style="background-color: #ffe404; color: #000000; padding: 30px 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">GHIOMA</h1>
  </div>
  
  <!-- Cuerpo del mensaje -->
  <div style="background-color: white; max-width: 600px; margin: 40px auto; padding: 40px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <p style="font-size: 18px; color: #000000; line-height: 1.6;">Estimado/a Administrador,</p>
    <p style="font-size: 18px; color: #000000; line-height: 1.6;">
      Nos complace informarle que el rol de la cuenta ha sido cambiado con éxito. A continuación, los detalles de la cuenta actualizada:
    </p>
    <p style="font-size: 16px; color: #000000;">
      <strong>Nombre:</strong> ${firstName} ${lastName}<br/>
      <strong>Email:</strong> ${email}<br/>
      <strong>Nuevo Rol:</strong> ${role}
    </p>
    <p style="font-size: 16px; color: #000000; margin-top: 30px;">Si no solicitaste este cambio de rol, por favor contáctanos de inmediato.</p>
  </div>

  <!-- Pie de página -->
  <div style="background-color: #ffe404; color: #000000; padding: 15px; text-align: center; font-size: 12px;">
    <p style="margin: 0;">&copy; ${new Date().getFullYear()} GHIOMA. Todos los derechos reservados.</p>
  </div>
</div>
  `
}
