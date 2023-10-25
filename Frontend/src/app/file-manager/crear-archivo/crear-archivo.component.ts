import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Archivo } from 'src/app/Models/Archivo';
import { LoginService } from 'src/app/login/login-service/login-service.service';
import { CloudService } from '../service/cloud.service';
import { CodeModel } from '@ngstack/code-editor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-archivo',
  templateUrl: './crear-archivo.component.html',
  styleUrls: ['./crear-archivo.component.css']
})
export class CrearArchivoComponent implements OnInit {
  @Input() archivo: Archivo;
  propietario = this.loginService.getNombreUsuario();
  extension: String;
  theme = 'vs-dark';
  codeModel: CodeModel = {
    language: 'html',
    uri: 'main.txt',
    value: ''
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    }, fontSize: 15
  };

  constructor(private cloudService: CloudService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.extension = this.archivo.extension
    console.log(this.archivo.extension)
  }

  public cambiarExtension(extension: String) {
    this.extension = extension;
  }

  public Guardar() {

    console.log(this.archivo)
    //verificar si existe
    this.cloudService.archivo(this.archivo).subscribe((confirmacion) => {
      if (!confirmacion.match) {

        this.archivo.contenido = this.codeModel.value;

        this.cloudService.crearArchivo(this.archivo).subscribe((confirmacion) => {

          if (confirmacion.insertado) {
            Swal.fire({
              title: 'Archivo creado',
              icon: 'success'
            }).then(()=>{
              const fechaActual = new Date();
              const fechaFormateada = fechaActual.toLocaleDateString('es-ES');
              this.archivo.fecha_creacion = fechaFormateada;


            });
          } else {
            Swal.fire({
              title: 'No fue posible crear el archivo',
              icon: 'error'
            });
          }

        });
      } else {
        Swal.fire({
          title: 'El archivo ya existe',
          icon: 'error'
        });
      }
    });



  }



}
