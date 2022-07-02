import { Component, OnInit, Input, } from '@angular/core';
import { FuncionarioService } from 'src/app/pages/services/funcionario.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { DepartamentoService } from 'src/app/pages/services/departamento.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
  
  @Input() funcionarioData = { nombre:'', logname:'', departamento:0, foto: '', fechaNacimiento:'', contrasenia:'', eliminado:1};

  result : any= [];
  departamentos : any= [];
  id:0;

  //quiz dayana.PNG
  url: string='../../../../../assets/';
  fotoNombre: string='quiz dayana.PNG';
  'D:\GitHub\Proyecto-info-aplicada\Docs\Base de datos'
  constructor(private activatedRoute: ActivatedRoute, public rest:FuncionarioService, private route: ActivatedRoute, private router: Router, private serviceDep:DepartamentoService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
    this.id = params.id_funcionario;
    this.funcionarioData.nombre = params.nombre;
    this.funcionarioData.fechaNacimiento = params.fecha_nacimiento;
    this.funcionarioData.foto = params.foto;
    this.funcionarioData.departamento = params.id_departamento;
     this.funcionarioData.logname = params.logname;
    this.funcionarioData.contrasenia = params.contraseña;
    this.fotoNombre = this.url+ params.foto;
      });

      this.getDepartamentos();
  }

  getDepartamentos() {
    this.departamentos = [];
    this.serviceDep.list().subscribe(data => {
    this.result = data;
    if(this.result.success === true){
      this.departamentos = this.result.msg;
    }
    else{
      alert(this.result.success);
    }
    
    });
    
  }

  actualizar(){

    this.rest.edit(this.id, this.funcionarioData).subscribe(data => {
      this.result = data;
      if(this.result.success === true){
        alert(this.result.msg);
      }
      else{
        alert(this.result.success);
      }  
      });

      //this.router.navigate(['/funcionario']);
  }




}