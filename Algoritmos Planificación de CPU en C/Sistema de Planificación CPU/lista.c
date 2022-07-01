
// Clase que gestiona las listas(Agregar-modificar-eliminar-visualizar)

#include "header.h"


// Inicialidador de la lista
void inicializador(Lista *lista, char nombre[]){
    lista->primero = NULL;
    lista->ultimo = NULL;
    lista->tamanio = 0;
    strcpy(lista->nombre,nombre); 
}






// Ingresar informacion al proceso(el consumo y las instrucciones, el hilo)
void ingresarInformacion(Proceso *proceso){
    proceso->consumo = aleatorio(50,900);
    proceso->instrucciones = aleatorio(2000,5000);
    proceso->enEjecucion = false;
    pthread_create(&proceso->hilo, NULL,(void*)funcionHilo,proceso);    // Creacion del hilo proceso
    pthread_create(&proceso->estadistica, NULL,(void*)d_estadistica,proceso);    // Creacion del hilo estadistica
    pthread_join(proceso->hilo, NULL);//No quitar
}







void agregarProceso(Lista *lista, Proceso *proceso){
    proceso->anterior = NULL;
    proceso->siguiente = NULL;
    if(lista->primero == NULL){                 //Si la lista se encuentra vacia
        lista->primero = proceso;    
        lista->ultimo = proceso;
    }
    else{                                       // Si la lista se encuentra llena entonces agregar a la ultima posicion
        proceso->anterior = lista->ultimo;      
        lista->ultimo->siguiente = proceso;
        lista->ultimo = proceso;
    }
    lista->tamanio = lista->tamanio+1;          // Aumentar el tamanio de la lista
}






 // Crea el proceso y lo agrega a la lista (el unico dato que contiene el proceso es el id/tiempo de llegada)
void crearProcesos(Lista *lista){   
    for(int pos = 1; pos < 151; pos++){
        Proceso *proceso = (Proceso *)malloc(sizeof(Proceso));
        proceso->t_llegada = pos;
        agregarProceso(lista, proceso);
    }
}









// Traslada el primer proceso de la lista origen a la ultima posicon de la lista destino
void trasladarProceso(Lista *l_origen, Lista *l_destino){
    Proceso *p_trasladar = l_origen->primero;         // Obtener el primer proceso de la lista destino
    // Ahora modificar punteros de la lista origen
    l_origen->primero = p_trasladar->siguiente;
    l_origen->primero->anterior = NULL;
    p_trasladar->siguiente = NULL;
    l_origen->tamanio = l_origen->tamanio-1;
    
    // Agregar el proceso a la lista destino
    agregarProceso(l_destino, p_trasladar);
}








// Obtiene el primer proceso de la lista y lo agrega a ejecucion. Esta funcion solo modifica punteros!
void obtenerProceso(Lista *lista){
    Proceso *aux = lista->primero;
    lista->primero = aux->siguiente;
    lista->primero->anterior = NULL;
    aux->siguiente = NULL;
}







// Mostrar la lista indicada por el usuario
void mostrarLista(Lista *lista){
    char *info=(char *)malloc(100*sizeof (char));
    Proceso *proceso = lista->primero;
    strcat(info, "\n=============================================\n");
    strcat(info, lista->nombre);
    strcat(info,"\n");
    printf("%s", info);
    char conversion[10] = "";
    while(proceso != NULL){
        strcat(info, "(");
        sprintf(conversion, "%d",proceso->t_llegada);
        strcat(info, conversion);
        strcat(info, ".");
        sprintf(conversion, "%d",proceso->instrucciones);
        strcat(info, conversion);
        strcat(info, ")");
        
        printf("(%d.%d)",proceso->t_llegada, proceso->instrucciones);
        proceso = proceso->siguiente;
    }
    escribirArchivo(info, "Docs/ejecucion/System.txt");
    printf("\n");
}







// Mover los primeros procesos de la lista vacios a la lista listos y agregarles informacion
void moverNuevosAListos(Lista *original, Lista *destino){
    for(int x = 1; x <= 40;x++){
        trasladarProceso(original, destino);
        ingresarInformacion(destino->ultimo);
    }
}






