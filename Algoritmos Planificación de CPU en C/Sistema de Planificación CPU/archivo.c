 // Escritura de archivos
#include "header.h"


void escribirArchivo(char *info, char *direccion){
    FILE *archivo;

 	archivo = fopen ( direccion, "a+t" ); //parámetro para escritura al final y para file tipo texto
 	
    if (!archivo) {                          // Si es NULL, entonces no existe, o no se pudo abrir
        printf("¡No se pudo abrir el archivo %s!", direccion);
    } 
    else{ 	
        fputs(info, archivo);
    }
 	fclose (archivo);
}
