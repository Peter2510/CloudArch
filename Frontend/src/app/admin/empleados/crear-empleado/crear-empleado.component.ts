import { Component } from '@angular/core';
import { UsuariosService } from '../service/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent {
  
  nombre:String = '';
  usuario:String = '';
  rol:Number = 0;
  contrasenia:String = '';
  tipoEmpleado:Number = 0;
  
  nombreNull = false;
  usuarioNull = false;
  rolNull = false;
  constraseniaNull = false;

  constructor(private usuariosService:UsuariosService,private router:Router){ }

  cambiarTipoEmpleado(event: any) {
    this.tipoEmpleado = event.target.value;
  }


  crearEmpleado(){
   
    this.validarCampos();

    if(this.nombreNull==false && this.usuarioNull==false && this.rolNull==false && this.constraseniaNull==false){

      let usuario = {
        nombre: this.nombre,
        usuario: this.usuario,
        contrasenia:this.contrasenia,
        rol: this.rol
      };

      this.usuariosService.crearEmpleado(usuario).subscribe((confirmacion)=>{
      
        if(confirmacion.agregado === "true"){

          Swal.fire({
            title: 'Usuario agregado',
            icon: 'success',
            confirmButtonText: 'Continuar',
          }).then(()=>{
            this.nombre = '';
            this.usuario = '';
            this.rol = 0;
            this.contrasenia = '';
            this.tipoEmpleado = 0;
          });

        }else{

          Swal.fire({
            title: 'El usuario ya existe ',
            icon: 'warning',
            confirmButtonText: 'Continuar',
          });
          
        }

      });

      
    }

  }

  validarCampos(){

    if(this.nombre == ''){
      this.nombreNull = true;
    }else{
      this.nombreNull = false;
    }

    if(this.usuario == ''){
      this.usuarioNull = true;
    }else{
      this.usuarioNull = false;
    }

    if(this.rol == 0){  
      this.rolNull = true;
    }else{
      this.rolNull = false;
    }


    if(this.contrasenia == ''){
      this.constraseniaNull = true;
    }else{
      this.constraseniaNull = false;
    }


  }


}
