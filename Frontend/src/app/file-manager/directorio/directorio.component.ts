import { Component, Input, OnInit } from '@angular/core';
import { Directorio } from 'src/app/Models/Directorio';
import { CloudService } from '../service/cloud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit{


  @Input() id_directorio: String;
  @Input() propietario: String;
  directorio:Directorio;

  constructor(private cloudService:CloudService){

  }

  ngOnInit(): void {
    
    this.cloudService.detalleDirectorio(this.id_directorio).subscribe((data)=>{
    this.directorio = data;

    });

  }

  public eliminarDirectorio() {

    Swal.fire({
      title: `¿Deseas eliminar el directorio ${this.directorio.nombre}?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#E22020',
      cancelButtonText: 'Cancelar',
      icon: 'question'
    }).then((result) => {

      if (result.isConfirmed) {
        /* eliminar archivo */
        this.cloudService.eliminarDirectorio(this.directorio._id,this.propietario).subscribe((confirmacion) => {
          if (confirmacion.update) {
            Swal.fire({
              title: 'Se elimino correctamente el directorio',
              icon: 'success'
            }).then(() => {
              window.location.reload()
            });
          } else {
            Swal.fire({
              title: 'No pudo eliminarse el directorio',
              icon: 'error'
            }
            );
          }
        });
      }
    });
  }

  public copiarDirectorio(){

    this.cloudService.copiarDirectorio(this.id_directorio).subscribe((confirmacion)=>{

      if(confirmacion.copiado){
        
        Swal.fire({title:'Se guardo la copia del directorio',icon:'success'});

      }else{
        Swal.fire({title:'Error al guardar la copia del directorio',icon:'error'});
      }

    });

  }



}
