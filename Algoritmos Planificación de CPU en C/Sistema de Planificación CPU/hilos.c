#include "header.h" 



void funcionHilo (Proceso *proceso){
    while(proceso->instrucciones > 1){
        detenerProceso();
        ejecucion(proceso);
        sleep(1);
    }
    pthread_exit(NULL);
}



//Ejecucion de procesos
void ejecucion(Proceso *proceso){
    pthread_mutex_lock(&mutex);
    detenerProceso();
    
    clock_t tiempo_inicio, tiempo_final;
    proceso->enEjecucion;
    proceso->b_control.cantCiclos = proceso->b_control.cantCiclos+1; // cantidad de ciclos
    tiempo_inicio = clock();
    /*if(proceso->enEjecucion == true){// Hacer un signal
        */if( (algoritmo == 1) || (algoritmo ==2) ){
            lecturaInstrucciones = aleatorio(10,50);
        }
        detenerProceso();
        for(int x = 0; x < lecturaInstrucciones; x++){
            detenerProceso();
            proceso->instrucciones = proceso->instrucciones-1;
            printf("%d. %d\n",proceso->t_llegada,proceso->instrucciones);
            usleep(1000);
        }
        
        
        tiempo_final = clock();
        proceso->b_control.t_Ejecucion = proceso->b_control.t_Ejecucion +(double)(tiempo_final-tiempo_inicio);//Tiempo en ejecucion
        proceso->enEjecucion = false;
   // }
       pthread_mutex_unlock(&mutex);
    
}





void creacionHilos(){
    pthread_t systemPause;
   // pthread_t ejecutarProceso;
    pthread_t ordenamiento;
   // pthread_t entreada_salida;
    
    pthread_create(&systemPause, NULL,(void*)menuOpciones, NULL); 
  //  pthread_create(&ejecutarProceso, NULL,(void*)d_ejecucion, NULL); 
   // pthread_create(&ordenamiento, NULL,(void*)d_ordenamiento, NULL); 
    //pthread_create(&entreada_salida, NULL,(void*)d_control_ES, listaE_S); */
}
