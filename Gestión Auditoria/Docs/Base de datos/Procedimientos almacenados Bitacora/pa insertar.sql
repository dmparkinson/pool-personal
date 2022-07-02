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
CREATE PROCEDURE  [dbo].[InsertAudioria] @IdTransaccion tinyint, @IdUsuario smallint,
			@IdSoliciud smallint, @descripcion nvarchar(50), @FechaHora smalldatetime
AS
BEGIN

	INSERT INTO Bitacora_Auditoria(id_transaccion, id_usuario_aplicativo,id_solicitud,descripcion,fecha_hora )
	VALUES (@IdTransaccion,@IdUsuario,@IdSoliciud,@descripcion,@FechaHora)

END


