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
CREATE PROCEDURE  [dbo].[SelectAudioria] @IdTransaccion tinyint, @IdUsuario smallint,
			@IdSoliciud smallint, @descripcion nvarchar(50), @FechaHora smalldatetime
AS
BEGIN
	select b.id_bitacora_auditoria,
	b.descripcion,
	b.fecha_hora as fecha_transaccion,
	t.descripcion,
	f.nombre as usuario_aplicativo,
	s.id_solicitud,
	s.fecha_hora as fecha_solicitud,
	s.fecha_inicio as inicio_solicitud,
	s.fecha_fin as fin_solicitud,
	s.id_responsable as responsable_solicitud,
	s.id_usuario_aplicativo as usuario_aplicativo_solicitud,
	s.id_responsable_usuario_final as usuario_final_solicitud,
	s.eliminado as solicitud_eliminada
	from Bitacora_Auditoria b 
	inner join Solicitud s on s.id_solicitud = b.id_solicitud 
	inner join Transaccion t on t.id_transaccion = b.id_transaccion
	inner join Funcionario f on f.id_funcionario = b.id_usuario_aplicativo

END




