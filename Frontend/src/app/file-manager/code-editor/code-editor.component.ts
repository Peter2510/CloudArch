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
  esUsuario:boolean = true;
  theme = 'vs-dark';
  propietario = this.loginService.getNombreUsuario();
  enPapelera:boolean;
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

  usuarios: Usuario[];
  directorios: [];
  nuevoDirectorio = '';

  ngOnInit(): void {
    this.codeModel.value = this.archivo.contenido + '';
    this.cloudService.listarDirectorios(this.propietario).subscribe((data) => {
      this.directorios = data.directorios;
    })
    this.enPapelera = this.archivo.directorio_padre.startsWith('/papelera');
  }

  constructor(private cloudService: CloudService, private loginService: LoginService) { }

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

      if (result.isConfirmed) {
        let nuevoDirectorio = this.directorios[result.value]
        //confirmar si existe el archivo en la nueva ruta
        let data = {
          nombre: this.archivo.nombre,
          extension: this.archivo.extension,
          directorio_padre: nuevoDirectorio,
          propietario: this.propietario
        }
        this.cloudService.archivo(data).subscribe((confirmacion) => {
          console.log(confirmacion)
          if (!confirmacion.match) {

            this.cloudService.moverArchivo(this.archivo._id, nuevoDirectorio).subscribe((confirmacion) => {

              if (confirmacion.update) {
                Swal.fire({
                  title: 'Se movio el archivo correctamente',
                  icon: 'success'
                }).then(() => {
                  this.archivo.directorio_padre = nuevoDirectorio;                 
                });
              } else {
                Swal.fire({
                  title: 'No fue posible mover el archivo',
                  icon: 'error'
                });
              }

            });


          } else {
            Swal.fire({
              title: 'Ya existe un archivo con el mismo nombre y extension en el directorio seleccionado',
              icon: 'error'
            });
          }


        });
      }

    });

  }

  public renombrarArchivo() {

    Swal.fire({
      title: 'Editar archivo',
      html:
        '<input id="nombre" class="swal2-input" value="' + this.archivo.nombre + '" >'+ 
        `<p class="mt-3">Extension actual:${this.archivo.extension}</p>` +
        '<select name="select" id="extension">' +
        `<option value= "${this.archivo.extension}" selected disabled>Misma extension</option>` +
        '<option value=".txt">.txt</option>' +
        '<option value=".html">.html</option>' +
        '</select>',
      confirmButtonText: 'Aceptar',
      cancelButtonText: "Salir",
      showCancelButton: true,
    }).then(async (result) => {

      if (result.isConfirmed) {

        const nombre = document.getElementById('nombre') as HTMLInputElement | null;
        const extension = document.getElementById('extension') as HTMLInputElement | null;

        if (nombre != null && nombre.value !== '' && extension != null) {

          let data = {
            nombre: nombre.value,
            extension: extension.value,
            directorio_padre: this.archivo.directorio_padre,
            propietario: this.propietario

          }

          //verificar si existe
          this.cloudService.archivo(data).subscribe((confirmacion) => {
            console.log(confirmacion)
            if (!confirmacion.match) {
              console.log(this.archivo._id, nombre.value, extension.value)
              this.cloudService.renombrarArchivo(this.archivo._id, nombre.value, extension.value).subscribe((confirmacion) => {

                if (confirmacion.update) {
                  Swal.fire({
                    title: 'Archivo renombrado',
                    icon: 'success'
                  }).then(() => {
                    this.archivo.nombre = nombre.value;
                    this.archivo.extension = extension.value;
                  });
                } else {
                  Swal.fire({
                    title: 'No fue posible renombrar el archivo',
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

        } else {
          Swal.fire({
            title: 'Debes asignar un nombre al archivo',
            icon: 'warning'
          });
        }

      }
    });

  }


  public editarContenido() {
    this.cloudService.editarContenido(this.archivo._id, this.codeModel.value).subscribe((data) => {
      if (data.update) {
        Swal.fire({
          title: 'Se editó correctamente el archivo',
          icon: 'success'
        });
      } else {
        Swal.fire({
          title: 'No pudo actualizarse el archivo',
          icon: 'error'
        }
        );
      }
    });
  }

  public eliminarArchivo() {
    
    Swal.fire({
      title: `Deseas eliminar el archivo ${this.archivo.nombre}${this.archivo.extension}`,
      showConfirmButton:true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor:'#FF0000',
      cancelButtonText: 'Cancelar',
      icon:'question'
    }).then((result) => {
      
    if (result.isConfirmed) {
      /* eliminar archivo */
      this.cloudService.eliminarArchivo(this.archivo._id).subscribe((confirmacion) => {
        if (confirmacion.update) {
          Swal.fire({
            title: 'Se elimno correctamente el archivo',
            icon: 'success'
          }).then(()=>{
            window.location.reload()
          });
        } else {
          Swal.fire({
            title: 'No pudo eliminarse el archivo',
            icon: 'error'
          }
          );
        }
      });
      }
    });
  }

}
