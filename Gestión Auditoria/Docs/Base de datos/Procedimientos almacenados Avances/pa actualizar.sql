USE [Informatica_Aplicada]
GO
/****** Object:  StoredProcedure [dbo].[UpdateAvanceById]    ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE  [dbo].[UpdateAvanceById] @AvanceId smallint,@TrimestreId tinyint, @UsuarioAplicativo smallint, @SolicitudId smallint, @Documento nvarchar(100)

AS
BEGIN

	UPDATE Avance set id_trimestre=@TrimestreId, id_usuario_aplicativo=@UsuarioAplicativo, id_solicitud=@SolicitudId,
	                    documento=@Documento
	where id_avance=@AvanceId

END

