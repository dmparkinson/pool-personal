package negocio;

/*
 * Obtiene la oracion principal del texto
 *  
 * Tarea Programada del curso Algoritmos y Estructura de Datos de la Unuversidad de Costa Rica
 * @version  2.0  Mayo 2018
 * @author  Daniela Montero
 */

import dominio.ListaEnlazada;
import dominio.Nodo;

public class LogicaOracionPrincipal {
	
	//metodo principal que llama a otros metodos para sacar la oracion principal.
	public String obtener(String texto, ListaEnlazada lista) {
		String oracionPrincipal ="";
		String oracionTemporal ="";
		int cantPrincipal = 0;
		int cantTemporal = 0;
		String palabra =""; 
		for(int recorrer = 0; recorrer < texto.length(); recorrer++) {
			oracionTemporal += texto.charAt(recorrer);
			if(texto.charAt(recorrer) == ' ' ) {			
				if(coinciden(palabra,lista) == true) {//Buscar coincidencias
					cantTemporal++;
				}
				palabra = "";
			}
			else if(texto.charAt(recorrer) != ' '&& texto.charAt(recorrer) != '.'){ // busco una palabra en la lista que coincida
				palabra += texto.charAt(recorrer);
			}
			else if(texto.charAt(recorrer) == '.') {
				
				palabra = "";
				if(cantTemporal >= cantPrincipal) {// Si la oracion actual es mayor entonces esta pasa a ser la principal
					cantPrincipal = cantTemporal;
					oracionPrincipal = oracionTemporal;
				}
				oracionTemporal = "";
				cantTemporal = 0;
			}
		}
		return oracionPrincipal;
	}
	
	/*
	 * verifica si la palabra actual pertenece a la lista de palabras
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
}
