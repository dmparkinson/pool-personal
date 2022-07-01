package dominio;


/*
 * Guarda la etiqueta del archivo html para ser usado en es txt
 * guuarda la direccion que tiene el txt destinada
 *  
 * Tarea Programada del curso Algoritmos y Estructura de Datos de la Unuversidad de Costa Rica
 * @version  2.0  Mayo 2018
 * @author  Daniela Montero
 */
public class Fichero{

	private String direccion;
	private String etiqueta;
  
	public Fichero (){
		this.direccion = null;
		this.etiqueta =  null;
	}
	
	public void setDireccion(String direccion) {
		this.direccion = direccion;
		this.etiqueta = etiqueta;
	}
  
  
	public String getDireccion(){ 
		return  direccion;
	}
	public void setEtiqueta(String etiqueta) {
		this.etiqueta = etiqueta;
	}
  
  
	public String getEtiqueta(){ 
		return  etiqueta;
	} 
}
