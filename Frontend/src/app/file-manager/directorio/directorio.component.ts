import { Component, Input, OnInit } from '@angular/core';
import { Directorio } from 'src/app/Models/Directorio';
import { CloudService } from '../service/cloud.service';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit {


  @Input() id_directorio: String;
  @Input() propietario: String;
  directorio: Directorio;
  directorios: [];

  constructor(private cloudService: CloudService) {

  }

  ngOnInit(): void {
    this.cloudService.detalleDirectorio(this.id_directorio)
      .pipe(
        switchMap((data) => {
          this.directorio = data;
          return this.cloudService.listarDirectoriosMoverDirectorio(this.propietario, `${this.directorio.directorio_padre}${this.directorio.nombre}`);
        })
      )
      .subscribe((data) => {
        //No mover ni a si mismo ni a sus hijos
        let path_directorio = '';
        this.directorio.directorio_padre === "/" ? path_directorio = `${this.directorio.directorio_padre}${this.directorio.nombre}` : path_directorio = `${this.directorio.directorio_padre}/${this.directorio.nombre}`

        const directoriosMostrar = data.directorios.filter((directorio: string) => directorio !== path_directorio);
        
        this.directorios = directoriosMostrar;
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
        this.cloudService.eliminarDirectorio(this.directorio._id, this.propietario).subscribe((confirmacion) => {
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

  public copiarDirectorio() {

    this.cloudService.copiarDirectorio(this.id_directorio).subscribe((confirmacion) => {

      if (confirmacion.copiado) {

        Swal.fire({ title: 'Se guardo la copia del directorio', icon: 'success' });

      } else {
        Swal.fire({ title: 'Error al guardar la copia del directorio', icon: 'error' });
      }

    });

  }

  public async moverDirectorio() {
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

      if (result.isConfirmed) {

        let nuevoDirectorio = this.directorios[result.value]

        let directorio = {
          nombre: this.directorio.nombre,
          directorio_padre: nuevoDirectorio,
          propietario: this.directorio.propietario
        }

        this.cloudService.directorio(directorio).subscribe((confirmacion) => {

          if (!confirmacion.match) {

              //Mover directorio
              this.cloudService.moverDirectorio(this.id_directorio,nuevoDirectorio).subscribe((update)=>{
                
                if(update){
                    Swal.fire({ title: `Se movio el directorio correctamente a la ruta seleccionada`, icon: 'success' });
                }else{
                    Swal.fire({ title: `No pudo moverse el directorio a la ruta seleccionada`, icon: 'error' });
                }

              })

          } else {
            Swal.fire({ title: `Ya existe un directorio con el nombre ${directorio.nombre} en la ruta seleccionada`, icon: 'error' })
          }
        });
      }

    });

  }



}
