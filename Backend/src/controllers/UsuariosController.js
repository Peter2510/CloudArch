const Usuario = require('../models/Usuario')


const obtenerUsuario = async (req, res) => {
    const busquedaUsuario = await Usuario.find({usuario:req.body.usuario});
    res.json(busquedaUsuario);
}

const agregarUsuario = async (req, res) => {
    const insertarUsuario = new Usuario({
        nombre: req.body.nombre,
        usuario: req.body.usuario,
        contrasenia: req.body.contrasenia,
        rol: req.body.rol
    })

    const confirmacion = await insertarUsuario.save()
    res.json(confirmacion)
}

const cambioContrasenia = async (req, res) => {
    const actualizacion = await Usuario.updateOne(
        {usuario:req.body.usuario},
        {$set:{contrasenia:req.body.contrasenia}}
    );
    res.json(actualizacion);
}



module.exports = {
    obtenerUsuario,
    agregarUsuario,
    cambioContrasenia
}