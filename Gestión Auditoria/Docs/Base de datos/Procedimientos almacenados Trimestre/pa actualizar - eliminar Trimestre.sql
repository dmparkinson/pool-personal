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
CREATE PROCEDURE  [dbo].[UpdateTrimestreById] @TrimestreId smallint, @Descripcion nvarchar(30)
AS
BEGIN

	UPDATE Trimestre set descripcion=@Descripcion
	where id_trimestre=@TrimestreId
	
END




