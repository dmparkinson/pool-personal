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
CREATE PROCEDURE dbo.SelectAvancesSolicitud
AS

SELECT COUNT(a.id_solicitud)as avances, s.alias as solicitudes
FROM Avance a inner join Solicitud s on s.id_solicitud  = a.id_solicitud
GROUP BY s.alias


