import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/shared/conf/Session/storageService';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartamentoService } from '../../services/departamento.service';
import { Departamento } from '../../interfaces/departamento';
import { FuncionarioService } from 'src/app/pages/services/funcionario.service'; 


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
     
   
  funcionarioData = { nombre:'', logname:'', departamento:'', foto: '', fechaNacimiento:'', contrasenia:'', eliminado:1};
  idFuncionario=0;
  url: string='../../../../../assets/';
  foto: string = '';

  data: any=[]; 
  departamento : Departamento = {
    nombre : '',
    eliminado: 0,
  }


  constructor(private storage: StorageService, public rest:FuncionarioService, private serviceDepartamento:DepartamentoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
     let usuario = this.storage.getCurrentSession();         //Enviar objeto a la variable de sesion
     this.idFuncionario = usuario.id;

     this.listarFuncionarios();
  }

  listarFuncionarios(){                            //Listar todos los departamentos
    this.rest.funcionarioId(this.idFuncionario).subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        
        this.funcionarioData.nombre = this.data.msg.nombre;
        this.funcionarioData.logname = this.data.msg.logname;
        this.funcionarioData.departamento=this.data.msg.Nombre_Departamento;
        this.funcionarioData.foto = '../../../../../assets/'+this.data.msg.foto;
        this.funcionarioData.fechaNacimiento=this.data.msg.fecha_nacimiento;
      }
      else{
       // alert(this.result.success);
      }
    });
  } 


  
}
