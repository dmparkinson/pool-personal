 
#include <pthread.h> 
#include <string.h> 
#include <stdlib.h>




//===================================================================================
//                            Creacion de estructuras


// Bloque de control de procesos
typedef struct estruct_BCP{
    int cantCiclos;     // Cantidad de iteraciones del proceso
    int t_EsperaES;     // Tiempo de espera en E/S
    int t_Ejecucion;    // Tiempo promedio en ejecucion
    int t_Listos;       // Tiempo promedio en listos
}BloqueControl;



typedef struct estruct_Tabla_Pocesos{
    // Preguntar a Felipe!!!
}TablaP;



//Creacion de estructura para el objeto proceso
typedef struct estruct_Proceso{
    int t_llegada;                      // tiempo de llegada del proceso, tambien lo utilizo como el ID del proceso
    int consumo;                        // Cantidad de memoria consumida del proceso
    int instrucciones;                  // Cantidad de instrucciones
    bool enEjecucion;                   // Controla si el proceso se encuentra en ejecucion o no
    BloqueControl b_control;            // Informacion del bloque de control de procesos
    TablaP t_procesos;                  // Informacion de la tabla de procesos
    pthread_t hilo;                     // Hilo Proceso
    pthread_t estadistica;              // Hilo que controla los datos de estadistica
    struct estruct_Proceso *siguiente;  // Puntero al siguiente proceso
    struct estruct_Proceso *anterior;   // Puntero al anterior proceso
}Proceso;




// Creacion de la lista de procesos
typedef struct estruct_Lista{
    Proceso *primero;                      // Puntero al primer proceso de la lista
    Proceso *ultimo;                       // Puntero al ultimo proceso de la lista
    int tamanio;                        // Tamanio de la lista
    char nombre[20];                    // Nombre de la lista
}Lista;



//===================================================================================
