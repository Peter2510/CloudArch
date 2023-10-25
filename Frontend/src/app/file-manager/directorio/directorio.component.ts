import { Component } from '@angular/core';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent {
directorio = {
  nombre: 'documentos',
  directorio_padre: '/descargas',
  propietario: 'rgonz',
  fecha_creacion: '22/10/2023'
}

}
