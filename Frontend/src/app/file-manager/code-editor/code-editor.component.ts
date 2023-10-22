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
    }, fontSize: 15
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

      /*if(result.isConfirmed){
        this.nuevoDirectorio = this.directorios[result.value]
      }*/


    });

  }

  public cambiarNombre() {

    Swal.fire({
      title: 'Editar archivo',
      html:
        '<input id="nombre" class="swal2-input" value=' + this.archivo.nombre + ' >'
        + '<p class="mt-3">Extension actual:  ' + this.archivo.extension + '</p>' +
        '<select name="select" id="extension">' +
        '<option value="'+this.archivo.extension+'"'+'selected disabled>Misma extension</option>' +
        '<option value=".txt">.txt</option>' +
        '<option value=".html">.html</option>' +
        '</select>',
      confirmButtonText: 'Aceptar',
      cancelButtonText: "Salir",
      showCancelButton: true,
    }).then(async (result) => {

      if(result.isConfirmed) {

          const nombre = document.getElementById('nombre') as HTMLInputElement | null;
          const extension = document.getElementById('extension') as HTMLInputElement | null;

          if(nombre != null && nombre.value !== '' && extension != null) {

            let data= {
              nombre:nombre.value, 
              extension:extension.value,
              directorio_padre:this.archivo.directorio_padre,
              propietario:this.propietario

            }

            //verificar si existe
            this.cloudService.archivo(data).subscribe((confirmacion)=>{           
              console.log(confirmacion)
              if(!confirmacion.match){
              console.log(this.archivo._id,nombre.value,extension.value)
                this.cloudService.renombrarArchivo(this.archivo._id,nombre.value,extension.value).subscribe((confirmacion)=>{
                  
                  if(confirmacion.update){
                    Swal.fire({
                      title:'Archivo renombrado',
                      icon:'success'
                     }).then(()=>{
                      this.archivo.nombre= nombre.value;
                      this.archivo.extension = extension.value;
                     });                    
                  }else{
                    Swal.fire({
                      title:'No fue posible renombrar el archivo',
                      icon:'error'
                     });
                  }

                })


              }else{
                Swal.fire({
                  title:'El archivo ya existe',
                  icon:'error'
                 });
              }


            })

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

  public async existeArchivo(){
       
   

  }


}
