package dominio;

/*
 * Guarda la informacion del Nodo
 *  
 * Tarea Programada del curso Algoritmos y Estructura de Datos de la Unuversidad de Costa Rica
 * @version  2.0  Mayo 2018
 * @author  Daniela Montero
 */

public class Nodo {
	private String dato;
	private Nodo enlace;
	  
	  public Nodo ( String dato ){
		  this.dato = dato;
		  this.enlace = null;

	  }
	  public void setEnlace ( Nodo enlace ) {
		  this.enlace = enlace;
	  }
	  
	  public Nodo getEnlace ( ) {
		  return this.enlace;	    
	  }
	  
	  public void setPunto ( String dato) {
		  this.dato = dato;
	  }
	  
	  public String getPunto ( ) {    
		  return this.dato;
	  }
	  
	  public String toString(){ 
		  return dato + "  ";
	  }

}
