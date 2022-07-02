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
CREATE PROCEDURE [dbo].[SelectSolicitud]

AS
  BEGIN

	select s.finalizado, s.alias, s.id_solicitud, s.fecha_hora, s.id_usuario_aplicativo, f.nombre as Usuario_Aplicativo, s.id_responsable, g.nombre as Usuario_Responsable, s.id_responsable_usuario_final, h.nombre as Usuario_Final, s.fecha_inicio, s.fecha_fin, s.documento_acta_constitutiva as documento, s.eliminado
	from Funcionario f
	inner join Solicitud s on f.id_funcionario = s.id_usuario_aplicativo
	inner join Funcionario g on g.id_funcionario = s.id_responsable
	inner join Funcionario h on h.id_funcionario = s.id_responsable_usuario_final where s.eliminado  = 0
END

exec [SelectSolicitud]

