use cloud_arch

db.createCollection('usuarios')
db.createCollection('archivos')
db.createCollection('directorios')

db.usuarios.insertMany(
    [
        {
            nombre: 'Administrador No.1',
            usuario: 'admin',
            contrasenia: 'admin',
            rol: 1
        },
        {
            nombre: 'Usuario No.1',
            usuario: 'user',
            contrasenia: 'user',
            rol: 2
        },
    ]
    
)

