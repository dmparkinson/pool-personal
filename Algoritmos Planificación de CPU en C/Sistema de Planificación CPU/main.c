#include "header.h"


bool finalizar = false;
bool systemPause = false;
bool ejecOcupada = false;
int lecturaInstrucciones = 0;
int algoritmo = 1; 
pthread_mutex_t mutex;

Lista *listaE_S = NULL;
Lista *listos = NULL;

void main(){
    system("clear");                                    // Limpiar pantalla
    srand(time(NULL));                                  // Para evitar que los numeros salgan repetidos consecutivamente
    
    pthread_mutex_init(&mutex, NULL);                   // Iniciar mutex
    
    Lista *vacios = (Lista *)malloc(sizeof(Lista));     // Lista con los 150 procesos sin informacion
    listos = (Lista *)malloc(sizeof(Lista));     // Lista con 100 de los 150 de la lista anterior con informacion
    listaE_S = (Lista *)malloc(sizeof(Lista));          // Lista de entrada y salida
    
    
    inicializador(vacios, "Lista de vacios");
    inicializador(listos, "Lista de listos");
    inicializador(listaE_S, "Lista de E/S");
    
    creacionHilos(); 
    crearProcesos(vacios);
    
    mostrarLista(vacios);

	sleep(3);
    moverNuevosAListos(vacios,listos);
          
    
    pthread_mutex_destroy(&mutex);
}
