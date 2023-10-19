import { Component } from '@angular/core';

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

  cambiarTipoEmpleado(event: any) {
    this.tipoEmpleado = event.target.value;
  }


  crearEmpleado(){
   
    this.validarCampos();

    if(this.nombreNull==false && this.usuarioNull==false && this.rolNull==false && this.constraseniaNull==false){
        alert("Crear empleado")
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
