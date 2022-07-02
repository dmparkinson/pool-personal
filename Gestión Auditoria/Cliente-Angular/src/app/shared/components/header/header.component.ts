
import { StorageService } from 'src/app/shared/conf/Session/storageService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


/*
  BarNav del aplicativo
  Crea la vista de la navegacion a los siguientes apartados
  - Avances
  - Departamentos
  - Funcionarios
  - Solicitud
  - Perfil de usuario
  - Cerrar Sesion
*/


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {  
  constructor(private router: Router, private modalService: NgbModal, private storage: StorageService) { }

  // ______________________Variables globales______________________
  title = 'Perfil ';
  nombre= ''                                                //Nombre del usuario con sesion iniciada


  ngOnInit(): void {

    this.nombre = this.storage.getCurrentSession().nombre; // Recuperar el nombre del usuario
  }

  logOut(){                                                //Cerrar Sesion
    Swal.fire({
      title: '¿Estás seguro de querer cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) =>{
      if(result.value === true){
        localStorage.removeItem('session');                //Remover la sesion actual                
        this.router.navigate(['/login']);                  //Redirigir al login       
      }
    });
  }


  perfil(modal: any){                                       //Abril modal del perfil de usuario
    this.modalService.open(modal);
  }
  
  close(modal: any){                                       //Cerrar modal del perfil de usuario
    this.modalService.dismissAll(modal);
  }
 
}


