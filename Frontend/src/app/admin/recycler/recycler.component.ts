import { Component } from '@angular/core';
import { Archivo } from 'src/app/Models/Archivo';
import { Directorio } from 'src/app/Models/Directorio';
import { CloudService } from 'src/app/file-manager/service/cloud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recycler',
  templateUrl: './recycler.component.html',
  styleUrls: ['./recycler.component.css']
})
export class RecyclerComponent {
  rutas: String[] = [];
  root: String = "papelera";
  path: String;
  propietario:String;
  directorios: Directorio[];
  archivos: Archivo[];
  detallesArchivo:Archivo;
  visualizarArchivo:boolean = false;
  
  constructor(private cloudService: CloudService) { }

  ngOnInit(): void {
    this.path = this.root;
    this.obtenerDirectoriosInicio();
    this.obtenerArchivosInicio();  
  }

  private obtenerDirectoriosInicio() {

    this.cloudService.directoriosPapeleraInicio(this.path).subscribe(data => {
      this.directorios = data;
    })
  }

  private obtenerDirectoriosEspecificosPapelera() {
    
    this.cloudService.directoriosEspecificosPapelera(this.path,this.propietario).subscribe(data => {
      this.directorios = data;
    })
  }

  private obtenerArchivosInicio() {
    this.cloudService.archivosPapeleraInicio(this.path).subscribe(data => {
      this.archivos = data;
    });
  }
  
  private obtenerArchivosEspecificosPapelera() {
    
    this.cloudService.archivosEspecificosPapelera(this.path,this.propietario).subscribe(data => {
      this.archivos = data;
    });
  }

  public entrarCarpeta(pathCarpeta: String,propietario:String) {
    this.rutas.push(pathCarpeta);
    this.propietario = propietario;
    this.path = "papelera/" + this.rutas.join('/');
    
    this.obtenerDirectoriosEspecificosPapelera();
    this.obtenerArchivosEspecificosPapelera();
  }

  public salirCarpeta() {

    this.rutas.pop();

    if(this.rutas.length==0){
      this.path = "papelera";
      this.obtenerArchivosInicio();
      this.obtenerDirectoriosInicio();

    }else{
      
      this.path = "papelera/" + this.rutas.join('/');  
      this.obtenerArchivosEspecificosPapelera()
      this.obtenerDirectoriosEspecificosPapelera()
    }

    
  }


  public async verArchivo(id: String) {
      let archivo = this.archivos.find(archivo => archivo._id === id);

      if(archivo){
        this.visualizarArchivo = true;
        this.detallesArchivo = archivo;
      }
  }

  public regresarFileManager(){
    this.visualizarArchivo = false;

    if(this.propietario){
      this.obtenerDirectoriosEspecificosPapelera();
      this.obtenerArchivosEspecificosPapelera();
    }else{
      this.obtenerArchivosInicio()
      this.obtenerDirectoriosInicio()
    }

    
  }

  public informacionCarpeta(directorio:Directorio){

    Swal.fire({
      icon:'info',
      iconHtml:'Detalles',
      iconColor:'#2FB2A8',
      html: `<div class='text-start fs-3'>`+
      `<p><strong>Nombre:</strong> ${directorio.nombre}</p>`+
      `<p><strong>Directorio:</strong> ${directorio.directorio_padre}</p>`+
      `<p><strong>Propietario:</strong> ${directorio.propietario}</p>`+
      `<p><strong>Creado:</strong> ${directorio.fecha_creacion}</p>`+
      `</div>`,
      confirmButtonText:'Aceptar'
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
