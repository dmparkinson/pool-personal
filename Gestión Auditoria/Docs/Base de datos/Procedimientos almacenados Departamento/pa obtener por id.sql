CREATE PROCEDURE [dbo].[SelectDepartamentoById] @id_departamento smallint

AS 
  BEGIN 
      SELECT id_departamento, nombre, eliminado FROM Departamento where id_departamento = @id_departamento and eliminado = 0
END 

exe [SelectDepartamentoById] 3