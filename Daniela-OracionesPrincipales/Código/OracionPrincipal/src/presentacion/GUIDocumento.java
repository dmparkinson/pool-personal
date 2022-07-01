package presentacion;

/*
 * Interfaz principal del programa
 *  
 * Tarea Programada del curso Algoritmos y Estructura de Datos de la Unuversidad de Costa Rica
 * @version  2.0  Mayo 2018
 * @author  Daniela Montero
 */

import java.awt.Color;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JTextField;


public class GUIDocumento extends JFrame{

	private JTextField tfBusqueda;
	
	private JButton bSeleccionar;

	private JComboBox cxArchivo;
	private JButton bBuscar;

	
	private JButton bx;
	
	
	public GUIDocumento() {
		
		setBSeleccionar();
		setTFBusqueda();
		setBuscar();
		setcxArchivo();    
		setBx();
		
		add(bBuscar);
		add(tfBusqueda);
		add(cxArchivo);
	    add(bSeleccionar);
		add(bx);
		
		inicializador();
	}
	
	public void inicializador() {
		setVisible(true);
		setTitle("Seleccionar archivo");
		setSize(450, 550);
		setLayout(null);
		setAlwaysOnTop(true);
	    setLocationRelativeTo(null);
	    setDefaultCloseOperation(DISPOSE_ON_CLOSE);
		
	}

	
	
	private void setBSeleccionar(){
		bSeleccionar = new JButton("Continuar");
		bSeleccionar.setVisible(false);
		bSeleccionar.setBounds(310,440,110,25);
	}
	private void setBuscar() {
		bBuscar = new JButton("Buscar");
		bBuscar.setBounds(280,30,100,25);
	}
	
	
	public JButton getBSeleccionar(){
		return bSeleccionar;
	}
	
	private void setBx(){
		bx= new JButton("Error");
		bx.setBounds(180,140,110,25);
		bx.setVisible(false);
		bx.setEnabled(false);
	}
	private void setTFBusqueda() {
		tfBusqueda = new JTextField();
		tfBusqueda.setBounds(10,30,240,25);
	}
	
	private void setcxArchivo(){
		cxArchivo = new JComboBox();
		cxArchivo.setBounds(10,80,430,20);
	  }
	  
	  public JComboBox getcxArchivo(){
	    return cxArchivo;
	  }
	  
	
	
	  public JButton getBx(){
		return bx;
    	}
	  public JButton getBBuscar() {
		  return bBuscar;
	  }
	  public JTextField getTFBuscar() {
		  return tfBusqueda;
	  }
	  
}

