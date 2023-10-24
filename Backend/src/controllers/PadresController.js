const padres = require('../models/Padres')

const listarDirectoriosPadre = async (req, res) => {

    const propietario = req.query.propietario;
   
    const directorios = await padres.find(
      {
        propietario: propietario
      },
      { path: 1, _id: 0 }
    ).exec();

    const nombresDirectorios = directorios.map((directorio) => directorio.path);
    nombresDirectorios.unshift("/");

    res.json({directorios:nombresDirectorios});

}


module.exports = {
    listarDirectoriosPadre
}