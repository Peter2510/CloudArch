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
  detallesArchivo:Archivo;
  visualizarArchivo:boolean = false;
  agregarArchivo:boolean = false;
  nuevoArchivo:Archivo;
  

  constructor(private cloudService: CloudService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.path = this.root;
    this.obtenerDirectorios();
    this.obtenerArchivos();  
  }

  ngAfterViewInit() {
    
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

      if(archivo){
        this.visualizarArchivo = true;
        this.agregarArchivo = false;
        this.detallesArchivo = archivo;
      }
  }

  public async regresarFileManager(){
    this.visualizarArchivo = false;
    this.agregarArchivo = false;
    this.obtenerDirectorios();
    this.obtenerArchivos();
  }

  public eliminarCarpeta(directorio:any){
    Swal.fire({
      title:`¿Deseas eliminar el directorio ${directorio}?`,
      icon:'question',
      showConfirmButton:true,
      confirmButtonText:'Eliminar',
      confirmButtonColor:'#FF0000',
      showCancelButton:true,
      cancelButtonText:'Cancelar'
    });
  }

  public async crearArchivo(){

      await Swal.fire({
        title:`Crear nuevo archivo`,
        input: 'select',
        html:'<div class="form-outline">'+
      '<p class="mb-3 text-sm-start">Nombre</p>'+
      '<input type="text" id="nombre" class="form-control"/>'+
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

            if ((value === 'texto' || value==='html') && nombre.value.length>0 ) {
              resolve()
                  this.agregarArchivo = true;
                  this.visualizarArchivo = false;
                  value=='texto' ? value='.txt' : value='.html';
                  this.nuevoArchivo = new Archivo(nombre.value, value, "", this.path, this.usuario);
            } else {
              resolve('Se debe asignar un nombre y una extension');
            }
          });
        }
      });

  }
  
}
