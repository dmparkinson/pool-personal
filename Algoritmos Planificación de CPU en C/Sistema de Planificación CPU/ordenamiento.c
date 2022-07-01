#include "header.h" 



// Ordenar por trabajo mas corto primero
void ordenamientoPorFJS(Proceso *vec[], int tamanio){
    Proceso *proceso = NULL;
    for (int x = 0; x < tamanio; x++){
        for (int y = x+1; y < tamanio; y++){
            detenerProceso();
            if(vec[x]->instrucciones > vec[y]->instrucciones){
                proceso = vec[x];
                vec[x] = vec[y];
                vec[y] = proceso;
            }
        }
    }
}






// Ordenar por Round Robin
void ordenamientoPorRR(Proceso *vec[], int tamanio){
    Proceso *proceso = NULL;
    for (int x = 0; x < tamanio; x++){
        for (int y = x+1; y < tamanio; y++){
            detenerProceso();
            if(vec[x]->t_llegada > vec[y]->t_llegada){
                proceso = vec[x];
                vec[x] = vec[y];
                vec[y] = proceso;
            }
        }
    }
}







void convertirVector_Lista(Proceso *vec[]){
    for(int rec=0; rec < listos ->tamanio; rec++){   
        detenerProceso();
        agregarProceso(listos, vec[rec]);
    }
}







// Convertir la lista a vector para ordenar
// No se debe tomar el primer proceso de la lista!!
void convertirLista_Vector(Proceso *vector[]){
    
    // Transformar lista a vector
    Proceso *proceso = listos->primero;            // Obtener primer nodo de la lista
    proceso = proceso->siguiente;                 // Evitar el primer proceso
    
    for(int rec=0; rec < listos ->tamanio; rec++){         // Moverse por toda la lista
        detenerProceso();
        vector[rec] = proceso;                    // Meter el nodo de la lista al vector
        proceso = proceso->siguiente;             // Pasar al siguiente nodo
    }
    listos->primero = NULL;
    listos->ultimo= NULL;
}





// Controla el algoritmo de ordenamiento a usar
void gestionarOrdenamiento(){
    Proceso *vector[listos ->tamanio-1];
    convertirLista_Vector(vector);
    detenerProceso();
    if( algoritmo == 1){  // usar RR 
        ordenamientoPorRR(vector, listos ->tamanio-1);
    }
    else{                // usar FJS
        ordenamientoPorFJS(vector, listos ->tamanio-1);
    }
    convertirVector_Lista(vector);
    mostrarLista(listos);
}









