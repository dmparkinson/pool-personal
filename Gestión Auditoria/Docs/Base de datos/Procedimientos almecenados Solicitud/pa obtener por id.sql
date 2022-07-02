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
CREATE PROCEDURE [dbo].[SelectSolicitudById] @id_Solicitud smallint

AS
  BEGIN

	select s.finalizado, s.alias, s.id_solicitud, s.fecha_hora, s.id_usuario_aplicativo, f.nombre as Nombre_Aplicativo, s.id_responsable, g.nombre as Nombre_Responsable, s.id_responsable_usuario_final, h.nombre as Nombre_Usuario_Final, s.fecha_inicio, s.fecha_fin, s.documento_acta_constitutiva as documento, s.eliminado
	from Funcionario f
	inner join Solicitud s on s.id_solicitud = @id_Solicitud and f.id_funcionario = s.id_usuario_aplicativo
	inner join Funcionario g on g.id_funcionario = s.id_responsable
	inner join Funcionario h on h.id_funcionario = s.id_responsable_usuario_final where s.eliminado = 0 and @id_Solicitud = s.id_solicitud
END



