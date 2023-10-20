import { Component } from '@angular/core';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent {


  ruta:String = '/';

  documentos:{ nombre: string, extension:string, contenido:string, directorio_padre:string,propietario:string,compartido:string,fecha_compartido:string,hora_compartido:string,eliminado:string,usuarios_compartidos:string[] }[] = [        {
    nombre: 'index',
    extension: '.html',
    contenido: `<!DOCTYPE html>
    <html>
    <head>
        <title>Mi primer "Hola, mundo"</title>
    </head>
    <body>
        <h1>Hola, mundo</h1>
        <p>Este es un ejemplo de un párrafo.</p>
    </body>
    </html>`,
    directorio_padre: '/',
    propietario: 'pgordillo',
    compartido: 'false',
    fecha_compartido: '',
    hora_compartido: '',
    eliminado: 'false',
    usuarios_compartidos:[]
},
{
    nombre: 'app',
    extension: '.html',
    contenido: `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Ejemplo HTML</title>
    </head>
    <body>
        <header>
            <h1>Mi Página Web</h1>
            <nav>
                <ul>
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Acerca de</a></li>
                    <li><a href="#">Servicios</a></li>
                    <li><a href="#">Contacto</a></li>
                </ul>
            </nav>
        </header>
        <main>
            <h2>Bienvenido a mi página web</h2>
            <p>Esta es una página de ejemplo. Puedes agregar tu propio contenido aquí.</p>
            <img src="imagen.jpg" alt="Una imagen de ejemplo">
        </main>
        <footer>
            <p>Derechos de autor © 2023 Mi Página Web</p>
        </footer>
    </body>
    </html>`,
    directorio_padre: '/',
    propietario: 'pgordillo',
    compartido: 'false',
    fecha_compartido: '',
    hora_compartido: '',
    eliminado: 'false',
    usuarios_compartidos:[]
},
{
    nombre: 'mongodb',
    extension: '.txt',
    contenido: `Cuando hablamos de bases de datos tendemos a pensar en SQL y el modelo de bases de datos relacional, pero existen alternativas como los modelos no relacionales donde MongoDB es quizá el ejemplo más destacado.`,
    directorio_padre: '/',
    propietario: 'pgordillo',
    compartido: 'false',
    fecha_compartido: '',
    hora_compartido: '',
    eliminado: 'false',
    usuarios_compartidos: []
}]

  directorios:{nombre:string,directorio_padre:string,propietario:string,eliminado:string}[] =     [
    {
        nombre: 'app',
        directorio_padre: '/',
        propietario: 'pgordillo',
        
        eliminado: 'false',

    },
    {
        nombre: 'musica',
        directorio_padre: '/',
        propietario: 'pgordillo',
        
        eliminado: 'false',
    },
    {
        nombre: 'documentos',
        directorio_padre: '/',
        propietario: 'pgordillo',
        
        eliminado: 'false',
    },
    {
      nombre: 'documentos',
      directorio_padre: '/',
      propietario: 'pgordillo',
      
      eliminado: 'false',
  }
]


}
