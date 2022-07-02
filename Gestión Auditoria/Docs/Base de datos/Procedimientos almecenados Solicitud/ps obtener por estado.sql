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
CREATE PROCEDURE dbo.SelectSolicitudByEstado
AS
	select alias, id_solicitud from Solicitud where finalizado = 0 and eliminado = 0
