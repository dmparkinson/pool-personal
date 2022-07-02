USE [Informatica_Aplicada]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE  [dbo].[DeleteSolicitud] @SolicitudId smallint, @Usuario smallint, @fechaHora datetime
AS
BEGIN

	UPDATE Solicitud set eliminado= 1 where id_solicitud=@SolicitudId


	INSERT INTO Bitacora_Auditoria(id_transaccion, id_usuario_aplicativo,id_solicitud,descripcion,fecha_hora )
	VALUES (2,@Usuario, @SolicitudId, Concat('Eliminacion de solicitud por usuario ',
	(select nombre from Funcionario WHERE id_funcionario = @Usuario)) ,@fechaHora)

END



