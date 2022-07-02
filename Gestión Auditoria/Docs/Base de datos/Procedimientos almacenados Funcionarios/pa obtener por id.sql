CREATE PROCEDURE [dbo].[SelectFuncionarioById] @id_Funcionario smallint

AS 
  BEGIN 
      SELECT Funcionario.id_funcionario, Funcionario.nombre, Funcionario.fecha_nacimiento, Sexo.descripcion as Sexo, Funcionario.foto, Funcionario.id_departamento, 
	  Departamento.nombre as Nombre_Departamento, Funcionario.logname, Funcionario.contraseña, Funcionario.eliminado
	  FROM Funcionario inner join Sexo on Funcionario.id_funcionario = @id_Funcionario and Funcionario.id_sexo = Sexo.id_sexo
	  inner join Departamento on Funcionario.id_departamento = Departamento.id_departamento
END 

exec [SelectFuncionarioById] 1