 
use Informatica_Aplicada
CREATE PROCEDURE [dbo].[LoginFuncionario]  @logname nvarchar(20),@contraseña nvarchar(20)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT  id_funcionario,nombre,logname from Funcionario where logname = @logname and contraseña = @contraseña and eliminado =0
END

