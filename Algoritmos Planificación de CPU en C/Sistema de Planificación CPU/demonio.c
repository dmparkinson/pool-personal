#include "header.h"
#include "inkey.h"




 
 // Obtener un numero aleatorio
int aleatorio(int inicio, int fin){
    return inicio+rand()%fin;
}



void detenerProceso(){
    while(systemPause == true){
        
    }
}
// Este es el metodo que contiene el hilo

void menuOpciones(){
    while(finalizar != true){
        if(inkey() == 'p'){
            printf ("\nPAUSE\n  (p)Reanudar (a)Cambio planificador (q)Modificacion quantium\n");
            systemPause = true;
            char op = inkey();
            while( (op != 'p') && (op != 'a') && (op != 'q') ){
                op = inkey();
            }
            if(op == 'a'){
                cambioPlanificador();
            }
            else if(op == 'q'){
                configQuantium();
            }
            systemPause = false;
            
        }
    }
    pthread_exit(NULL);
}






void cambioPlanificador(){
    int tecla;
    printf ("\nCambio de planificador: (1)JSF No apropiativo (2)JSF Apropiativo (3)RR\n");
    tecla = 0;
    while( (tecla != 1) && (tecla != 2) && (tecla != 3) ){
        scanf("%d",&tecla);
    }
    tecla = algoritmo;
}






void configQuantium(){
    if(algoritmo == 3){
        printf("\nEl quantium actual es de %c\nIngrese la cantidad de quantium\n", lecturaInstrucciones);
        scanf("%d",&lecturaInstrucciones);
    }
    else{
        printf("Actualmente no se encuentra en el de Round Robin por tanto no puede modificar el quantium\n");
        printf("%d",algoritmo);
        sleep(2);
    }
}





// Agrega el primer proceso de la lista listos a d_ejecucion
void d_ejecucion(){
    bool ejec = false;
    while(finalizar != true){
        detenerProceso();
        if( (ejecOcupada == false) && (listos->primero != NULL) ){
            detenerProceso();
            ejec = true;
            listos->primero->enEjecucion = true;
            ejec = ejecOcupada;  // Esto es porque no me permite ejecOcupada = true, no entra
            obtenerProceso(listos);
            
        }
    }
    pthread_exit(NULL);
}




void d_ordenamiento(){
    while(finalizar != true){
        detenerProceso();
        gestionarOrdenamiento();
    }
    pthread_exit(NULL);
}





void d_control_ES(){
    while(finalizar != true){
        detenerProceso();
    }
    pthread_exit(NULL);
}





// Se encarga del manejo de la tabla de procesos y el bloque de control de procesos
void d_estadistica(Proceso *proceso){
    char *info=(char *)malloc(100*sizeof (char));
    char ruta[35] = "Docs/tabla_procesos/";
    char conversion[10];
    
    sprintf(conversion, "%d",proceso->t_llegada);
    strcat(ruta,conversion);
    strcat(ruta,".txt");
    
    while(proceso->instrucciones > 0){
        detenerProceso();
        if(proceso->enEjecucion == true){
            proceso->b_control.cantCiclos = proceso->b_control.cantCiclos+1;
        }        
    }
    strcat(info,"\nTiempo de llegada = ");
    sprintf(conversion, "%d",proceso->t_llegada);
    strcat(info,conversion);
    
    strcat(info,"\nTiempo en ejecucion = ");
    sprintf(conversion, "%d",proceso->b_control.t_Ejecucion);
    strcat(info,conversion);
    
    escribirArchivo(info, ruta);
    pthread_exit(NULL);
}




