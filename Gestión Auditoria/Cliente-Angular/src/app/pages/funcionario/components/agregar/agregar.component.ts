import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from 'src/app/pages/services/funcionario.service'; 
import { DepartamentoService } from 'src/app/pages/services/departamento.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  @Input() funcionarioData = { nombre:'', sexo:1, logname:'', departamento:1, Foto:'', fechaNacimiento:'', contrasenia:'', eliminado:1};
  result : any= [];
  departamentos: any=[];

  constructor(public rest:FuncionarioService, private route: ActivatedRoute, private router: Router, private serviceDep:DepartamentoService) { }

  ngOnInit(): void {
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

  agregar(){
    
    this.rest.add(this.funcionarioData).subscribe(data => {
      this.result = data;
      if(this.result.success === true){
        alert(this.result.msg);
        this.limpiarcampos();
      }
      else{
        alert(this.result.success);
      }  
      });
  }

  limpiarcampos(){
    this.funcionarioData.nombre=''; 
    this.funcionarioData.sexo=1;
    this.funcionarioData.logname='';
    this.funcionarioData.departamento=1;
    this.funcionarioData.Foto='';
    this.funcionarioData.fechaNacimiento='';
    this.funcionarioData.contrasenia='';
  }



}
