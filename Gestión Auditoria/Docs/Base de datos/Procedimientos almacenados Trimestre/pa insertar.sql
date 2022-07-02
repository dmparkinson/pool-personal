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
CREATE PROCEDURE  [dbo].[InsertTrimestre] @Descripcion nvarchar(30)
	
AS
BEGIN

	INSERT INTO Trimestre(descripcion)
	VALUES (@Descripcion)
	

END



