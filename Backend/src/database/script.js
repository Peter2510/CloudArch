use cloud_arch

db.createCollection('usuarios')
db.createCollection('archivos')
db.createCollection('directorios')

//INSERTANDO USUARIOS
db.usuarios.insertMany(
    [
        {
            nombre: 'Pedro Gordillo',
            usuario: 'pgordillo',
            contrasenia: '$2b$10$P7ojg18cRwbILYY6slGm0.Pd8KMIVf8fp4iMsZJKSdKkB4qZB5WCO',
            rol: 1
        },
        {
            nombre: 'Ricardo Gonzalez',
            usuario: 'rgonz',
            contrasenia: '$2b$10$P7ojg18cRwbILYY6slGm0.Pd8KMIVf8fp4iMsZJKSdKkB4qZB5WCO',
            rol: 2
        },
    ]
    
);

const fechaActual = new Date();
const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1;
const año = fechaActual.getFullYear();

const fechaFormateada = `${dia}/${mes}/${año}`;


//INSERTANDO ARCHIVOS
db.archivos.insertMany(
    [
        {
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
            fecha_creacion: fechaFormateada,
            fecha_compartido: '',
            hora_compartido: '',
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
            fecha_creacion: fechaFormateada,
            fecha_compartido: '',
            hora_compartido: '',

        },
        {
            nombre: 'mongodb',
            extension: '.txt',
            contenido: `Cuando hablamos de bases de datos tendemos a pensar en SQL y el modelo de bases de datos relacional, pero existen alternativas como los modelos no relacionales donde MongoDB es quizá el ejemplo más destacado.`,
            directorio_padre: '/',
            propietario: 'pgordillo',
            fecha_creacion: fechaFormateada,
            fecha_compartido: '',
            hora_compartido: '',
        },
        {
            nombre: 'java',
            extension: '.txt',
            contenido: `Es un lenguaje de programacion`,
            directorio_padre: '/',
            propietario: 'rgonz',
            fecha_creacion: fechaFormateada,
            fecha_compartido: '',
            hora_compartido: '',
        },
        {
            nombre: 'prueba',
            extension: '.html',
            contenido: `<h1>Esto es un titulo</>`,
            directorio_padre: '/',
            propietario: 'rgonz',
            fecha_creacion: fechaFormateada,
            fecha_compartido: '',
            hora_compartido: '',
        },
        {
            nombre: 'txt dentro de documentos',
            extension: '.txt',
            contenido: `esto es el texto del documento`,
            directorio_padre: '/documentos',
            propietario: 'pgordillo',
            fecha_creacion: fechaFormateada,
            fecha_compartido: '',
            hora_compartido: '',
        },
        {
            nombre: 'html de app',
            extension: '.html',
            contenido: `<p>ESTO ES UN EJEMPLO DE UN PARRAFON EN HTML </p>`,
            directorio_padre: '/app',
            propietario: 'pgordillo',
            fecha_creacion: fechaFormateada,
            fecha_compartido: '',
            hora_compartido: '',
        },
        {
            nombre: 'notas musicales',
            extension: '.txt',
            contenido: `Las notas musicales pueden representarse como: C D M F G L A C`,
            directorio_padre: '/musica',
            propietario: 'pgordillo',
            fecha_creacion: fechaFormateada,
            fecha_compartido: '',
            hora_compartido: '',
        },
        {
            nombre: 'txt doc',
            extension: '.txt',
            contenido: `text de prueba en documento .txt`,
            directorio_padre: '/documentos',
            propietario: 'rgonz',
            fecha_creacion: fechaFormateada,
            fecha_compartido: '',
            hora_compartido: '',
        },
        {
            nombre: 'htmlPre',
            extension: '.html',
            contenido: `<h1>PRUEBA DEL HTML COMO TITULO</h1>`,
            directorio_padre: '/descargas',
            propietario: 'rgonz',
            fecha_creacion: fechaFormateada,
            fecha_compartido: '',
            hora_compartido: '',
        }

    
    ]
);


//INSERTANDO DIRECTORIOS
db.directorios.insertMany(
    [
        {
            nombre: 'app',
            directorio_padre: '/',
            propietario: 'pgordillo',
            fecha_creacion: fechaFormateada

        },
        {
            nombre: 'musica',
            directorio_padre: '/',
            propietario: 'pgordillo',
            fecha_creacion: fechaFormateada
        },
        {
            nombre: 'documentos',
            directorio_padre: '/',
            propietario: 'pgordillo',
            fecha_creacion: fechaFormateada
        },
        {
            nombre: 'documentos',
            directorio_padre: '/',
            propietario: 'rgonz',
            fecha_creacion: fechaFormateada
        },
        {
            nombre: 'descargas',
            directorio_padre: '/',
            propietario: 'rgonz',
            fecha_creacion: fechaFormateada
        }
    ]
);



