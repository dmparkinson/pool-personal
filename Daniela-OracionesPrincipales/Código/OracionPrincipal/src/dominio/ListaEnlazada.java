package dominio;

/*
 * Crea la lista y la cantidad deelementos
 *  
 * Tarea Programada del curso Algoritmos y Estructura de Datos de la Unuversidad de Costa Rica
 * @version  2.0  Mayo 2018
 * @author  Daniela Montero
 */

public class ListaEnlazada {
	
	private Nodo primero;
	private Nodo ultimo; 
	private int cantNodos;
	  
	
	public ListaEnlazada(){ 
		this.primero = this.ultimo = null;
	    this.cantNodos = 0;
	  }
	  
	  public void setPrimero( Nodo primero ){
		  this.primero = primero;
	  }  
	  public void setUltimo( Nodo ultimo ){
		  this.ultimo = ultimo;
	  }


	  
	  public Nodo getPrimero(){	    
		  return this.primero;
	  }
	  public Nodo getUltimo(){
	      return this.ultimo;
	  }
	  
		public void setCantNodos() {
			cantNodos++;
		}
		
		public int getCantNodos() {
			return cantNodos;
		}


}
