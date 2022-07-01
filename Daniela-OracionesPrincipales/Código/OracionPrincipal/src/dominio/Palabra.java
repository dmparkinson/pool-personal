package dominio;
/*
 * Guarda las agudas, graves, y esdrujulas
 *  
 * Tarea Programada del curso Algoritmos y Estructura de Datos de la Unuversidad de Costa Rica
 * @version  2.0  Mayo 2018
 * @author  Daniela Montero
 */

public class Palabra {
	
	private String agudas;
	private String graves;
	private String esdrujulas;
	private String ruta;
	
	public Palabra() {
		this.agudas = null;
		this.graves = null;
		this.esdrujulas = null;
		this.ruta = null;

	}
	
	

	public void setagudas(String agudas) {
		this.agudas = agudas;
	}
	public void setgraves(String graves) {
		this.graves = graves;
	}
	public void setesdrujulas(String esdrujulas) {
		this.esdrujulas = esdrujulas;
	}

	public void setRuta(String ruta) {
		this.ruta = ruta;
	}
	

	public String getagudas(){
		return this.agudas;
	}
	public String getgraves(){
		return this.graves;
	}
	public String getesdrujulas(){
		return this.esdrujulas;
	}
	public String getRuta(){
		return this.ruta;
	}

}
