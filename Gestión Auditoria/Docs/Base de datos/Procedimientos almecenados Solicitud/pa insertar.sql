CREATE PROCEDURE  InsertSolicitud @Alias nvarchar(30), @FechaHora smalldatetime, @UsuarioAplicativo smallint, @Responsable smallint, @UsuarioFinal smallint,

                                    @FechaInicio date, @FechaFin date, @DocumentoActaConstitutiva  nvarchar(100)

AS
BEGIN

	INSERT INTO Solicitud(alias,fecha_hora, id_usuario_aplicativo, id_responsable, id_responsable_usuario_final, fecha_inicio, fecha_fin, documento_acta_constitutiva, eliminado, finalizado)
	VALUES (@Alias,@FechaHora,@UsuarioAplicativo,@Responsable,@UsuarioFinal,@FechaInicio,@FechaFin,@DocumentoActaConstitutiva, 0, 0)


	INSERT INTO Bitacora_Auditoria(id_transaccion, id_usuario_aplicativo,id_solicitud,descripcion,fecha_hora )
	VALUES (1,@UsuarioAplicativo, @@Identity, Concat('Registro de solicitud por usuario ',
	(select nombre from Funcionario WHERE id_funcionario = @UsuarioAplicativo)) ,@FechaHora)

END




exec InsertSolicitud null,1,1,1,null,null,null,1
