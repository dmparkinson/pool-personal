package negocio;

/*
 *Controla la GUIDocumento ademas de encargarse del llamado de los metodos necesarios para la conversion de html a txt
 * y la ordenacion de los html de mayor a menor dependiendo de la busqueda
 *    
 * Tarea Programada del curso Algoritmos y Estructura de Datos de la Unuversidad de Costa Rica
 * @version  2.0  Mayo 2018
 * @author  Daniela Montero
 */

import datos.*;
import dominio.*;
import presentacion.GUIDocumento;
import presentacion.GUIOracionPrincipal;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.util.Vector;


public class ControladoraGUIDocumento implements ActionListener{
	
	GUIDocumento gui;
	Archivo arch;
	LogicaGUI log;
	GUIOracionPrincipal guiP;
	Fichero ruta;
	LogicaListaPalabras logP;
	Palabra pal;
	 
	public ControladoraGUIDocumento(GUIOracionPrincipal guiP,LogicaGUI logD, 
			                         LogicaListaPalabras logP,Fichero ruta) {
		arch = new Archivo();
		this.guiP = guiP;
		this.ruta = ruta;
		this.logP = logP;
		log = logD;
		this.pal = pal;
	
		gui = new GUIDocumento();		
		
		inicializadorAcciones();
	}


	public void inicializadorAcciones() {
		gui.getBSeleccionar().addActionListener(this);
		gui.getBBuscar().addActionListener(this);
	}
	
	public void actionPerformed(ActionEvent e) {

		if(e.getSource() == gui.getBBuscar()) {
			String buscar = gui.getTFBuscar().getText();
			
			String html[] = arch.obtenerHTML("src/ficheros/html");
			String direccionHTML[] = new String[html.length];
			String direccionTXT[] = new String[html.length];
			/*
			 * Generar y guardar archivos txt
			 * */
			for(int x= 0; x< html.length; x++){
				 direccionHTML[x] = "src/ficheros/html/"+html[x];
				
				String texto =log.obtenerTexto(arch.leerArchivo(direccionHTML[x]),"\\<.*?>"," ").replaceAll(" +", " ").trim();//Obtiene el texto
			    direccionTXT[x] = "src/ficheros/archivos de texto/"+arch.obtenerEtiqueta(html[x]);// Genera la direccion donde guardar el txt
				arch.guardarArchivo(texto.replaceAll(" +", " ").trim(),direccionTXT[x]);//Guarda la direccion
				
			}
			
			/*
			 * Controlador de tamanio de los archivos generardos, controla la lista de listas y saca la cantidad 
			 * de resultados
			 * */
			
		/*	
		 * 
		 * logR.obtenerPalabras(listaRaiz, listaP);
			
			guiOP.getTARaices().append(logR.imprimirTodo(listaRaiz, "\n"));
			
			// Raiz de coincidencias
			
			//	lista de las palabras con la raiz--->lista de todas las coincidencias
			
			ListaEnlazada lcoincidencias = null;
			
			for(int x = 1; x <= listaRaiz.getCantNodos(); x++) {
				lcoincidencias = new ListaEnlazada();
				logR.busquedaCoincidencias(listaRaiz,lcoincidencias,listaP,x);			
				logR.insertar(lcontenedorRaiz,logR.imprimirTodo(lcoincidencias, "\n"));
			}
			String palabra = guiOP.getTABusqueda().getText();
			if(logB.coinciden(palabra,listaP) == true) {
				int numLista = logB.buscarLista(logB.obtenerRaiz(palabra),listaRaiz);
				guiOP.getTABusqueda().append(logB.imprimirLista(lcontenedorRaiz,numLista));
			}
			*/
			for(int x= 0; x< html.length; x++) {
				gui.getcxArchivo().addItem(direccionHTML[x]);	
			}

			
			gui.getBSeleccionar().setVisible(true);
		}
		
		
		if(e.getSource() == gui.getBSeleccionar()) {
			String rutaHTML = gui.getcxArchivo().getSelectedItem()+"";
			
			
			
			ruta.setEtiqueta(arch.obtenerEtiqueta2(rutaHTML));
			ruta.setDireccion("src/ficheros/archivos de texto/"+ruta.getEtiqueta());
			
			System.out.println(ruta.getDireccion());
			guiP.getLEtiqueta().setText(ruta.getEtiqueta());
			

			gui.setVisible(false);		
			guiP.setVisible(true);
		
		}
	}
	


}
