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
CREATE PROCEDURE  [dbo].[EliminarAvance] @AvanceId smallint
	
AS
BEGIN

	UPDATE Avance set eliminado = 1	where id_avance=@AvanceId

END






