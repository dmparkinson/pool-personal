package negocio;
/*
 * Controla las clases del programa
 *  
 * Tarea Programada del curso Algoritmos y Estructura de Datos de la Unuversidad de Costa Rica
 * @version  2.0  Mayo 2018
 * @author  Daniela Montero
 */

import presentacion.*;
import datos.Archivo;
import dominio.*;

public class ControladoraPrincipal {
		
	ControladoraGUIDocumento cGUID;
	ControladoraGUIOoracionP cOP;

	Fichero ruta;
	LogicaGUI logD;
	GUIOracionPrincipal guiP;
		
	LogicaListaPalabras logP;
	
	public ControladoraPrincipal(){
		
		controlador();
	}
	
	public void controlador() {
		guiP = new GUIOracionPrincipal();
		logD = new LogicaGUI();
		
		logP = new LogicaListaPalabras();
		ruta = new Fichero();
		
		cGUID = new ControladoraGUIDocumento(guiP,logD,logP,ruta);
		cOP = new ControladoraGUIOoracionP(guiP,logD,logP,ruta);
	
	}
}

