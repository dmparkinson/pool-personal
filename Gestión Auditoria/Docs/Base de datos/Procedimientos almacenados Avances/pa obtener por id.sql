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
CREATE PROCEDURE [dbo].[SelectAvanceById]@id_avance  smallint

AS
  BEGIN
      SELECT Avance.id_avance, Avance.id_trimestre, Avance.id_usuario_aplicativo, Funcionario.nombre, Avance.id_solicitud, Avance.documento, Avance.fecha_hora
	  FROM Avance inner join Funcionario on id_avance = @id_avance and Avance.id_usuario_aplicativo = Funcionario.id_funcionario
	  where Avance.id_avance = @id_avance and Avance.eliminado = 0
  END

