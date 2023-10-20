import { Component } from '@angular/core';
import { Usuario } from 'src/app/Models/Usuario';
import { UsuariosService } from './service/usuarios.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent {

  usuarios:Usuario[];

  constructor(private usuariosServicio:UsuariosService){

  }
  
  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  private obtenerEmpleados()  {
    this.usuariosServicio.obtenerListaUsuarios().subscribe(dato=>{
      this.usuarios = dato;
    })
  }

}
