import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/admin/empleados/service/usuarios.service';
import { LoginService } from 'src/app/login/login-service/login-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  nombre:String = this.loginService.getNombre();
  usuario:String = this.loginService.getNombreUsuario();
  tipoEmpleado:Number = this.loginService.getRol();
  contrasenia:String = '';  
  constraseniaNull = false;

  constructor(private usuariosService:UsuariosService,private loginService:LoginService){ }


  actualizarEmpleado(){
   
    this.validarCampos();

    if(!this.constraseniaNull){

      let usuario = {
        _id: this.loginService.getId(),
        contrasenia:this.contrasenia
      };

      this.usuariosService.cambiarContraseniaEmpleado(usuario).subscribe((confirmacion)=>{
      
        if(confirmacion.update){

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Contraseña actualizada',
            showConfirmButton: false,
            timer: 1500
          })
        }else{

          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'La contraseña no pudo actualizarse',
            showConfirmButton: false,
            timer: 1500
          })
          
        }

      });

      
    }

  }

  validarCampos(){


    if(this.contrasenia == ''){
      this.constraseniaNull = true;
    }else{
      this.constraseniaNull = false;
    }


  }


}
