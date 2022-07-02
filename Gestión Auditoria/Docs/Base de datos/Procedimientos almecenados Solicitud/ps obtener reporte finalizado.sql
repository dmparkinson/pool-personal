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
CREATE PROCEDURE dbo.SelectSolicitudReporteFinalizado
AS
SELECT
	(SELECT COUNT(*) FROM Solicitud WHERE finalizado = 0) as pendientes,
	(SELECT COUNT(*) FROM Solicitud WHERE finalizado = 1) as finalizados
FROM Solicitud
