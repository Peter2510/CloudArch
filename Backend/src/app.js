const express = require('express');
const app = express();
const cors = require('cors')
const UsuarioRoutes = require('./routes/Usuarios.routes')
const DirectoriosRoutes = require('./routes/Directorios.routes')
const ArchivosRoutes = require('./routes/Archivos.routes')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hola desde la ruta inicial')
});

app.use('/cloud-arch',UsuarioRoutes);
app.use('/cloud-arch',DirectoriosRoutes);
app.use('/cloud-arch',ArchivosRoutes);


module.exports = app;
