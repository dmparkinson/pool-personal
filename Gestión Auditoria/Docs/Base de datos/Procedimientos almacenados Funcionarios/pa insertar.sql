CREATE PROCEDURE  InsertFuncionario @Nombre nvarchar(30), @FechaNacimiento date, @Sexo tinyint, @Foto nvarchar(100), @Departamento smallint,
                                    @Logname nvarchar(20),@Contraseņa nvarchar(20), @Eliminado bit
	
AS
BEGIN

	INSERT INTO Funcionario(nombre,fecha_nacimiento,id_sexo,foto,id_departamento,logname,contraseņa, eliminado)
	VALUES (@Nombre,@FechaNacimiento,@Sexo,@Foto,@Departamento,@Logname,@Contraseņa, @Eliminado)	

END

exec InsertFuncionario 'daniela Parkinson',null,2,null,9,dani,1234,1