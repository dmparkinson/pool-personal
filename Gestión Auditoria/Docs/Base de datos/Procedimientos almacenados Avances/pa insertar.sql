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
CREATE PROCEDURE  [dbo].[InsertAvance] @TrimestreId tinyint, @UsuarioAplicativo smallint, @SolicitudId smallint, @Documento nvarchar(100),@FechaHora smalldatetime, @SolicitudEstado bit

AS
BEGIN

	INSERT INTO Avance(id_trimestre, id_usuario_aplicativo, id_solicitud, documento, fecha_hora, eliminado)
	VALUES (@TrimestreId,@UsuarioAplicativo,@SolicitudId,@Documento,@FechaHora,0)

	UPDATE Solicitud set finalizado= @SolicitudEstado where id_solicitud=@SolicitudId
END





