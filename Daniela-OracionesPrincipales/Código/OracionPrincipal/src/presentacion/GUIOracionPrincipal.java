package presentacion;
/*
 * La interfaz del pedido del HTML
 *  
 * Tarea Programada del curso Algoritmos y Estructura de Datos de la Unuversidad de Costa Rica
 * @version  2.0  Mayo 2018
 * @author  Daniela Montero
 */

import java.awt.Color;
import java.awt.Font;
import java.awt.GridLayout;

import javax.swing.*;
import javax.swing.plaf.basic.BasicBorders.RadioButtonBorder;

import dominio.Fichero;

public class GUIOracionPrincipal extends JFrame{
	
	private JLabel lEtiqueta;
	
	
	private JButton bObtener;
	private JButton bIniciar;
	private JButton bRetroceder;
	
	private JRadioButton rbLPalabras;
	private JRadioButton rbOracion_Principal;
	private JRadioButton rbSilabas;
	private JRadioButton rbBusqueda;
	
	private ButtonGroup bgOpciones;
	
	private JTextArea taPalabras; 
	private JScrollPane spPalabras;
	private JTextArea taOracion_Principal; 
	private JScrollPane spOracion_Principal;
	
	private JTextArea taAgudas; 
	private JScrollPane spAgudas;
	private JTextArea taGraves; 
	private JScrollPane spGraves;
	private JTextArea taEsdrujulas; 
	private JScrollPane spEsdrujulas;
	
	private JPanel pOpciones;
	private JPanel pPalabras;
	private JPanel pOracion_Principal;
	private JPanel pSilabas;	
	
	
	
	
	public GUIOracionPrincipal() {
		
		setLEtiqueta();
		
		
		setBObtener();
		setBRetroceder();
		setBIniciar();
		
		setRBLPalabras();
		setRBOracion_Principal();
		setRBSilabas();
		
		setBGOpciones(rbLPalabras,rbOracion_Principal,rbSilabas);
		
		setPOpciones(rbLPalabras,rbOracion_Principal,rbSilabas,bObtener);
		
		setTAPalabras(); 
		setSPPalabras();
		setTAOracion_Principal(); 
		setSPOracion_Principal();
		
		settaAgudas(); 
		setspAgudas();
		settaGraves(); 
		setspGraves();
		settaEsdrujulas(); 
		setspEsdrujulas();


		setPPalabras(spPalabras);
		setPOracion_Principal(spOracion_Principal);
		setPSilabas(spAgudas,spEsdrujulas,spGraves);

		
		add(bIniciar);
		add(bRetroceder);
		add(pPalabras);
		add(pOracion_Principal);
		add(pSilabas);
		add(lEtiqueta);
		add(pOpciones);
		
		inicializador();
	}
	public void inicializador() {
		setVisible(false);
		setTitle("Oracion Principal");
		setSize(600, 600);
		setLayout(null);	
		setAlwaysOnTop(true);
		setLocationRelativeTo(null);
		setDefaultCloseOperation(DISPOSE_ON_CLOSE);
	}


	
	private void setRBLPalabras() {
		rbLPalabras  = new JRadioButton("Lista de palabras",true);
		rbLPalabras.setActionCommand("Lista de palabras");
		rbLPalabras.setOpaque(false);  
		rbLPalabras.setBorderPainted(false); 
		rbLPalabras.setFont(new Font("Arial",1,14)); 
		rbLPalabras.setContentAreaFilled(false);
	}

	private void setRBOracion_Principal(){
		rbOracion_Principal  = new JRadioButton("Oracion principal",true);
		rbOracion_Principal.setActionCommand("Oracion principal");
		rbOracion_Principal.setOpaque(false);  
		rbOracion_Principal.setBorderPainted(false); 
		rbOracion_Principal.setFont(new Font("Arial",1,14)); 
		rbOracion_Principal.setContentAreaFilled(false);
	}
	private void setRBSilabas(){
		rbSilabas  = new JRadioButton("Clasificacion de palabras",true);
		rbSilabas.setActionCommand("Clasificacion de acentuacion");
		rbSilabas.setOpaque(false);  
		rbSilabas.setBorderPainted(false); 
		rbSilabas.setFont(new Font("Arial",1,14)); 
		rbSilabas.setContentAreaFilled(false);
	}



	private void setBGOpciones(JRadioButton rbLPalabras,JRadioButton rbOracion_Principal,
			                       JRadioButton rbSilabas) {
		bgOpciones = new ButtonGroup();
		bgOpciones.add(rbLPalabras);
		bgOpciones.add(rbOracion_Principal);
		bgOpciones.add(rbSilabas);
		bgOpciones.add(rbBusqueda);
	}
	
	private void setPOpciones(JRadioButton JrbLPalabras,JRadioButton rbOracion_Principal,
                                     JRadioButton rbSilabas,JButton bObtener) {
		
		pOpciones = new JPanel();
		pOpciones.setLayout(new GridLayout(4,1,2,2));
		pOpciones.add(JrbLPalabras);
		pOpciones.add(rbOracion_Principal);
		pOpciones.add(rbSilabas);
		pOpciones.add(bObtener);
		pOpciones.setOpaque(false);
		pOpciones.setBounds(130,140,350,300);
		pOpciones.setVisible(false);
		pOpciones.setBorder(BorderFactory.createTitledBorder("Seleccione el resultado que desea obtener"));
		
	}
	private void setTAPalabras(){
		taPalabras = new JTextArea();
		taPalabras.setFont(new Font("Arial",0,14));
		taPalabras.setLineWrap(true); // salto de linea, cuanto llega al final del TextArea
		taPalabras.setBackground(Color.WHITE);
	} 
	private void setSPPalabras(){
		spPalabras = new JScrollPane(taPalabras);
	}
	
	private void setTAOracion_Principal(){
		taOracion_Principal = new JTextArea();
		taOracion_Principal.setFont(new Font("Arial",0,14));
		taOracion_Principal.setLineWrap(true); // salto de linea, cuanto llega al final del TextArea
		taOracion_Principal.setBackground(Color.WHITE);
	} 
	private void setSPOracion_Principal(){
		spOracion_Principal = new JScrollPane(taOracion_Principal);
	}
	private void settaAgudas() {
		taAgudas = new JTextArea();
		taAgudas.setFont(new Font("Arial",0,14));
		taAgudas.setLineWrap(true); // salto de linea, cuanto llega al final del TextArea
		taAgudas.setBackground(Color.WHITE);
	} 
	private void setspAgudas() {
		spAgudas = new JScrollPane(taAgudas);
		spAgudas.setBorder(BorderFactory.createTitledBorder("Agudas"));
	}
	private void settaGraves() {
		taGraves = new JTextArea();
		taGraves.setFont(new Font("Arial",0,14));
		taGraves.setLineWrap(true); // salto de linea, cuanto llega al final del TextArea
		taGraves.setBackground(Color.WHITE);
	}
	private void setspGraves() {
		spGraves = new JScrollPane(taGraves);
		spGraves.setBorder(BorderFactory.createTitledBorder("Graves"));
	}
	private void settaEsdrujulas() {
		taEsdrujulas = new JTextArea();
		taEsdrujulas.setFont(new Font("Arial",0,14));
		taEsdrujulas.setLineWrap(true); // salto de linea, cuanto llega al final del TextArea
		taEsdrujulas.setBackground(Color.WHITE);
	} 
	private void setspEsdrujulas() {
		spEsdrujulas  = new JScrollPane(taEsdrujulas);
		spEsdrujulas.setBorder(BorderFactory.createTitledBorder("Esdrujulas"));
	}

	
	
	
	private void setPPalabras(JScrollPane spPalabras) {
		pPalabras = new  JPanel();
		pPalabras.add(spPalabras);
		pPalabras.setLayout(new GridLayout(1,1));
		pPalabras.setVisible(false);
		pPalabras.setOpaque(false);
		pPalabras.setBounds(130,100,350,350);
		pPalabras.setBorder(BorderFactory.createTitledBorder("Lista de palabras"));
	}
	private void setPOracion_Principal(JScrollPane spOracion_Principal) {
		pOracion_Principal = new  JPanel();
		pOracion_Principal.add(spOracion_Principal);
		pOracion_Principal.setLayout(new GridLayout(1,1));
		pOracion_Principal.setVisible(false);
		pOracion_Principal.setOpaque(false);
		pOracion_Principal.setBounds(100,140,400,230);
		pOracion_Principal.setBorder(BorderFactory.createTitledBorder("Oracion principal"));
	}
	private void setPSilabas(JScrollPane spAgudas,JScrollPane spEsdrujulas,JScrollPane spGraves) {
		pSilabas = new  JPanel();
		pSilabas.add(spAgudas);
		pSilabas.add(spEsdrujulas);
		pSilabas.add(spGraves);
		pSilabas.setLayout(new GridLayout(1,3));
		pSilabas.setVisible(false);
		pSilabas.setOpaque(false);
		pSilabas.setBounds(110,110,380,350);
		pSilabas.setBorder(BorderFactory.createTitledBorder("Clasificacion de palabras"));
	}
	
	
	
	
	private void setBObtener() {
		bObtener = new JButton("Obtener");
	}
	private void setBRetroceder() {
		bRetroceder = new JButton("Atras");
		bRetroceder.setBounds(10,490,100,30);
		bRetroceder.setVisible(false);
	}
	private void setBIniciar() {
		bIniciar = new JButton("Iniciar");
		bIniciar.setBounds(470,490,100,30);
		bIniciar.setVisible(true);
	}
	
	
	private void setLEtiqueta() {
		lEtiqueta = new JLabel();
		lEtiqueta.setFont(new Font("Arial",1,17));
		lEtiqueta.setBounds(10,30,500,50);
	}
	

	
	public JButton getBRetroceder() {
		return bRetroceder;
	}
	public JRadioButton getRBLPalabras(){
		return rbLPalabras;
	}
	public JRadioButton getRBOracion_Principal(){
		return rbOracion_Principal;
	}
	public JRadioButton getRBSilabas(){
		return rbSilabas;
	}
	public ButtonGroup getBGOpciones(){
		return bgOpciones;
	}
	public JPanel getPOpciones(){
		return pOpciones;
	}
	public JLabel getLEtiqueta() {
		return lEtiqueta;
	}
	public JButton getBObtener() {
		return bObtener;
	} 
	public JPanel getPPalabras() {
		return pPalabras;
	}
	public JPanel getPOracion_Principal() {
		return pOracion_Principal;
	}
	public JPanel getPSilabas() {
		return pSilabas;
	}

	public JTextArea getTAPalabras() {
		return taPalabras;
	}
	public JScrollPane getSPPalabras() {
		return spPalabras;
	}
	public JTextArea getTAOracion_Principal() {
		return taOracion_Principal;
	}
	public JScrollPane getSPOracion_Principal() {
		return spOracion_Principal;
	}

	public JTextArea gettagudas() {
		return taAgudas;
	}
	public JScrollPane getspagudas() {
		return spAgudas;
	}
	public JTextArea gettagraves() {
		return taGraves;
	}
	public JScrollPane getspgraves() {
		return spGraves;
	}
	public JTextArea gettaesdrujulas() {
		return taEsdrujulas;
	}
	public JScrollPane getspesdrujulas() {
		return spEsdrujulas;
	}
	public JButton getBIniciar() {
		return bIniciar;
	}
	

}
