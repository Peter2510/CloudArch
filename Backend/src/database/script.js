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
            fecha_creacion: fechaFormateada,
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
            fecha_creacion: fechaFormateada,
            compartido: 'false',
            fecha_compartido: '',
            hora_compartido: '',
            eliminado: 'false',
            usuarios_compartidos: []
        }
    
    ]
);



db.directorios.insertMany(
    [
        {
            nombre: 'app',
            directorio_padre: '/',
            propietario: 'pgordillo',
            fecha_creacion: fechaFormateada,
            eliminado: 'false',

        },
        {
            nombre: 'musica',
            directorio_padre: '/',
            propietario: 'pgordillo',
            fecha_creacion: fechaFormateada,
            eliminado: 'false',
        },
        {
            nombre: 'documentos',
            directorio_padre: '/',
            propietario: 'pgordillo',
            fecha_creacion: fechaFormateada,
            eliminado: 'false',
        }
    ]
)



