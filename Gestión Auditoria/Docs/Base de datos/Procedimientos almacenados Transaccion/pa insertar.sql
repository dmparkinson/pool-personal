USE [Informatica_Aplicada]
GO
/****** Object:  StoredProcedure [dbo].[InsertTransaccion] ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE  [dbo].[InsertTransaccion] @Descripcion nvarchar(30)

AS
BEGIN

	INSERT INTO Transaccion(descripcion)
	VALUES (@Descripcion)


END

exec InsertTransaccion 'Registrar'-- 1
exec InsertTransaccion 'Eliminar'-- 2
exec InsertTransaccion 'Actualizar' --3

