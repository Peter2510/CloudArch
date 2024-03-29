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
  detallesArchivo: Archivo;
  visualizarArchivo: boolean = false;
  agregarArchivo: boolean = false;
  nuevoArchivo: Archivo;
  informacionCarpeta: boolean = false;
  id_directorio:String;

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


  public async verArchivo(id: String) {
    let archivo = this.archivos.find(archivo => archivo._id === id);

    if (archivo) {
      this.visualizarArchivo = true;
      this.agregarArchivo = false;
      this.detallesArchivo = archivo;
    }
  }

  public async regresarFileManager() {
    this.visualizarArchivo = false;
    this.agregarArchivo = false;
    this.informacionCarpeta = false;
    this.obtenerDirectorios();
    this.obtenerArchivos();
  }

  public opcionesCarpeta(id: any) {
    this.id_directorio = id;
    this.visualizarArchivo = false;
    this.agregarArchivo = false;
    this.informacionCarpeta = true;

  }

  public async crearArchivo() {

    await Swal.fire({
      title: `Crear nuevo archivo`,
      input: 'select',
      html: '<div class="form-outline">' +
        '<p class="mb-3 text-sm-start">Nombre</p>' +
        '<input type="text" id="nombre" class="form-control"/>' +
        '</div>',
      inputOptions: {
        'Extension': {
          texto: '.txt',
          html: '.html',
        }
      },
      inputPlaceholder: 'Selecciona una extension',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          const nombre = document.getElementById('nombre') as HTMLInputElement;

          if ((value === 'texto' || value === 'html') && nombre.value.length > 0) {
            resolve()
            this.agregarArchivo = true;
            this.visualizarArchivo = false;
            value == 'texto' ? value = '.txt' : value = '.html';
            this.nuevoArchivo = new Archivo(nombre.value, value, "", this.path, this.usuario);
          } else {
            resolve('Se debe asignar un nombre y una extension');
          }
        });
      }
    });

  }

  public async crearDirectorio() {

    await Swal.fire({
      title: `Crear nuevo directorio`,
      input: 'text',
      inputOptions: {
        'Extension': {
          texto: '.txt',
          html: '.html',
        }
      },
      inputPlaceholder: 'Nombre del directorio',
      confirmButtonColor: '#07AF09',
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {

          if (value.length > 0) {
            const esValido = value !== '/' ? true : false;

            if (esValido) {

              let directorio = {
                nombre: value,
                directorio_padre: this.path,
                propietario: this.usuario
              }

              this.cloudService.directorio(directorio).subscribe((confirmacion) => {

                if (!confirmacion.match) {

                  this.cloudService.crearDirectorio(directorio).subscribe((confirmacion) => {

                    if (confirmacion.insertado) {
                      Swal.fire({ title: 'Directorio creado', icon: 'success' })
                      this.obtenerArchivos();
                      this.obtenerDirectorios();
                    } else {
                      Swal.fire({ title: 'No pudo crearse el directorio', icon: 'error' })
                    }

                  });

                } else {
                  resolve(`${value} ya existe en este directorio`);
                }
              });

            } else {
              resolve(`El directorio "${value}" es un directorio del sistema, ingresa un nombre distinto`);
            }

          } else {
            resolve('Debes asignar un nombre al directorio');
          }
        });
      }
    });

  }

  public informacionArchivo(archivo:Archivo){
    Swal.fire({
      icon:'info',
      iconHtml:'Detalles',
      iconColor:'#2FB2A8',
      html: `<div class='text-start fs-3'>`+
      `<p><strong>Nombre:</strong> ${archivo.nombre}${archivo.extension}</p>`+
      `<p><strong>Directorio:</strong> ${archivo.directorio_padre}</p>`+
      `<p><strong>Propietario:</strong> ${archivo.propietario}</p>`+
      `<p><strong>Creado:</strong> ${archivo.fecha_creacion}</p>`+
      `</div>`,
      confirmButtonText:'Aceptar'
    });
  
  }

}
