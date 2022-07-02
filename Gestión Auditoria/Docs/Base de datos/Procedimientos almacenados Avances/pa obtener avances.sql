USE [Informatica_Aplicada]
GO
/****** Object:  StoredProcedure [dbo].[SelectAvance]    Script Date: 12/11/2021 01:58:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SelectAvance]

AS
  BEGIN
      SELECT Avance.id_avance, Funcionario.nombre, s.alias,
	  s.fecha_hora as fecha_solicitud, Avance.documento, Avance.fecha_hora as fecha_avance, t.descripcion
	  FROM Avance inner join Funcionario on Avance.id_usuario_aplicativo = Funcionario.id_funcionario
	  inner join Trimestre t on Avance.id_trimestre = t.id_trimestre
	  inner join Solicitud s on Avance.id_solicitud = s.id_solicitud
	  where Avance.eliminado = 0
  END

  exec [SelectAvance] 





