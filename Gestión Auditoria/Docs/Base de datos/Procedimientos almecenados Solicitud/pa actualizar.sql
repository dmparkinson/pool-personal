CREATE PROCEDURE  [dbo].[UpdateSolicitudById]  @Alias nvarchar(30),@SolicitudId int,@FechaEdicion smalldatetime, @UsuarioAplicativo smallint, @Responsable smallint, @UsuarioFinal smallint,
                                    @FechaInicio date, @FechaFin date, @DocumentoActaConstitutiva  nvarchar(100), @finalizado bit
AS
BEGIN

	UPDATE Solicitud set alias=@Alias, id_usuario_aplicativo=@UsuarioAplicativo, id_responsable=@Responsable, id_responsable_usuario_final=@UsuarioFinal,
	                     fecha_inicio=@FechaInicio, @FechaFin=@FechaFin,documento_acta_constitutiva=@DocumentoActaConstitutiva, finalizado= @finalizado
	where id_solicitud=@SolicitudId


	INSERT INTO Bitacora_Auditoria(id_transaccion, id_usuario_aplicativo,id_solicitud,descripcion,fecha_hora )
	VALUES (3,@UsuarioAplicativo, @SolicitudId, Concat('Actualización de solicitud por usuario ',
	(select nombre from Funcionario WHERE id_funcionario = @UsuarioAplicativo)) ,@FechaEdicion)

END



exec [UpdateSolicitudById] 1,null,1,1,1,null,null,null,1
