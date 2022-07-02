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
CREATE PROCEDURE [dbo].[SelectTrimestreById] @IdTrimestre smallint

AS 
  BEGIN 
      SELECT id_trimestre, descripcion FROM Trimestre where id_trimestre = @IdTrimestre
END 

