const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt');

const empleados = async (req, res) => {

    const empleados = await Usuario.find().exec();

    res.json(empleados);
}

const obtenerUsuario = async (req, res) => {
    
    const { usuario, contrasenia } = req.body;

    const busquedaUsuario = await Usuario.findOne({
        usuario:usuario,
    }).exec();

    if(busquedaUsuario){
        
        const match = await bcrypt.compare(contrasenia, busquedaUsuario.contrasenia);

        if(match){

            const usuario = {
                _id: busquedaUsuario._id,
                nombre: busquedaUsuario.nombre,
                usuario: busquedaUsuario.usuario,
                rol: busquedaUsuario.rol
            }

            res.json(usuario);

        }else{           
            res.json('');
        }
    }else{
        res.json('');
    }
    
}

const agregarUsuario = async (req, res) => {
    const { nombre,usuario, contrasenia,rol } = req.body;
    
    const contraseniaEncriptada = await bcrypt.hash(contrasenia, 10);

    const busquedaUsuario = await Usuario.findOne({
        usuario:usuario,
    }).exec();

    if(busquedaUsuario==null){
        const insertarUsuario = new Usuario({
            nombre: nombre,
            usuario: usuario,
            "contrasenia": contraseniaEncriptada,
            rol: rol
        })
    
        const confirmacion = await insertarUsuario.save();

        res.json({"agregado":"true"})
    }else{
        res.json({"agregado":"false"})
    }
    
}

const cambioContrasenia = async (req, res) => {
    const { usuario, contrasenia } = req.body;
    const contraseniaEncriptada = await bcrypt.hash(contrasenia, 10);

    const actualizacion = await Usuario.updateOne(

        {usuario:usuario},
        {$set:{contrasenia:contraseniaEncriptada}}

    );
    res.json(actualizacion);
}

module.exports = {
    obtenerUsuario,
    agregarUsuario,
    cambioContrasenia,
    empleados
}