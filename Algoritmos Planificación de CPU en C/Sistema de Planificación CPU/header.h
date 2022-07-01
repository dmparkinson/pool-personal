#ifndef _header_h
#define _header_h

#include <stdio.h>      // Todas las funciones como fread, fwrite, fopen, fclose y printf
#include <stdlib.h>
#include<time.h>        // libreria para obtener aleatorios diferentes
#include <unistd.h>     // librera del sleep() 
#include <string.h>     // Libreria para el control de la cadena de caracteres
#include <stdbool.h>    // Libreria para utilizar booleano
#include <math.h>       // libreria para operaciones matematicas, ejemplo: redondear
#include <pthread.h>    // Libreria para los hilos
#include "libLista.h"   





extern bool finalizar;            // Finalizacion del programa
extern bool systemPause;          // Detener Sistema
extern bool ordenar;              // Ordenar lista
extern bool ejecOcupada;     // Guarda si al ejecucion se encuentra en uso

extern int lecturaInstrucciones;  // Cantidad de instrucciones a leer
extern int algoritmo;             //1=JSF No apropiativo   2=JSF Apropiativo   3=RR

extern pthread_mutex_t mutex;     // Impedir que mas de un proceso utilicen una funcion

extern Lista *listaE_S;
extern Lista *listos;


//=============================================================================================
//                            Prototipos de las clases
//=============================================================================================


//==================================lista.c=====================================================
void inicializador(Lista *lista, char nombre[]);
void crearProcesos(Lista *lista);
void ingresarInformacion(Proceso *proceso);
void agregarProceso(Lista *lista, Proceso *proceso);
void trasladarProceso(Lista *l_origen, Lista *l_destino);
void obtenerProceso(Lista *lista);
void mostrarLista(Lista *lista);
void moverNuevosAListos(Lista *original, Lista *destino);

//==================================hilos.c=====================================================
void funcionHilo (Proceso *proceso);
void ejecucion(Proceso *proceso);
void creacionHilos();

//==================================demonio.c====================================================
int aleatorio(int inicio, int fin);
void detenerProceso();
void menuOpciones();
void cambioPlanificador();
void configQuantium();
void d_ejecucion();
void d_ordenamiento();
void d_control_ES();
void d_estadistica(Proceso *proceso);
//==================================ordenamiento.c================================================
void ordenamientoPorFJS(Proceso *vec[], int tamanio);
void ordenamientoPorRR(Proceso *vec[], int tamanio);
void convertirVector_Lista(Proceso *vec[]);
void convertirLista_Vector(Proceso *vector[]);
void gestionarOrdenamiento();

//==================================archivo.c=====================================================

void escribirArchivo(char *info, char *direccion);





#endif
