package datos;

/*
 * guarda y abre el txt, ademas crea la etiqueta para el archivo
 *  
 * Tarea Programada del curso Algoritmos y Estructura de Datos de la Unuversidad de Costa Rica
 * @version  2.0  Mayo 2018
 * @author  Daniela Montero
 */

import java.io.*;
import javax.swing.JOptionPane;


public class Archivo {
	
	  FileWriter archivo;
	  PrintWriter pw;	  
	  File archivoLeido;
	  FileReader fr;
	  BufferedReader br;
	 
	    
	  public Archivo(){  }
	 
	  
	  /*Guarda la informacion extraida del archivo html, si el archivo txt no existe entonces
	   * se crea si existe entonces solo sse reescribe la informacion que contiene
	  */
	  public void guardarArchivo(String informacion,String ruta){
	       try{ 

	    	   archivoLeido = new File(ruta);
	    	   if(!archivoLeido.exists()) { // Si el archivo no exidte entnces se crea uno nuevo
	    		   archivoLeido.createNewFile();
	    	   }
	    	   archivo = new FileWriter(archivoLeido);// Reescribe el contenido del archivo 
	    	   pw = new PrintWriter(archivo);
	    	   pw.println(informacion);
	      
	      
	    } catch (IOException ioe) {    
	      JOptionPane.showMessageDialog(null, ioe.getMessage());
	      ioe.printStackTrace();
	    } finally {
	      try {
	        archivo.close();
	      } catch (Exception e2) {
	        e2.printStackTrace();
	      }
	    }
	  }
	    
	 
	 
	  //Se encarga de leer los archivos html y txt
	 public String leerArchivo(String direccion){
	   String informacion="";
	   String linea="";
	   try {
	     archivoLeido = new File(direccion);
	     
	     fr = new FileReader (archivoLeido);
	     br = new BufferedReader(fr);
	     
	     
	     while((linea=br.readLine())!=null){   
	       	  informacion+=linea; 
	     }
	   }
	   catch(Exception e){
	     e.printStackTrace();
	   }finally{
	     try{                    
	       if(fr != null ){   
	         fr.close();     
	       }                  
	     }catch (Exception e2){ 
	       e2.printStackTrace();
	     }
	   }
	   return informacion;
	  }
	 
	 
	
	 public String []obtenerHTML(String directorio){
		 File dir = new File(directorio);
		 String[] ficheros = dir.list();

		 if (ficheros == null)
		   JOptionPane.showMessageDialog(null,"No hay ficheros en el directorio especificado");
		
		 return ficheros;
	 }
	 
	 
	 
	 
	 //Obtiene el nombre del fichero html sin la extencion
	 public String obtenerEtiqueta(String archivoHTML) {
		 return archivoHTML.replaceAll(".html",".txt");
	 }
	 
	 
	 public String obtenerEtiqueta2(String ruta) {
		 archivoLeido = new File(ruta);
;		 return archivoLeido.getName().replaceAll(".html",".txt");
	 }
}
