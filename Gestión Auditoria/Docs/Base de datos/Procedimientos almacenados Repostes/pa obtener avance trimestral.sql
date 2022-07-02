CREATE PROCEDURE [dbo].[SelectAvanceTrimestral] @Solicitud smallint, @Trimestre tinyint

AS
  BEGIN
      SELECT Avance.id_avance, Funcionario.nombre, s.alias,
	  s.fecha_hora as fecha_solicitud, Avance.documento, Avance.fecha_hora as fecha_avance, t.descripcion
	  FROM Avance inner join Funcionario on Avance.id_usuario_aplicativo = Funcionario.id_funcionario
	  inner join Trimestre t on Avance.id_trimestre = t.id_trimestre
	  inner join Solicitud s on Avance.id_solicitud = s.id_solicitud
	  where Avance.eliminado = 0 and Avance.id_solicitud = @Solicitud and Avance.id_trimestre = @Trimestre
  END

  exec [SelectAvanceTrimestral] 1,1


