package negocio;

/*
 * Clase encargada de obtener la lista de raices de todas las palabras de la lista de palabras
 *  
 * Tarea Programada del curso Algoritmos y Estructura de Datos de la Unuversidad de Costa Rica
 * @version  2.0  Mayo 2018
 * @author  Daniela Montero
 */

import dominio.ListaEnlazada;
import dominio.Nodo;

public class LogicaListaRaiz {
	
	public boolean vacia(ListaEnlazada lista){
	    return lista.getPrimero() == null;
	 }
	
	/*
	 * verifica si la palabra actual de la lista de palabras ya se ingreso,
	 * sino entonces se saca la raiz.Luego se llama al metodo insertar
	 * */
	public void obtenerPalabras(ListaEnlazada lista,ListaEnlazada lPalabras){
	
		Nodo palabra =lPalabras.getPrimero();
		while(palabra != null) {
			if(coinciden(palabra,lPalabras) == false) {
				insertar(lista,obtenerRaiz(palabra));
			}
			palabra = palabra.getEnlace();
		}
	}
	/*
	 * Busca si la palabra ya fue ingresada
	 * */
	public void busquedaCoincidencias(ListaEnlazada listaRaiz,ListaEnlazada lcoincidencias,ListaEnlazada listaP,int pos){
	
		String raiz = (obtenerRaizAUtilizar(listaRaiz,pos).toString()).trim(); 
		Nodo palabra =listaP.getPrimero();
		while(palabra != null) {
			if(obtenerRaiz(palabra) == (raiz)) {
				if(coinciden(palabra,listaP) == true){
					lcoincidencias.setCantNodos();
				}
				else {
					insertar(lcoincidencias,(palabra.toString()).trim());
				}
			}
			palabra = palabra.getEnlace(); 
		}
	}
	
/*
 * Inserta la palabra en la lista
 * */
	    
	    public void insertar(ListaEnlazada lista, String palabra){
		    Nodo nodo = new Nodo(palabra);
		    
		    if(vacia(lista)){
		      lista.setPrimero(nodo);
		      lista.setUltimo(nodo);
		      lista.setCantNodos();
		    }
		    else{
		      lista.getUltimo().setEnlace(nodo);
		      lista.setUltimo (nodo);
		    }
		    lista.setCantNodos();
		  }
	    

	/*
	 * Concatena las lista y convierte los nodos a String
	 * 	 
	 *  */
	
	public String imprimirTodo(ListaEnlazada lista, String salto){  	  
		  
		  String salida ="";
		  int num = 1;
		  if(vacia(lista)) {
			  salida = "La lista se encuentra vacia";
		  }else {
			  Nodo temporal =lista.getPrimero();
			 while(temporal != null) {
				 salida += num+" -"+temporal+salto;
				 temporal = temporal.getEnlace();
				 num++;
			 } 
		  }
		  return salida;
	  }

	/*
	 * Busca si la palabra ya fue ingresada
	 * */
	
	public boolean coinciden(Nodo palabra,ListaEnlazada lista) {
		boolean iguales = false;
		
		Nodo temporal = lista.getPrimero();
		Nodo palTemporal=null; 
		 while(temporal != null) {
			 palTemporal = temporal;
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
	 * saca las raices de las palabras, la posicion va de 0 a 4
	 * */
	public String obtenerRaiz(Nodo palabra) {
		return ((palabra.toString()).trim()).substring(0,4);
	}
	
	
	/*
	 * Busca en la lista de raices la raia que se necesita
	 * */
	public Nodo obtenerRaizAUtilizar(ListaEnlazada listaRaiz,int pos) {
		Nodo utilizar = listaRaiz.getPrimero();
		if(pos > 1) {
			for(int cant = 2; cant < pos; cant++) {
				utilizar = utilizar.getEnlace();
			}
		}
		return utilizar;
	}
}
