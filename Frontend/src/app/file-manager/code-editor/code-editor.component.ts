import { Component, Input, OnInit } from '@angular/core';
import { CodeModel } from '@ngstack/code-editor';
import { Archivo } from 'src/app/Models/Archivo';
import { LoginService } from 'src/app/login/login-service/login-service.service';
import { CloudService } from '../service/cloud.service';
import { UsuariosService } from 'src/app/admin/empleados/service/usuarios.service';
import { Usuario } from 'src/app/Models/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {

  @Input() archivo: Archivo;

  theme = 'vs-dark';
  propietario = this.loginService.getNombreUsuario();
  codeModel: CodeModel = {
    language: 'html',
    uri: 'main.txt',
    value: ''
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    },fontSize:15
  };

  usuarios: Usuario[];
  directorios = ['/', '/documentos', '/app'];
  nuevoDirectorio = '';

  ngOnInit(): void {
    this.codeModel.value = this.archivo.contenido + '';
    console.log(this.archivo)
  }

  constructor(private cloudService: CloudService, private loginService: LoginService, private usuariosService: UsuariosService) { }

  public obtenerEmpleados() {
    this.usuariosService.obtenerListaUsuarios().subscribe(dato => {
      this.usuarios = dato;
    })
  }

  public cambiarExtension(tipo: string) {
    this.archivo.extension = tipo;
  }

  public async moverArchivo() {
    Swal.fire({
      title: 'Selecciona el nuevo directorio',
      input: 'select',
      confirmButtonText: 'Aceptar',
      cancelButtonText: "Salir",
      inputOptions: {
        'Directorios': this.directorios
      },
      showCancelButton: true,
    }).then((result) => {
      
      if(result.isConfirmed){
        this.nuevoDirectorio = this.directorios[result.value]
      }

          
    });

  }


}
