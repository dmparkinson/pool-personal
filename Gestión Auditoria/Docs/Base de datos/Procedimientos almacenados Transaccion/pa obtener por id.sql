USE [Informatica_Aplicada]
GO
/****** Object:  StoredProcedure [dbo].[SelectTransaccionById]******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SelectTransaccionById] @IdTransaccion smallint

AS 
  BEGIN 
      SELECT id_transaccion, descripcion FROM Transaccion where id_transaccion= @IdTransaccion
END 
