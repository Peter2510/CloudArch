import { Component, OnInit } from '@angular/core';
import { CloudService } from './service/cloud.service';
import { LoginService } from '../login/login-service/login-service.service';
import { Directorio } from '../Models/Directorio';
import { Archivo } from '../Models/Archivo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  rutas: String[] = [];
  root: String = "/";
  path: String;
  directorios: Directorio[];
  archivos: Archivo[];
  usuario = this.loginService.getNombreUsuario();

  constructor(private cloudService: CloudService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.path = this.root;
    this.obtenerDirectorios();
    this.obtenerArchivos();

  }

  private obtenerDirectorios() {

    let usuario = this.loginService.getNombreUsuario();
    this.cloudService.directorios(usuario, this.path).subscribe(data => {
      this.directorios = data;
    })
  }

  private obtenerArchivos() {
    this.cloudService.archivos(this.usuario, this.path).subscribe(data => {
      this.archivos = data;
    });
  }

  public entrarCarpeta(pathCarpeta: String) {
    this.rutas.push(pathCarpeta);
    this.path = "/" + this.rutas.join('/');
    this.obtenerDirectorios();
    this.obtenerArchivos();
  }

  public salirCarpeta() {

    this.rutas.pop();

    this.path = "/" + this.rutas.join('/');
    this.obtenerDirectorios();
    this.obtenerArchivos();

  }

  public async verArchivo(nombre: String) {
    let archivo = this.archivos.find(archivo => archivo.nombre === nombre && archivo.directorio_padre === this.path)

    if (archivo) {

      Swal.fire({
        input: 'textarea',
        inputLabel: archivo.nombre + '' + archivo.extension + '',
        inputPlaceholder: 'Ingresa el texto aqui',
        inputValue: archivo.contenido + '',
        inputAttributes: {
          'aria-label': 'Ingresa el texto'
        },
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: "Salir",
      }).then((result) => {


        if (result.isConfirmed) {

          this.cloudService.editarContenido(archivo?._id, result.value).subscribe(data => {

            if (data.update) {
              Swal.fire({
                title: 'Se editó correctamente el archivo',
                icon: 'success'
              }
              ).then(()=>{
                this.obtenerDirectorios();
                this.obtenerArchivos();
              }
              );
            } else {
              Swal.fire({
                title: 'No pudo actualizarse el archivo',
                icon: 'error'
              }
              );
            }


          });



        }



      });

    }


  }





}
