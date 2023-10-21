const Archivos = require('../models/Archivos')

const listarArchivos = async (req, res) => {

    const usuario = req.query.usuario;
    const directorio = req.query.directorio;

    const archivos = await Archivos.find({
        propietario:usuario,
        directorio_padre:directorio

    }).exec();

    res.json(archivos);

}



module.exports = {
    listarArchivos
}