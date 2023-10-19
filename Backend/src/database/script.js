use cloud_arch

db.createCollection('usuarios')
db.createCollection('archivos')
db.createCollection('directorios')

db.usuarios.insertMany(
    [
        {
            nombre: 'Administrador No.1',
            usuario: 'admin',
            contrasenia: '$2b$10$P7ojg18cRwbILYY6slGm0.Pd8KMIVf8fp4iMsZJKSdKkB4qZB5WCO',
            rol: 1
        },
        {
            nombre: 'Usuario No.1',
            usuario: 'user',
            contrasenia: '$2b$10$P7ojg18cRwbILYY6slGm0.Pd8KMIVf8fp4iMsZJKSdKkB4qZB5WCO',
            rol: 2
        },
    ]
    
);

