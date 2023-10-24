const Directorios = require('../models/Directorio')

const listarDirectorios = async (req, res) => {

    const usuario = req.query.usuario;
    const directorio = req.query.directorio_padre;

    const directorioContenido = await Directorios.find({
        propietario:usuario,
        directorio_padre:directorio

    }).exec();

    res.json(directorioContenido);

}


module.exports = {
    listarDirectorios
}