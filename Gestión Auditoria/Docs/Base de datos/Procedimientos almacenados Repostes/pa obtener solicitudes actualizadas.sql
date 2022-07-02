CREATE PROCEDURE [dbo].[SelectSolicitudActualizada] 
AS 
  BEGIN 
      SELECT Transaccion.descripcion as transaccion, Bitacora_Auditoria.id_usuario_aplicativo as usuarioAplicativo, Funcionario.nombre, Solicitud.alias as solicitud, 
	  Bitacora_Auditoria.descripcion, Bitacora_Auditoria.fecha_hora as fecha
	  FROM Bitacora_Auditoria inner join Solicitud on Bitacora_Auditoria.id_solicitud = Solicitud.id_solicitud
	  inner join Funcionario on Bitacora_Auditoria.id_usuario_aplicativo = Funcionario.id_funcionario
	  inner join Transaccion on Bitacora_Auditoria.id_transaccion = Transaccion.id_transaccion 
	  where Bitacora_Auditoria.id_transaccion = 3
END

  exec [SelectSolicitudActualizada] 
