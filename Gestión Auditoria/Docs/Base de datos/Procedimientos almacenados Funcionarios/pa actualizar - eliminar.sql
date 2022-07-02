CREATE PROCEDURE  [dbo].[UpdateFuncionarioById] @FuncionarioId smallint,@Nombre nvarchar(30), @FechaNacimiento date, @Foto nvarchar(100), @Departamento smallint,
                                    @Logname nvarchar(20),@Contraseña nvarchar(20), @Eliminado bit
AS
BEGIN

	UPDATE Funcionario set nombre=@Nombre,fecha_nacimiento=@FechaNacimiento,foto=@Foto,id_departamento=@Departamento,logname=@Logname,
	                       contraseña=@Contraseña, eliminado=@Eliminado
	where id_funcionario=@FuncionarioId
	
END

exec [UpdatefuncionarioById] 1,'Daya Godinez Cervantes',null,null,3,daya,1234,0



