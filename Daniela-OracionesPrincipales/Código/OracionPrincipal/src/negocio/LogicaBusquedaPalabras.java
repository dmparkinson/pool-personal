package negocio;

/*
 * Clase que contiene los metodos necesarios para  la obtencion del resultado de la busqueda de la clase 
 * ControladoraGUIOoracion 
 *  
 * Tarea Programada del curso Algoritmos y Estructura de Datos de la Unuversidad de Costa Rica
 * @version  2.0  Mayo 2018
 * @author  Daniela Montero
 */

import dominio.ListaEnlazada;
import dominio.Nodo;

public class LogicaBusquedaPalabras {
	
	
	
	
	
	
	
	/*
	 * Busca en la lista de lass raices la raiz de la palabra ingresada en la busqueda. Esto con el 
	 * objetivo de obtener la posicion de la lista de listas
	 * */
	public int buscarLista(String raiz,ListaEnlazada listaRaiz){
		int posicion = 0;
		Nodo temporal = listaRaiz.getPrimero();
		String rTemporal=""; 
		 while(temporal != null) {
			 posicion++;
			 rTemporal = temporal.toString().trim();
			 if(raiz.equals(rTemporal) ) {
				 temporal = null;
			 }
			 else {
				 temporal = temporal.getEnlace(); 
			 }
		 }
		return posicion;
	}
	
	/*
	 * Imprime la lista de listas correspondiente
	 * */
	public String imprimirLista(ListaEnlazada lcontenedorRaiz,int numLista){			  
		Nodo temporal = lcontenedorRaiz.getPrimero();
		 for(int x = 2 ; x <= numLista; x++) {
			 temporal = temporal.getEnlace(); 
		 }
		 return temporal.toString();
	}
	

	
	
	/*
	 * busca la palabra ingresada por el usuario en la lista de palabras
	 * */
	public boolean coinciden(String palabra,ListaEnlazada lista) {
		
		boolean iguales = false;
		
		Nodo temporal = lista.getPrimero();
		String palTemporal=""; 
		 while(temporal != null) {
			 palTemporal = temporal.toString().trim();
			 if(palabra.equals(palTemporal) ) {
				 iguales = true;
				 temporal = null;
			 }
			 else {
				 temporal = temporal.getEnlace(); 
			 }
		 }
		 return iguales;
	}
	
	
	/*
	 * Obtiene la raiz de la palabra ingresada
	 * */
	public String obtenerRaiz(String palabra) {
		return ((palabra.toString()).trim()).substring(0,4);
	}

}
