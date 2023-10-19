const express = require('express');
const app = express();
const cors = require('cors')
const UsuarioRoutes = require('./routes/Usuarios.routes')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hola desde la ruta inicial')
});

app.use('/cloud-arch',UsuarioRoutes);


module.exports = app;
