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
CREATE PROCEDURE  [dbo].[UpdateTransaccionById] @TransaccionId smallint, @Descripcion nvarchar(30)
AS
BEGIN

	UPDATE Transaccion set descripcion=@Descripcion
	where id_transaccion=@TransaccionId
	
END


