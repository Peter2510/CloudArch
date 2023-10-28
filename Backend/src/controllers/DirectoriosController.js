const Directorios = require('../models/Directorio');
const padres = require('../models/Padres');
const Archivos = require('../models/Archivos');

const listarDirectorios = async (req, res) => {

    const usuario = req.query.usuario;
    const directorio = req.query.directorio_padre;
    const directorioContenido = await Directorios.find({
        propietario: usuario,
        directorio_padre: directorio

    }).exec();

    res.json(directorioContenido);

}


const obtenerDirectorio = async (req, res) => {

    const nombre = req.query.nombre;
    const directorio_padre = req.query.directorio_padre;
    const propietario = req.query.propietario;
    const directorio = await Directorios.findOne({
        nombre: nombre,
        directorio_padre: directorio_padre,
        propietario: propietario
    }).exec();


    if (directorio) {

        res.json({ match: true })

    } else {

        res.json({ match: false })

    }

}

const crearDirectorio = async (req, res) => {

    const nombre = req.body.nombre;
    const directorio_padre = req.body.directorio_padre;
    const propietario = req.body.propietario;

    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES');

    const nuevoDirectorio = new Directorios({
        nombre: nombre,
        fecha_creacion: fechaFormateada,
        directorio_padre: directorio_padre,
        propietario: propietario
    });

    try {
        const resultado = await nuevoDirectorio.save();

        let directorio_p = nuevoDirectorio.directorio_padre;

        directorio_p == '/' ? directorio_p = `/${nombre}` : directorio_p = `${directorio_padre}/${nombre}`;

        const padre = new padres({
            path: `${directorio_p}`,
            propietario: propietario
        }).save();

        res.json({ insertado: true });
    } catch (error) {
        console.log(error)
        res.json({ insertado: false });
    }

}

const detallesDirectorio = async (req, res) => {

    const _id = req.query._id;

    const directorio = await Directorios.findOne({
        _id: _id
    }).exec();


    if (directorio) {

        res.json(directorio);

    } else {

        res.json('')

    }

}

const eliminarDirectorio = async (req, res) => {

    const { id, propietario } = req.body;

    const dir = await Directorios.findOne({
        _id: id
    }).exec();

    //const partes = dir.directorio_padre.split('/');
    //partes.shift();
    //partes.unshift("papelera"); 
    //const directorio_papelera = partes.join('/'); 

    //"eliminar" del root
    const eliminarRoot = await Directorios.updateOne({
        _id: Object(id)
    },
        {
            $set: {
                directorio_padre: "papelera"
            }
        }
    ).exec();

    //path del directorio a eliminar
    let path_directorio = '';
    dir.directorio_padre === "/" ? path_directorio = `${dir.directorio_padre}${dir.nombre}` : path_directorio = `${dir.directorio_padre}/${dir.nombre}`

    //Eliminar de padres
    const eliminarPadre = await padres.deleteOne({
        path: path_directorio,
        propietario: propietario
    }).exec();


    //Eliminando directorios anidados

        await moverHijosAPapelera(path_directorio,propietario);


    if (eliminarRoot.matchedCount == 1) {
        res.json({ update: true });
    } else {
        res.json({ update: false });
    }








}

async function moverHijosAPapelera(path_directorio, propietario) {

    const hijos = await Directorios.find({
        directorio_padre: path_directorio,
        propietario: propietario
    });

    const archivos = await Archivos.find({
        directorio_padre: path_directorio,
        propietario: propietario
    });

    console.log(archivos)

    //si tenia hijos, renombrar path del archivo y carpetas, primero archivos
    if (hijos.length > 0) {

        archivos.forEach(async (archivo)=>{

            await Archivos.updateMany(
                {
                    directorio_padre: path_directorio,
                    propietario: propietario
                },
                {
                    $set: { directorio_padre: "papelera" + path_directorio }
                }
            )

        });
               
        
        hijos.forEach(async (hijo) => {
        
            //"eliminar" anidado

            await Directorios.updateMany(
                {
                    directorio_padre: path_directorio,
                    propietario: propietario
                },
                {
                    $set: { directorio_padre: "papelera" + path_directorio }
                }).exec();
            
                console.log(Archivos.find({directorio_padre:path_directorio}));

            let path_directorioAux = '';
            path_directorio = path_directorioAux = `${hijo.directorio_padre}/${hijo.nombre}`
        
            moverHijosAPapelera(path_directorioAux,propietario);

        });


    }else{
        console.log("no tiene hijos",path_directorio)
    }

    
    

}

const listarDirectoriosPapelera = async (req, res) => {

    const directorio = req.query.directorio_padre;


    const papelera = await Directorios.find({
        directorio_padre: directorio
    }).exec();



    res.json(papelera);

}

//navegacion entre carpetas en la papelera
const listarDirectoriosEnPapelera = async (req, res) => {

    const directorio = req.query.directorio_padre;
    const directorioContenido = await Directorios.find({
        directorio_padre: directorio
    }).exec();

    res.json(directorioContenido);

}

module.exports = {
    listarDirectorios,
    obtenerDirectorio,
    crearDirectorio,
    detallesDirectorio,
    eliminarDirectorio,
    listarDirectoriosPapelera,
    listarDirectoriosEnPapelera
}