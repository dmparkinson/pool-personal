USE [Informatica_Aplicada]
GO
/****** Object:  StoredProcedure [dbo].[SelectTransaccion] ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SelectTransaccion] 

AS 
  BEGIN 
      SELECT id_transaccion, descripcion from Transaccion
  END

