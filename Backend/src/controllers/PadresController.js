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

const listarDirectoriosPadreMover = async (req, res) => {

  const propietario = req.query.propietario;
  const directorio = req.query.directorio;
 
  const directorios = await padres.find(
    {
      propietario: propietario
    },
    { path: 1, _id: 0 }
  ).exec();

  const nombresDirectorios = directorios.map((directorio) => directorio.path);
  nombresDirectorios.unshift("/");

  const directoriosFiltrados = nombresDirectorios.filter((nombre) => !nombre.startsWith(`${directorio}/`));
  
  res.json({directorios:directoriosFiltrados});

}


module.exports = {
    listarDirectoriosPadre,
    listarDirectoriosPadreMover
}