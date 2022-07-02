CREATE PROCEDURE [dbo].[SelectDepartamento]

AS 
  BEGIN 
      SELECT id_departamento, nombre, eliminado FROM Departamento where eliminado = 0
END 

exec [SelectDepartamento] 