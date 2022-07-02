CREATE PROCEDURE  InsertDepartamento @Nombre nvarchar(30), @Eliminado bit
	
AS
BEGIN

	INSERT INTO Departamento(nombre, eliminado)
	VALUES (@Nombre, @Eliminado)
	

END

exec InsertDepartamento 'Gerencia',1