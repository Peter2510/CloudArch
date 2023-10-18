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
      
      this.loginService.prueba().subscribe( (data:any)=>{

        Swal.fire({
          icon: 'success',
          title: 'Oops...',
          text: `${data.mess}`,
          footer: '<a href="">Why do I have this issue?</a>'
        })


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
