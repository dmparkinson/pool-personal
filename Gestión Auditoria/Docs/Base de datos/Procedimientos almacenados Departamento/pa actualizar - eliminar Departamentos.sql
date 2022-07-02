CREATE PROCEDURE  [dbo].[UpdateDepartamentoById] @DepartamentoId smallint, @Nombre nvarchar(30), @Eliminado bit
AS
BEGIN

	UPDATE Departamento set nombre=@Nombre, eliminado=@Eliminado
	where id_departamento=@DepartamentoId
	
END

exec [UpdateDepartamentoById] 3, 'Gerencia', 1



