import { json } from "express";


export function Mensajes(type){

    switch(type) {
        case 1:
            return 'No se realizó la solicitud. Datos vacios';
          break;
        case 2:
            return 'No se realizó la solicitud. Formato erróneo de datos';
          break;
        case 3:
            return 'No se encontraron datos en el sistema';
          break;
        case 4:
            return 'Sin resultados';
        break;
        case 5:
            return 'La operación concluyo exitosamente';
        break;
        case 6:
            return 'Error inesperado. No se pudo procesar la operación';
        break;
        case 7:
            return 'El nombre de usuario o la contraseña son incorrectos.';
        break;
        default:
            return 'Bad request';
      }
}    

