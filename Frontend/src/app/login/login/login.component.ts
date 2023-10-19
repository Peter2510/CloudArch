import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../login-service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginData = {
    usuario: '',
    contrasenia: '',
  };

  codigoNull = false;
  contraseniaNull = false;
  credencialesIncorrectas = true;

  constructor(private loginService: LoginService,private router:Router) {
    
  }

  login() {
    
    this.validarCredenciales();

    if (!this.codigoNull && !this.contraseniaNull) {
      
      this.loginService.verificarCredenciales(this.loginData).subscribe( (data:any)=>{

        if(data==''){
          Swal.fire({
            icon: 'warning',
            title: 'Credenciales incorrectas',
            text: 'Verifica tu usuario y contraseña',
            confirmButtonText: 'Continuar',
          })
        }else{
          this.loginService.sesion(data);

          if (this.loginService.getUsuario()!=null) {

            switch (this.loginService.getRol()) {
              //empleado
              case 1:
                this.router.navigate(['usuario']);
                this.loginService.loginStatusSubject.next(true);
                break;
              //admin
              case 2:
                this.router.navigate(['admin']);
                this.loginService.loginStatusSubject.next(true);
                break;
            }
          }
        }
      }
       
      );
    }
 }
    

  validarCredenciales() {
    if (this.loginData.usuario == '') {
      this.codigoNull = true;
    } else {
      this.codigoNull = false;
    }

    if (this.loginData.contrasenia == '') {
      this.contraseniaNull = true;
    } else {
      this.contraseniaNull = false;
    }
  }

}
